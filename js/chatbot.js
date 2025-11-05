// Archivo: js/chatbot.js - Lógica Principal del Chatbot (OPTIMIZADO)

// NOTA IMPORTANTE: Este archivo DEBE cargarse DESPUÉS de respuestas.js.
// La variable CHATBOT_RESPONSES se define en respuestas.js.

// =========================================================================
// VARIABLES DE ESTADO Y ELEMENTOS DEL DOM
// =========================================================================
let chatbotOpen = false;
// La pila (Stack) debe almacenar el VALOR del menú (ruta) para poder reconstruirlo.
// { path: 'COMMON.MENU_AREAS_PRINCIPAL', buttons: [...] }
const menuStack = []; 
let lottieAnimation = null; // Se mantiene por si se usa en main.js

// Elementos del DOM (Se mantiene la obtención, asumiendo que existen)
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotBody = document.getElementById('chatbot-body'); 
const userInput = document.getElementById('chatbot-input');
const sendButton = document.getElementById('chatbot-send-btn');
const closeChatButton = document.getElementById('chatbot-close-btn');
const lottieChatbotToggler = document.getElementById('chatbot-lottie-btn');
const chatForm = document.getElementById('chat-form');
const chatButtonsContainer = document.getElementById('chat-buttons'); 

// =========================================================================
// FUNCIONES CORE DEL CHATBOT
// =========================================================================

/**
 * Resuelve una ruta (ej: 'FAMILY.MENU_FAMILY') dentro del objeto CHATBOT_RESPONSES.
 */
function resolveResponsePath(path) {
    if (!path || typeof path !== 'string') return null;

    const parts = path.split('.');
    let current = window.CHATBOT_RESPONSES;

    for (const part of parts) {
        // Corrección: Permitir que el path resuelva directamente un string final.
        if (current && typeof current === 'object' && current[part] !== undefined) {
            current = current[part];
        } else if (typeof current === 'string') {
            return current; // Ya llegó a una respuesta string final
        } else {
            return null; // Ruta no válida
        }
    }
    return current;
}

/**
 * Genera HTML para un mensaje del bot. (Se mantiene, con pequeñas mejoras de formato)
 */
