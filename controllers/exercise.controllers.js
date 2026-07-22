const express = require('express')
const router = express.Router({ mergeParams: true })
const Exercise = require('../models/Exercise')
const WorkoutExercise = require('../models/WorkoutExercise')

// get: to show all exercises in the routine
router.get('/', async (req, res) => {
  try {
    const routineId = req.params.routineId

    const exercises = await WorkoutExercise.find({
      workout: routineId
    }).populate('exercise')

    res.render('allExercises.ejs', {
      exercises,
      routineId
    })
  } catch (error) {
    console.log('Error showing exercises:', error)
    res.redirect('/routines')
  }
})

// post: Add an exercise to routine
router.post('/', async (req, res) => {
  try {
    const routineId = req.params.routineId

    await WorkoutExercise.create({
      workout: routineId,
      exercise: req.body.exercise,
      sets: [
        {
          reps: req.body.reps,
          weight: req.body.weight
        }
      ]
    })

    res.redirect(`/routines/${routineId}/exercises`)
  } catch (error) {
    console.log('Error adding exercise:', error)
    res.redirect('/routines')
  }
})
// get: to show the edit form
router.get('/:id/edit', async (req, res) => {
  try {
    const workoutExercise = await WorkoutExercise.findById(
      req.params.id
    ).populate('exercise')

    res.render('exercises/editExercise.ejs', {
      workoutExercise,
      routineId: req.params.routineId
    })
  } catch (error) {
    console.log('Error opening edit page:', error)
    res.redirect(`/routines/${req.params.routineId}/exercises`)
  }
})

// put: Update reps, weight, or completed
router.put('/:id', async (req, res) => {
  try {
    const completed = req.body.completed === 'on'

    await WorkoutExercise.findByIdAndUpdate(req.params.id, {
      sets: [
        {
          reps: req.body.reps,
          weight: req.body.weight
        }
      ],
      completed: completed
    })

    res.redirect(`/routines/${req.params.routineId}/exercises`)
  } catch (error) {
    console.log('Error updating exercise:', error)
    res.redirect(`/routines/${req.params.routineId}/exercises`)
  }
})

// delete: to remove exercise from routine
router.delete('/:id', async (req, res) => {
  try {
    await WorkoutExercise.findByIdAndDelete(req.params.id)

    res.redirect(`/routines/${req.params.routineId}/exercises`)
  } catch (error) {
    console.log('Error deleting exercise:', error)
    res.redirect(`/routines/${req.params.routineId}/exercises`)
  }
})

module.exports = router
