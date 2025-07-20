// js/auth.js

// Lógica de autenticación simple con localStorage
const USERNAME = 'admin';
const PASSWORD = 'password123'; // ¡Cambia esta contraseña por una más segura!

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    if (loginForm) {
        // Estamos en la página de login
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById('username').value;
            const passwordInput = document.getElementById('password').value;

            if (usernameInput === USERNAME && passwordInput === PASSWORD) {
                localStorage.setItem('isAuthenticated', 'true');
                window.location.href = 'panel.html'; // Redirigir al panel
            } else {
                errorMessage.textContent = 'Usuario o contraseña incorrectos.';
                errorMessage.style.display = 'block';
            }
        });
    } else {
        // Estamos en una página protegida (panel.html o agenda-admin.html)
        checkAuth();
    }
});

function checkAuth() {
    if (localStorage.getItem('isAuthenticated') !== 'true') {
        window.location.href = 'login.html'; // Si no está autenticado, redirigir al login
    }
}

function logout() {
    localStorage.removeItem('isAuthenticated');
    window.location.href = 'login.html'; // Redirigir al login al cerrar sesión
}
