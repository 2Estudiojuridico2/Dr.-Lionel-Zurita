document.addEventListener("DOMContentLoaded", function() {
    const frases = [
        "El derecho protege lo justo.",
        "Justicia no es solo ley, es equidad.",
        "La ley es el arte de lo bueno y de lo justo.",
        "Donde hay derecho, hay esperanza.",
        "El respeto a los derechos ajenos es la paz."
    ];

    let index = 0;
    const fraseElement = document.getElementById("frase-juridica");

    function cambiarFrase() {
        fraseElement.textContent = frases[index];
        index = (index + 1) % frases.length;
    }

    cambiarFrase();
    setInterval(cambiarFrase, 5000);
});