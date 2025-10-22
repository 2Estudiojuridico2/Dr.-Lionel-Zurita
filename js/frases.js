/* =========================================================================
 * ARCHIVO: js/frases.js
 * Frases inspiradoras o legales para mostrar dinámicamente
 * ========================================================================= */

const FRASES = [
    "La justicia no consiste en ser neutral entre el bien y el mal, sino en descubrir dónde está el mal y oponerse a él. — Martin Luther King Jr.",
    "El derecho se aprende estudiando, pero se ejerce pensando. — Eduardo J. Couture",
    "Donde hay justicia no hay pobreza. — Sócrates",
    "El abogado es la voz de quien no la tiene. — Lionel Zurita"
];

function mostrarFraseAleatoria() {
    const fraseElemento = document.getElementById('frase-dinamica');
    if (fraseElemento) {
        const frase = FRASES[Math.floor(Math.random() * FRASES.length)];
        fraseElemento.textContent = frase;
    }
}

document.addEventListener('DOMContentLoaded', mostrarFraseAleatoria);
