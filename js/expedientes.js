
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("expForm");
  const tbody = document.querySelector("#tablaExp tbody");

  function render() {
    const datos = JSON.parse(localStorage.getItem("expedientes") || "[]");
    tbody.innerHTML = "";
    datos.forEach(e => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${e.cliente}</td>
        <td>${e.caratula}</td>
        <td>${e.fecha}</td>
        <td>${e.detalle}</td>
      `;
      tbody.appendChild(fila);
    });
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const nuevo = {
      cliente: document.getElementById("cliente").value,
      caratula: document.getElementById("caratula").value,
      fecha: document.getElementById("fecha").value,
      detalle: document.getElementById("detalle").value
    };
    const lista = JSON.parse(localStorage.getItem("expedientes") || "[]");
    lista.push(nuevo);
    localStorage.setItem("expedientes", JSON.stringify(lista));
    form.reset();
    render();
  });

  render();
});
