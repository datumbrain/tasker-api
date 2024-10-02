const app = require('./index')
const PORT = process.env.HTTP_PORT || 5001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
