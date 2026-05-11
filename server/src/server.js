const express = require('express')
const path = require('path')
const prisma = require("./config/db.js")
const routes = require("./routes")

const app = express()
const PORT = 5050

app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))
app.use("/api", routes)
// app.get('/', (req, res) => {
//   const users = await prisma.user.findMany()
//   //res.sendFile(path.join(__dirname, '../public/index.html'))
//   res.json(users)
// })

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})