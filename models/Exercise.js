const mongoose = require('mongoose')

// Sets Schema
const setSchema = new mongoose.Schema(
  {
    reps: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    weight: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { timestamps: true }
)

// Exercise Schema
const exerciseSchema = new mongoose.Schema(
  {
    exerciseName: {
      type: String,
      required: true,
      trim: true
    },
    exerciseGif: {
      type: String
    },
    workout: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workout',
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    sets: [setSchema]
  },
  { timestamps: true }
)

const Exercise = mongoose.model('Exercise', exerciseSchema)
module.exports = Exercise

//maybe I will use later
// musculeGroup: {
//   type: mongoose.Schema.ObjectId,
//   ref: 'Workout'
// },
// equipment: {
//   type: String,
//   required: true
// },
// instructions: {
//   type: String
// }
