const express = require('express');
const router = express.Router();
// Added the model
const Animal = require("../models/Animal");
const User = require("../models/User");


/* GET users listing. */
router.get('/create', function(req, res, next) {
    console.log("holaaa")
  res.render('animal/createanimal');
});

router.post('/create', async function(req,res,next){
  try{
    const { name, type, phrase, attitude } = req.body;
    const user = req.session.currentUser._id;
    // validamos si los valores de los inputs llegan vacíos
  
    if (name === "" || phrase ==="") {
      res.render("animal/createanimal", {
        errorMessage: "Indicate a name, phrase and an attitude to create your animal"
      });
      return;
    }
    //busco en la BD si existe el animal
    
    const animalExist = await Animal.findOne({name})
  
    if (animalExist) {
      res.render("animal/createanimal", {
        errorMessage: "The name already exists!"
      });
      return;
    }
  
    const createdAnimal= await Animal.create({
      user,
      name,
      type,
      phrase,
      attitude
    })

    //const userUpdated = await User.findOne({'_id':user})
    const userUpdated = await User.findOneAndUpdate({'_id':user}, {animal: createdAnimal._id},{new:true})
    console.log(userUpdated);
    res.redirect("/users/profile");
  }
  catch(error){
    next(error);
  }
});


router.get('/edit', (req,res,next)=>{
 const animalId =req.session.currentUser.animal;
  Animal.findById(animalId)
  .then((animal)=>{
    res.render('animal/editanimal', {animal})
  }) 

})/

router.post('/edit', async(req,res,next)=>{
  const animalId =req.session.currentUser.animal;

  const {name,type,phrase,attitude} = req.body;
  const animalUpdated = await Animal.findOneAndUpdate({_id: animalId}, { $set: {name, type, phrase, attitude }}, {new:true})
  console.log(animalUpdated);
  res.redirect("/users/profile");
})
//no va  el delete!!!!!!!!!!!!!!!!!!!!!
router.post('/delete', (req,res,next)=>{
  const animalId =req.session.currentUser.animal;
  Animal.findByIdAndDelete(animalId)
  .then((animal)=>{
    res.redirect("/users/profile");
  })
  .catch((error)=>{
    console.log(error);
  })
})
 

module.exports = router;
