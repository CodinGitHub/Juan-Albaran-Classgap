// Importando el archivo json
import data from './pokemons.json' assert {type: 'json'}
desordenarArreglo(data);

// Configuracion inicial
let pokemonesAMostrar = 3;
let tiempoRestante = 10; // segundos
let pokemonesEncontrados = 0
let tiempoRegresivoModal = 3; //segundos

//Cargado de sonidos
let perderSonido = new Audio('./sonidos/perder.wav');
let seleccionarSonido = new Audio('./sonidos/seleccionar.wav');

//Seleccionando el contenedor de las imagenes
const contenedorPokemon = document.querySelector('.contenedor-pokemon');

//Seleccionar solamente un numero determinado de pokemones

let dataRecortada = data.slice(0,pokemonesAMostrar)

const arreglosNombres = [...dataRecortada];

desordenarArreglo(arreglosNombres);

// Dibujando cada una de las imagenes
dataRecortada.forEach( pokemon => {
    contenedorPokemon.innerHTML += `
    <div class="img-pokemon">
        <img class="img" src="${pokemon.url}" alt="${pokemon.name}">
    </div>`
});

//Seleccionando el contenedor de los nombres
const contenedorNombresPokemon = document.querySelector('.contenedor-nombres-pokemon');

//Dibujando el nombre de los pokemones
arreglosNombres.forEach( pokemon => {
    contenedorNombresPokemon.innerHTML += `
    <div class="nombre-pokemon">
        <p class="recuadro-nombre">${pokemon.name}</p>
    </div>`
});

// Variables para comparar
let primerClick;
let segundoClick;
let elementoImagenActual;
let elementoNombreActual


//Escuchando un clic en las imagenes
let imgs = document.querySelectorAll('.img');
imgs.forEach( pokemonImg=>{
    
    pokemonImg.addEventListener('click', evento=>{
        seleccionarSonido.play()
        //Borrar selecciones
        let elementosSeleccionados = document.querySelectorAll('.seleccionado');
        console.log(elementosSeleccionados)
        elementosSeleccionados.forEach(elementoSeleccionado => {
            elementoSeleccionado.classList.remove('seleccionado')
        })

        elementoImagenActual = evento.target;
        primerClick = evento.target.alt;
        elementoImagenActual.classList.toggle('seleccionado');
    })
} )

//Eschando un clic en el nombre
let nombres = document.querySelectorAll('.nombre-pokemon');
nombres.forEach( nombre=>{
    nombre.addEventListener('click', evento=>{
        seleccionarSonido.play()
        elementoNombreActual = evento.target
        segundoClick = evento.target.innerText;
        let resultado = comprarNombres()
        if(resultado === true){
            elementoImagenActual.classList.add('parcorrecto')
            elementoNombreActual.classList.add('parcorrecto')
            pokemonesEncontrados++;

            //Cuando he completado todos los pokemones
            if(pokemonesEncontrados === pokemonesAMostrar){
                mostrarResultado('Felicidades!', true)
                elementoTiempoRestante.style.display = 'none'
                clearInterval(contadorRegresivoJuego);
            }
        }
    });
} )

// Mostrando el modal
let modal = document.querySelector('.modal');
let modalSegundos = document.querySelector('.modal-segundos')
let backgroundModal = document.querySelector('.background-modal')

let contadorRegresivoModal = setInterval(()=>{
    modalSegundos.innerText = `${tiempoRegresivoModal} segundos`
    tiempoRegresivoModal--;
    if(tiempoRegresivoModal < 0){
      clearInterval(contadorRegresivoModal)  
    }
}, 1000)

setTimeout(()=>{
    modal.style.display = 'none';
    backgroundModal.style.display = 'none';
    inciarConteoRegresivo()
}, 4000);

// Tiempo Regresivo del juego
let elementoTiempoRestante = document.querySelector('.tiempo-restante')
let contadorRegresivoJuego

function inciarConteoRegresivo(){
    contadorRegresivoJuego = setInterval(()=>{
        elementoTiempoRestante.innerText = `Tiempo restante ${tiempoRestante} segundos`
        tiempoRestante--
        if(tiempoRestante <0){
            clearInterval(contadorRegresivoJuego);
            mostrarResultado('Se acabó el tiempo', false);
            perderSonido.play();
        }
    }, 1000)
}

// Mostrando resultados al final
let mainContainer = document.querySelector('.main-container')


//FUNCIONES
function desordenarArreglo(array){
    array.sort(()=>Math.random() - 0.5)
} 

function desordenarArreglo2(array){
    array.sort(()=>Math.random() - 0.1)
}

function comprarNombres(){
    if(primerClick == segundoClick){
        console.log('Si son iguales, felicidades')
        return true
    }else{
        console.log('intenta de nuevo')
        return false
    }
}

function mostrarResultado(mensaje, gano){

    if(gano === true){
        mainContainer.innerHTML = `
        <div class="resultado">
            <h2>${mensaje}</h2>
            <img src="./img/trofeo.png" alt="">
            <p>Has completado ${pokemonesEncontrados} de ${pokemonesAMostrar} pokemones</p>
        </div>`
    }else{
        mainContainer.innerHTML = `
        <div class="resultado">
            <h2>${mensaje}</h2>
            <img src="./img/triste.png" alt="">
            <p>Has completado ${pokemonesEncontrados} de ${pokemonesAMostrar} pokemones</p>
        </div>`
    }

   
}