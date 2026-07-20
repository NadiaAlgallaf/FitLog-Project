const mongoose = require('mongoose')
const Exercise = require('Exercise')
const Workout = require('Workout')

const setSchema = new mongoose.Schema({
  reps: {
    type: Number,
    require: true
  },
  weight: {
    type: Number
  }
})

const workoutExerciseSchema = new mongoose.Schema(
  {
    workout: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workout',
      required: true
    },

    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true
    },

    sets: [setSchema],

    completed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

const WorkoutExercise = mongoose.model('WorkoutExercise', workoutExerciseSchema)

module.exports = WorkoutExercise
