const express = require('express')
const router = express.Router()
const Workout = require('../models/Workout')
const Exercise = require('../models/Exercise')
const WorkoutExercise = require('../models/WorkoutExercise')

async function findOwnedWorkout(req) {
  return Workout.findOne({
    _id: req.params.id,
    owner: req.session.user._id
  })
}

//get: list the user workout routines
router.get('/', async (req, res) => {
  try {
    const routines = await Workout.find({ owner: req.session.user._id }).sort({
      createdAt: -1
    })

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

    res.redirect(`/routines/${workout._id}/exercises/new`)
  } catch (err) {
    console.log('Error creating routine:', err)
    res.redirect('/routines/new')
  }
})

// legacy route: redirect old add-exercises URLs to the routine page
router.get('/add-exercises/:id', (req, res) => {
  res.redirect(`/routines/${req.params.id}`)
})

// legacy add-exercise POST path support
router.post('/new/:workoutId/AddExercise', async (req, res) => {
  try {
    req.body.workout = req.params.workoutId
    req.body.sets = [
      {
        reps: req.body.reps,
        weight: req.body.weight
      }
    ]

    await WorkoutExercise.create(req.body)

    res.redirect(`/routines/${req.params.workoutId}/exercises/new`)
  } catch (err) {
    console.log('Error adding exercise:', err)
    res.redirect(`/routines/${req.params.workoutId}/exercises/new`)
  }
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
  try {
    const routine = await findOwnedWorkout(req)

    if (!routine) return res.redirect('/routines')

    res.render('routine/editRoutine.ejs', {
      routine
    })
  } catch (err) {
    console.log('Error opening edit page:', err)
    res.redirect('/routines')
  }
})

//put: update routine
router.put('/:id', async (req, res) => {
  try {
    const routine = await findOwnedWorkout(req)

    if (!routine) return res.redirect('/routines')

    routine.workoutName = req.body.workoutName
    routine.description = req.body.description
    routine.isPublic = req.body.isPublic === 'on'

    await routine.save()

    res.redirect(`/routines/${routine._id}`)
  } catch (err) {
    console.log('Error updating routine:', err)
    res.redirect('/routines')
  }
})

//delete: delete routine
router.delete('/:id', async (req, res) => {
  try {
    const routine = await findOwnedWorkout(req)

    if (!routine) return res.redirect('/routines')

    await WorkoutExercise.deleteMany({ workout: routine._id })
    await routine.deleteOne()

    res.redirect('/routines')
  } catch (err) {
    console.log('Error deleting routine:', err)
    res.redirect('/routines')
  }
})

module.exports = router
