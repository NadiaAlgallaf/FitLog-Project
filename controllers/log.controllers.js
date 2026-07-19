const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Workout logs')
})

router.post('/', (req, res) => {
  res.send('Log created')
})

module.exports = router
