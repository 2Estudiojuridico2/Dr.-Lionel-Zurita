// js/frases.js
document.addEventListener('DOMContentLoaded', () => {
    const frases = [
        "La justicia es la constante y perpetua voluntad de dar a cada uno lo suyo.",
        "Donde hay hombres, hay sociedad; donde hay sociedad, hay derecho.",
        "El derecho no se crea ni se destruye, solo se transforma.",
        "Sin derecho no hay orden, sin orden no hay justicia.",
        "La ley es la razón libre de pasión."
        "La justicia es la constante y perpetua voluntad de dar a cada uno lo suyo."
            autor: "Ulpiano"
    ];

    const fraseElement = document.getElementById('frase-juridica');
    if (fraseElement) { // Asegúrate de que el elemento exista
        const randomIndex = Math.floor(Math.random() * frases.length);
        fraseElement.textContent = `"${frases[randomIndex]}"`;
    }
});
