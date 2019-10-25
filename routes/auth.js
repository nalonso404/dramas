const express = require('express');
const router = express.Router();
// Added the model
const User = require("../models/User");
//requerimos bcrypt para encriptar los passwords
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;


/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('auth/signup');
});

router.post('/signup', function(req,res,next){
    const { name, mail, password } = req.body;
    console.log(name,mail,password)
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
  
    // validamos si los valores de los inputs llegan vacíos
  
    if (name === "" || password === "" || mail ==="") {
      res.render("auth/signup", {
        errorMessage: "Indicate a name, mail and a password to sign up"
      });
      return;
    }
  
    //busco en la BD si existe el username
    User.findOne({ name: name })
      .then(user => {
        if (user !== null) {
          res.render("auth/signup", {
            errorMessage: "The name already exists!"
          });
          return;
        }
  
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);
        User.create({
          name,
          mail,
          password: hashPass, 
        })
          .then(() => {
            res.redirect("/users/profile");
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        next(error);
      });
  });


  router.get('/login', function(req, res, next) {
    res.render('auth/login');
  });


  router.post('/login', function(req,res,next){
        //asignamos a variables los datos que vienen del form
  const theUsername = req.body.name;
  const thePassword = req.body.password;


//verificamos que los valores del form no lleguen vacíos
  if (theUsername === "" || thePassword === "") {
      res.render("auth/login", {
          errorMessage: "Please enter both, name and password to sign up."
  });
      return;
  }

  // buscamos en la BD si existe un username con los datos del user que vienen del form
  // si no lo encuentra, nos dice que el user no existe
  // sino, nos devuelve el user
  // usamos el método compareSync para hacer hash del form input y compararlo con el password guardado en la BD

  User.findOne({ "name": theUsername })
      .then(user => {
          if (!user) {
              res.render("auth/login", {
                  errorMessage: "The name doesn't exist."
          });
              return;
          }
          if (bcrypt.compareSync(thePassword, user.password)) {
              // Save the login in the session!
              //the request object has a property called session where we can add the values we want to store on it. In this case, we are setting it up with the user’s information.
              req.session.currentUser = user;
              res.redirect("/users/profile");
          } else {
              res.render("auth/login", {
                  errorMessage: "Incorrect password"
              });
          }
      })
      .catch(error => {
          next(error);
      })
});

router.get("/logout", (req, res, next) => {
    req.session.destroy((err) => {
        // cannot access session here
        res.redirect("/login");
    });
  });



module.exports = router;