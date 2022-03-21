const mongoose = require("mongoose")

const exerciseSchema = new mongoose.Schema({
  username: String,
  description: String,
  duration: Number,
  date: { type: String, default: new Date().toUTCString() },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

const Exercise = mongoose.model("Exercise", exerciseSchema)

module.exports = Exercise
