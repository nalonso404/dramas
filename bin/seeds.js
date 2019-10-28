const mongoose = require("mongoose");
const Pregunta = require("../models/Pregunta");


const dbtitle = "dramas-project";
mongoose.connect(`mongodb://localhost/${dbtitle}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

Pregunta.collection.drop()

const preguntas =[
    { question: 'Como nos llamamos?',
      answer1: 'A Gerard y Noemi',
      answer2: 'Cacatua y llama'
},
]


const createPreguntas = (arrayOfPreguntas) => {
    arrayOfPreguntas.map(pregunta => {
      const newPregunta = new Pregunta(pregunta)
      return newPregunta.save()
        .then(pregunta => {
          console.log('preguntas created correctly: ', pregunta);
          mongoose.connection.close();
        })
        .catch(error => {
          throw new Error(`Impossible to add the pregunta. ${error}`);
        })
    })
  };

  createPreguntas(preguntas)