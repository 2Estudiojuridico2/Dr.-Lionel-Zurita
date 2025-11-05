// Archivo: js/chatbot.js - Lógica Principal del Chatbot (COMPLETO Y FINAL CON OPTIMIZACIONES)

// NOTA IMPORTANTE: Este archivo DEBE cargarse DESPUÉS de respuestas.js.
// La variable CHATBOT_RESPONSES se define en respuestas.js.

// =========================================================================
// VARIABLES DE ESTADO Y ELEMENTOS DEL DOM
// =========================================================================
let chatbotOpen = false;
// Stack para manejar la navegación de los menús (Historial)
// Almacena el contexto del menú: { text: 'Nombre del Menú', buttons: ArrayDeBotonesDelMenu }
const menuStack = []; 
let lottieAnimation = null; // Se mantiene por si se usa en main.js para la animación del botón flotante

// Elementos del DOM
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotBody = document.getElementById('chatbot-body'); // Contenedor principal de mensajes
const userInput = document.getElementById('chatbot-input');
const sendButton = document.getElementById('chatbot-send-btn');
const closeChatButton = document.getElementById('chatbot-close-btn');
const lottieChatbotToggler = document.getElementById('chatbot-lottie-btn'); // Botón flotante
const chatForm = document.getElementById('chat-form');
const chatButtonsContainer = document.getElementById('chat-buttons'); // Contenedor de botones

// =========================================================================
// FUNCIONES CORE DEL CHATBOT
// =========================================================================

/**
 * Resuelve una ruta (ej: 'FAMILY.MENU_FAMILY') dentro del objeto CHATBOT_RESPONSES.
 * Permite acceder a objetos anidados o a valores string finales.
 */
function resolveResponsePath(path) {
    if (!path || typeof path !== 'string') return null;

    const parts = path.split('.');
    let current = window.CHATBOT_RESPONSES; // Usar window.CHATBOT_RESPONSES para asegurar acceso global

    for (const part of parts) {
        // Si el 'current' actual es un string, significa que la ruta ya se resolvió a un valor final.
        // Esto maneja casos como 'COMMON.OTRAS_CONSULTAS' donde 'OTRAS_CONSULTAS' es un string.
        if (typeof current === 'string') {
            return current;
        }
        
        // Si 'current' es un objeto y la parte existe dentro de él, continúa.
        if (current && typeof current === 'object' && current[part] !== undefined) {
            current = current[part];
        } else {
            // La ruta no es válida o no existe.
            return null;
        }
    }
    return current;
}

/**
 * Genera HTML para un mensaje del bot.
 * Soporta formato **negrita**, saltos de línea (\n) y [enlaces](url).
 */
function generateBotMessageHTML(text) {
    const botIcon = '<i class="fas fa-robot text-lg text-white"></i>';
    // Formatea el texto para negritas, saltos de línea y enlaces
    const formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // **negrita**
        .replace(/\n/g, '<br>') // Saltos de línea
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-blue-700 hover:text-blue-800 underline">${1}</a>'); // [texto](url)

    // Estilos de Tailwind CSS (se asume que están configurados y funcionando)
    return `
        <div class="flex items-start mb-3">
            <div class="flex-shrink-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center mr-2 shadow-md">
                ${botIcon}
            </div>
            <div class="bg-blue-100 p-3 rounded-tr-xl rounded-b-xl max-w-[80%] shadow-sm text-gray-800 text-sm message-bubble">
                ${formattedText}
            </div>
        </div>
    `;
}

/**
 * Genera HTML para un mensaje del usuario.
 * Soporta formato **negrita**.
 */
function generateUserMessageHTML(text) {
    const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return `
        <div class="flex justify-end mb-3">
            <div class="bg-gray-800 text-white p-3 rounded-tl-xl rounded-b-xl max-w-[80%] shadow-sm text-sm message-bubble">
                ${formattedText}
            </div>
        </div>
    `;
}

/**
 * Renderiza un mensaje en el chat, ya sea del bot o del usuario.
 * Si es un mensaje del bot y tiene botones, los renderiza después de un breve retraso.
 */
