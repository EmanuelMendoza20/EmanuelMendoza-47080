// Creación de la clase Astro
class Astro {
    constructor(nombre, gravedadRelativa) {
        this.nombre = nombre;
        this.gravedadRelativa = gravedadRelativa;
    }
}

// Instancias de Astro en un array
const astros = [
    new Astro("Luna", 1.622),
    new Astro("Marte", 3.711),
    new Astro("Sol", 274)
];

// Declaración variable resultado-section
const resultadoSection = document.getElementById("resultado-section");

// Función para calcular el peso del usuario en el astro
function calcularPesoEnAstro(astro, kilosUsuario) {
    return ((kilosUsuario / 9.8) * astro.gravedadRelativa).toFixed(2);
}

// Función para buscar un astro por nombre
function buscarAstroPorNombre(nombre) {
    return astros.find(astro => astro.nombre.toLowerCase() === nombre.toLowerCase());
}

// Función para manejar el cálculo y mostrar resultados
function calcularYMostrarResultado() {
    const pesoUsuario = parseFloat(document.getElementById("pesoUsuario").value);
    const astroSeleccionado = document.querySelector('input[name="astro"]:checked');

    if (isNaN(pesoUsuario)) {
        mostrarError("Ingresa un peso válido.");
        return;
    }

    if (!astroSeleccionado) {
        mostrarError("Selecciona un astro.");
        return;
    }

    const astroElegido = buscarAstroPorNombre(astroSeleccionado.value);

    if (astroElegido) {
        // Almacenar el peso del usuario en el almacenamiento local
        localStorage.setItem("pesoUsuario", pesoUsuario);

        const resultado = calcularPesoEnAstro(astroElegido, pesoUsuario);

        mostrarResultado(
            `¡Tu peso en ${astroElegido.nombre} sería de ${resultado} kg!`,
            `Esto es porque en ${astroElegido.nombre} la gravedad es ${astroElegido.gravedadRelativa}% de la gravedad de la Tierra. ¡Increíble, verdad? 😮`
        );

        // Agregar la información también al historial
        agregarAlHistorial(astroElegido.nombre, pesoUsuario, resultado);
    } else {
        mostrarError("No se encontró el astro seleccionado.");
    }
}

// Función para mostrar un mensaje de error
function mostrarError(mensaje) {
    Toastify({
        text: mensaje,
        duration: 3000,
        style: {
            background: '#AC2828'
        },
        gravity: "bottom",
        position: "center"
    }).showToast();
}

// Función para mostrar resultados
function mostrarResultado(parrafo1, parrafo2) {
    resultadoSection.innerHTML = `<p id="parrafo-resultado">${parrafo1}</p><p>${parrafo2}</p>`;
}

// Obtener el peso del usuario almacenado en el almacenamiento local
const pesoAlmacenado = localStorage.getItem("pesoUsuario");

if (pesoAlmacenado) {
    document.getElementById("pesoUsuario").value = pesoAlmacenado;
}

// Asignación de la función de cálculo al botón "Calcular"
const calcularButton = document.getElementById("calcular-button");
calcularButton.addEventListener("click", calcularYMostrarResultado);

// Posibilidad de iniciar cálculo al presionar "Enter"
const pesoUsuarioInputEnter = document.getElementById("pesoUsuario");

// Función para manejar el evento de tecla
function handleKeyPress(event) {
    // Verificamos si la tecla presionada es enter
    if (event.key === "Enter") {
        // Llamamos a la función para calcular y mostrar el resultado
        calcularYMostrarResultado();
    }
}

// Agregamos un evento de tecla al campo de entrada
pesoUsuarioInputEnter.addEventListener("keypress", handleKeyPress);

// Historial
// Obtención de historial al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    const historialGuardado = localStorage.getItem("historial");
    if (historialGuardado) {
        // Se parsea el historial guardado en formato JSON
        const historialParseado = JSON.parse(historialGuardado);

        // Iteramos sobre el historial y agregamos cada elemento
        historialParseado.forEach(item => {
            agregarAlHistorial(item.astroNombre, item.pesoUsuario, item.resultado);
        });
    }
});

// Agregar historial
const historialGrupo = document.getElementById("historial-grupo");

