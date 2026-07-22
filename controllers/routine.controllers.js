const express = require('express')
const router = express.Router()
const Workout = require('../models/Workout')
const Exercise = require('../models/Exercise')
const WorkoutExercise = require('../models/WorkoutExercise')

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
    const workout = await Workout.create({
      workoutName: req.body.workoutName,
      description: req.body.description,
      isPublic: req.body.isPublic === 'on',
      owner: req.session.user._id
    })

    res.redirect(`/routines/${workout._id}/exercises`)
  } catch (err) {
    console.log('Error creating routine:', err)
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

    const allMyWorkouts = await WorkoutExercise.find({
      workout: req.params.id
    }).populate('exercise')

    // 3. pass both to the ejs page
    res.render('routine/createRoutine.ejs', {
      exercises,
      workout,
      allMyWorkouts
    })
  } catch (err) {
    console.log(err)
    res.redirect('/routines')
  }
})

router.post('/new/:workoutId/AddExercise', async (req, res) => {
  req.body.workout = req.params.workoutId
  req.body.sets = {
    reps: req.body.weight,
    weight: req.body.weight
  }

  await WorkoutExercise.create(req.body)
  res.redirect(`/routines/add-exercises/${req.params.workoutId}`)
})

// get: show one routine
router.get('/:id', async (req, res) => {
  try {
    const routine = await Workout.findById(req.params.id).populate(
      'owner',
      'username'
    )
    if (!routine) return res.redirect('/routines')

    const isOwner =
      routine.owner._id.toString() === req.session.user._id.toString()

    if (!routine.isPublic && !isOwner) return res.redirect('/routines')

    const workoutExercises = await WorkoutExercise.find({
      workout: routine._id
    }).populate('exercise')

    res.render('routine/showRoutine.ejs', {
      routine,
      workoutExercises,
      isOwner
    })
  } catch (err) {
    console.log('Error showing routine:', err)
    res.redirect('/routines')
  }
})

// get: show edit page
router.get('/:id/edit', async (req, res) => {
  const routine = await Workout.findById({
    _id: req.params.id,
    owner: req.session.user._id
  })
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
  try {
    const routine = await Workout.findOne({
      _id: req.params.id,
      owner: req.session.user._id
    })

    if (!routine) return res.redirect('/routines')

    await WorkoutExercise.deleteMany({ workout: routine._id })
    await Workout.findByIdAndDelete(routine._id)

    res.redirect('/routines')
  } catch (err) {
    console.log('Error deleting routine:', err)
    res.redirect('/routines')
  }
})

module.exports = router
