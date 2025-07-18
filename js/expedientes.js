document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formExpediente");
  const tabla = document.querySelector("#tablaExpedientes tbody");

  function cargarExpedientes() {
    const lista = JSON.parse(localStorage.getItem("expedientes")) || [];
    tabla.innerHTML = "";
    lista.forEach((exp, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${exp.numero}</td>
        <td>${exp.caratula}</td>
        <td>${exp.juzgado}</td>
        <td>${exp.fecha}</td>
        <td>${exp.archivo ? `<a href="${exp.archivo}" target="_blank">Ver</a>` : "-"}</td>
        <td><button onclick="eliminar(${index})">Eliminar</button></td>
      `;
      tabla.appendChild(fila);
    });
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const expediente = {
      numero: document.getElementById("numero").value,
      caratula: document.getElementById("caratula").value,
      juzgado: document.getElementById("juzgado").value,
      fecha: document.getElementById("fecha").value,
      archivo: "" // El archivo no se puede guardar en localStorage
    };

    const file = document.getElementById("archivo").files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        expediente.archivo = e.target.result;
        guardar(expediente);
      };
      reader.readAsDataURL(file);
    } else {
      guardar(expediente);
    }
  });

  function guardar(exp) {
    const lista = JSON.parse(localStorage.getItem("expedientes")) || [];
    lista.push(exp);
    localStorage.setItem("expedientes", JSON.stringify(lista));
    form.reset();
    cargarExpedientes();
  }

  window.eliminar = function (i) {
    const lista = JSON.parse(localStorage.getItem("expedientes")) || [];
    lista.splice(i, 1);
    localStorage.setItem("expedientes", JSON.stringify(lista));
    cargarExpedientes();
  };

  cargarExpedientes();
});
