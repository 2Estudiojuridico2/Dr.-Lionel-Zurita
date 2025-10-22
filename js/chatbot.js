// Archivo: js/chatbot.js - Lógica Principal del Chatbot

// NOTA IMPORTANTE: Este archivo DEBE cargarse DESPUÉS de lottie.min.js y CHATBOT_RESPONSES.js.

// =========================================================================
// VARIABLES DE ESTADO Y ELEMENTOS DEL DOM
// =========================================================================
let chatbotOpen = false;
let currentChatState = 'COMMON.MENU_AREAS_PRINCIPAL'; // Estado inicial
let chatHistory = []; // Para almacenar el historial de estados de menú visitados
let typingTimeout; 

// Elementos del DOM (Se asume que existen en el HTML)
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotBody = document.getElementById('chatbot-body');
const chatbotinput = document.getElementById('chatbot-input');
const chatbotsendbtn = document.getElementById('chatbot-send-btn');
const chatclosebtn = document.getElementById('chat-close-btn');
const chatbotlottiebtn = document.getElementById('chatbot-lottie-btn');
const whatsappFloatbtn = document.querySelector('.whatsapp-float-btn');

// =========================================================================
// INICIALIZACIÓN DE LOTTIE
// =========================================================================
let lottieAnimation;
// Verificamos que el elemento exista y que la biblioteca lottie esté cargada
if (lottieChatbotToggler && typeof lottie !== 'undefined') {
    lottieAnimation = lottie.loadAnimation({
        container: lottieChatbotToggler,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        // Ruta del archivo Lottie (asumida desde la raíz del proyecto)
        path: 'assets/lottie/lawyer-assistant.json' 
    });
    lottieChatbotToggler.addEventListener('click', toggleChatbot);
}

// =========================================================================
// FUNCIONES DE UTILIDAD
// =========================================================================

function addMessage(message, sender, isHtml = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    if (isHtml) {
        // Soporte para enlaces Markdown [Texto](URL)
        const processedMessage = message.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
        messageDiv.innerHTML = processedMessage;
    } else {
        messageDiv.textContent = message;
    }
    chatbotBody.appendChild(messageDiv);
    scrollChatToBottom();
}

function scrollChatToBottom() {
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatbotBody.appendChild(typingDiv);
    scrollChatToBottom();
    return typingDiv;
}

function removeTypingIndicator(indicatorDiv) {
    if (indicatorDiv && indicatorDiv.parentNode) {
        indicatorDiv.parentNode.removeChild(indicatorDiv);
    }
}

function getNestedResponse(path) {
    const parts = path.split('.');
    // Usamos window.CHATBOT_RESPONSES, según el archivo de respuestas
    let response = window.CHATBOT_RESPONSES;
    for (const part of parts) {
        if (response && response.hasOwnProperty(part)) {
            response = response[part];
        } else {
            // Error de ruta si no se encuentra la clave
            return null;
        }
    }
    return response;
}

async function displayBotResponse(responseTextOrMenu, delay = 700) { 
    const typingIndicator = showTypingIndicator();
    await new Promise(resolve => setTimeout(resolve, delay));
    removeTypingIndicator(typingIndicator);

    if (typeof responseTextOrMenu === 'string') {
        addMessage(responseTextOrMenu, 'bot', true); 
    } else if (typeof responseTextOrMenu === 'object' && responseTextOrMenu !== null) {
        if (responseTextOrMenu.hasOwnProperty('NOMBRE')) {
             // Es un Baremo
             displayBaremo(responseTextOrMenu);
        } else {
            // Manejar caso inesperado
            addMessage(window.CHATBOT_RESPONSES.COMMON.ERROR_INPUT_INVALIDO, 'bot');
        }
    }
    scrollChatToBottom();
}


function appendButtons(buttonsArray, promptMessage = "Deseas explorar otras áreas o volver al menú principal?") {
    // Eliminar botones anteriores
    const oldButtons = chatbotBody.querySelectorAll('.chatbot-options-container');
    oldButtons.forEach(container => container.remove());

    // Decidir si mostrar el mensaje de prompt
    const isInitialMainMenu = (currentChatState === 'COMMON.MENU_AREAS_PRINCIPAL' && chatbotBody.children.length <= 1); 
    if (promptMessage && !isInitialMainMenu) {
        const promptDiv = document.createElement('div');
        promptDiv.classList.add('message', 'bot', 'prompt-message');
        promptDiv.textContent = promptMessage;
        chatbotBody.appendChild(promptDiv);
    }

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('chatbot-options-container');

    buttonsArray.forEach(buttonData => {
        const button = document.createElement('button');
        button.textContent = buttonData.text;
        button.dataset.value = buttonData.value;
        button.addEventListener('click', () => handleOptionClick(buttonData.value, buttonData.text));
        optionsContainer.appendChild(button);
    });
    chatbotBody.appendChild(optionsContainer);
    scrollChatToBottom();
}

