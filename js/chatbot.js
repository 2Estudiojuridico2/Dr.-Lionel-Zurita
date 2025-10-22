// Archivo: js/chatbot.js - Lógica Principal del Chatbot

// NOTA IMPORTANTE: Este archivo DEBE cargarse DESPUÉS de respuestas.js.

// =========================================================================
// VARIABLES DE ESTADO Y ELEMENTOS DEL DOM (CORREGIDO)
// =========================================================================
let chatbotOpen = false;
const menuStack = []; // Stack para manejar la navegación de los menús (Historial)
let lottieAnimation = null; 

// Elementos del DOM (Nombres consistentes y revisados)
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotBody = document.getElementById('chatbot-body'); // Contenedor principal de mensajes
const userInput = document.getElementById('chatbot-input');
const sendButton = document.getElementById('chatbot-send-btn');
const closeChatButton = document.getElementById('chatbot-close-btn');
const lottieChatbotToggler = document.getElementById('chatbot-lottie-btn'); // Botón flotante
const chatForm = document.getElementById('chat-form'); 


// =========================================================================
// FUNCIONES CORE DEL CHATBOT
// =========================================================================

/**
 * Resuelve una ruta (ej: 'FAMILY.MENU_FAMILY') dentro del objeto CHATBOT_RESPONSES.
 */
function resolveResponsePath(path) {
    if (!path || typeof path !== 'string') return null;
    
    const parts = path.split('.');
    let current = CHATBOT_RESPONSES;

    for (const part of parts) {
        if (current && typeof current === 'object' && current[part] !== undefined) {
            current = current[part];
        } else {
            if (typeof current === 'string') return current; 
            return null;
        }
    }
    return current;
}

/**
 * Genera HTML para un mensaje del bot.
 */
function generateBotMessageHTML(text) {
    const botIcon = '<i class="fas fa-robot text-lg text-white"></i>';
    // Simple markdown parsing for **bold** and newlines
    const formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');

    return `
        <div class="flex items-start">
            <div class="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2 shadow-md">
                ${botIcon}
            </div>
            <div class="bg-blue-100 p-3 rounded-tr-xl rounded-b-xl max-w-xs shadow-sm text-gray-800 text-sm">
                ${formattedText}
            </div>
        </div>
    `;
}

/**
 * Genera HTML para un mensaje del usuario.
 */
function generateUserMessageHTML(text) {
    const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return `
        <div class="flex justify-end">
            <div class="bg-gray-800 text-white p-3 rounded-tl-xl rounded-b-xl max-w-xs shadow-sm text-sm">
                ${formattedText}
            </div>
        </div>
    `;
}

/**
 * Renderiza un mensaje en el chat y actualiza la lista de botones.
 */
function appendMessage(sender, text, buttons = []) {
    const html = sender === 'bot' ? generateBotMessageHTML(text) : generateUserMessageHTML(text);
    chatbotBody.innerHTML += html; // USANDO chatbotBody
    chatbotBody.scrollTop = chatbotBody.scrollHeight; // Auto-scroll

    renderButtons(buttons);
}

/**
 * Renderiza datos estructurados (e.g., Baremos) de manera elegante.
 */
