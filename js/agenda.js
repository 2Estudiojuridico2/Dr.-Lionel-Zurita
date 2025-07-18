
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("agendaForm");
  const tableBody = document.querySelector("#agendaTable tbody");

  const cargarTurnos = () => {
    const turnos = JSON.parse(localStorage.getItem("turnos") || "[]");
    tableBody.innerHTML = "";
    const ahora = new Date();

    turnos.forEach((t, i) => {
      const fila = document.createElement("tr");
      const fechaTurno = new Date(t.fecha);
      const diffHoras = (fechaTurno - ahora) / 3600000;
      const alerta = diffHoras < 48 ? "🔔 " : "";

      fila.innerHTML = `
        <td>${t.nombre}</td>
        <td>${alerta}${new Date(t.fecha).toLocaleString()}</td>
        <td>${t.comentario}</td>
        <td><a href="${generarLinkGCal(t)}" target="_blank">📅 Agendar</a></td>
      `;
      tableBody.appendChild(fila);
    });
  };

  const generarLinkGCal = (turno) => {
    const inicio = new Date(turno.fecha).toISOString().replace(/-|:|\.\d\d\d/g,"");
    const fin = new Date(new Date(turno.fecha).getTime() + 30*60*1000).toISOString().replace(/-|:|\.\d\d\d/g,"");
    const texto = encodeURIComponent(`Consulta Jurídica - ${turno.nombre}`);
    const detalle = encodeURIComponent(turno.comentario);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${texto}&dates=${inicio}/${fin}&details=${detalle}`;
  };

  form.addEventListener("submit", e => {
    e.preventDefault();
    const nuevo = {
      nombre: document.getElementById("nombre").value,
      telefono: document.getElementById("telefono").value,
      fecha: document.getElementById("fecha").value,
      comentario: document.getElementById("comentario").value
    };
    const turnos = JSON.parse(localStorage.getItem("turnos") || "[]");
    turnos.push(nuevo);
    localStorage.setItem("turnos", JSON.stringify(turnos));
    form.reset();
    cargarTurnos();
  });

  cargarTurnos();
});
