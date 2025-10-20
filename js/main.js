document.addEventListener('DOMContentLoaded', function() {
    // Inicialización de AOS
    AOS.init({
        duration: 1000, // duración de la animación en ms
        once: true,    // si la animación solo debe ocurrir una vez
    });

    // Inicializar tooltips de Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // ==========================================================
    // INICIO DEL SEGUIMIENTO DE CONVERSIONES DE GOOGLE ADS
    // ==========================================================
    
    // Función auxiliar para disparar la conversión
    function trackConversion(send_to_id) {
        // Verifica si la librería gtag está cargada
        if (typeof gtag === 'function') {
            gtag('event', 'conversion', {
                'send_to': 'AW-17555284710/' + send_to_id, // AW-ID base + ID de acción
                'value': 1.0, 
                'currency': 'ARS'
            });
            // Opcional: Log para verificar en consola
            console.log("Conversión de Google Ads disparada:", send_to_id);
        } else {
            console.warn("gtag no está definido. Asegúrate de que el código base de Google Ads esté en el <head>.");
        }
    }

    // --- ID DE CONVERSIÓN DE ACCIONES ---
    // NOTA IMPORTANTE: VERIFICA ESTOS IDs en tu cuenta de Google Ads.
    // Usamos el ID que proporcionaste para el ejemplo: xbZyCOG1gJobEObFgbNB
    const WA_CONVERSION_ID = 'xbZyCOG1gJobEObFgbNB'; 
    const FORM_CONVERSION_ID = 'xbZyCOG1gJobEObFgbNB'; // Podría ser diferente si tienes una acción separada para el formulario.

    // 1. Seguimiento de clics en WhatsApp (incluye links del hero, footer y chat flotante)
    const whatsappLinks = document.querySelectorAll(
        '#whatsapp-link, #whatsapp-link-bottom, .whatsapp-float a' // Actualizado para incluir el .whatsapp-float
    );
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackConversion(WA_CONVERSION_ID);
        });
    });

    // 2. Seguimiento de clics en el Formulario de Contacto (botones de "Consulta por Formulario" y "Consultar" en servicios)
    const contactoLinks = document.querySelectorAll(
        '#contacto-link, [id^="contact-service-"]' // Selecciona el botón principal y los botones de servicio
    );

    contactoLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackConversion(FORM_CONVERSION_ID);
        });
    });

    // 3. (OPCIONAL) Seguimiento de Envío de Formulario (si tienes un formulario con ID 'quickContactForm' en otra página y quieres rastrear el submit)
    // Este código se mantiene comentado ya que FormSubmit gratuito NO devuelve una una respuesta JSON fácil de rastrear con AJAX.
    // Si usas un formulario normal que redirige, el rastreo por Clic (punto 2) es la mejor práctica.
    
    /*
    const quickContactForm = document.getElementById('quickContactForm'); 
    if (quickContactForm) {
        quickContactForm.addEventListener('submit', function(event) {
            // Este es el punto más seguro para disparar si NO usas AJAX
            trackConversion(FORM_CONVERSION_ID); 
            // Si usas AJAX, esta línea debe ir DENTRO del .then() que confirma el éxito.
        });
    }
    */

    // ==========================================================
    // FIN DEL SEGUIMIENTO DE CONVERSIONES DE GOOGLE ADS
    // ==========================================================

});
