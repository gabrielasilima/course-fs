const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.error('error connecting to MongoDB:', error.message))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor) // Pode ser global ou apenas em rotas específicas
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

module.exports = app