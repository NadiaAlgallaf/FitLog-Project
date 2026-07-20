const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const Exercise = require('../models/Exercise')

mongoose.connect(process.env.MONGODB_URI)

const exercises = [
  // CHEST
  {
    exerciseName: 'Bench Press',
    exerciseGif: '/gifs/bench-press.gif',
    muscleGroup: 'Chest',
    equipment: 'Barbell, Bench',
    instructions:
      'Lower the bar to your chest, then push it back up until arms are straight.'
  },
  {
    exerciseName: 'Incline Bench Press',
    exerciseGif: '/gifs/incline-bench-press.gif',
    muscleGroup: 'Chest',
    equipment: 'Barbell/Dumbbells, Incline Bench',
    instructions:
      'Press the weight upward from upper chest, control on the way down.'
  },
  {
    exerciseName: 'Push-ups',
    exerciseGif: '/gifs/push-ups.gif',
    muscleGroup: 'Chest',
    equipment: 'Bodyweight',
    instructions:
      'Lower your body until chest is near the floor, then push back up.'
  },
  {
    exerciseName: 'Chest Fly',
    exerciseGif: '/gifs/chest-fly.gif',
    muscleGroup: 'Chest',
    equipment: 'Dumbbells / Machine',
    instructions:
      'Open arms wide, then bring them together in a hugging motion.'
  },

  // BACK
  {
    exerciseName: 'Pull-ups',
    exerciseGif: '/gifs/pull-ups.gif',
    muscleGroup: 'Back',
    equipment: 'Pull-up Bar',
    instructions:
      'Pull your body up until chin passes the bar, then lower slowly.'
  },
  {
    exerciseName: 'Lat Pulldown',
    exerciseGif: '/gifs/lat-pulldown.gif',
    muscleGroup: 'Back',
    equipment: 'Cable Machine',
    instructions: 'Pull the bar down to your chest, then slowly return.'
  },
  {
    exerciseName: 'Barbell Row',
    exerciseGif: '/gifs/barbell-row.gif',
    muscleGroup: 'Back',
    equipment: 'Barbell',
    instructions: 'Bend forward, pull bar toward your torso, then lower it.'
  },
  {
    exerciseName: 'Deadlift',
    exerciseGif: '/gifs/deadlift.gif',
    muscleGroup: 'Back',
    equipment: 'Barbell',
    instructions:
      'Lift the bar from the ground by extending hips and knees, keep back straight.'
  },

  // SHOULDERS
  {
    exerciseName: 'Shoulder Press',
    exerciseGif: '/gifs/shoulder-press.gif',
    muscleGroup: 'Shoulders',
    equipment: 'Dumbbells / Barbell',
    instructions: 'Press weights overhead until arms are straight, then lower.'
  },
  {
    exerciseName: 'Lateral Raise',
    exerciseGif: '/gifs/lateral-raise.gif',
    muscleGroup: 'Shoulders',
    equipment: 'Dumbbells',
    instructions: 'Raise arms to the sides until shoulder height, then lower.'
  },
  {
    exerciseName: 'Rear Delt Fly',
    exerciseGif: '/gifs/rear-delt-fly.gif',
    muscleGroup: 'Shoulders',
    equipment: 'Dumbbells / Machine',
    instructions: 'Bend forward and raise arms out to the sides.'
  },

  // BICEPS
  {
    exerciseName: 'Bicep Curl',
    exerciseGif: '/gifs/bicep-curl.gif',
    muscleGroup: 'Biceps',
    equipment: 'Dumbbells / Barbell',
    instructions: 'Curl the weight toward your shoulders, then lower slowly.'
  },
  {
    exerciseName: 'Hammer Curl',
    exerciseGif: '/gifs/hammer-curl.gif',
    muscleGroup: 'Biceps',
    equipment: 'Dumbbells',
    instructions: 'Curl with palms facing inward, keep elbows still.'
  },

  // TRICEPS
  {
    exerciseName: 'Tricep Pushdown',
    exerciseGif: '/gifs/tricep-pushdown.gif',
    muscleGroup: 'Triceps',
    equipment: 'Cable Machine',
    instructions:
      'Push the bar down until arms are straight, then return slowly.'
  },
  {
    exerciseName: 'Tricep Dips',
    exerciseGif: '/gifs/tricep-dips.gif',
    muscleGroup: 'Triceps',
    equipment: 'Bench / Bars',
    instructions: 'Lower your body by bending elbows, then push back up.'
  },

  // LEGS
  {
    exerciseName: 'Squats',
    exerciseGif: '/gifs/squats.gif',
    muscleGroup: 'Legs',
    equipment: 'Barbell / Bodyweight',
    instructions: 'Lower hips back and down, then stand back up.'
  },
  {
    exerciseName: 'Leg Press',
    exerciseGif: '/gifs/leg-press.gif',
    muscleGroup: 'Legs',
    equipment: 'Machine',
    instructions: 'Push platform away with feet, then return slowly.'
  },
  {
    exerciseName: 'Lunges',
    exerciseGif: '/gifs/lunges.gif',
    muscleGroup: 'Legs',
    equipment: 'Bodyweight / Dumbbells',
    instructions: 'Step forward, lower back knee, then return.'
  },
  {
    exerciseName: 'Calf Raises',
    exerciseGif: '/gifs/calf-raises.gif',
    muscleGroup: 'Legs',
    equipment: 'Bodyweight / Machine',
    instructions: 'Raise heels up, pause, then lower.'
  },

  // GLUTES
  {
    exerciseName: 'Hip Thrust',
    exerciseGif: '/gifs/hip-thrust.gif',
    muscleGroup: 'Legs',
    equipment: 'Barbell / Bench',
    instructions: 'Push hips upward, squeeze glutes, then lower.'
  },

  // CORE
  {
    exerciseName: 'Plank',
    exerciseGif: '/gifs/plank.gif',
    muscleGroup: 'Core (Abs)',
    equipment: 'Bodyweight',
    instructions: 'Hold a straight body position, engage core.'
  },
  {
    exerciseName: 'Crunches',
    exerciseGif: '/gifs/crunches.gif',
    muscleGroup: 'Core (Abs)',
    equipment: 'Bodyweight',
    instructions: 'Lift shoulders off the ground, then lower slowly.'
  },
  {
    exerciseName: 'Leg Raises',
    exerciseGif: '/gifs/leg-raises.gif',
    muscleGroup: 'Core (Abs)',
    equipment: 'Bodyweight',
    instructions: 'Raise legs up, then lower without touching ground.'
  },

  // CARDIO
  {
    exerciseName: 'Running',
    exerciseGif: '/gifs/running.gif',
    muscleGroup: 'Cardio',
    equipment: 'Treadmill / Outdoor',
    instructions: 'Maintain steady pace or intervals.'
  },
  {
    exerciseName: 'Cycling',
    exerciseGif: '/gifs/cycling.gif',
    muscleGroup: 'Cardio',
    equipment: 'Bike',
    instructions: 'Pedal at consistent speed or resistance.'
  },
  {
    exerciseName: 'Jump Rope',
    exerciseGif: '/gifs/jump-rope.gif',
    muscleGroup: 'Cardio',
    equipment: 'Rope',
    instructions: 'Jump continuously while swinging rope.'
  }
]

async function seedExercises() {
  await Exercise.deleteMany({})
  await Exercise.insertMany(exercises)

  console.log('Exercises seeded!')
  mongoose.connection.close()
}

seedExercises()
