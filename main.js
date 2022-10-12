// Importando el archivo json
import data from './pokemons.json' assert {type: 'json'}

//Seleccionando el contenedor de las imagenes
const contenedorPokemon = document.querySelector('.contenedor-pokemon');

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
data.forEach( pokemon => {
    contenedorNombresPokemon.innerHTML += `
    <div class="img-pokemon">
        <p>${pokemon.name}</p>
    </div>`
});

//Eschando un clic en las imagenes
let imgs = document.querySelectorAll('.img');
console.log(imgs)















function desordenarArreglo(array){
    const resultado = array.sort(()=>{
        return Math.random() - 0.5
    })
    return resultado
}