function renderStructuredResponse(data) {
    let content = `
        <div class="bg-yellow-50 border border-yellow-300 p-4 rounded-lg shadow-inner">
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
    
    // Necesitas un contenedor para los botones. Asumo que tienes uno con ID 'chat-buttons' o similar.
    // Como no me enviaste ese ID, usaré 'chatButtonsContainer' pero tendrás que asegurarte de que exista
    const chatButtonsContainer = document.getElementById('chat-buttons'); 
    
    // El bot envía el mensaje estructurado dentro de su burbuja de chat
    const fullHtml = generateBotMessageHTML(content);
    chatbotBody.innerHTML += fullHtml;
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}


/**
 * Renderiza los botones de opciones.
 */
function renderButtons(buttons) {
    const chatButtonsContainer = document.getElementById('chat-buttons'); 
    if (!chatButtonsContainer) return;

    chatButtonsContainer.innerHTML = '';
    
    // Añadir el botón de Volver al menú anterior si el stack tiene elementos
    if (menuStack.length > 0) {
        const prevMenu = CHATBOT_RESPONSES.COMMON.RETURN_TO_PREVIOUS_MENU;
        buttons.unshift(prevMenu); // Agrega al principio
    }

    // Usar un set temporal para eliminar duplicados, especialmente el "Volver al Menú Principal"
    const uniqueValues = new Set();
    const uniqueButtons = [];

    buttons.forEach(button => {
        if (!uniqueValues.has(button.value)) {
            uniqueValues.add(button.value);
            uniqueButtons.push(button);
        }
    });

    uniqueButtons.forEach(button => {
        const btn = document.createElement('button');
        btn.textContent = button.text;
        btn.dataset.value = button.value;
        btn.classList.add('w-full', 'p-3', 'text-sm', 'bg-gray-100', 'text-blue-700', 'border', 'border-blue-300', 'rounded-lg', 'hover:bg-blue-50', 'transition', 'duration-200', 'font-medium', 'text-left');
        btn.addEventListener('click', () => {
            appendMessage('user', button.text);
            processChatInput(button.value, buttons); // Pasa el array original de botones, no el único
        });
        chatButtonsContainer.appendChild(btn);
    });

    // Control del Input de Texto
    if (buttons.length > 0) {
        userInput.disabled = true;
        userInput.placeholder = "Selecciona una opción...";
    } else {
        userInput.disabled = false;
        userInput.placeholder = "Escribe tu consulta...";
    }
}

/**
 * Función principal de procesamiento de la entrada del chat.
 */
function processChatInput(value, currentButtons = []) {
    let response, nextButtons = [];

    // 1. Manejo de comandos especiales (VOLVER, MENU_ANTERIOR)
    if (value === 'VOLVER') {
        menuStack.length = 0; 
        response = CHATBOT_RESPONSES.COMMON.WELCOME_MESSAGE;
        nextButtons = CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL;
    } else if (value === 'MENU_ANTERIOR') {
        menuStack.pop(); 
        const previousMenuData = menuStack.pop(); 
        
        if (!previousMenuData) {
            processChatInput('VOLVER');
            return;
        }
        
        response = previousMenuData.text; 
        nextButtons = previousMenuData.buttons;
        menuStack.push(previousMenuData); // Volver a añadir el menú (el que se está mostrando)
        
    } else {
        // 2. Resolver la ruta
        response = resolveResponsePath(value);

        if (response === null || value === 'INVALID_INPUT_TEXT_TRIGGER') {
            // Si el valor no es una ruta válida (ej: texto libre o error)
            response = CHATBOT_RESPONSES.COMMON.ERROR_INPUT_INVALIDO;
            
            // Mantener los botones del menú anterior (el último en el stack)
            const lastMenu = menuStack[menuStack.length - 1];
            nextButtons = lastMenu ? lastMenu.buttons : CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL;

        } else if (Array.isArray(response)) {
            // 3. Respuesta es un nuevo menú (Array de botones)
            const menuText = currentButtons.find(b => b.value === value)?.text || 'Opción';
            response = `Perfecto. Seleccionaste **${menuText}**. ¿Sobre qué aspecto te gustaría más información?`;
            
            // Guardar el menú actual en el stack para el botón "Volver al Menú Anterior"
            menuStack.push({ text: menuText, buttons: response }); // Almacenar el nuevo menú
            nextButtons = response;
            
        } else if (typeof response === 'object' && response !== null) {
            // 4. Respuesta es un objeto estructurado (Baremo)
            renderStructuredResponse(response);

            // Mantener los botones del menú actual para el stack
            const lastMenu = menuStack[menuStack.length - 1];
            nextButtons = lastMenu ? lastMenu.buttons : CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL;
            
            // Asegurar el botón principal de volver siempre esté disponible
            nextButtons = nextButtons.concat([CHATBOT_RESPONSES.COMMON.RETURN_TO_MAIN_MENU]);

            renderButtons(nextButtons);
            return; // Terminar aquí, ya se renderizó el mensaje estructurado

        } else {
            // 5. Respuesta es un string final (Contacto o Respuesta de Texto)
            
            // Añadir el botón principal de volver al final de la respuesta de texto.
            nextButtons = [CHATBOT_RESPONSES.COMMON.RETURN_TO_MAIN_MENU]; 
        }
    }

    // Renderizar el mensaje y los botones (o solo el mensaje si no hay botones)
    appendMessage('bot', response, nextButtons);
}


// =========================================================================
// LÓGICA PRINCIPAL DE APERTURA/CIERRE (toggleChatbot)
// =========================================================================

function toggleChatbot() {
    chatbotOpen = !chatbotOpen;
    // Asumiendo que usas una clase CSS 'open' para mostrar/ocultar
    chatbotContainer.classList.toggle('open', chatbotOpen); 
    lottieChatbotToggler.classList.toggle('hidden', chatbotOpen); 

    if (chatbotOpen) {
        // Inicializar el chat con el mensaje de bienvenida si está vacío
        if (chatbotBody.children.length === 0) { 
            processChatInput('VOLVER');
        }
        userInput?.focus();
    }
}


// =========================================================================
// INICIALIZACIÓN DE LOTTIE Y EVENT LISTENERS DEL CHATBOT
// (SOLUCIONA EL PROBLEMA DE APERTURA)
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. Asignar el evento de clic al botón flotante (CRÍTICO)
    if (lottieChatbotToggler) {
        lottieChatbotToggler.addEventListener('click', toggleChatbot);

        // 2. Cargar la animación Lottie (opcional si falla)
        if (typeof lottie !== 'undefined') {
            lottieAnimation = lottie.loadAnimation({
                container: lottieChatbotToggler,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'assets/lottie/lawyer-assistant.json' 
            });
        }
    }

    // 3. Evento para cerrar
    closeChatButton?.addEventListener('click', toggleChatbot); 

    // 4. Evento para envío de formulario (Texto)
    chatForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = userInput.value.trim();
        
        if (text && !userInput.disabled) {
            // appendMessage('user', text); // Descomentar si usas appendMessage para user input
            
            if (text.toUpperCase() === 'VOLVER') {
                processChatInput('VOLVER');
            } else if (text.toUpperCase() === 'MENU_ANTERIOR') {
                processChatInput('MENU_ANTERIOR');
            } else {
                processChatInput('INVALID_INPUT_TEXT_TRIGGER'); 
            }
            userInput.value = '';
        }
    });
});
