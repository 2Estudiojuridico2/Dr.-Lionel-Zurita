/**
 * Rotador de frases institucionales
 */
const frases = [
    "Compromiso ético y soluciones legales efectivas.",
    "Especialistas en Accidentología Vial y Daños.",
    "Defendiendo sus derechos con integridad y firmeza.",
    "Asesoramiento integral en Derecho de Familia y Laboral.",
    "Su tranquilidad jurídica es nuestra prioridad."
];

let indiceFrase = 0;
const elementoFrase = document.getElementById("frase-juridica");

function cambiarFrase() {
    if (!elementoFrase) return;

    // Efecto de salida (fade out)
    elementoFrase.style.opacity = 0;

    setTimeout(() => {
        // Cambiar el texto
        elementoFrase.textContent = frases[indiceFrase];
        // Efecto de entrada (fade in)
        elementoFrase.style.opacity = 1;
        
        // Avanzar al siguiente índice
        indiceFrase = (indiceFrase + 1) % frases.length;
    }, 1000); // Tiempo que tarda en desaparecer antes de cambiar
}

// Iniciar el ciclo de frases cada 4 segundos
if (elementoFrase) {
    elementoFrase.style.transition = "opacity 1s ease-in-out";
    cambiarFrase(); // Mostrar la primera de inmediato
    setInterval(cambiarFrase, 5000);
}
