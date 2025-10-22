/* =========================================================================
 * ARCHIVO: js/main.js
 * Funciones generales del sitio web
 * ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // SCROLL SUAVE
    // =========================================================================
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (const link of smoothLinks) {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // =========================================================================
    // NAVBAR ACTIVA AL HACER SCROLL
    // =========================================================================
    const navbar = document.querySelector('.custom-navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // =========================================================================
    // BOTÓN SCROLL TOP (opcional)
    // =========================================================================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.classList.add('scroll-top-btn');
    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        scrollTopBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
    });

});
