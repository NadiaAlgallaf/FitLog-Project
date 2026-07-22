const express = require('express')
const router = express.Router()
const Workout = require('../models/Workout')
const Exercise = require('../models/Exercise')

//get: list the user workout routines
router.get('/', async (req, res) => {
  try {
    const routines = await Workout.find({ owner: req.session.user._id })
    res.render('routine/indexRoutine.ejs', { routines })
  } catch (err) {
    console.log('ERROR in Listing the Workout routines', err)
    res.redirect('/')
  }
})

//get: form to create routine
router.get('/new', (req, res) => {
  res.render('routine/StartRoutine.ejs')
})

//post: create routine
router.post('/', async (req, res) => {
  try {
    req.body.owner = req.session.user._id

    if (req.body.isPublic === 'on') {
      req.body.isPublic = true
    } else {
      req.body.isPublic = false
    }

    const workout = await Workout.create(req.body)
    res.redirect(`/routines/add-exercises/${workout._id}`)
  } catch (err) {
    console.log('ERROR in creating Workout routines', err)
    res.redirect('/routines/new')
  }
})

//get: show one routine (to add exercises)
router.get('/add-exercises/:id', async (req, res) => {
  try {
    // 1. get all exercises from the database
    const exercises = await Exercise.find()

    // 2. get the workout with the id from req.params
    const workout = await Workout.findById(req.params.id)

    // 3. pass both to the ejs page
    res.render('routine/createRoutine.ejs', { exercises, workout })
  } catch (err) {
    console.log(err)
    res.redirect('/routines')
  }
})

// get: show one routine
router.get('/:id', async (req, res) => {
  const routine = await Workout.findById(req.params.id)

  res.render('routine/showRoutine.ejs', {
    routine
  })
})

// get: show edit page
router.get('/:id/edit', async (req, res) => {
  const routine = await Workout.findById(req.params.id)
  res.render('routine/editRoutine.ejs', {
    routine
  })
})

//put: update routine
router.put('/:id', async (req, res) => {
  if (req.body.isPublic === 'on') {
    req.body.isPublic = true
  } else {
    req.body.isPublic = false
  }

  await Workout.findByIdAndUpdate(req.params.id, req.body)

  res.redirect(`/routines/${req.params.id}`)
})
//delete: delete routine
router.delete('/:id', async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id)
  res.redirect('/routines')
})
module.exports = router
