const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('All routines')
})

router.get('/new', (req, res) => {
  res.render('../views/createRoutine.ejs')
})
router.post('/', (req, res) => {
  res.send('Routine is created')
})
router.get('/:id', (req, res) => {
  res.send(`Routines ${req.params.id}`)
})

router.delete('/:id', (req, res) => {
  res.send(`Deleted routine ${req.params.id}`)
})
module.exports = router
