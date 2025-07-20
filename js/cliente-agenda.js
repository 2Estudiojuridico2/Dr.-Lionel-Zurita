// js/cliente-agenda.js

document.addEventListener('DOMContentLoaded', () => {
    const agendaForm = document.getElementById('agendaForm');
    const mensajeFeedback = document.getElementById('mensajeFeedback');

    if (agendaForm) {
        agendaForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar el envío por defecto del formulario

            const nombre = document.getElementById('nombre').value;
            const telefono = document.getElementById('telefono').value;
            const fecha = document.getElementById('fecha').value;
            const comentario = document.getElementById('comentario').value;

            // Validar que los campos requeridos no estén vacíos
            if (!nombre || !telefono || !fecha) {
                mostrarMensaje("Por favor, completa todos los campos obligatorios (*).", "danger");
                return;
            }

            // Crear un objeto con los datos del turno
            const turno = {
                id: Date.now(), // ID único basado en la marca de tiempo
                nombre: nombre,
                telefono: telefono,
                fecha: fecha,
                comentario: comentario,
                estado: 'Pendiente' // Estado inicial del turno
            };

            // Obtener los turnos existentes del localStorage o inicializar un array vacío
            let turnos = JSON.parse(localStorage.getItem('turnos')) || [];

            // Añadir el nuevo turno
            turnos.push(turno);

            // Guardar los turnos actualizados en localStorage
            localStorage.setItem('turnos', JSON.stringify(turnos));

            // Mostrar mensaje de éxito
            mostrarMensaje("Tu solicitud de turno ha sido enviada. Nos pondremos en contacto pronto.", "success");

            // Limpiar el formulario
            agendaForm.reset();
        });
    }

    function mostrarMensaje(mensaje, tipo) {
        mensajeFeedback.textContent = mensaje;
        mensajeFeedback.className = `mt-3 alert alert-${tipo}`; // alert-success o alert-danger
        mensajeFeedback.style.display = 'block';

        // Ocultar el mensaje después de unos segundos
        setTimeout(() => {
            mensajeFeedback.style.display = 'none';
        }, 5000);
    }
});
