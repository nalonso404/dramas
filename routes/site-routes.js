const express = require("express");
const router = express.Router();

const Animal = require("../models/Animal");
const User = require("../models/User");
const Pregunta = require('../models/Pregunta')

const uploadCloud = require("../config/cloudinary.js");


//renderiz ala plantilla home.hbs
router.get("/", (req, res, next) => {
  res.render("home");
});


// verificamiso si el usuario tiene una session activa, de ser asi, lo redirigimos a la siguiente ruta
// en este caso, /secret, en caso contrario redirigimos al usuario a /login
router.use((req, res, next) => {
  if (req.session.currentUser) { // <== if there's user in the session (user is logged in)
    next(); // ==> go to the next route 
  } else {                          
    res.redirect("/login");        
  }                                
});    

// renderizamos la plantilla secret.hbs con el username , deconstruimos en la variable username el username de request
// session de currentUser
   
 router.get('/secret', (req,res,next)=>{
   res.render('secret')
 })
router.get('/profile', async (req,res,next)=>{
  const user = req.session.currentUser;
  const userWithAnimal = await User.findOne({'_id':user._id}).populate('animal');

console.log(userWithAnimal)
res.render("profile", userWithAnimal)
}) 

/*router.get('/game', (req,res,next)=>{
  res.render('game')
})*/

router.get('/edit', (req,res,next)=>{
  const userId =req.session.currentUser._id;
   User.findById(userId)
  .then((user)=>{
    res.render('auth/edituser',{user}) 
  })
})


router.post('/edit', async(req,res,next)=>{
  const userId =req.session.currentUser._id;
  const {name,mail} = req.body;
  const userUpdated = await User.findOneAndUpdate({_id: userId}, { $set: {name, mail}}, {new:true})
  console.log(userUpdated);
  res.redirect("/users/profile");
})
/* 
router.post('/edit', async (req,res,next)=>{
  const userId=req.session.currentUser._id;
  const {name,mail}= req.body;
  User.findByIdAndUpdate({_id:userId}, { $set:{name,mail}}, {new:true})
  const user= await User.findById(userId);
  req.session.currentUser=user
    return res.redirect("/users/profile")
  }) */



/* router.post('/edit',uploadCloud.single("photo"), (req,res,next)=>{
  const userId=req.session.currentUser._id;
  const {name,mail,image}= req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  User.findByIdAndUpdate({_id:userId}, { $set:{name,mail,image}}, {new:true})
  console.log()
  .then((user)=>{
    res.redirect("/users/profile")
  })
  .catch ((error)=>{
    console.log(error)
  })
})
 */


router.get('/game', async (req, res, next) => {
  const user = req.session.currentUser;
  const userWithAnimal = await User.findOne({'_id':user._id}).populate('animal');
  const enemyWithAnimal = await User.findOne({'_id':{$ne: user._id }}).populate('animal');
  const pregunta = await Pregunta.find()
  console.log(pregunta)
  const {question, answer1, answer2} = pregunta[0]
  const arrAnswer = [answer1, answer2].sort()
  const data = {
    user:userWithAnimal,
    enemy:enemyWithAnimal,
    pregunta: question,
    answer1: arrAnswer[0],
    answer2: arrAnswer[1]
  }
  console.log(data)

  res.render('game', data)
  })

  router.get('/winner', (req,res,next) => {
    console.log('hola?')
    res.render('winner')
  })
  router.get('/loser', (req,res,next) => {
    res.render('loser')
  })

  router.post('/winner', (req,res,next) => {
    console.log('win')
  })
  router.post('/loser', (req,res,next) => {
    console.log('loser')

  })

  /*
  
  router.post('/game/:className', async (req, res, next) => {
    const {className} = req.params
    console.log(className)
    if(className.class === 'respuesta-correcta'){
      res.redirect('/users/winner')
    }else{
      res.redirect('/users/loser')
    }
  })

*/


module.exports = router;