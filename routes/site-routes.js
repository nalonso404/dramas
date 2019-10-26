const express = require("express");
const router = express.Router();
 
const User = require("../models/User");

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
   
router.get("/profile", (req, res, next) => {
  const user = req.session.currentUser;
  res.render("profile", {user});
});
//aqui no sesta renderitzant el nom de cada user perque?????


router.get('/edit', (req,res,next)=>{
  const userId =req.session.currentUser._id;
   User.findById(userId)
  .then((user)=>{
    res.render('auth/edituser',{user}) 
  })
})

router.post('/edit', async(req,res,next)=>{
  const userId=req.session.currentUser._id;
  const {name,mail} = req.body;
  await User.findOneAndUpdate(userId,{
    name,
    mail
  })
  const userUpdate = await User.findById(userId);
  req.session.currentUser=userUpdate;
  return res.redirect("/users/profile");
 
}) 

module.exports = router;