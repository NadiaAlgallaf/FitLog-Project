// imports
const express = require('express') //importing express package
const app = express() // creates a express application
const dotenv = require('dotenv').config() //this allows me to use my .env values in this file
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')

async function conntectToDB() {
  //connection to the database
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to Database')
  } catch (error) {
    console.log('Error Occured', error)
  }
}

conntectToDB() // connect to database

// middleware imports
const isSignedIn = require('./middleware/is-signed-in.js')
const passUserToView = require('./middleware/pass-user-to-view.js')

// controller Imports
const authController = require('./controllers/auth.controllers.js') //sign up-sign in -logout
const indexController = require('./controllers/index.controllers.js')
const routineController = require('./controllers/routine.controllers.js') //create, edit, delete workout routines
const exerciseController = require('./controllers/exercise.controllers.js') //manage exercises inside a routine
const logController = require('./controllers/log.controllers.js') //track completed workouts

// Middleware
app.use(express.static('public')) //all static files are in the public folder
app.use(express.urlencoded({ extended: false })) // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride('_method'))
app.use(morgan('dev'))

// Routes go here
app.use('/', indexController)
app.use('/auth', authController)
app.use('/routines', routineController)
app.use('/routines/:routineId/exercisesS', exerciseController)
app.use('/logs', logController)

app.listen(3000, () => {
  console.log('App is Running')
}) // listen on port 3000
