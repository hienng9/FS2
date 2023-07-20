const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4")
const {
  ApollaServerPluginDrainHttpServer,
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const express = require("express")
const cors = require("cors")
const http = require("http")
const { WebSocketServer } = require("ws")
const { useServer } = require("graphql-ws/lib/use/ws")

const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const resolvers = require("./resolvers")
const typeDefs = require("./schema")

mongoose.set("strictQuery", false)

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

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith("Bearer ")) {
          const token = auth.substring(7)
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id).populate(
            "friends"
          )

          return { currentUser }
        }
      },
    })
  )
  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  )
}

start()
