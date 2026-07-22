const mongoose = require('mongoose')

const setSchema = new mongoose.Schema(
  {
    reps: { type: Number, required: true, min: 1 },
    weight: { type: Number, required: true, min: 0, default: 0 },
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
)

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

    sets: [setSchema]
  },
  { timestamps: true }
)

const WorkoutExercise = mongoose.model('WorkoutExercise', workoutExerciseSchema)

module.exports = WorkoutExercise
