const mongoose = require('mongoose')

//User schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

//User model
const User = mongoose.model('User', userSchema)

//export model
module.exports = User
