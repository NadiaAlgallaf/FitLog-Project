const mongoose = require('mongoose')
const User = require('../models/User')

//Workout schema
const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  workoutName: {
    type: String,
    required: true
  },
  discription: {
    type: String
  },
  muscleGroup: {
    type: String,
    required: true,
    enum: [
      'All',
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
  exersise: {
    type: String,
    required: true
    //enum: [] add exercises
  },
  isPublic: {
    type: Boolean,
    default: false
  }
})

const Workout = mongoose.model('Workout', workoutSchema)
module.exports = Workout