function appendMessage(sender, text, buttons = []) {
    // Si es un mensaje del usuario, simplemente lo añade al cuerpo del chat.
    if (sender === 'user') {
        const html = generateUserMessageHTML(text);
        chatbotBody.innerHTML += html;
        chatbotBody.scrollTop = chatbotBody.scrollHeight; // Auto-scroll
        return; 
    }

    // Si es un mensaje del bot, lo genera y lo añade.
    const html = generateBotMessageHTML(text);
    chatbotBody.innerHTML += html;
    chatbotBody.scrollTop = chatbotBody.scrollHeight; // Auto-scroll

    // Si hay botones asociados al mensaje del bot, los renderiza después de un delay
    // para que el usuario pueda leer el mensaje primero.
    if (buttons.length > 0) {
        setTimeout(() => {
            renderButtons(buttons);
            chatbotBody.scrollTop = chatbotBody.scrollHeight; // Auto-scroll de nuevo por si los botones hacen overflow
        }, 500); 
    } else {
        // Si no hay botones de opción, el input de texto debería estar habilitado
        // para que el usuario pueda escribir comandos como "VOLVER".
        userInput.disabled = false;
        userInput.placeholder = "Escribe VOLVER o tu consulta...";
    }
}

/**
 * Renderiza datos estructurados (e.g., Baremos) de manera elegante.
 * Utiliza una plantilla HTML específica para un formato atractivo.
 */
function renderStructuredResponse(data, buttons = []) {
    let content = `
        <div class="bg-yellow-50 border border-yellow-300 p-4 rounded-lg shadow-inner structured-data">
            <h5 class="text-xl font-bold text-yellow-800 mb-2 flex items-center">
                <i class="fas fa-balance-scale mr-2"></i> ${data.NOMBRE}
            </h5>
            <p class="text-sm text-gray-700 mb-4">${data.DESCRIPCION}</p>
            
            <h6 class="font-semibold text-yellow-700 mt-3 mb-1">Criterios de Base:</h6>
            <ul class="list-disc list-inside text-sm text-gray-600 space-y-0.5 ml-2">
                ${data.FUNDAMENTO.map(f => `<li>${f}</li>`).join('')}
            </ul>

            <h6 class="font-semibold text-yellow-700 mt-3 mb-1">Fórmula de Cálculo:</h6>
            <p class="text-sm text-gray-800 bg-yellow-200 p-2 rounded font-mono break-words">${data.METODO_CALCULO}</p>

            <p class="mt-4 text-xs text-yellow-800 italic">**Observación:** ${data.OBSERVACIONES}</p>
        </div>
    `;
    
    // Se inserta como un mensaje normal del bot, pero con el contenido estructurado
    const fullHtml = generateBotMessageHTML(content);
    chatbotBody.innerHTML += fullHtml;
    chatbotBody.scrollTop = chatbotBody.scrollHeight;

    // Renderiza los botones de navegación después de mostrar el contenido estructurado.
    renderButtons(buttons);
}


/**
 * Renderiza los botones de opciones en el contenedor de botones.
 * Controla la visibilidad y el estado del input de texto.
 */
function renderButtons(buttons) {
    if (!chatButtonsContainer) return; // Si el contenedor no existe, salir.

    chatButtonsContainer.innerHTML = ''; // Limpia los botones anteriores.
    
    let navigationButtons = [];
    // Filtramos los botones de navegación de los botones de contenido específicos del menú actual.
    let contentButtons = buttons.filter(b => b.value !== 'VOLVER' && b.value !== 'MENU_ANTERIOR');

    // Añadir botones de navegación globales condicionalmente.
    // "Volver al Menú Anterior" solo si hay más de un menú en el stack (es decir, no estamos en el principal).
    if (menuStack.length > 1) { 
        navigationButtons.push(window.CHATBOT_RESPONSES.COMMON.RETURN_TO_PREVIOUS_MENU);
    }
    // "Volver al Menú Principal" si hay al menos un menú en el stack y no se añadió ya "VOLVER"
    // para evitar duplicados si "MENU_ANTERIOR" ya lo contiene implícitamente o si es el menú principal.
    if (menuStack.length > 0 && !navigationButtons.some(b => b.value === 'VOLVER')) { 
        navigationButtons.push(window.CHATBOT_RESPONSES.COMMON.RETURN_TO_MAIN_MENU);
    }
    
    // Concatenar todos los botones (contenido + navegación) y filtrar duplicados.
    const finalButtons = contentButtons.concat(navigationButtons);
    const uniqueValues = new Set(); // Para asegurar que no haya botones con el mismo valor (ej. dos "VOLVER")
    const processedButtons = [];
    
    finalButtons.forEach(button => {
        if (!uniqueValues.has(button.value)) {
            uniqueValues.add(button.value);
            processedButtons.push(button);
        }
    });

    // Crea y añade cada botón al contenedor.
    processedButtons.forEach(button => {
        const btn = document.createElement('button');
        btn.textContent = button.text;
        btn.dataset.value = button.value; // Almacena el valor para usarlo en processChatInput
        // Clases de Tailwind CSS para estilo de botón (sincronizadas con chatbot.css)
        btn.classList.add('w-full', 'p-3', 'text-sm', 'bg-gray-100', 'text-blue-700', 'border', 'border-blue-300', 'rounded-lg', 'hover:bg-blue-50', 'transition', 'duration-200', 'font-medium', 'text-left', 'chatbot-option-btn');
        
        // Añade el event listener para cada botón.
        btn.addEventListener('click', () => {
            appendMessage('user', button.text); // Muestra la selección del usuario.
            // Procesa la entrada, pasando el valor del botón y los botones de contenido actuales.
            processChatInput(button.value, contentButtons); 
        });
        chatButtonsContainer.appendChild(btn);
    });

    // Control del Input de Texto: deshabilitar solo si hay botones de **contenido** activos.
    // Esto significa que el bot espera una selección de menú, no texto libre.
    if (contentButtons.length > 0) {
        userInput.disabled = true;
        userInput.placeholder = "Selecciona una opción del menú...";
    } else {
        // Si no hay botones de contenido (solo navegación o ninguno), habilita el input.
        userInput.disabled = false;
        userInput.placeholder = "Escribe VOLVER o tu consulta...";
    }
}

