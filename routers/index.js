const express = require("express")
// TODO Shall we delete new ?
const router = new express.Router()

// * Db model
const User = require("../db/models/User")

// Create user
router.post("/api/users", async (req, res) => {
  const { username } = req.body

  try {
    // Check if user exists
    // const isUserExists = await User.findOne({ username })
    // if (isUserExists) return res.json({ error: "Username already exists" })

    const query = await new User({ username: username })
    query.save((err, data) => {
      if (err) return handleError(err)

      res.json(data)
    })
  } catch (error) {
    res.send("An error encountered")
  }
})

// Get users
router.get("/api/users", async (req, res) => {
  try {
    User.find({}, (err, data) => {
      if (!data) {
        res.send("No users")
      } else {
        res.json(data)
      }
    })
  } catch (err) {
    res.send("An error encountered")
  }
})

router.post("/api/users/:_id/exercises", async (req, res) => {
  const { _id } = req.params
  let { date, duration, description } = req.body

  duration = parseInt(duration)

  if (!date) date = new Date().toDateString()
  else date = new Date(date).toDateString()

  try {
    // Check if user id exists
    const { id, username, log } = await User.findByIdAndUpdate(
      _id,
      { $push: { log: { description, duration, date } } },
      { new: true }
    )

    res.json({ username, description, duration, date, _id: id })
  } catch (err) {
    res.send("An error encountered")
  }
})

router.get("/api/users/:_id/logs", async (req, res) => {
  const { _id } = req.params

  let { from, to, limit } = req.query

  limit = !limit ? 10 : Number(limit)

  try {
    // Check if user id exists
    const { username, log } = await User.findOne({ _id: _id }, { log: { $slice: limit } })

    res.json({ _id, username, count: log.length, log })
  } catch (err) {
    console.error(err)
    res.send("An error encountered")
  }
})

module.exports = router