function handleOptionClick(value, text) {
    clearTimeout(typingTimeout); 
    removeTypingIndicator(chatbotBody.querySelector('.typing-indicator')); 

    addMessage(text, 'user'); 
    processUserInput(value); 
    userInput.value = ''; 
}

function clearChat() {
    chatbotBody.innerHTML = '';
}

// =========================================================================
// LÓGICA DE NAVEGACIÓN PRINCIPAL (processUserInput)
// =========================================================================

function toggleChatbot() {
    chatbotOpen = !chatbotOpen;
    chatbotContainer.classList.toggle('open', chatbotOpen);
    lottieChatbotToggler.classList.toggle('hidden', chatbotOpen);

    if (whatsappFloatButton) {
        whatsappFloatButton.classList.toggle('chatbot-container-open', chatbotOpen);
    }

    if (chatbotOpen) {
        lottieAnimation?.pause(); 
        if (chatbotBody.children.length === 0) {
            currentChatState = 'COMMON.MENU_AREAS_PRINCIPAL';
            displayBotResponse(window.CHATBOT_RESPONSES.COMMON.WELCOME_MESSAGE, 0) 
                .then(() => {
                    appendButtons(window.CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL, "¿En qué área jurídica necesitas asesoramiento hoy?");
                });
        }
        userInput.focus();
    } else {
        lottieAnimation?.play(); 
        if (currentChatState !== 'COMMON.MENU_AREAS_PRINCIPAL') {
            currentChatState = 'COMMON.MENU_AREAS_PRINCIPAL';
            chatHistory = []; // Limpiar historial al volver al menú principal por cierre
        }
    }
}

async function processUserInput(input) {
    const cleanedInput = input.toUpperCase().trim();
    let stateHandled = false; 

    // --- 1. COMANDOS GLOBALES (VOLVER / MENU_ANTERIOR) ---
    if (cleanedInput === 'VOLVER') {
        clearChat();
        currentChatState = 'COMMON.MENU_AREAS_PRINCIPAL';
        chatHistory = []; // Resetear historial
        await displayBotResponse(window.CHATBOT_RESPONSES.COMMON.WELCOME_MESSAGE);
        appendButtons(window.CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL, "¿En qué área jurídica necesitas asesoramiento hoy?");
        stateHandled = true;
    } else if (cleanedInput === 'MENU_ANTERIOR') {
        clearChat();
        
        // El estado actual (currentChatState) es el último estado visitado.
        // Si es una respuesta final (texto/baremo), el menú que lo llamó está en chatHistory[chatHistory.length - 1]

        // 1. Quitar el estado actual del historial si fue agregado como el estado más reciente
        if (chatHistory.length > 0 && chatHistory[chatHistory.length - 1] === currentChatState) {
            chatHistory.pop(); 
        }
        
        // 2. Obtener y establecer el estado anterior
        if (chatHistory.length > 0) {
            currentChatState = chatHistory.pop(); 
        } else {
            currentChatState = 'COMMON.MENU_AREAS_PRINCIPAL';
        }

        let previousResponse = getNestedResponse(currentChatState);
            
        if (previousResponse && Array.isArray(previousResponse)) {
            // Caso A: El estado anterior era un menú. Lo volvemos a mostrar.
            await displayBotResponse(window.CHATBOT_RESPONSES.COMMON.WELCOME_MESSAGE, 0);
            appendButtons(previousResponse);
            
        } else {
            // Caso B: El estado anterior era una respuesta final (texto/baremo) o el menú principal.
            // Si el historial está vacío, vamos al menú principal.
            let previousMenuState = chatHistory.length > 0 ? chatHistory[chatHistory.length - 1] : 'COMMON.MENU_AREAS_PRINCIPAL';
            let previousMenu = getNestedResponse(previousMenuState);
            
            if (previousMenu && Array.isArray(previousMenu)) {
                await displayBotResponse(window.CHATBOT_RESPONSES.COMMON.WELCOME_MESSAGE, 0);
                // Si el menú anterior tiene una respuesta de bienvenida, la mostramos, sino no.
                appendButtons(previousMenu);
            } else {
                 // Fallback total
                await displayBotResponse(window.CHATBOT_RESPONSES.COMMON.WELCOME_MESSAGE);
                appendButtons(window.CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL);
            }
        }
        stateHandled = true;
    }


    // --- 2. PROCESAR OPCIÓN SELECCIONADA ---
    if (!stateHandled) {
        let currentResponses = getNestedResponse(currentChatState);
        let foundMatch = false;

        if (Array.isArray(currentResponses)) {
            // Si el estado actual es un menú de botones
            const selectedOption = currentResponses.find(opt => opt.value === cleanedInput);
            if (selectedOption) {
                const nextStatePath = selectedOption.value; 

                // Guardar el estado actual en el historial antes de cambiarlo
                chatHistory.push(currentChatState);
                currentChatState = nextStatePath; // Actualizar el estado

                let nextResponse = getNestedResponse(nextStatePath);
                
                if (nextResponse) {
                    if (Array.isArray(nextResponse)) {
                        // El siguiente estado es otro menú/submenú
                        await displayBotResponse(window.CHATBOT_RESPONSES.COMMON.WELCOME_MESSAGE);
                        appendButtons(nextResponse); 
                    } else if (typeof nextResponse === 'string' || (typeof nextResponse === 'object' && nextResponse.hasOwnProperty('NOMBRE'))) {
                        // El siguiente estado es una respuesta final (Texto/Baremo)
                        await displayBotResponse(nextResponse);
                        
                        // Buscamos el menú del área para seguir navegando
                        let areaKey;
                        if (nextStatePath.startsWith('BAREMO_Y_DAÑO.')) {
                            areaKey = nextStatePath.includes('LABORAL') ? 'LABORAL' : 'TRANSITO';
                        } else if (nextStatePath.includes('.')) {
                            areaKey = nextStatePath.split('.')[0]; 
                        } else {
                            areaKey = null; 
                        }

                        if (areaKey && !['COMMON', 'BAREMO_Y_DAÑO'].includes(areaKey)) {
                            const areaMenu = getNestedResponse(areaKey + '.' + 'MENU_' + areaKey); 
                            if (Array.isArray(areaMenu)) {
                                appendButtons(areaMenu, `¿Deseas otra consulta sobre ${areaKey.toLowerCase()} o prefieres volver al menú principal?`); 
                            } else {
                                appendButtons([window.CHATBOT_RESPONSES.COMMON.RETURN_TO_MAIN_MENU, window.CHATBOT_RESPONSES.COMMON.RETURN_TO_PREVIOUS_MENU]);
                            }
                        } else {
                            // Para respuestas COMMON o BAREMO_Y_DAÑO (que requieren retroceso simple)
                            appendButtons([window.CHATBOT_RESPONSES.COMMON.RETURN_TO_MAIN_MENU, window.CHATBOT_RESPONSES.COMMON.RETURN_TO_PREVIOUS_MENU]);
                        }
                    } else {
                        // Error de ruta
                        await displayBotResponse(window.CHATBOT_RESPONSES.COMMON.ERROR_INPUT_INVALIDO);
                        appendButtons(getNestedResponse(chatHistory[chatHistory.length - 1]) || window.CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL);
                    }
                } else {
                    // Error de ruta no encontrada
                    await displayBotResponse(window.CHATBOT_RESPONSES.COMMON.ERROR_INPUT_INVALIDO);
                    appendButtons(getNestedResponse(chatHistory[chatHistory.length - 1]) || window.CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL);
                }
                foundMatch = true;
            } 
        }
        
        // --- 3. Si no se encontró en el menú actual, es un error ---
        if (!foundMatch) {
            await displayBotResponse(window.CHATBOT_RESPONSES.COMMON.ERROR_INPUT_INVALIDO);
            let currentMenu = getNestedResponse(chatHistory[chatHistory.length -1]); 
            if (Array.isArray(currentMenu)) {
                appendButtons(currentMenu);
            } else {
                appendButtons(window.CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL);
            }
        }
    }
}