/**
 * Función principal de procesamiento de la entrada del chat (mensajes de usuario o clics en botones).
 * Gestiona la navegación del chatbot, las respuestas y el estado del UI.
 */
function processChatInput(value, currentContentButtons = []) {
    let response, nextButtons = [];
    const normalizedValue = value.toUpperCase().trim(); // Normaliza el valor para comparar comandos

    // 🚨 MEJORA CRÍTICA: Limpiar el contenedor de botones inmediatamente al procesar una entrada.
    // Esto oculta los botones anteriores tan pronto como el usuario hace clic o envía texto,
    // mejorando la claridad visual y evitando la superposición.
    chatButtonsContainer.innerHTML = ''; 
    userInput.disabled = true; // Deshabilita el input mientras el bot procesa la respuesta.

    // 1. Manejo de comandos especiales para navegación.
    if (normalizedValue === 'VOLVER') {
        menuStack.length = 0; // Al comando "VOLVER" se reinicia completamente el historial del stack.
        
        // Obtiene el mensaje de bienvenida y el menú principal de las respuestas.
        const welcomeMsg = window.CHATBOT_RESPONSES.COMMON.WELCOME_MESSAGE;
        const menuPrincipal = window.CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL;

        // Muestra el mensaje de bienvenida sin botones inicialmente.
        appendMessage('bot', welcomeMsg, []); 

        // Después de un breve retraso, muestra el menú principal.
        setTimeout(() => {
            // Empuja el menú principal al stack como el punto de partida.
            menuStack.push({ text: 'Menú Principal', buttons: menuPrincipal }); 
            renderButtons(menuPrincipal);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        }, 800); 

        return; // Termina la ejecución ya que la lógica de "VOLVER" es completa.
        
    } else if (normalizedValue === 'MENU_ANTERIOR') {
        menuStack.pop(); // Quita el menú actual del stack.
        const previousMenuData = menuStack[menuStack.length - 1]; // Obtiene el menú que estaba antes.

        if (!previousMenuData) {
            // Si no hay un menú anterior en el stack, vuelve al menú principal.
            processChatInput('VOLVER'); 
            return;
        }
        
        // Prepara la respuesta informando a qué menú se vuelve.
        response = `Volviendo a: **${previousMenuData.text || 'Menú Anterior'}**`; 
        nextButtons = previousMenuData.buttons; // Los botones del menú anterior.
        
    } else {
        // 2. Intenta resolver la entrada como una ruta a una respuesta definida.
        response = resolveResponsePath(value);

        if (response === null || normalizedValue === 'INVALID_INPUT_TEXT_TRIGGER') {
            // Si la ruta no es válida o se activó un error por texto libre inesperado.
            response = window.CHATBOT_RESPONSES.COMMON.ERROR_INPUT_INVALIDO;
            
            // Mantiene los botones del último menú en el stack para que el usuario pueda reintentar.
            const lastMenu = menuStack[menuStack.length - 1];
            nextButtons = lastMenu ? lastMenu.buttons : window.CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL;
            
        } else if (Array.isArray(response)) {
            // 3. La respuesta es un nuevo menú (un Array de objetos botón).
            // Obtiene el texto del botón que el usuario seleccionó para el mensaje.
            const menuText = currentContentButtons.find(b => b.value === value)?.text || 'Opción';
            
            // Crea un mensaje genérico para introducir el nuevo menú.
            const message = `Perfecto. Seleccionaste **${menuText}**. ¿Sobre qué aspecto te gustaría más información?`;
            
            // Guarda el nuevo menú en el stack para futuras navegaciones hacia atrás.
            menuStack.push({ text: menuText, buttons: response }); 
            nextButtons = response; // Los botones del nuevo menú.
            response = message; // El mensaje del bot.

        } else if (typeof response === 'object' && response !== null) {
            // 4. La respuesta es un objeto estructurado (como los Baremos).
            
            // Renderiza la estructura directamente. No necesita `appendMessage` normal.
            // Los botones de navegación se renderizarán después de la estructura.
            renderStructuredResponse(response, []); 
            return; // Termina la ejecución aquí, ya que renderStructuredResponse maneja la visualización completa.

        } else {
            // 5. La respuesta es un string final (ej. un mensaje de contacto o una explicación simple).
            
            // En este caso, no hay botones de contenido específicos que mostrar.
            // `renderButtons` se encargará de mostrar los botones de navegación global (Volver/Menú Principal).
            nextButtons = []; 
        }
    }

    // Finalmente, renderiza el mensaje del bot y los botones correspondientes.
    appendMessage('bot', response, nextButtons);
}


