const mongoose = require('mongoose')
const Exercise = require('Exercise')

const setSchema = new mongoose.Schema(
  {
    reps: {
      type: Number,
      require: true
    },
    weight: {
      type: Number
    },
    completed: {
      type: Boolean
    }
  },
  { timestamps: true }
)

const Set = mongoose.model('Set', setSchema)
module.exports = 'Set'
