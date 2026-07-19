const mongoose = require('mongoose')
const Workout = require('Workout')

// Exercise Schema
const exerciseSchema = new mongoose.Schema(
  {
    exerciseName: {
      type: String,
      required: true
    },
    exerciseGif: {
      type: String
    },
    musculeGroup: {
      type: mongoose.Schema.ObjectId,
      ref: 'Workout'
    },
    equipment: {
      type: String,
      required: true
    },
    instructions: {
      type: String
    },
    sets: {
      type: mongoose.Schema.ObjectId,
      ref: 'Set'
    },
    reps: {
      type: Number,
      min: 0,
      max: 10
    },
    weight: {
      type: String
    }
  },
  { timestamps: true }
)

const Exercise = mongoose.model('Exercise', exerciseSchema)
module.exports = 'Exercise'
