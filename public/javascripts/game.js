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
