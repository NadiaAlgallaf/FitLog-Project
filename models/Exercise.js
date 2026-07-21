const mongoose = require('mongoose')

// Exercise Schema
const exerciseSchema = new mongoose.Schema(
  {
    exerciseName: {
      type: String,
      required: true,
      trim: true
    },
    exerciseGif: {
      type: String,
      required: true
    },
    muscleGroup: {
      type: String,
      required: true,
      enum: [
        'Chest',
        'Back',
        'Shoulders',
        'Biceps',
        'Triceps',
        'Legs',
        'Core (Abs)',
        'Cardio'
      ]
    },
    equipment: {
      type: String
    },
    instructions: {
      type: String
    }
  },
  { timestamps: true }
)

const Exercise = mongoose.model('Exercise', exerciseSchema)
module.exports = Exercise
