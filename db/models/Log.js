const mongoose = require("mongoose")

const logSchema = new mongoose.Schema({
  username: String,
  count: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  log: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }],
})
const Log = mongoose.model("Log", logSchema)

module.exports = Log
