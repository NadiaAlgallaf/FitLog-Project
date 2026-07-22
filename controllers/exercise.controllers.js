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

module.exports = router
