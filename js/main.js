/**
 * ESTUDIO JURÍDICO DR. LIONEL ZURITA
 * Main Interactive Logic - Professional Version
 */

document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    // --- 1. CONTROL DE NAVBAR AL HACER SCROLL ---
    const navbar = document.querySelector('.custom-navbar');
    const scrollBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled', 'shadow');
        } else {
            navbar.classList.remove('navbar-scrolled', 'shadow');
        }

        // Mostrar/Ocultar botón "Ir arriba"
        if (window.scrollY > 500) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    });

    // --- 2. FIX CRÍTICO: CIERRE DE MENÚ MÓVIL ---
    // Este código soluciona el error de que el menú se cierra y no te deja navegar.
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const menuToggle = document.getElementById('navbarNav');
    const bsCollapse = menuToggle ? new bootstrap.Collapse(menuToggle, { toggle: false }) : null;

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const isDropdown = link.classList.contains('dropdown-toggle');

            // Si es un link interno (empieza con #) y NO es un desplegable
            if (href.startsWith('#') && !isDropdown) {
                if (window.innerWidth < 992 && menuToggle.classList.contains('show')) {
                    bsCollapse.hide();
                }
            }
            // Si es un link a otra página (como areas/familia.html), permitimos que el navegador navegue
        });
    });

    // --- 3. SCROLL SUAVE (SMOOTH SCROLL) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 80; // Espacio para que el navbar no tape el título
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = targetElement.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 4. BOTÓN "IR ARRIBA" ---
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 5. INICIALIZACIÓN DE TOOLTIPS (Opcional para Bootstrap) ---
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
