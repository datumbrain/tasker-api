const express = require('express')

const cors = require('cors')
const dotenv = require('dotenv')

require('./prismaClient.js')

const authRoutes = require('./routes/auth.js')
const todoRoutes = require('./routes/todo.js')

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.status(200).json({ data: 'Hello World!' })
})

app.use('/api/auth', authRoutes) // Prefix for auth routes
app.use('/api/todos', todoRoutes) // Prefix for todo routes

module.exports = app