async function displayBaremo(baremoData) {
    let baremoHtml = `<div class="baremo-info">
        <h3>${baremoData.NOMBRE}</h3>
        <p><strong>Descripción:</strong> ${baremoData.DESCRIPCION}</p>
        <p><strong>Fundamento:</strong></p>
        <ul>`;
    baremoData.FUNDAMENTO.forEach(item => { baremoHtml += `<li>${item}</li>`; });
    baremoHtml += `</ul>
        <p><strong>Factores de Ponderación:</strong></p>
        <ul>`;
    baremoData.FACTORES_PONDERACION.forEach(item => { baremoHtml += `<li>${item}</li>`; });
    baremoHtml += `</ul>
        <p><strong>Componentes del Daño:</strong></p>
        <ul>`;
    baremoData.COMPONENTES.forEach(item => { baremoHtml += `<li>${item}</li>`; });
    baremoHtml += `</ul>
        <p><strong>Método de Cálculo:</strong> ${baremoData.METODO_CALCULO}</p>
        <p><strong>Observaciones:</strong> ${baremoData.OBSERVACIONES}</p>
    </div>`;

    addMessage(baremoHtml, 'bot', true); 
    scrollChatToBottom();
}


// =========================================================================
// EVENT LISTENERS
// =========================================================================

sendButton?.addEventListener('click', () => {
    const input = userInput.value;
    if (input.trim() !== '') {
        addMessage(input, 'user');
        processUserInput(input);
        userInput.value = '';
    }
});

userInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); 
        sendButton.click();
    }
});

closeChatButton?.addEventListener('click', toggleChatbot);

// Estado inicial al cargar
chatbotContainer?.classList.remove('open');
if (lottieChatbotToggler) {
    lottieChatbotToggler.classList.remove('hidden');
    lottieAnimation?.play();
}
if (whatsappFloatButton) {
    whatsappFloatButton.classList.remove('chatbot-container-open');
}
