const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
app.use(express.json()); // To handle JSON requests

// Route to create a new user
app.post("/user", async (req, res) => {
  const { name, email } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(400)
      .json({ error: "User creation failed", message: "Email already exists" });
  }
});

// Route to get all users
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch users", details: error.message });
  }
});

// Start the server
const PORT = process.env.HTTP_PORT || 5170;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
