const express = require('express')
const isSignedIn = require('../middleware/is-signed-in')
const router = express.Router()
const Exercise = require('../models/Exercise')
const Workout = require('../models/Workout')

//list the user workout routines
router.get('/', isSignedIn, async (req, res) => {
  try {
    const routines = await Workout.find({ owner: req.session.user._id })
    res.render('routine/indexRoutine.ejs')
  } catch (err) {
    console.log('ERROR in Listing the Workout routines')
    res.redirect('/')
  }
})

//get: form to create routine
router.get('/new', isSignedIn, async (req, res) => {
  const allExercises = await Exercise.find()
  res.render('routine/StartRoutine.ejs', { exercises: allExercises })
})

router.post('/new', isSignedIn, async (req, res) => {
  try {
    req.body.owner = req.session.user._id
    req.body.isPublic = req.body.isPublic === 'on'
    const createdWorkout = await Workout.create(req.body)
    res.redirect('/routines/add-exercises/' + createdWorkout._id)
  } catch (err) {
    console.log('ERROR in creating Workout routines', err)
  }
})
router.get('/add-exercises/:id', (req, res) => {
  // 1. get all exercises from the database
  // 2. get the workout with the id from req.params
  // 3. pass both to the ejs page
  res.render('routine/createRoutine.ejs')
})

router.post('/add-exercises/:id', (req, res) => {
  res.render('routine/createRoutine.ejs')
})
router.get('/:id', (req, res) => {
  res.send(`Routines ${req.params.id}`)
})

router.delete('/:id', (req, res) => {
  res.send(`Deleted routine ${req.params.id}`)
})
module.exports = router
