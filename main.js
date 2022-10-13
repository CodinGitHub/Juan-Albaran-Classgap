// Importando el archivo json
import data from './pokemons.json' assert {type: 'json'}

//Seleccionando el contenedor de las imagenes
const contenedorPokemon = document.querySelector('.contenedor-pokemon');

const arreglosNombres = data;

desordenarArreglo(data);

// Dibujando cada una de las imagenes
data.forEach( pokemon => {
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
        <p>${pokemon.name}</p>
    </div>`
});

// Variables para comparar
let primerClick;
let segundoClick;
let elementoImagenActual;
let elementoNombreActual


//Eschando un clic en las imagenes
let imgs = document.querySelectorAll('.img');
imgs.forEach( pokemonImg=>{
    
    pokemonImg.addEventListener('click', evento=>{
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
        elementoNombreActual = evento.target
        segundoClick = evento.target.innerText;
        let resultado = comprarNombres()
        if(resultado === true){
            elementoImagenActual.classList.add('parcorrecto')
            elementoNombreActual.classList.add('parcorrecto')
        }else{
            elementoImagenActual.classList.remove('parcorrecto')
            elementoNombreActual.classList.remove('parcorrecto')
        }
    });
} )

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