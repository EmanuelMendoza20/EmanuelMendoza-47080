//Creacion de clase astro
class Astro {
    constructor(nombre, gravedadRelativa) {
        this.nombre = nombre;
        this.gravedadRelativa = gravedadRelativa;
    }
}

//Instancias de Astro en un array
const astros = [
    new Astro("Luna", 1.622),
    new Astro("Marte", 3.711),
    new Astro("Sol", 274)
];

//Funcion para calcular el peso del usuario en el astro
function calcularPesoEnAstro(astro, kilosUsuario) {
    return ((kilosUsuario / 9.8) * astro.gravedadRelativa).toFixed(2);
}

//Funcion para buscar un astro por nombre
function buscarAstroPorNombre(nombre){
    return astros.find(astro => astro.nombre.toLowerCase() === nombre.toLowerCase())
}

alert("¡Bienvenido a PlanetGravity! 🚀\nSomos tu simulador de peso en otros mundos. ¿Preparado para saber cuanto pesarías en la Luna, Marte o en el Sol?")

while(true){

// Defino la variable que almacenará el peso de mi usuario
let pesoUsuario = 0;
let astroElegido;

do {
    pesoUsuario = Number(prompt("¡Genial! 🪐\nPrimero lo primero, ingresa tu peso en kg. Prometemos mantener tu información en secreto 🤫."));

    if (isNaN(pesoUsuario)) {
        alert("Ese no es un peso válido. Inténtalo de nuevo 😪.");
    }
    
} while (isNaN(pesoUsuario)); //Creo un bucle do...while para asegurarme de que mi usuario coloque un dato correcto.

let mensajeResultado;
let simulador;

do{

    simulador = prompt(`Bien, ya tenemos tu peso 📝.

Ahora vamos a elegir el mundo:
🔹Escribe Luna para calcular tu peso en la Luna
🔹Escribe Marte para calcular tu peso en Marte
🔹Escribe Sol para calcular tu peso en el Sol`);

let astroElegido = buscarAstroPorNombre(simulador.toLocaleLowerCase());

if(astroElegido){
    mensajeResultado = `Haciendo calculos 🧮
...
...
...

La gravedad en ${astroElegido.nombre} es aproximadamente el ${astroElegido.gravedadRelativa}% de la gravedad de la Tierra. 
Esto significa que si tu peso en la Tierra es de ${pesoUsuario} kg, tu peso en ${astroElegido.nombre} sería de aproximadamente ¡${calcularPesoEnAstro(astroElegido, pesoUsuario)} kg! Increíble, ¿verdad? 😮`;
    alert(mensajeResultado);
    break;
}else{
    alert("No encontramos un astro con ese nombre 🤔.\nIntenta de nuevo, por favor.");
}

} while(!astroElegido)

let volverACalcular = confirm("¿Quieres volver a calcular tu peso en otro mundo? 🚀")

if(!volverACalcular){
    alert(`Cerrando PlanetGravity 🚀
...
...             
...

See you later!`);
    break;
}
}


