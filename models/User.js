const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: {type:String, required:true},
  mail: {type:String, unique:true, required:true},
  password: {type:String, unique: true, required:true},
  animal: {type: Schema.Types.ObjectId, ref: 'Animal', default:null}
}, {
  timestamps: { createdAt: "createdAt", updatedAt: 
"updatedAt" }
});

const User = mongoose.model("User", userSchema);
module.exports = User;