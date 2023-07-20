const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const { v4: uuidv4 } = require("uuid")

const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")
const { GraphQLError } = require("graphql")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const MONGODB_URI = process.env.MONGODB_URI
console.log("connecting to", MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB", error.message)
  })

// Author.insertMany([
//   {
//     name: "Robert Martin",
//     born: 1952,
//   },
//   {
//     name: "Martin Fowler",
//     born: 1963,
//   },
// ]).then(() => {
//   console.log("inserted")
// })

// Book.insertMany([
//   {
//     title: "Clean Code",
//     published: 2008,
//     author: "Robert Martin",
//     genres: ["refactoring"],
//   },
//   {
//     title: "Agile software development",
//     published: 2002,
//     author: "Robert Martin",
//     genres: ["agile", "patterns", "design"],
//   },
//   {
// title: "Refactoring, edition 2",
// published: 2018,
// author: "Martin Fowler",
// genres: ["refactoring"],
//   },
// ]).then(() => {
//   console.log("inserted")
// })
// let authors = [
//
//   {
//     name: "Fyodor Dostoevsky",
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821,
//   },
//   {
//     name: "Joshua Kerievsky", // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   {
//     name: "Sandi Metz", // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

// let books = [
//
//   {
//     title: "Refactoring to patterns",
//     published: 2008,
//     author: "Joshua Kerievsky",
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring", "patterns"],
//   },
//   {
//     title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
//     published: 2012,
//     author: "Sandi Metz",
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring", "design"],
//   },
//   {
//     title: "Crime and punishment",
//     published: 1866,
//     author: "Fyodor Dostoevsky",
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ["classic", "crime"],
//   },
//   {
//     title: "The Demon ",
//     published: 1872,
//     author: "Fyodor Dostoevsky",
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ["classic", "revolution"],
//   },
// ]

const typeDefs = `
  type Token {
    value: String!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }
  type Book {
    title: String!
    published: Int!
    author: Author! 
    genres: [String]
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
    me: User
  }
  type Mutation {
    addBook (
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book

    editAuthor (
      name: String!
      setBornTo: Int!
    ): Author

    createUser (
      username: String!
      favoriteGenre: String!
    ) : User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate("author")
      }

      if (args.author && args.genre) {
        const foundAuthor = await Author.findOne({ name: args.author })
        if (!foundAuthor) {
          throw new GraphQLError("Not Found Author")
        }
        return Book.find({
          author: foundAuthor._id,
          genres: { $in: [args.genre] },
        }).populate("author")
      }

      if (args.author) {
        const foundAuthor = await Author.findOne({ name: args.author })
        if (!foundAuthor) {
          throw new GraphQLError("Not Found Author")
        }
        return Book.find({ author: foundAuthor._id }).populate("author")
      }
      return Book.find({ genres: { $in: [args.genre] } }).populate("author")
    },

    allAuthors: async () => Author.find({}),

    me: async (root, args, context) => {
      const currentUser = context.currentUser
      console.log("current", currentUser)
      return currentUser
    },
  },

  Author: {
    bookCount: async (root) => {
      const booksByAuthor = await Book.find({ author: root._id })
      if (!booksByAuthor) {
        return 0
      }
      return booksByAuthor.length
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "BAD_REQUEST",
          },
        })
      }
      let newBook = null
      const existingAuthor = await Author.findOne({ name: args.author })
      if (!existingAuthor) {
        const newAuthor = await new Author({ name: args.author })
        console.log("new Author", newAuthor)
        try {
          await newAuthor.save()
        } catch (error) {
          throw new GraphQLError("Saving Author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              error,
            },
          })
        }
        newBook = new Book({ ...args, author: newAuthor._id })
      } else {
        newBook = new Book({ ...args, author: existingAuthor._id })
      }

      try {
        await newBook.save()
      } catch (error) {
        throw new GraphQLError("Saving Book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        })
      }
      return newBook.populate("author")
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "BAD_REQUEST",
          },
        })
      }
      const authorToEdit = await Author.findOne({ name: args.name })
      if (!authorToEdit) {
        return null
      }
      authorToEdit.born = args.setBornTo
      try {
        await authorToEdit.save()
      } catch (error) {
        throw new GraphQLError("Editing Author BirthYear failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.setBornTo,
            error,
          },
        })
      }
      return authorToEdit
    },

    createUser: async (root, args) => {
      const existingUser = await User.findOne({
        username: args.username,
      })
      if (existingUser) {
        throw new GraphQLError("Username already in use", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }
      const user = new User({ ...args })
      try {
        await user.save()
      } catch (error) {
        throw new GraphQLError("Creating user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        })
      }
      return user
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== "FullStackOpen") {
        throw new GraphQLError("Wrong username or passwornd", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }

      const token = jwt.sign(userForToken, process.env.JWT_SECRET)
      return { value: token }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    console.log("autho", auth)
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findOne({
        username: decodedToken.username,
      })
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
