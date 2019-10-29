const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const animalSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  name: {type:String, required:true, unique:true},
  type: {type:String, default:"llama"},
  phrase: {type:String, required:true},
  attitude: {type:String, default:"agressive"},
  attack: {type: Number, default:100},
  life: {type: Number, default:100},
  image: { type:String, default: "/images/llama-profile.png"}

}, {
  timestamps: { createdAt: "createdAt", updatedAt: 
"updatedAt" }
});

const Animal = mongoose.model("Animal", animalSchema);
module.exports = Animal;