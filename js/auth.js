// js/auth.js

// Lógica de autenticación simple con localStorage
const USERNAME = 'admin';
const PASSWORD = 'password123'; // ¡Cambia esta contraseña por una más segura!

document.addEventListener('DOMContentLoaded', () => {
    console.log("auth.js cargado."); // Debugging
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    if (loginForm) {
        // Estamos en la página de login
        console.log("Estamos en la página de login."); // Debugging
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("Intento de login detectado."); // Debugging
            const usernameInput = document.getElementById('username').value;
            const passwordInput = document.getElementById('password').value;

            if (usernameInput === USERNAME && passwordInput === PASSWORD) {
                localStorage.setItem('isAuthenticated', 'true');
                console.log("Login exitoso. isAuthenticated en localStorage: ", localStorage.getItem('isAuthenticated')); // Debugging
                window.location.href = 'panel.html'; // Redirigir al panel
            } else {
                errorMessage.textContent = 'Usuario o contraseña incorrectos.';
                errorMessage.style.display = 'block';
                console.log("Login fallido. Usuario o contraseña incorrectos."); // Debugging
            }
        });
    } else {
        // Estamos en una página protegida (panel.html o agenda-admin.html)
        console.log("Página protegida cargada. Comprobando autenticación..."); // Debugging
        checkAuth();
    }
});

function checkAuth() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    console.log("Valor de isAuthenticated en checkAuth:", isAuthenticated); // Debugging
    if (isAuthenticated !== 'true') {
        console.log("No autenticado. Redirigiendo a login.html"); // Debugging
        window.location.href = 'login.html'; // Si no está autenticado, redirigir al login
    } else {
        console.log("Autenticado. Acceso permitido."); // Debugging
    }
}

function logout() {
    console.log("Cerrando sesión..."); // Debugging
    localStorage.removeItem('isAuthenticated');
    console.log("isAuthenticated eliminado de localStorage."); // Debugging
    window.location.href = 'login.html'; // Redirigir al login al cerrar sesión
}
