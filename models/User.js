const mongoose = require('mongoose')

//User schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      minLength: 4,
      maxLenght: 20,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLenght: 20
    },
    profileImage: {
      type: String
    },
    isAdmin: {
      type: Boolean
      // required: true
    }
  },
  { timestamps: true }
)

//User model
const User = mongoose.model('User', userSchema)

//export model
module.exports = User
