const express = require('express');
const router = express.Router();
// Added the model
const Animal = require("../models/Animal");

/* GET users listing. */
router.get('/create', function(req, res, next) {
    console.log("holaaa")
  res.render('animal/createanimal');
});



module.exports = router;