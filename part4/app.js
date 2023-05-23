const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const usersRoute = require('./controllers/users')
const loginRoute = require('./controllers/login')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connectting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected to MongoDB')
})
.catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRoute)
app.use('/api/login', loginRoute)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app