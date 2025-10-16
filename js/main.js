document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000, // duración de la animación en ms
        once: true,    // si la animación solo debe ocurrir una vez
    });

    // Inicializar tooltips de Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Script para el botón de "Ir Arriba"
    const scrollTopBtn = document.getElementById('scrollTopBtn');
     if (scrollTopBtn) {

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) { // Muestra el botón después de 300px de scroll
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Desplazamiento suave
        });
    });

    // Para manejar el formulario rápido en index.html si lo haces con AJAX
    // NOTA: Para formsubmit.co, es mejor NO usar AJAX a menos que tengas un servidor proxy
    // o uses su característica AJAX con un plan de pago. La configuración actual
    // del index.html redirigirá al usuario a la página de gracias de Formsubmit.co.
    // Si quieres un mensaje en la misma página, necesitarías un backend propio o un servicio AJAX compatible.
    
    // Si realmente quieres enviar con AJAX y mostrar el mensaje en la misma página
    // (requiere que formsubmit.co o tu backend responda con JSON):
    /*
    const quickContactForm = document.getElementById('quickContactForm');
    const formMessage = document.getElementById('form-message');

    if (quickContactForm) {
        quickContactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            formMessage.style.display = 'block';
            formMessage.className = 'mt-3 text-center text-info';
            formMessage.textContent = 'Enviando...';

            // Adaptar la URL de action del formulario si es necesario
            fetch(form.action, { 
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json' // Importante para que Formsubmit responda JSON si lo permite
                }
            })
            .then(response => response.json()) // Formsubmit no devuelve JSON en la versión gratuita para submit normal.
                                               // Si esto falla, es porque no recibes JSON.
                                               // Para AJAX con Formsubmit, necesitarías un plan de pago o un proxy.
            .then(data => {
                // Aquí el manejo de éxito/error si la respuesta es JSON
                if (data.success) { // Esto es un ejemplo, la respuesta de Formsubmit puede variar.
                    formMessage.className = 'mt-3 text-center text-success';
                    formMessage.textContent = '¡Gracias! Tu mensaje ha sido enviado correctamente.';
                    form.reset();
                } else {
                    formMessage.className = 'mt-3 text-center text-danger';
                    formMessage.textContent = data.message || 'Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.';
                }
            })
            .catch(error => {
                // Esto se ejecuta si la petición falla o no devuelve JSON válido
                formMessage.className = 'mt-3 text-center text-danger';
                formMessage.textContent = 'Ocurrió un error al enviar tu mensaje. Por favor, asegúrate que todos los campos estén correctos e inténtalo de nuevo.';
                console.error('Error:', error);
            });
        });
    }
    */
});
