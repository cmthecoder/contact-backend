const express = require("express")
const errHandler = require("./middleware/errorHandler")
const connectDB = require("./config/dbConnection")
const dotenv = require("dotenv").config()

connectDB()

const app = express()

const PORT = process.env.PORT || 5001

app.use(express.json())
app.use('/api/contacts', require('./routes/contactRoutes'))
app.use(errHandler)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})