// =========================================================================
// LÓGICA PRINCIPAL DE APERTURA/CIERRE (toggleChatbot)
// =========================================================================

/**
 * Abre o cierra la ventana del chatbot y gestiona el estado del botón flotante.
 */
function toggleChatbot() {
    chatbotOpen = !chatbotOpen;
    // La clase 'open' controla la visibilidad y posición del contenedor del chatbot.
    chatbotContainer.classList.toggle('open', chatbotOpen); 
    // Oculta el botón flotante Lottie cuando el chat está abierto y viceversa.
    lottieChatbotToggler.classList.toggle('hidden', chatbotOpen); 

    if (chatbotOpen) {
        // Inicializa el chat con el mensaje de bienvenida si está vacío o si el stack de menús está vacío.
        // Esto asegura que al abrir el chat siempre se inicie en el menú principal si no hay historial.
        if (chatbotBody.children.length === 0 || menuStack.length === 0) { 
            processChatInput('VOLVER'); // Dispara la lógica de inicialización al menú principal.
        }
        userInput?.focus(); // Pone el foco en el input de texto.
    }
}


// =========================================================================
// INICIALIZACIÓN Y EVENT LISTENERS DEL CHATBOT
// =========================================================================

// Ejecuta el código una vez que el DOM está completamente cargado.
document.addEventListener('DOMContentLoaded', () => {

    // 1. Asigna el evento de clic al botón flotante Lottie para abrir/cerrar el chatbot.
    if (lottieChatbotToggler) {
        lottieChatbotToggler.addEventListener('click', toggleChatbot);
    }

    // 2. Asigna el evento de clic al botón de cierre dentro del encabezado del chatbot.
    closeChatButton?.addEventListener('click', toggleChatbot); 

    // 3. Maneja el envío del formulario de entrada de texto (tanto por Enter como por botón de enviar).
    chatForm?.addEventListener('submit', (e) => {
        e.preventDefault(); // Previene el recargo de la página por el envío del formulario.
        const text = userInput.value.trim(); // Obtiene el texto y limpia espacios en blanco.
        
        // Solo procesa la entrada si hay texto y el input no está deshabilitado.
        if (text && !userInput.disabled) {
            appendMessage('user', text); // Muestra el mensaje del usuario en el chat.
            
            const normalizedText = text.toUpperCase().trim();
            
            // Procesa comandos específicos si el usuario los escribe.
            if (normalizedText === 'VOLVER') {
                processChatInput('VOLVER');
            } else if (normalizedText === 'MENU_ANTERIOR') {
                processChatInput('MENU_ANTERIOR');
            } else {
                // Cualquier otro texto libre es considerado un error en este bot basado en menú.
                processChatInput('INVALID_INPUT_TEXT_TRIGGER'); 
            }
            userInput.value = ''; // Limpia el input de texto.
        } else if (!text && !userInput.disabled) {
             // Si el usuario presiona ENTER sin escribir texto y el input está habilitado,
             // también lo trata como una entrada inválida para forzar una respuesta de error.
             processChatInput('INVALID_INPUT_TEXT_TRIGGER'); 
        }
    });
});
