const express = require('express')
const router = express.Router()
const authenticateToken = require('../middleware/auth')

router.use(authenticateToken)

// Get todos (authenticated)
router.get('/', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({ where: { userId: req.user.id } })
    res.json(todos)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' })
  }
})

// Create a new todo (authenticated)
router.post('/', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    await prisma.todo.delete({ where: { id: parseInt(id) } })
    res.sendStatus(204)
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' })
  }
})

module.exports = router
