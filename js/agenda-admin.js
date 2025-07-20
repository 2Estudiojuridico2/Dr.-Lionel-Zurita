// js/agenda-admin.js
document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#agendaTable tbody");
    const mensajeFeedback = document.getElementById("mensajeFeedback"); // Para mensajes en el admin

    // Función para mostrar mensajes al usuario (admin)
    const mostrarMensaje = (mensaje, tipo = "success") => {
        if (mensajeFeedback) {
            mensajeFeedback.textContent = mensaje;
            mensajeFeedback.className = `alert alert-${tipo} mt-3`;
            mensajeFeedback.style.display = "block";
            setTimeout(() => {
                mensajeFeedback.style.display = "none";
            }, 5000);
        }
    };

    const cargarTurnos = () => {
        let turnos = JSON.parse(localStorage.getItem("turnos") || "[]");
        const ahora = new Date();

        // Filtrar turnos pasados (opcional, pero útil para mantener la agenda limpia)
        // Puedes comentar esta línea si quieres ver turnos pasados también.
        // turnos = turnos.filter(t => new Date(t.fecha) >= ahora);

        // Ordenar por fecha (los próximos primero)
        turnos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

        tableBody.innerHTML = ""; // Limpiar tabla antes de recargar

        if (turnos.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center py-3">No hay turnos agendados.</td></tr>';
        } else {
            turnos.forEach((t, i) => {
                const fila = document.createElement("tr");
                const fechaTurno = new Date(t.fecha);
                const diffHoras = (fechaTurno - ahora) / 3600000;
                const alerta = diffHoras < 48 && diffHoras > 0 ? "🔔 " : ""; // Alerta para turnos futuros cercanos

                fila.innerHTML = `
                    <td>${t.nombre}</td>
                    <td>${t.telefono}</td>
                    <td>${alerta}${fechaTurno.toLocaleString()}</td>
                    <td>${t.comentario}</td>
                    <td>
                        <a href="${generarLinkGCal(t)}" target="_blank" class="btn btn-sm btn-info me-1">📅 GCal</a>
                        <button class="btn btn-sm btn-danger eliminar-turno" data-index="${i}" aria-label="Eliminar turno de ${t.nombre}">X</button>
                    </td>
                `;
                tableBody.appendChild(fila);
            });

            // Añadir Event Listeners para los botones de eliminar después de crear las filas
            tableBody.querySelectorAll('.eliminar-turno').forEach(button => {
                button.addEventListener('click', (e) => {
                    if (confirm('¿Estás seguro de que quieres eliminar este turno?')) {
                        const indexAEliminar = parseInt(e.target.dataset.index); // Obtener el índice del turno en la lista actual

                        // Recuperar la lista original del localStorage (sin filtrar/ordenar aún)
                        let todosLosTurnos = JSON.parse(localStorage.getItem("turnos") || "[]");
                        
                        // Para eliminar correctamente, necesitamos identificar el turno en la lista original antes de cualquier ordenamiento o filtrado.
                        // La forma más segura si no tienes un ID único es volver a aplicar el ordenamiento/filtrado temporalmente
                        // para obtener el objeto exacto, y luego buscarlo en la lista no ordenada.
                        
                        // Alternativa más simple para tu caso (asumiendo que los turnos son únicos por fecha/nombre):
                        // Encuentra el turno en la lista original por sus valores, no por su índice de la tabla mostrada.
                        
                        // Obtener el turno que se va a eliminar de la lista *actualmente mostrada*
                        const turnoEnTabla = turnos[indexAEliminar]; 

                        // Encontrar el índice de este turno en la lista COMPLETA de localStorage
                        const indiceRealEnLocalStorage = todosLosTurnos.findIndex(t => 
                            t.nombre === turnoEnTabla.nombre && 
                            t.telefono === turnoEnTabla.telefono && // Usar más campos para una mejor coincidencia
                            t.fecha === turnoEnTabla.fecha
                        );

                        if (indiceRealEnLocalStorage > -1) {
                            todosLosTurnos.splice(indiceRealEnLocalStorage, 1); // Elimina el turno
                            localStorage.setItem("turnos", JSON.stringify(todosLosTurnos));
                            mostrarMensaje("Turno eliminado correctamente.", "success");
                            cargarTurnos(); // Recarga la tabla
                        } else {
                            mostrarMensaje("Error: No se pudo encontrar el turno para eliminar.", "danger");
                            console.error("Turno no encontrado para eliminar:", turnoEnTabla);
                        }
                    }
                });
            });
        }
    };

    const generarLinkGCal = (turno) => {
        const inicio = new Date(turno.fecha).toISOString().replace(/-|:|\.\d\d\d/g, "");
        const fin = new Date(new Date(turno.fecha).getTime() + 30 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, "");
        const texto = encodeURIComponent(`Consulta Jurídica - ${turno.nombre}`);
        const detalle = encodeURIComponent(turno.comentario || 'Sin comentarios adicionales');
        const location = encodeURIComponent('Estudio Jurídico Dr. Lionel Zurita, [Tu Dirección Aquí]');
        
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${texto}&dates=${inicio}/${fin}&details=${detalle}&location=${location}`;
    };

    // Cargar turnos al iniciar la página
    cargarTurnos();
});
