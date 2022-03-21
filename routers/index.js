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

  let workoutDuration = parseInt(duration)

  if (!date) {
    const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" }
    date = new Date()

    // const today = date.toLocaleDateString('en', {day: "numeric"}) + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    const today = date
      .toLocaleDateString("en-US", options)
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")

    date = today
  }

  try {
    // Check if user id exists
    const query = await User.findByIdAndUpdate(
      _id,
      { $push: { log: { description, duration, date } } },
      { new: true }
    )

    const exercise = {
      description,
      duration,
      date,
    }

    res.json({ _id, username: query.username, exercise })
  } catch (err) {
    res.send("An error encountered")
  }
})

router.get("/api/users/:_id/logs", async (req, res) => {
  const { _id } = req.params
  const { from, to, limit } = req.query

  try {
    // Check if user id exists
    let query = await User.findById(_id)

    // .where("date").gt(from).lt(to).limit(limit)

    if (from) {
      const fromDate = new Date(from)
      query = query.filter((val) => new Date(val.date) >= fromDate)
    }
    if (to) {
      const toDate = new Date(to)
      query = query.filter((val) => new Date(val.date) <= toDate)
    }
    if (limit) {
      query = query.slice(0, +limit)
    }

    const { username, log } = query

    res.json({ _id, username, count: query.log.length, log })
  } catch (err) {
    res.send("An error encountered")
  }
})

module.exports = router
