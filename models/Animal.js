const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const animalSchema = new Schema({
  user: [{type: Schema.Types.ObjectId, ref: 'User'}],
  name: {type:String, required:true},
  animal: {type:String, required:true, default:"llama"},
  phrase: {type:String, required:true},
  attitude: {type:String, required:true, default:"agressive"},
  attack: {type: Number, default:100},
  life: {type: Number, default:100}
}, {
  timestamps: { createdAt: "createdAt", updatedAt: 
"updatedAt" }
});

const Animal = mongoose.model("Animal", animalSchema);
module.exports = Animal;