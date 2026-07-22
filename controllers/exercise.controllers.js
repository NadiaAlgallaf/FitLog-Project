const express = require('express')
const router = express.Router({ mergeParams: true })

const Exercise = require('../models/Exercise')
const Workout = require('../models/Workout')
const WorkoutExercise = require('../models/WorkoutExercise')

// GET: show add exercise page
router.get('/new', async (req, res) => {
  try {
    const routineId = req.params.routineId

    const workout = await Workout.findById(routineId)
    const exercises = await Exercise.find()

    const workoutExercises = await WorkoutExercise.find({
      workout: routineId
    }).populate('exercise')

    res.render('exercises/addExercise.ejs', {
      workout,
      exercises,
      workoutExercises
    })
  } catch (error) {
    console.log('Error opening add exercise page:', error)
    res.redirect('/routines')
  }
})

// POST: add exercise to routine
router.post('/', async (req, res) => {
  try {
    const sets = []

    for (let i = 0; i < req.body.numberOfSets; i++) {
      sets.push({
        reps: req.body.reps,
        weight: req.body.weight,
        completed: false
      })
    }

    await WorkoutExercise.create({
      workout: req.params.routineId,
      exercise: req.body.exercise,
      sets: sets
    })

    res.redirect(`/routines/${req.params.routineId}/exercises/new`)
  } catch (error) {
    console.log('Error adding exercise:', error)
    res.redirect(`/routines/${req.params.routineId}/exercises/new`)
  }
})

// GET: show edit exercise page
router.get('/:id/edit', async (req, res) => {
  try {
    const workoutExercise = await WorkoutExercise.findById(
      req.params.id
    ).populate('exercise')

    res.render('exercises/editWorkoutExercise.ejs', {
      workoutExercise,
      routineId: req.params.routineId
    })
  } catch (error) {
    console.log('Error opening edit page:', error)
    res.redirect(`/routines/${req.params.routineId}`)
  }
})

// PUT: update exercise
router.put('/:id', async (req, res) => {
  try {
    const sets = []

    for (let i = 0; i < req.body.numberOfSets; i++) {
      sets.push({
        reps: req.body.reps,
        weight: req.body.weight,
        completed: false
      })
    }

    await WorkoutExercise.findByIdAndUpdate(req.params.id, {
      sets: sets
    })

    res.redirect(`/routines/${req.params.routineId}`)
  } catch (error) {
    console.log('Error updating exercise:', error)
    res.redirect(`/routines/${req.params.routineId}`)
  }
})

// DELETE: remove exercise
router.delete('/:id', async (req, res) => {
  try {
    await WorkoutExercise.findByIdAndDelete(req.params.id)

    res.redirect(`/routines/${req.params.routineId}`)
  } catch (error) {
    console.log('Error deleting exercise:', error)
    res.redirect(`/routines/${req.params.routineId}`)
  }
})

module.exports = router
