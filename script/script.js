// creación de la clase Astro
class Astro {
    constructor(nombre, gravedadRelativa) {
        this.nombre = nombre;
        this.gravedadRelativa = gravedadRelativa;
    }
}

// instancias de Astro en un array
const astros = [
    new Astro("Luna", 1.622),
    new Astro("Marte", 3.711),
    new Astro("Sol", 274)
];

// función para calcular el peso del usuario en el astro
function calcularPesoEnAstro(astro, kilosUsuario) {
    return ((kilosUsuario / 9.8) * astro.gravedadRelativa).toFixed(2);
}

// función para buscar un astro por nombre
function buscarAstroPorNombre(nombre) {
    return astros.find(astro => astro.nombre.toLowerCase() === nombre.toLowerCase());
}

// función para manejar el cálculo y mostrar resultados
function calcularYMostrarResultado() {
    const pesoUsuario = parseFloat(document.getElementById("pesoUsuario").value);
    const astroSeleccionado = document.querySelector('input[name="astro"]:checked');
    const resultadoSection = document.getElementById("resultado-section");

    if (isNaN(pesoUsuario)) {
        Toastify({

            text: "Selecciona un peso válido ⚖️",
            duration: 3000,
            style: {
                background: 'rgb(203, 67, 53)'
            }
            
            }).showToast();
            return;
    }

    if (!astroSeleccionado) {
        Toastify({

            text: "Selecciona un astro para continuar 🪐",
            duration: 1500,
            style: {
                background: 'rgb(203, 67, 53)',
            }
            
            }).showToast();
            return;
    }

    const astroElegido = buscarAstroPorNombre(astroSeleccionado.value);

    if (astroElegido) {
        // Almacenar el peso del usuario en el almacenamiento local
        localStorage.setItem("pesoUsuario", pesoUsuario);

        const resultado = calcularPesoEnAstro(astroElegido, pesoUsuario);

        resultadoSection.innerHTML = `<p id="parrafo-resultado">
        ¡Tu peso en este astro sería de ${resultado} kg!</p>
        <p>Esto es porque en ${astroElegido.nombre} la gravedad es ${astroElegido.gravedadRelativa}% de la gravedad de la Tierra. Increíble, ¿verdad? 😮</p>`;
    } else {
        resultadoSection.innerHTML = "No se encontró el astro seleccionado.";
    }
}

// Obtener el peso del usuario almacenado en el almacenamiento local
const pesoAlmacenado = localStorage.getItem("pesoUsuario");

if (pesoAlmacenado) {
    document.getElementById("pesoUsuario").value = pesoAlmacenado;
}

// Asignación de la función de cálculo al botón "Calcular"
const calcularButton = document.getElementById("calcular-button");
calcularButton.addEventListener("click", calcularYMostrarResultado);

// Stars anime
// Twinkling Night Sky by Sharna

// Función para generar un número aleatorio entre dos valores
function random(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  // Función para crear las estrellas fijas y agregarlas al elemento SVG
  function createStars(num) {
    // Obtener el elemento SVG con id="sky"
    var sky = document.getElementById("sky");
    // Obtener el ancho y el alto del elemento SVG
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    // Crear un bucle para generar las estrellas
    for (var i = 0; i < num; i++) {
      // Crear un elemento círculo
      var star = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      // Asignar un radio aleatorio entre 0.6 y 1.3
      star.setAttribute("r", random(0.6, 1.3));
      // Asignar una posición x aleatoria entre 0 y el ancho del elemento SVG
      star.setAttribute("cx", random(0, vw));
      // Asignar una posición y aleatoria entre 0 y el alto del elemento SVG
      star.setAttribute("cy", random(0, vh));
      // Asignar un color blanco al círculo
      star.setAttribute("fill", "white");
      // Asignar una clase "star" al círculo
      star.setAttribute("class", "star");
      // Agregar el círculo al elemento SVG
      sky.appendChild(star);
    }
  }
  
  // Función para animar las estrellas fijas con la biblioteca anime.js
  function animateStars() {
    // Obtener todos los elementos con clase "star"
    var stars = document.getElementsByClassName("star");
    // Crear una animación con la función anime()
    anime({
      // Asignar los elementos con clase "star" como objetivos de la animación
      targets: stars,
      // Asignar una propiedad de opacidad que cambie de 0 a 1 y viceversa
      opacity: [
        {
          duration: 700,
          value: "0"
        },
        {
          duration: 700,
          value: "1"
        }
      ],
      // Asignar un tipo de transición lineal
      easing: "linear",
      // Asignar un bucle infinito
      loop: true,
      // Asignar un retraso aleatorio para cada elemento
      delay: function (el, i) {
        return random(0, 50) * i;
      }
    });
  }
  
  // Función para ejecutar las funciones anteriores cuando se carga la página
  function init() {
    // Crear 60 estrellas fijas
    createStars(60);
    // Animar las estrellas fijas
    animateStars();
  }
  
  // Ejecutar la función init() cuando se carga la página
  window.onload = init;
  

// Twinkling Night Sky by Sharna

const numStars = 60;
const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

const starryNight = () => {
    anime({
        targets: ".star",
        opacity: [
            { duration: 700, value: "0" },
            { duration: 700, value: "1" }
        ],
        easing: "linear",
        loop: true,
        delay: (el, i) => 50 * i
    });
};

const shootingStars = () => {
    anime({
        targets: ".wish",
        easing: "linear",
        loop: true,
        delay: (el, i) => 1000 * i,
        opacity: [{ duration: 700, value: "1" }],
        width: [
            { value: "150px" },
            { value: "0px" }
        ],
        translateX: 350
    });
};

const randomRadius = () => Math.random() * 0.7 + 0.6;
const getRandomX = () => Math.floor(Math.random() * vw).toString();
const getRandomY = () => Math.floor(Math.random() * vh).toString();

document.addEventListener("DOMContentLoaded", function () {
    const sky = document.getElementById("App");
    const skyContent = [];

    for (let i = 0; i < numStars; i++) {
        skyContent.push(`<circle cx="${getRandomX()}" cy="${getRandomY()}" r="${randomRadius()}" stroke="none" strokeWidth="0" fill="#" class="star"></circle>`);
    }

    sky.innerHTML = `
        <svg id="sky" width="${vw}" height="${vh}" style="position: absolute; top: 0; left: 0;">
            ${skyContent.join('')}
        </svg>
        <div id="shootingstars" style="position: absolute; top: 0; left: 0;">
            ${[...Array(60)].map(() => `
                <div class="wish" style="left: ${getRandomY()}px; top: ${getRandomX()}px;"></div>
            `).join('')}
        </div>
    `;

    starryNight();
    shootingStars();
});
