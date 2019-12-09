const express = require("express");
const router = express.Router();

const Animal = require("../models/Animal");
const User = require("../models/User");
const Pregunta = require('../models/Pregunta')

const uploadCloud = require("../config/cloudinary.js");



router.use((req, res, next) => {
  if (req.session.currentUser) {
    next(); 
  } else {
    res.redirect("/login");
  }
});

// renderizamos la plantilla secret.hbs con el username , deconstruimos en la variable username el username de request
// session de currentUser

router.get('/secret', (req, res, next) => {
  const user = req.session.currentUser
  const data = {
    currentUser: user
  }
  res.render('secret', data)
})
router.get('/profile', async (req, res, next) => {
  const user = req.session.currentUser;
  const userWithAnimal = await User.findOne({
    '_id': user._id
  }).populate('animal');
  console.log(userWithAnimal)
  res.render("profile", userWithAnimal)
})


router.get('/edit', (req, res, next) => {
  const userId = req.session.currentUser._id;
  User.findById(userId)
    .then((user) => {
      res.render('auth/edituser', {
        user
      })
    })
})


router.post('/edit', async (req, res, next) => {
  const userId = req.session.currentUser._id;
  const {
    name,
    mail
  } = req.body;
  const userUpdated = await User.findOneAndUpdate({
    _id: userId
  }, {
    $set: {
      name,
      mail
    }
  }, {
    new: true
  })
  console.log(userUpdated);
  res.redirect("/users/profile");
})

router.get('/game', async (req, res, next) => {
  const user = req.session.currentUser;
  const userWithAnimal = await User.findOne({
    '_id': user._id
  }).populate('animal');
  const enemyWithAnimal = await User.findOne({
    '_id': {
      $ne: user._id
    }
  }).populate('animal');
  const pregunta = await Pregunta.find()
  console.log(pregunta)
  const {
    question,
    answer1,
    answer2
  } = pregunta[0]
  const arrAnswer = [answer1, answer2].sort()
  const data = {
    layout: false,
    user: userWithAnimal,
    enemy: enemyWithAnimal,
    pregunta: question,
    answer1: arrAnswer[0],
    answer2: arrAnswer[1]
  }
  console.log(data)

  res.render('game', data)
})

router.get('/winner', (req, res, next) => {
  res.render('winner')
})
router.get('/loser', (req, res, next) => {
  res.render('loser')
})

router.post('/winner', (req, res, next) => {
  console.log('win')
  res.send({})
})
router.post('/loser', (req, res, next) => {
  console.log('loser')
  res.send({})

})


module.exports = router;
