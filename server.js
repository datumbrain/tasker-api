const app = require('./index')
const PORT = process.env.HTTP_PORT || 8080
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
