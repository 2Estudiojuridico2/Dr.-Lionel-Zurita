// js/auth.js
document.addEventListener('DOMContentLoaded', () => {
    const protectedPages = ['panel.html', 'agenda-admin.html', /* agrega otras páginas privadas aquí */];
    const currentPage = window.location.pathname.split('/').pop();

    // Redirigir a login si no hay token y la página es protegida
    if (protectedPages.includes(currentPage) && !localStorage.getItem('auth')) {
        window.location.href = 'login.html';
    }

    // Lógica para la página de login
    if (currentPage === 'login.html') {
        const loginForm = document.getElementById('loginForm');
        const errorMessage = document.getElementById('errorMessage');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const username = loginForm.username.value;
                const password = loginForm.password.value;

                // **IMPORTANTE: En un entorno real, las credenciales no deben estar en el frontend.**
                // Esto es solo para un prototipo simple.
                // Para producción, se usaría un backend para validar.
                if (username === '2leoneo2' && password === 'speeD@34') { // ¡Cambia esto por credenciales seguras!
                    localStorage.setItem('auth', 'loggedIn'); // Guarda un token simple
                    window.location.href = 'panel.html'; // Redirige al panel privado
                } else {
                    errorMessage.textContent = 'Usuario o contraseña incorrectos.';
                }
            });
        }
    }
});

// Función para cerrar sesión (la tienes en panel.html, pero puede estar aquí si quieres)
function logout() {
    localStorage.removeItem("auth");
    window.location.href = "login.html";
}
