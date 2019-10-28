

function pregunta (event){
   const respuestas =  document.querySelectorAll('.respuesta')
   console.log(respuestas)
    respuestas.forEach(respuesta => {
        respuesta.addEventListener('click', async (event) => {
            console.log('hola')
            //mirar las clases k tiene (classList)
            const elementClasses = respuesta.classList;
            console.log(elementClasses)
            if(elementClasses[0] === 'respuesta-correcta'){
                console.log("win")
                //await axios.post('/users/winner');
                window.location.href = '/users/winner';
            }else {
                console.log("loseeeer")
                //await axios.post('/users/loser');
                window.location.href = '/users/loser';
            }
        })

        
    });
}

window.addEventListener('load', pregunta)

//var elementClasses = elementNodeReference.classList;