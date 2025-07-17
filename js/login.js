document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const error = document.getElementById("error");
  const usuarioValido = "admin";
  const claveValida = "abogado2025";
  if (user === usuarioValido && pass === claveValida) {
    localStorage.setItem("auth", "true");
    window.location.href = "dashboard.html";
  } else {
    error.textContent = "Usuario o contraseña incorrectos.";
  }
});