const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const preguntaSchema = new Schema({
  question: {type:String},
  answer1: {type:String, value:true},
  answer2: {type:String, value:false},

}, {
  timestamps: { createdAt: "createdAt", updatedAt: 
"updatedAt" }
});

const Pregunta = mongoose.model("Pregunta", preguntaSchema);
module.exports = Pregunta;