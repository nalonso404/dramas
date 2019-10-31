/* function pregunta (event){
   const respuestas =  document.querySelectorAll('.respuesta')
   console.log(respuestas)
    respuestas.forEach(respuesta => {
        respuesta.addEventListener('click', async (event) => {
            console.log('hola')
            //mirar las clases k tiene (classList)
            const elementClasses = respuesta.classList;
            console.log(elementClasses)
            setTimeout(async function(){
                if(elementClasses[0] === 'respuesta-correcta'){
                    console.log("win")
                    await axios.post('/users/winner');
                    window.location.href = '/users/winner';
                }else {
                    console.log("loseeeer")
                    await axios.post('/users/loser');
                    window.location.href = '/users/loser';
                }
              }, 10000);
            
        })
    });
} */


function game() {
    const respuestaCorrecta = document.querySelector('.respuesta-correcta')
    console.log(respuestaCorrecta);
    respuestaCorrecta.addEventListener('click', async function () {
        await axios.post('/users/winner');
        setTimeout(function () {
            window.location.href = '/users/winner'
        }, 2000);

    })

    const respuestaIncorrecta = document.querySelector('.respuesta-incorrecta')
    console.log(respuestaIncorrecta);
    respuestaIncorrecta.addEventListener('click', async function () {
        await axios.post('/users/loser');
        setTimeout(function () {
            window.location.href = '/users/loser'
        }, 2000);

    })

}

game();


//var elementClasses = elementNodeReference.classList;