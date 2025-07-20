// js/agenda-admin.js

document.addEventListener('DOMContentLoaded', () => {
    const agendaTableBody = document.querySelector('#agendaTable tbody');
    const mensajeFeedback = document.getElementById('mensajeFeedback');

    const cargarTurnos = () => {
        const turnos = JSON.parse(localStorage.getItem('turnos')) || [];
        agendaTableBody.innerHTML = ''; // Limpiar tabla antes de cargar

        if (turnos.length === 0) {
            agendaTableBody.innerHTML = '<tr><td colspan="5" class="text-center">No hay turnos agendados.</td></tr>';
            return;
        }

        turnos.forEach(turno => {
            const row = agendaTableBody.insertRow();
            row.dataset.id = turno.id; // Guardar el ID en el dataset de la fila

            const fechaHora = new Date(turno.fecha).toLocaleString('es-AR', {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: '2-digit', minute: '2-digit', hour12: false
            });

            row.innerHTML = `
                <td>${turno.nombre}</td>
                <td>${turno.telefono}</td>
                <td>${fechaHora}</td>
                <td>${turno.comentario || 'N/A'}</td>
                <td>
                    <button class="btn btn-success btn-sm me-2 btn-confirmar" data-id="${turno.id}" ${turno.estado === 'Confirmado' ? 'disabled' : ''}>${turno.estado === 'Confirmado' ? 'Confirmado' : 'Confirmar'}</button>
                    <button class="btn btn-danger btn-sm btn-eliminar" data-id="${turno.id}">Eliminar</button>
                    <a href="${generarLinkGCal(turno)}" target="_blank" class="btn btn-info btn-sm ms-2">Add to GCal</a>
                </td>
            `;

            // Resaltar turnos confirmados
            if (turno.estado === 'Confirmado') {
                row.classList.add('table-success'); // Clase de Bootstrap para fila verde
            }
        });

        // Añadir event listeners después de cargar los turnos
        addEventListenersToButtons();
    };

    const mostrarMensaje = (mensaje, tipo) => {
        mensajeFeedback.textContent = mensaje;
        mensajeFeedback.className = `mt-3 alert alert-${tipo}`;
        mensajeFeedback.style.display = 'block';
        setTimeout(() => {
            mensajeFeedback.style.display = 'none';
        }, 3000);
    };

    const addEventListenersToButtons = () => {
        // Event listener para confirmar turnos
        document.querySelectorAll('.btn-confirmar').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                let turnos = JSON.parse(localStorage.getItem('turnos')) || [];
                const turnoIndex = turnos.findIndex(t => t.id === id);

                if (turnoIndex > -1) {
                    turnos[turnoIndex].estado = 'Confirmado';
                    localStorage.setItem('turnos', JSON.stringify(turnos));
                    mostrarMensaje("Turno confirmado correctamente.", "success");
                    cargarTurnos(); // Recargar la tabla para actualizar el estado
                } else {
                    mostrarMensaje("Error: Turno no encontrado.", "danger");
                }
            });
        });

        // Event listener para eliminar turnos
        document.querySelectorAll('.btn-eliminar').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                if (confirm('¿Estás seguro de que quieres eliminar este turno?')) {
                    let turnos = JSON.parse(localStorage.getItem('turnos')) || [];
                    const turnoOriginalIndex = turnos.findIndex(t => t.id === id); // Busca por el ID original

                    if (turnoOriginalIndex > -1) {
                        turnos.splice(turnoOriginalIndex, 1); // Elimina el turno
                        localStorage.setItem('turnos', JSON.stringify(turnos));
                        mostrarMensaje("Turno eliminado correctamente.", "success");
                        cargarTurnos(); // Recarga la tabla
                    } else {
                        mostrarMensaje("Error: No se pudo encontrar el turno para eliminar.", "danger");
                        console.error("Turno no encontrado para eliminar con ID:", id);
                    }
                }
            });
        });
    };

    // Función para generar el link de Google Calendar
    const generarLinkGCal = (turno) => {
        const inicio = new Date(turno.fecha).toISOString().replace(/-|:|\\.\\d\\d\\d/g, "");
        const fin = new Date(new Date(turno.fecha).getTime() + 30 * 60 * 1000).toISOString().replace(/-|:|\\.\\d\\d\\d/g, ""); // Asume 30 min de duración
        const texto = encodeURIComponent(`Consulta Jurídica - ${turno.nombre}`);
        const detalle = encodeURIComponent(turno.comentario || 'Sin comentarios adicionales');
        const location = encodeURIComponent('Estudio Jurídico Dr. Lionel Zurita, [Tu Dirección Aquí]'); // Reemplaza con tu dirección real

        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${texto}&dates=${inicio}/${fin}&details=${detalle}&location=${location}`;
    };

    // Cargar turnos al iniciar la página
    cargarTurnos();
});
