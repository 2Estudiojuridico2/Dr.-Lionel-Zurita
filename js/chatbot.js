// Archivo: js/chatbot.js - Lógica Principal del Chatbot (COMPLETO Y CORREGIDO FINAL)

// NOTA IMPORTANTE: Este archivo DEBE cargarse DESPUÉS de respuestas.js.
// La variable CHATBOT_RESPONSES se define en respuestas.js.

// =========================================================================
// VARIABLES DE ESTADO Y ELEMENTOS DEL DOM
// =========================================================================
let chatbotOpen = false;
const menuStack = []; // Stack para manejar la navegación de los menús (Historial)
let lottieAnimation = null;

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
 */
function resolveResponsePath(path) {
    if (!path || typeof path !== 'string') return null;

    const parts = path.split('.');
    let current = window.CHATBOT_RESPONSES; // Usar window.CHATBOT_RESPONSES para asegurar

    for (const part of parts) {
        // Permite la respuesta directa si current ya es un string
        if (typeof current === 'string' && parts.length === 1) return current; 

        if (current && typeof current === 'object' && current[part] !== undefined) {
            current = current[part];
        } else {
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
    // Soporte para **bold**, saltos de línea (\n) y [enlaces](url)
    const formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-blue-700 hover:text-blue-800 underline">${1}</a>'); 

    // Estilos de Tailwind CSS (Asegúrate de que tu chatbot.css maneje los estilos)
    return `
        <div class="flex items-start mb-3">
            <div class="flex-shrink-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center mr-2 shadow-md">
                ${botIcon}
            </div>
            <div class="bg-blue-100 p-3 rounded-tr-xl rounded-b-xl max-w-[80%] shadow-sm text-gray-800 text-sm">
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
        <div class="flex justify-end mb-3">
            <div class="bg-gray-800 text-white p-3 rounded-tl-xl rounded-b-xl max-w-[80%] shadow-sm text-sm">
                ${formattedText}
            </div>
        </div>
    `;
}

/**
 * Renderiza un mensaje en el chat.
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
    }
}

/**
 * Renderiza datos estructurados (e.g., Baremos) de manera elegante.
 */
function renderStructuredResponse(data, buttons = []) {
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
    
    const fullHtml = generateBotMessageHTML(content);
    chatbotBody.innerHTML += fullHtml;
    chatbotBody.scrollTop = chatbotBody.scrollHeight;

    // Renderizar botones de navegación después del mensaje estructurado
    renderButtons(buttons);
}


/**
 * Renderiza los botones de opciones y maneja el estado del input de texto.
 */
function renderButtons(buttons) {
    if (!chatButtonsContainer) return;

    chatButtonsContainer.innerHTML = '';
    
    const uniqueValues = new Set();
    let finalButtons = [];

    // Añadir botones de navegación condicionalmente
    if (menuStack.length > 1) { // Si hay más de un menú en el stack, se puede volver al anterior
        finalButtons.push(window.CHATBOT_RESPONSES.COMMON.RETURN_TO_PREVIOUS_MENU);
    }
    if (menuStack.length > 0) { // Si hay al menos un menú en el stack, se puede volver al principal
        finalButtons.push(window.CHATBOT_RESPONSES.COMMON.RETURN_TO_MAIN_MENU);
    }
    
    // Agregar los botones específicos del menú actual
    finalButtons = finalButtons.concat(buttons);


    // Filtrar duplicados manteniendo el orden
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
        // Clases de Tailwind CSS para estilo de botón
        btn.classList.add('w-full', 'p-3', 'text-sm', 'bg-gray-100', 'text-blue-700', 'border', 'border-blue-300', 'rounded-lg', 'hover:bg-blue-50', 'transition', 'duration-200', 'font-medium', 'text-left');
        
        btn.addEventListener('click', () => {
            appendMessage('user', button.text);
            processChatInput(button.value, buttons);
        });
        chatButtonsContainer.appendChild(btn);
    });

    // Control del Input de Texto: deshabilitar si hay botones de menú activos
    if (buttons.length > 0 && processedButtons.some(b => b.value !== 'VOLVER' && b.value !== 'MENU_ANTERIOR')) {
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
        menuStack.length = 0; // Limpia el stack
        
        // --- CÓDIGO CORREGIDO PARA EL MENSAJE DE BIENVENIDA ---
        response = window.CHATBOT_RESPONSES.COMMON.WELCOME_MESSAGE;
        const menuPrincipal = window.CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL;

        // 1. Renderiza el mensaje de bienvenida
        appendMessage('bot', response, []); // Sin botones

        // 2. Esperamos un poco y luego mostramos los botones del menú principal.
        setTimeout(() => {
            menuStack.push({ text: 'Menú Principal', buttons: menuPrincipal }); 
            renderButtons(menuPrincipal);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        }, 800); 

        return; // Terminamos la ejecución
        // --------------------------------------------------------
        
    } else if (value === 'MENU_ANTERIOR') {
        // Pop 2 veces: 1 para el menú actual (que vamos a descartar), 1 para el menú anterior.
        menuStack.pop(); 
        const previousMenuData = menuStack.pop(); 
        
        if (!previousMenuData) {
            processChatInput('VOLVER');
            return;
        }
        
        response = `Volviendo a: **${previousMenuData.text}**`; 
        nextButtons = previousMenuData.buttons;
        menuStack.push(previousMenuData); 
        
    } else {
        // 2. Resolver la ruta (Consultas de menú normal)
        response = resolveResponsePath(value);

        if (response === null) {
            // Si el valor no es una ruta válida (ej: texto libre o error)
            response = window.CHATBOT_RESPONSES.COMMON.ERROR_INPUT_INVALIDO;
            
            // Mantener los botones del menú anterior (el último en el stack)
            const lastMenu = menuStack[menuStack.length - 1];
            nextButtons = lastMenu ? lastMenu.buttons : window.CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL;
            
            // Si hay error, no hacemos push al stack.

        } else if (Array.isArray(response)) {
            // 3. Respuesta es un nuevo menú (Array de botones)
            const menuText = currentButtons.find(b => b.value === value)?.text || 'Opción';
            response = `Perfecto. Seleccionaste **${menuText}**. ¿Sobre qué aspecto te gustaría más información?`;
            
            // Guardar el menú actual en el stack
            menuStack.push({ text: menuText, buttons: response }); 
            nextButtons = response;
            
        } else if (typeof response === 'object' && response !== null) {
            // 4. Respuesta es un objeto estructurado (Baremo)
            
            const lastMenu = menuStack[menuStack.length - 1];
            let navigationButtons = [];
            if(lastMenu) {
                // Solo mantener botones de navegación: volver anterior y principal
                if (menuStack.length > 1) navigationButtons.push(window.CHATBOT_RESPONSES.COMMON.RETURN_TO_PREVIOUS_MENU);
                navigationButtons.push(window.CHATBOT_RESPONSES.COMMON.RETURN_TO_MAIN_MENU);
            }
            
            renderStructuredResponse(response, navigationButtons); // Renderiza la estructura
            return; 

        } else {
            // 5. Respuesta es un string final (Contacto o Respuesta de Texto)
            
            // Mostrar botones de navegación después de la respuesta final
            nextButtons = [];
            if (menuStack.length > 1) {
                nextButtons.push(window.CHATBOT_RESPONSES.COMMON.RETURN_TO_PREVIOUS_MENU);
            }
            nextButtons.push(window.CHATBOT_RESPONSES.COMMON.RETURN_TO_MAIN_MENU);
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
    chatbotContainer.classList.toggle('open', chatbotOpen); 
    lottieChatbotToggler.classList.toggle('hidden', chatbotOpen); 

    if (chatbotOpen) {
        // Inicializar el chat con el mensaje de bienvenida si está vacío
        if (chatbotBody.children.length === 0) { 
            processChatInput('VOLVER'); // Dispara la lógica de inicialización
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
        
        if (text && !userInput.disabled) {
            // Simular el clic del botón si hay texto y el input está habilitado
            appendMessage('user', text); 
            
            // Si el input está habilitado, significa que el bot espera texto libre (o que no hay menú). 
            // Como este bot es de menú, solo procesamos comandos de navegación como texto.
            if (text.toUpperCase() === 'VOLVER') {
                processChatInput('VOLVER');
            } else if (text.toUpperCase() === 'MENU_ANTERIOR') {
                processChatInput('MENU_ANTERIOR');
            } else {
                // Cualquier otro texto libre es un error en este bot basado en menú
                processChatInput('INVALID_INPUT_TEXT_TRIGGER'); 
            }
            userInput.value = '';
        } else if (!text && !userInput.disabled) {
             // Si presiona ENTER sin texto
             processChatInput('INVALID_INPUT_TEXT_TRIGGER'); 
        }
    });
});
