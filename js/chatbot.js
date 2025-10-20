// Asegúrate de que este archivo se cargue después de CHATBOT_RESPONSES.js y lottie.min.js

// Estado global del chatbot
let chatbotOpen = false;
let currentChatState = 'COMMON.MENU_AREAS_PRINCIPAL'; // Estado inicial
let chatHistory = []; // Para almacenar el historial de mensajes
let typingTimeout; // Para controlar el "escribiendo..."

// Elementos del DOM
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotBody = document.getElementById('chatbot-body');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const closeChatButton = document.getElementById('close-chat');
const lottieChatbotToggler = document.getElementById('lottie-chatbot-toggler');
const whatsappFloatButton = document.querySelector('.whatsapp-float'); // Selector para el botón de WhatsApp

// =========================================================================
// INICIALIZACIÓN DE LOTTIE
// =========================================================================
let lottieAnimation;
if (lottieChatbotToggler) {
    lottieAnimation = lottie.loadAnimation({
        container: lottieChatbotToggler, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/lottie/lawyer-assistant.json' // Ruta a tu archivo JSON de Lottie
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
        // Reemplazar enlaces Markdown [Texto](URL) por <a> HTML
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
    let response = CHATBOT_RESPONSES;
    for (const part of parts) {
        if (response && response.hasOwnProperty(part)) {
            response = response[part];
        } else {
            console.error(`Ruta no encontrada en CHATBOT_RESPONSES: ${path} (parte fallida: ${part})`);
            return null;
        }
    }
    return response;
}

async function displayBotResponse(responseTextOrMenu, delay = 700) { // Retraso predeterminado de 0.7 segundos
    const typingIndicator = showTypingIndicator();
    await new Promise(resolve => setTimeout(resolve, delay));
    removeTypingIndicator(typingIndicator);

    if (typeof responseTextOrMenu === 'string') {
        addMessage(responseTextOrMenu, 'bot', true); // Permitir HTML para enlaces
    } else if (typeof responseTextOrMenu === 'object' && responseTextOrMenu !== null) {
        // Es un objeto de baremo
        displayBaremo(responseTextOrMenu); // displayBaremo ya añade el mensaje y el indicador
    }
    scrollChatToBottom();
}


function appendButtons(buttonsArray, promptMessage = "Deseas explorar otras áreas o volver al menú principal?") {
    // Eliminar botones anteriores si existen
    const oldButtons = chatbotBody.querySelectorAll('.chatbot-options-container');
    oldButtons.forEach(container => container.remove());

    // Mostrar un mensaje antes de los botones, solo si se proporciona y no es el menú principal la primera vez.
    // Omitimos el promptMessage si estamos en el menú principal y es el primer mensaje.
    const isInitialMainMenu = (currentChatState === 'COMMON.MENU_AREAS_PRINCIPAL' && chatbotBody.children.length <= 1); // <=1 para contar el mensaje de bienvenida
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
    clearTimeout(typingTimeout); // Limpiar cualquier "escribiendo..." pendiente
    removeTypingIndicator(chatbotBody.querySelector('.typing-indicator')); // Eliminar indicador si existe

    addMessage(text, 'user'); // Mostrar la opción seleccionada por el usuario
    processUserInput(value); // Procesar como si el usuario lo hubiera escrito
    userInput.value = ''; // Limpiar el input
}

function clearChat() {
    chatbotBody.innerHTML = '';
    chatHistory = [];
}

// =========================================================================
// LÓGICA DEL CHATBOT
// =========================================================================

function toggleChatbot() {
    chatbotOpen = !chatbotOpen;
    chatbotContainer.classList.toggle('open', chatbotOpen);
    lottieChatbotToggler.classList.toggle('hidden', chatbotOpen); // Ocultar/mostrar el lottie

    if (whatsappFloatButton) {
        whatsappFloatButton.classList.toggle('chatbot-container-open', chatbotOpen);
    }

    if (chatbotOpen) {
        lottieAnimation.pause(); // Pausar la animación cuando el chat se abre
        // Solo mostrar el mensaje de bienvenida y el menú si el chat está vacío
        if (chatbotBody.children.length === 0) {
            currentChatState = 'COMMON.MENU_AREAS_PRINCIPAL';
            displayBotResponse(CHATBOT_RESPONSES.COMMON.WELCOME_MESSAGE, 0) // Sin retraso para el primer mensaje
                .then(() => {
                    appendButtons(CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL, "¿En qué área jurídica necesitas asesoramiento hoy?");
                });
        }
        userInput.focus();
    } else {
        lottieAnimation.play(); // Reanudar la animación cuando el chat se cierra
        // Al cerrar, si el estado actual no es el principal, lo restablecemos y limpiamos el historial
        if (currentChatState !== 'COMMON.MENU_AREAS_PRINCIPAL') {
            currentChatState = 'COMMON.MENU_AREAS_PRINCIPAL';
            chatHistory = []; // Limpiar historial al volver al menú principal por cierre
        }
    }
}

async function processUserInput(input) {
    const cleanedInput = input.toUpperCase().trim();
    let stateHandled = false; // Bandera para saber si ya se encontró una respuesta

    // 1. Manejar comandos globales
    if (cleanedInput === 'VOLVER') {
        clearChat();
        currentChatState = 'COMMON.MENU_AREAS_PRINCIPAL';
        chatHistory = []; // Resetear historial
        await displayBotResponse(CHATBOT_RESPONSES.COMMON.WELCOME_MESSAGE);
        appendButtons(CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL, "¿En qué área jurídica necesitas asesoramiento hoy?");
        stateHandled = true;
    } else if (cleanedInput === 'MENU_ANTERIOR') {
        clearChat();
        if (chatHistory.length > 0) {
            chatHistory.pop(); // Eliminar el estado actual (que es el que estamos dejando)
            if (chatHistory.length > 0) {
                currentChatState = chatHistory.pop(); // Obtener el estado verdaderamente anterior
            } else {
                currentChatState = 'COMMON.MENU_AREAS_PRINCIPAL';
            }
        } else {
            currentChatState = 'COMMON.MENU_AREAS_PRINCIPAL';
        }

        // Recuperar la respuesta/menú del estado anterior
        let previousResponse = getNestedResponse(currentChatState);
            
        if (previousResponse) {
            if (Array.isArray(previousResponse)) {
                // Es un menú, mostramos el mensaje de bienvenida y los botones
                await displayBotResponse(CHATBOT_RESPONSES.COMMON.WELCOME_MESSAGE);
                appendButtons(previousResponse);
            } else if (typeof previousResponse === 'string' || (typeof previousResponse === 'object' && previousResponse.hasOwnProperty('NOMBRE'))) {
                // Si es un mensaje de texto o baremo, lo mostramos y luego los botones del nivel superior
                await displayBotResponse(previousResponse);
                const parentStateParts = currentChatState.split('.');
                parentStateParts.pop(); // Quitar el último elemento para ir al padre
                const parentMenuKey = parentStateParts.join('.');
                let parentMenu = getNestedResponse(parentMenuKey);
                if (Array.isArray(parentMenu)) {
                    appendButtons(parentMenu);
                } else {
                    appendButtons(CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL); // Fallback al menú principal
                }
            }
        } else {
            // Si el estado anterior no tiene una respuesta válida, volvemos al menú principal
            await displayBotResponse(CHATBOT_RESPONSES.COMMON.WELCOME_MESSAGE);
            appendButtons(CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL);
        }
        stateHandled = true;
    }


    // 2. Procesar entrada basada en el estado actual (si no se manejó con comandos globales)
    if (!stateHandled) {
        let currentResponses = getNestedResponse(currentChatState);
        let foundMatch = false;

        if (Array.isArray(currentResponses)) {
            // Si el estado actual es un menú de botones
            const selectedOption = currentResponses.find(opt => opt.value === cleanedInput);
            if (selectedOption) {
                const nextStatePath = selectedOption.value; // El value del botón es la clave del siguiente estado

                // Guardar el estado actual en el historial antes de cambiarlo
                chatHistory.push(currentChatState);
                currentChatState = nextStatePath; // Actualizar el estado

                let nextResponse = getNestedResponse(nextStatePath);
                
                if (nextResponse) {
                    if (Array.isArray(nextResponse)) {
                        await displayBotResponse(CHATBOT_RESPONSES.COMMON.WELCOME_MESSAGE);
                        appendButtons(nextResponse); // Mostrar el nuevo submenú
                    } else if (typeof nextResponse === 'string') {
                        // Es una respuesta de texto, pero puede haber un menú después de ella
                        await displayBotResponse(nextResponse);
                        // Después de mostrar el texto, buscar el menú correspondiente a la misma área
                        const areaKey = currentChatState.split('.')[0]; // Ej. "FAMILY"
                        const menuKey = `MENU_${areaKey}`; // Ej. "MENU_FAMILY"
                        const areaMenu = getNestedResponse(areaKey + '.' + menuKey); // Ruta completa: "FAMILY.MENU_FAMILY"
                        if (Array.isArray(areaMenu)) {
                            appendButtons(areaMenu); // Mostrar el menú de su área
                        } else {
                            appendButtons(CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL); // Fallback al menú principal
                        }
                    } else if (typeof nextResponse === 'object' && nextResponse.hasOwnProperty('NOMBRE')) {
                        // Es una clave de Baremo
                        await displayBaremo(nextResponse);
                        // Después de mostrar el baremo, volver al menú de su área
                        const areaKey = (currentChatState.includes('LABORAL')) ? 'LABORAL' : 'TRANSITO'; // Determinar el área basándose en la ruta
                        const menuKey = `MENU_${areaKey}`;
                        const areaMenu = getNestedResponse(areaKey + '.' + menuKey);
                        if (Array.isArray(areaMenu)) {
                            appendButtons(areaMenu);
                        } else {
                            appendButtons(CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL);
                        }
                    }
                } else {
                    // Si el value apunta a un string que es una clave de texto, úsalo directamente
                    const directResponse = getNestedResponse(nextStatePath);
                    if (typeof directResponse === 'string') {
                        await displayBotResponse(directResponse);
                        // Después de mostrar el texto, buscar el menú correspondiente a la misma área
                        const areaKey = currentChatState.split('.')[0]; // Ej. "FAMILY"
                        const menuKey = `MENU_${areaKey}`; // Ej. "MENU_FAMILY"
                        const areaMenu = getNestedResponse(areaKey + '.' + menuKey); // Ruta completa: "FAMILY.MENU_FAMILY"
                        if (Array.isArray(areaMenu)) {
                             appendButtons(areaMenu); // Mostrar el menú de su área
                        } else {
                             appendButtons(CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL); // Fallback al menú principal
                        }
                    } else if (typeof directResponse === 'object' && directResponse.hasOwnProperty('NOMBRE')) {
                        // Podría ser un baremo directamente del menú principal (ej. BAREMO_LABORAL)
                        await displayBaremo(directResponse);
                        const areaKey = (currentChatState.includes('LABORAL')) ? 'LABORAL' : 'TRANSITO'; // Determinar el área
                        const menuKey = `MENU_${areaKey}`;
                        const areaMenu = getNestedResponse(areaKey + '.' + menuKey);
                        if (Array.isArray(areaMenu)) {
                            appendButtons(areaMenu);
                        } else {
                            appendButtons(CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL);
                        }
                    } else {
                        // Si no se encuentra, es un error o una ruta final
                        await displayBotResponse(CHATBOT_RESPONSES.COMMON.ERROR_INPUT_INVALIDO);
                        // Volver al menú actual si no se encontró la opción
                        const currentMenu = getNestedResponse(chatHistory[chatHistory.length -1]); // Recuperar el último estado válido del historial
                        if (Array.isArray(currentMenu)) {
                            appendButtons(currentMenu);
                        } else {
                            appendButtons(CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL);
                        }
                    }
                }
                foundMatch = true;
            } else if (cleanedInput === 'OTRAS_CONSULTAS') {
                chatHistory.push(currentChatState); // Guardar estado actual
                currentChatState = 'COMMON.OTRAS_CONSULTAS_TEXT';
                await displayBotResponse(CHATBOT_RESPONSES.COMMON.OTRAS_CONSULTAS_TEXT);
                appendButtons([CHATBOT_RESPONSES.COMMON.RETURN_TO_MAIN_MENU, CHATBOT_RESPONSES.COMMON.RETURN_TO_PREVIOUS_MENU], "Deseas volver a las áreas principales o al menú anterior?");
                foundMatch = true;
            } else if (cleanedInput === 'CONTACTO_DIRECTO_GENERAL') {
                chatHistory.push(currentChatState); // Guardar estado actual
                currentChatState = 'COMMON.CONTACTO_DIRECTO_GENERAL';
                await displayBotResponse(CHATBOT_RESPONSES.COMMON.CONTACTO_DIRECTO_GENERAL);
                appendButtons([CHATBOT_RESPONSES.COMMON.RETURN_TO_MAIN_MENU, CHATBOT_RESPONSES.COMMON.RETURN_TO_PREVIOUS_MENU], "Deseas volver a las áreas principales o al menú anterior?");
                foundMatch = true;
            } else if (cleanedInput.startsWith('CONTACTO_PERSONAL_')) {
                // Manejar contactos personales específicos de cada área
                chatHistory.push(currentChatState); // Guardar estado actual
                currentChatState = cleanedInput; // El estado actual se convierte en la clave de contacto
                await displayBotResponse(getNestedResponse(cleanedInput));
                // Después del contacto, ofrecer volver al menú de esa área
                const areaKey = cleanedInput.replace('CONTACTO_PERSONAL_', '');
                const menuKey = `MENU_${areaKey}`;
                const areaMenu = getNestedResponse(areaKey + '.' + menuKey);
                if (Array.isArray(areaMenu)) {
                    appendButtons([CHATBOT_RESPONSES.COMMON.RETURN_TO_MAIN_MENU, CHATBOT_RESPONSES.COMMON.RETURN_TO_PREVIOUS_MENU], "Puedes volver al menú de " + areaKey.toLowerCase() + " o al principal.");
                } else {
                    appendButtons([CHATBOT_RESPONSES.COMMON.RETURN_TO_MAIN_MENU, CHATBOT_RESPONSES.COMMON.RETURN_TO_PREVIOUS_MENU]);
                }
                foundMatch = true;
            } else if (cleanedInput.startsWith('BAREMO_')) {
                // Manejar la visualización de los Baremos directamente
                chatHistory.push(currentChatState); // Guardar estado actual
                currentChatState = `BAREMO_Y_DAÑO.${cleanedInput.replace('BAREMO_','')}`; // Estado actual apunta al baremo
                const baremoData = getNestedResponse(`BAREMO_Y_DAÑO.${cleanedInput.replace('BAREMO_','')}`);
                if (baremoData) {
                    await displayBaremo(baremoData);
                    // Después de mostrar el baremo, volver al menú de su área
                    const areaKey = (cleanedInput === 'BAREMO_LABORAL') ? 'LABORAL' : 'TRANSITO';
                    const menuKey = `MENU_${areaKey}`;
                    const areaMenu = getNestedResponse(areaKey + '.' + menuKey);
                    if (Array.isArray(areaMenu)) {
                        appendButtons([CHATBOT_RESPONSES.COMMON.RETURN_TO_MAIN_MENU, CHATBOT_RESPONSES.COMMON.RETURN_TO_PREVIOUS_MENU]);
                    } else {
                        appendButtons([CHATBOT_RESPONSES.COMMON.RETURN_TO_MAIN_MENU, CHATBOT_RESPONSES.COMMON.RETURN_TO_PREVIOUS_MENU]);
                    }
                    foundMatch = true;
                }
            }
        }

        if (!foundMatch) {
            await displayBotResponse(CHATBOT_RESPONSES.COMMON.ERROR_INPUT_INVALIDO);
            // Volver a mostrar los botones del estado actual si no se encontró coincidencia
            let currentMenu = getNestedResponse(chatHistory[chatHistory.length -1]); // Recuperar el último estado válido del historial
            if (Array.isArray(currentMenu)) {
                appendButtons(currentMenu);
            } else {
                appendButtons(CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL); // Fallback
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

    addMessage(baremoHtml, 'bot', true); // Usar true para isHtml
    scrollChatToBottom();
}


// =========================================================================
// EVENT LISTENERS
// =========================================================================

sendButton.addEventListener('click', () => {
    const input = userInput.value;
    if (input.trim() !== '') {
        addMessage(input, 'user');
        processUserInput(input);
        userInput.value = '';
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});

closeChatButton.addEventListener('click', toggleChatbot);

// Inicialmente, el chatbot está cerrado, el lottie visible y reproduciéndose
chatbotContainer.classList.remove('open');
if (lottieChatbotToggler) {
    lottieChatbotToggler.classList.remove('hidden');
    lottieAnimation.play();
}
if (whatsappFloatButton) {
    whatsappFloatButton.classList.remove('chatbot-container-open');
}