function agregarAlHistorial(astroNombre, pesoUsuario, resultado) {
    // Obtenemos el contenedor del historial
    const contenedorHistorial = document.getElementById("historial-grupo");

    // Crea un nuevo párrafo para el historial
    const nuevoParrafoHistorial = document.createElement("p");

    // Asignamos una clase al nuevo párrafo
    nuevoParrafoHistorial.classList.add("historial");

    // Configuramos el contenido del nuevo párrafo
    nuevoParrafoHistorial.innerHTML = `En <span class="resaltado-historial">${astroNombre}</span>, pesando <span class="resaltado-historial">${pesoUsuario} kg</span>, tu peso sería de <span class="resaltado-historial">${resultado} kg</span>`;

    // Agregar el nuevo párrafo al contenedor
    contenedorHistorial.appendChild(nuevoParrafoHistorial);

    // Agrega el nuevo párrafo al contenedor
    historialGrupo.appendChild(nuevoParrafoHistorial);

    // Guardar historial en localStorage
    actualizarLocalStorage();
}

// Función para limpiar el historial y el localStorage
function limpiarHistorial() {
    while (historialGrupo.firstChild) {
        historialGrupo.removeChild(historialGrupo.firstChild);
    }
    localStorage.removeItem("historial"); // Eliminamos el historial del localStorage

    // Volver a cargar el historial después de limpiarlo
    const historialGuardado = localStorage.getItem("historial");
    if (historialGuardado) {
        // Se parsea el historial guardado en formato JSON
        const historialParseado = JSON.parse(historialGuardado);

        // Iteramos sobre el historial y agregamos cada elemento
        historialParseado.forEach(item => {
            agregarAlHistorial(item.astroNombre, item.pesoUsuario, item.resultado);
        });
    }
    Toastify({
        text: 'Historial borrado.',
        duration: 3000,
        style: {
            background: '#114851'
        },
        gravity: "bottom",
        position: "center"
    }).showToast();
}

// Peso y selección de astros
const pesoUsuarioInput = document.getElementById("pesoUsuario");
const astroOptions = document.querySelectorAll('input[name="astro"]');

// Función para reiniciar valores
function reiniciarValores() {
    // Vaciar el campo de peso
    pesoUsuarioInput.value = "";

    // Desmarcar la selección de astros
    astroOptions.forEach(option => {
        option.checked = false;
    });

    // Borrar el texto de los resultados
    resultadoSection.innerHTML = `<p class="parrafo-resultado">Ingresa tu peso y selecciona un astro...</p>`;
    Toastify({
        text: "Reiniciaste los valores.",
        duration: 3000,
        style: {
            background: '#114851'
        },
        gravity: "bottom",
        position: "center",
    }).showToast();
}

// Asigna la función al evento de click del botón reiniciar
const reiniciarButton = document.getElementById("reiniciar-button");
reiniciarButton.addEventListener("click", reiniciarValores);

// Creación botón borrar historial
// Obtenemos una referencia al botón de limpiar
const botonBorrarHistorial = document.getElementById("boton-borrar-historial");

// Agrega un evento de click al botón
botonBorrarHistorial.addEventListener("click", limpiarHistorial);

// Función para actualizar el localStorage
function actualizarLocalStorage() {
    // Obtener todos los párrafos actuales en el historial
    const parrafosHistorial = Array.from(historialGrupo.children);

    // Crear un array para almacenar los datos del historial
    const historialDatos = parrafosHistorial.map(parrafo => {
        // Obtener los elementos resaltados dentro del párrafo
        const elementosResaltados = Array.from(parrafo.querySelectorAll('.resaltado-historial'));

        if (elementosResaltados.length === 3) {
            return {
                astroNombre: elementosResaltados[0].textContent.trim(),
                pesoUsuario: elementosResaltados[1].textContent.trim().replace(' kg', ''),
                resultado: elementosResaltados[2].textContent.trim().replace(' kg', '')
            };
        }

        return null; // Manejar casos donde el formato no coincide
    }).filter(Boolean); // Filtrar elementos nulos

    // Convertir el array de datos a JSON y guardarlo en localStorage
    localStorage.setItem("historial", JSON.stringify(historialDatos));
}

// STARS ANIME
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


//FIN DE STARS ANIME