function generateBotMessageHTML(text) {
    const botIcon = '<i class="fas fa-robot text-lg text-white"></i>';
    // Soporte para **bold**, saltos de línea (\n) y [enlaces](url)
    const formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-blue-700 hover:text-blue-800 underline">${1}</a>'); 

    // Estilos de Tailwind CSS
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
 * Genera HTML para un mensaje del usuario. (Se mantiene)
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
 * Renderiza un mensaje en el chat. (Se mantiene el delay para los botones)
 */
function appendMessage(sender, text, buttons = []) {
    // Si es un mensaje del usuario, solo lo muestra.
    if (sender === 'user') {
        const html = generateUserMessageHTML(text);
        chatbotBody.innerHTML += html;
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
        return; 
    }

    // Es mensaje del bot, lo renderiza.
    const html = generateBotMessageHTML(text);
    chatbotBody.innerHTML += html;
    chatbotBody.scrollTop = chatbotBody.scrollHeight; // Auto-scroll

    // Si hay botones, los renderiza después de un breve delay.
    if (buttons.length > 0) {
        setTimeout(() => {
            renderButtons(buttons);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        }, 500); 
    } else {
        // 💡 MEJORA: Si no hay botones, re-habilitar el input para comandos de texto (VOLVER)
        userInput.disabled = false;
        userInput.placeholder = "Escribe VOLVER o tu consulta...";
    }
}

/**
 * Renderiza datos estructurados (e.g., Baremos) de manera elegante. (Se mantiene)
 */
function renderStructuredResponse(data, buttons = []) {
    // Generación del HTML para el Baremo (Se asume que los estilos de CSS son correctos)
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
    
    // Se inserta como un mensaje normal, pero con el contenido estructurado
    const fullHtml = generateBotMessageHTML(content);
    chatbotBody.innerHTML += fullHtml;
    chatbotBody.scrollTop = chatbotBody.scrollHeight;

    // Renderizar botones de navegación
    renderButtons(buttons);
}


/**
 * Renderiza los botones de opciones y maneja el estado del input de texto.
 */
function renderButtons(buttons) {
    if (!chatButtonsContainer) return;

    chatButtonsContainer.innerHTML = '';
    
    // 💡 CORRECCIÓN: Separar botones de navegación de botones de contenido
    let navigationButtons = [];
    let contentButtons = buttons.filter(b => b.value !== 'VOLVER' && b.value !== 'MENU_ANTERIOR');

    // Añadir botones de navegación condicionalmente
    if (menuStack.length > 1) { // Si hay más de un menú en el stack, se puede volver al anterior
        navigationButtons.push(window.CHATBOT_RESPONSES.COMMON.RETURN_TO_PREVIOUS_MENU);
    }
    // Si hay al menos un menú en el stack (o estamos en el principal), se puede volver al principal
    if (menuStack.length > 0 && !navigationButtons.some(b => b.value === 'VOLVER')) { 
        navigationButtons.push(window.CHATBOT_RESPONSES.COMMON.RETURN_TO_MAIN_MENU);
    }
    
    // Concatenar y filtrar duplicados (especialmente 'VOLVER')
    const finalButtons = contentButtons.concat(navigationButtons);
    const uniqueValues = new Set();
    const processedButtons = [];
    
    finalButtons.forEach(button => {
        if (!uniqueValues.has(button.value)) {
            uniqueValues.add(button.value);
            processedButtons.push(button);
        }
    });

    processedButtons.forEach(button => {
        const btn = document.createElement('button');
        btn.textContent = button.text;
        btn.dataset.value = button.value;
        // Clases de Tailwind CSS para estilo de botón (se mantienen)
        btn.classList.add('w-full', 'p-3', 'text-sm', 'bg-gray-100', 'text-blue-700', 'border', 'border-blue-300', 'rounded-lg', 'hover:bg-blue-50', 'transition', 'duration-200', 'font-medium', 'text-left', 'chatbot-option-btn');
        
        btn.addEventListener('click', () => {
            appendMessage('user', button.text);
            processChatInput(button.value, contentButtons); // Pasar solo los botones de contenido
        });
        chatButtonsContainer.appendChild(btn);
    });

    // Control del Input de Texto: deshabilitar solo si hay botones de **contenido**
    if (contentButtons.length > 0) {
        userInput.disabled = true;
        userInput.placeholder = "Selecciona una opción del menú...";
    } else {
        userInput.disabled = false;
        userInput.placeholder = "Escribe VOLVER o tu consulta...";
    }
}

/**
 * Función principal de procesamiento de la entrada del chat.
 */
function processChatInput(value, currentContentButtons = []) {
    let response, nextButtons = [];
    const normalizedValue = value.toUpperCase().trim();

    // 1. Manejo de comandos especiales
    if (normalizedValue === 'VOLVER') {
        menuStack.length = 0; // Reinicia el stack
        
        // Renderiza mensaje de bienvenida y menú principal
        const welcomeMsg = window.CHATBOT_RESPONSES.COMMON.WELCOME_MESSAGE;
        const menuPrincipal = window.CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL;

        appendMessage('bot', welcomeMsg, []); 

        setTimeout(() => {
            // Se asume que el menú principal es el primer elemento del stack
            menuStack.push({ path: 'COMMON.MENU_AREAS_PRINCIPAL', buttons: menuPrincipal }); 
            renderButtons(menuPrincipal);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        }, 800); 

        return; 
        
    } else if (normalizedValue === 'MENU_ANTERIOR') {
        // Quitar el menú actual
        menuStack.pop(); 
        const previousMenuData = menuStack[menuStack.length - 1]; // Obtener el menú anterior

        if (!previousMenuData) {
            processChatInput('VOLVER'); // Si no hay más historial, volver al inicio
            return;
        }
        
        response = `Volviendo a: **${previousMenuData.text || 'Menú Anterior'}**`; 
        nextButtons = previousMenuData.buttons;
        
    } else {
        // 2. Resolver la ruta
        response = resolveResponsePath(value);

        if (response === null || normalizedValue === 'INVALID_INPUT_TEXT_TRIGGER') {
            // Manejo de texto libre/ruta no válida
            response = window.CHATBOT_RESPONSES.COMMON.ERROR_INPUT_INVALIDO;
            
            // Mantener los botones del último menú en el stack
            const lastMenu = menuStack[menuStack.length - 1];
            nextButtons = lastMenu ? lastMenu.buttons : window.CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL;
            
        } else if (Array.isArray(response)) {
            // 3. Respuesta es un nuevo menú (Array de botones)
            const menuText = currentContentButtons.find(b => b.value === value)?.text || 'Opción';
            
            // 💡 CORRECCIÓN CRÍTICA: La respuesta del array no es el mensaje, sino los botones.
            // El mensaje debe ser estático o generarse aquí.
            const message = `Perfecto. Seleccionaste **${menuText}**. ¿Sobre qué aspecto te gustaría más información?`;
            
            // Guardar el nuevo menú en el stack
            menuStack.push({ text: menuText, buttons: response }); 
            nextButtons = response;
            response = message;

        } else if (typeof response === 'object' && response !== null) {
            // 4. Respuesta es un objeto estructurado (Baremo)
            
            // Solo se necesitan los botones de navegación (renderButtons los genera)
            renderStructuredResponse(response, []); 
            return; 

        } else {
            // 5. Respuesta es un string final (Contacto o Respuesta de Texto)
            // No hay botones de contenido, solo de navegación (renderButtons los genera)
            nextButtons = [];
        }
    }

    // Renderizar el mensaje y los botones
    appendMessage('bot', response, nextButtons);
}


// =========================================================================
// LÓGICA PRINCIPAL DE APERTURA/CIERRE (toggleChatbot)
// =========================================================================

function toggleChatbot() {
    chatbotOpen = !chatbotOpen;
    // La clase 'open' debe ser la que controla la visibilidad y posición del contenedor
    chatbotContainer.classList.toggle('open', chatbotOpen); 
    // Ocultar el botón flotante cuando el chat está abierto
    lottieChatbotToggler.classList.toggle('hidden', chatbotOpen); 

    if (chatbotOpen) {
        // Inicializar el chat con el mensaje de bienvenida si está vacío
        if (chatbotBody.children.length === 0 || menuStack.length === 0) { 
            // Esto asegura que al abrir siempre se inicie en el menú principal
            processChatInput('VOLVER'); 
        }
        userInput?.focus();
    }
}


// =========================================================================
// INICIALIZACIÓN Y EVENT LISTENERS DEL CHATBOT
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. Asignar el evento de clic al botón flotante 
    if (lottieChatbotToggler) {
        lottieChatbotToggler.addEventListener('click', toggleChatbot);
    }

    // 2. Evento para cerrar
    closeChatButton?.addEventListener('click', toggleChatbot); 

    // 3. Evento para envío de formulario (Texto)
    chatForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = userInput.value.trim();
        
        // Solo procesamos si hay texto y el input está habilitado
        if (text && !userInput.disabled) {
            appendMessage('user', text); 
            
            const normalizedText = text.toUpperCase().trim();
            
            if (normalizedText === 'VOLVER') {
                processChatInput('VOLVER');
            } else if (normalizedText === 'MENU_ANTERIOR') {
                processChatInput('MENU_ANTERIOR');
            } else {
                // Cualquier otro texto libre es un error en este bot basado en menú
                processChatInput('INVALID_INPUT_TEXT_TRIGGER'); 
            }
            userInput.value = '';
        } else if (!text && !userInput.disabled) {
             // Si presiona ENTER sin texto, tratamos como error (para forzar VOLVER)
             processChatInput('INVALID_INPUT_TEXT_TRIGGER'); 
        }
        
    });
});
