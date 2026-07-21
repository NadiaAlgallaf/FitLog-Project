// imports
const express = require('express') //importing express package
const app = express() // creates a express application
const dotenv = require('dotenv').config() //this allows me to use my .env values in this file
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const session = require('express-session')

//connection to the database
async function conntectToDB() {
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

// Middleware
app.use(express.static('public')) //all static files are in the public folder
app.use(express.urlencoded({ extended: false })) // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
)
app.use(passUserToView)

// Routes go here
app.use('/', indexController)
app.use('/auth', authController)
app.use('/routines', isSignedIn, routineController)
app.use('/routines/:routineId/exercises', exerciseController)

// connect to database and listen on Port 3000
async function startServer() {
  const PORT = process.env.PORT || 3000
  await conntectToDB()

  app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
  })
}

startServer()
