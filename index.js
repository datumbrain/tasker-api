const express = require('express')
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const prisma = new PrismaClient()
const app = express()
app.use(express.json())
app.use(cors())

const jwtSecret = process.env.JWT_SECRET

// Helper function for token verification
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Token required' })

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' })
    req.user = user
    next()
  })
}

app.get('/', (req, res) => {
  res.status(200).json({ data: 'Hello World!' })
})

// Signup route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    })
    res.status(201).json(user)
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'Email already exists' })
    }
    res.status(500).json({ error: 'Something went wrong' })
  }
})

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: '1h',
    })
    res.json({ token })
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' })
  }
})

// Get todos (authenticated)
app.get('/todos', authenticateToken, async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({ where: { userId: req.user.id } })
    res.json(todos)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' })
  }
})

// Create a new todo (authenticated)
app.post('/todos', authenticateToken, async (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'Todo text is required' })

  try {
    const todo = await prisma.todo.create({
      data: { text, userId: req.user.id },
    })
    res.json(todo)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create todo' })
  }
})

// Update a todo (authenticated)
app.put('/todos/:id', authenticateToken, async (req, res) => {
  const { id } = req.params
  const { completed } = req.body

  try {
    const todo = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: { completed },
    })
    res.json(todo)
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo' })
  }
})

// Delete a todo (authenticated)
app.delete('/todos/:id', authenticateToken, async (req, res) => {
  const { id } = req.params

  try {
    await prisma.todo.delete({ where: { id: parseInt(id) } })
    res.sendStatus(204)
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' })
  }
})

module.exports = app
