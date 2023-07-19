const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const { v4: uuidv4 } = require("uuid")
const { GraphQLError } = require("graphql")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const Person = require("./models/person")
const User = require("./models/user")

require("dotenv").config()

const MONGOBD_URI = process.env.MONGOBD_URI

console.log("connecting to", MONGOBD_URI)

mongoose
  .connect(MONGOBD_URI)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB", error.message)
  })

const typeDefs = `
type User {
  username: String!
  friends: [Person!]!
  id: ID!
}

type Token {
  value: String!
}

type Address {
  street: String!
  city: String!
}

enum YesNo {
  YES
  NO
}

type Person {
  name: String!
  phone: String
  address: Address!
  id: ID!
}

type Query {
  personCount: Int!
  allPersons(phone: YesNo): [Person]!
  findPerson(name: String!): Person
  me: User
}

type Mutation {
  addPerson(
    name: String!
    phone: String
    street: String!
    city: String!
  ): Person
  
  addAsFriend(
    name: String!
  ): User

  editPhone(
    name: String!
    phone: String!
  ): Person

  createUser(
    username: String!
    favoriteGenre: String!
    ): User

  login(
    username: String!
    password: String!
  ): Token
}
`

const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) {
        return Person.find({})
      }
      return Person.find({ phone: { $exists: args.phone === "YES" } })
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      }
    },
  },

  Mutation: {
    addPerson: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }
      const existingContact = await Person.findOne({ name: args.name })
      console.log(existingContact)
      if (existingContact) {
        throw new GraphQLError("Name must be unique", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        })
      }
      const person = new Person({ ...args })

      try {
        await person.save()
        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      } catch (error) {
        throw new GraphQLError("Saving person failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        })
      }
      return person
    },

    addAsFriend: async (root, args, { currentUser }) => {
      const isFriend = (person) => {
        currentUser.friends
          .map((f) => f._id.toString())
          .includes(person._id.toString())
      }

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      const person = await Person.findOne({ name: args.name })
      if (!isFriend(person)) {
        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      }

      return currentUser
    },

    editPhone: async (root, args) => {
      const personToEdit = await Person.findOne({ name: args.name })
      console.log(personToEdit)
      if (!personToEdit) {
        return null
      }
      personToEdit.phone = args.phone
      try {
        await personToEdit.save()
      } catch (error) {
        throw new GraphQLError("Saving phone number failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.phone,
            error,
          },
        })
      }
      return personToEdit
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username })

      return user.save().catch((error) => {
        throw new GraphQLError("Creating user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        })
      })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== "secret") {
        throw new GraphQLError("Wrong username or password", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
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

    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id).populate(
        "friends"
      )
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server read at ${url}`)
})
