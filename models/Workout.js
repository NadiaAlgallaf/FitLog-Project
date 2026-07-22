const mongoose = require('mongoose')

//Workout schema
const workoutSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    reqiuired: true
  },
  workoutName: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  isPublic: {
    type: Boolean,
    default: false
  }
})

const Workout = mongoose.model('Workout', workoutSchema)
module.exports = Workout
