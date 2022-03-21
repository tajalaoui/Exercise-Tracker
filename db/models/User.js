const mongoose = require("mongoose")

const logSchema = new mongoose.Schema({
  description: { type: String },
  duration: { type: Number },
  date: { type: String, default: Date.now() },
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  count: { type: Number },
  log: [logSchema],
})

const User = mongoose.model("User", userSchema)

module.exports = User
