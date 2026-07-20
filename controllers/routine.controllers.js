const express = require('express')
const isSignedIn = require('../middleware/is-signed-in')
const router = express.Router()
const Exercise = require('../models/Exercise')
const Workout = require('../models/Workout')

//list the user workout routines
router.get('/', isSignedIn, async (req, res) => {
  try {
    const routines = await Workout.find({ owner: req.session.user._id })
  } catch (err) {
    console.log('ERROR in Listing the Workout routines')
    res.redirect('/')
  }
})

//get: form to create routine
router.get('/new', isSignedIn, (req, res) => {
  res.render('../views/routine/createRoutine.ejs')
})

//post: create routine
router.post('/', isSignedIn, async (req, res) => {
  try {
    req.body.owner = req.session.user._id
    req.body.isPublic = req.body.isPublic === 'on'
    await Wourkout.create(req.body)
    res.redirect('/routines')
  } catch (err) {
    console.log('ERROR in creating Workout routines')
    res.redirect('/routines/new')
  }
})
router.get('/:id', (req, res) => {
  res.send(`Routines ${req.params.id}`)
})

router.delete('/:id', (req, res) => {
  res.send(`Deleted routine ${req.params.id}`)
})
module.exports = router
