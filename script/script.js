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
        resultadoSection.innerHTML = "Ingresa un peso válido en kg.";
        return;
    }

    if (!astroSeleccionado) {
        resultadoSection.innerHTML = "Selecciona un astro.";
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

const degradado = document.getElementById("degradado");

// Degradado radial de fondo
const radio = 120; // Tamaño del degradado

// Escuchar el evento "mousemove" en el documento
document.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Actualizar el fondo de degradado
    degradado.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, #21282e, #13161C ${radio}%)`;
});
