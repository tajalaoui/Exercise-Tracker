const express = require("express")
const app = express()
const cors = require("cors")
var bodyParser = require("body-parser")
require("dotenv").config()

// Db
require("./db/db.js")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
app.use(express.static("public"))
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})

const index = require("./routers/index.js")
app.use(index)

app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + process.env.PORT)
})

module.exports = app
