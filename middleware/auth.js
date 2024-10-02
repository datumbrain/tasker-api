const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')

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

module.exports = authenticateToken
