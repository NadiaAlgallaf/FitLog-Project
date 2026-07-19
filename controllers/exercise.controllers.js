const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send(`Exercises routine for ${req.params.routineId}`)
})

router.post('/', (req, res) => {
  res.send('Exercise added')
})
router.delete('/:id', (req, res) => {
  res.send(`Deleted exercise ${req.params.id}`)
})
module.exports = router
