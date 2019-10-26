var express = require('express');
var router = express.Router();

const User = require("../models/User");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* router.get('/edit', (req,res,next)=>{
  const userId =req.session.currentUser._id;
   User.findById(userId)
  .then((user)=>{
    res.render('/edituser',{user}) 
  })
})

router.post('/edit', async(req,res,next)=>{
  console.log('holaaaa')
  const userId=req.session.currentUser._id;
  const {name,mail} = req.body;
  const userUpdated = await User.findOneAndUpdate({_id:userId}, {$set:{name,mail}}, {new:true})
  console.log(userUpdated)
  res.redirect("/profile");
 
}) 
 */

module.exports = router;
