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
    }
  },
  { timestamps: true }
)

const Exercise = mongoose.model('Exercise', exerciseSchema)
module.exports = 'Exercise'
