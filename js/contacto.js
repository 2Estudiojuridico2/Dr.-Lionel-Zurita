// js/contacto.js
import { db } from "./firebase.js"; // Importa la instancia de Firestore
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm'); // Asegúrate de que tu formulario de contacto en index.html tenga id="contactForm"
    const contactMessage = document.getElementById('contactMessage'); // Añade un div con id="contactMessage" para feedback

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita el envío por defecto del formulario

            const nombre = document.getElementById('contactName').value; // Asegúrate de que el input de nombre tenga id="contactName"
            const email = document.getElementById('contactEmail').value; // Asegúrate de que el input de email tenga id="contactEmail"
            const asunto = document.getElementById('contactSubject').value; // Asegúrate de que el input de asunto tenga id="contactSubject"
            const mensaje = document.getElementById('contactMessageText').value; // Asegúrate de que el textarea de mensaje tenga id="contactMessageText"

            if (!nombre || !email || !asunto || !mensaje) {
                mostrarContactoMensaje("Por favor, completa todos los campos del formulario.", "danger");
                return;
            }

            try {
                // Guarda los datos en una colección llamada "mensajesContacto" en Firestore
                await addDoc(collection(db, "mensajesContacto"), {
                    nombre: nombre,
                    email: email,
                    asunto: asunto,
                    mensaje: mensaje,
                    fecha: new Date() // Guarda la fecha y hora del envío
                });

                mostrarContactoMensaje("¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.", "success");
                contactForm.reset(); // Limpia el formulario
            } catch (e) {
                console.error("Error al enviar el mensaje: ", e);
                mostrarContactoMensaje("Hubo un error al enviar tu mensaje. Inténtalo de nuevo.", "danger");
            }
        });
    }

    function mostrarContactoMensaje(mensaje, tipo) {
        contactMessage.textContent = mensaje;
        contactMessage.className = `alert mt-3 alert-${tipo}`; // Clases de Bootstrap
        contactMessage.style.display = 'block';
        setTimeout(() => {
            contactMessage.style.display = 'none';
        }, 5000);
    }
});
