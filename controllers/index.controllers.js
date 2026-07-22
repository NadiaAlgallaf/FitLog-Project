const router = require('express').Router()
const Workout = require('../models/Workout')

router.get('/', (req, res) => {
  res.render('homepage.ejs')
})

router.get('/public-routines', async (req, res) => {
  try {
    const routines = await Workout.find({
      isPublic: true
    })
      .populate('owner', 'username')
      .sort({ createdAt: -1 })

    res.render('public-routines.ejs', {
      routines
    })
  } catch (error) {
    console.log('Error loading public routines:', error)
    res.redirect('/')
  }
})

module.exports = router
