// chatbot.js
let mainState = 'AREAS_PRINCIPAL'; // Para controlar el área principal actual (ej. 'FAMILY', 'LABORAL')
let currentMenuKey = 'MENU_AREAS_PRINCIPAL'; // La clave del menú/submenú actual que se está mostrando al usuario
let chatInitialized = false;
let chatbotBody; // Variable para almacenar el elemento del cuerpo del chat

document.addEventListener('DOMContentLoaded', () => {
    chatbotBody = document.getElementById('chatbot-body'); // Asignar al cargar el DOM

    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') processUserQuery();
        });
    }

    const sendButton = document.getElementById('send-button');
    if (sendButton) {
        sendButton.addEventListener('click', processUserQuery);
    }

    const openChatbotBtn = document.getElementById('chatbot-toggler');
    if (openChatbotBtn) {
        openChatbotBtn.addEventListener('click', toggleChat);
    }

    const closeChatBtn = document.getElementById('close-chat');
    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', toggleChat);
    }

    // Event listener para los botones generados dinámicamente
    if (chatbotBody) { // Asegurarse de que el elemento existe
        chatbotBody.addEventListener('click', (event) => {
            if (event.target.classList.contains('chat-button')) {
                handleButtonClick(event.target.dataset.value, event.target.textContent);
            }
        });
    }
});

function displayWelcomeMessage() {
    // Genera el mensaje de bienvenida y el menú principal
    // Asegurarse de que CHATBOT_RESPONSES y sus claves existan
    if (typeof CHATBOT_RESPONSES !== 'undefined' && CHATBOT_RESPONSES.COMMON && CHATBOT_RESPONSES.COMMON.WELCOME_MESSAGE && CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL) {
        // Limpiar el chat cada vez que se vuelve al menú principal
        chatbotBody.innerHTML = ''; 
        
        appendMessage(CHATBOT_RESPONSES.COMMON.WELCOME_MESSAGE, 'bot');
        appendButtons(CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL, 'bot', 'Selecciona un área para comenzar:');
    } else {
        appendMessage('¡Hola! Soy tu asistente legal. Error al cargar las opciones. Por favor, recarga la página o contacta al administrador.', 'bot');
        console.error("CHATBOT_RESPONSES o sus claves COMMON.WELCOME_MESSAGE/MENU_AREAS_PRINCIPAL no están definidas.");
    }
    mainState = 'AREAS_PRINCIPAL';
    currentMenuKey = 'MENU_AREAS_PRINCIPAL';
    chatInitialized = true;
}

window.toggleChat = function() {
    const container = document.getElementById('chatbot-container');
    if (!container) return;

    container.classList.toggle('show');

    if (container.classList.contains('show') && !chatInitialized) {
        displayWelcomeMessage();
    } else if (container.classList.contains('show') && chatInitialized) {
        // Si ya está inicializado y se vuelve a abrir, asegurar que muestre el menú actual (o el principal)
        if (mainState === 'AREAS_PRINCIPAL') {
            displayWelcomeMessage(); // Para asegurar que siempre muestra el menú principal al reabrir desde AREAS_PRINCIPAL
        } else {
            // Si está en un submenú, intentar mostrar los botones de ese submenú de nuevo
            const currentMenu = CHATBOT_RESPONSES[mainState] && CHATBOT_RESPONSES[mainState][currentMenuKey] ? CHATBOT_RESPONSES[mainState][currentMenuKey] : CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL;
            const currentIntroText = mainState === 'AREAS_PRINCIPAL' ? 'Selecciona un área para comenzar:' : `Has vuelto al menú de ${mainState.charAt(0).toUpperCase() + mainState.slice(1).toLowerCase()}. Selecciona una opción:`;
            
            chatbotBody.innerHTML = ''; // Limpiar el chat antes de mostrar el menú
            if (Array.isArray(currentMenu)) { // Asegurarse de que sea un array de botones
                appendButtons(currentMenu, 'bot', currentIntroText);
            } else { // Si no es un array, solo mostrar un mensaje
                appendMessage(currentMenu, 'bot');
            }
        }
    }
};

function showTyping() {
    if (!chatbotBody) return; // Protección
    const el = document.createElement('div');
    el.classList.add('message', 'bot', 'typing');
    el.textContent = 'Escribiendo...';
    chatbotBody.appendChild(el);
    chatbotBody.scrollTo({ top: chatbotBody.scrollHeight, behavior: 'smooth' });
}

function removeTyping() {
    const typing = chatbotBody.querySelector('.typing'); // Usar chatbotBody
    if (typing) typing.remove();
}

// Procesa la entrada del usuario (ahora más orientada a texto libre o comandos especiales)
window.processUserQuery = function() {
    const input = document.getElementById('user-input');
    const raw = input.value.trim();
    if (!raw) return;

    appendMessage(raw, 'user'); // Mostrar lo que escribió el usuario

    const query = raw.toUpperCase();
    input.value = '';

    showTyping();
    setTimeout(() => {
        removeTyping();
        handleQuery(query);
    }, 600);
};

// Maneja los clics en los botones generados
function handleButtonClick(value, text) {
    appendMessage(text, 'user'); // Simular que el usuario "escribió" el botón

    showTyping();
    setTimeout(() => {
        removeTyping();
        handleQuery(value); // Procesar el valor del botón como si fuera una query
    }, 600);
}


function handleQuery(query) {
    let responseContent = CHATBOT_RESPONSES.COMMON.ERROR_INPUT_INVALIDO; // Respuesta por defecto de error
    let isButtonResponse = false;
    let customHtmlResponse = null; // Para respuestas de texto complejas como los baremos, que son HTML

    // Limpiar botones anteriores antes de procesar una nueva query
    removeExistingButtons();

    // Manejar comandos de navegación global
    if (query === 'VOLVER_AREAS' || query === 'VOLVER_AL_INICIO' || query === 'INICIO') {
        displayWelcomeMessage(); // Siempre vuelve al menú principal
        return;
    }
    if (query.endsWith('_BACK') || query === 'MENÚ_ANTERIOR') {
        // Lógica para volver al menú anterior dentro de un área, o al menú principal si es el primero
        if (mainState === 'AREAS_PRINCIPAL') {
            displayWelcomeMessage(); // Si ya estamos en el principal, lo volvemos a mostrar
            return;
        }

        const areaMenuKey = 'MENU_' + mainState; // Ej: 'MENU_FAMILY'
        if (CHATBOT_RESPONSES[mainState] && CHATBOT_RESPONSES[mainState][areaMenuKey]) {
            currentMenuKey = areaMenuKey;
            responseContent = CHATBOT_RESPONSES[mainState][currentMenuKey];
            isButtonResponse = true;
            appendMessage(`Has vuelto al menú de ${mainState.charAt(0).toUpperCase() + mainState.slice(1).toLowerCase()}.`, 'bot');
            appendButtons(responseContent, 'bot', 'Selecciona una opción:');
            return;
        } else {
            displayWelcomeMessage(); // Si no se encuentra el menú de área, ir al principal
            return;
        }
    }
    
    // Lógica para el estado principal (selección de área)
    if (mainState === 'AREAS_PRINCIPAL') {
        const areaMap = {
            'FAMILIA': 'FAMILY',       // Si el valor del botón es 'FAMILIA'
            'LABORAL': 'LABORAL',
            'SUCESIONES': 'SUCESIONES',
            'CONTRATOS': 'CONTRATOS',
            'TRANSITO': 'TRANSITO',
            'OTRAS_CONSULTAS': 'OTRAS_CONSULTAS' // Nuevo: para otras consultas no categorizadas
        };
        
        // Mapear el valor del botón directamente a la clave del área
        const targetArea = areaMap[query];

        if (targetArea) {
            mainState = targetArea; // Establecer el estado principal al área seleccionada
            // Ahora, intentar cargar el menú principal de esa área (ej. 'FAMILY.MENU_FAMILY')
            currentMenuKey = 'MENU_' + mainState; // Ej: 'MENU_FAMILY'
            if (CHATBOT_RESPONSES[mainState] && CHATBOT_RESPONSES[mainState][currentMenuKey]) {
                responseContent = CHATBOT_RESPONSES[mainState][currentMenuKey];
                isButtonResponse = true;
                appendMessage(`Entrando al área de ${mainState.charAt(0).toUpperCase() + mainState.slice(1).toLowerCase()}.`, 'bot');
            } else if (mainState === 'OTRAS_CONSULTAS' && CHATBOT_RESPONSES.COMMON.OTRAS_CONSULTAS_TEXT) {
                // Si es "Otras Consultas", mostrar un mensaje de texto directamente
                responseContent = CHATBOT_RESPONSES.COMMON.OTRAS_CONSULTAS_TEXT;
                appendMessage(responseContent, 'bot');
                // Después de este mensaje, mostrar el menú principal para que puedan volver
                appendButtons(CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL, 'bot', '¿Deseas volver a las áreas principales?');
                return; // Importante para evitar procesar como botones después
            } else {
                 console.error(`Menú para el área ${mainState} (${currentMenuKey}) no encontrado.`);
                 responseContent = CHATBOT_RESPONSES.COMMON.ERROR_CONTEXTO_INVALIDO;
            }
        } else {
            responseContent = CHATBOT_RESPONSES.COMMON.ERROR_INPUT_INVALIDO;
        }
    }
    // Lógica para submenús y preguntas frecuentes dentro de un área
    else if (mainState !== 'AREAS_PRINCIPAL') {
        const currentAreaResponses = CHATBOT_RESPONSES[mainState];

        // *** LÓGICA PARA BAREMOS Y OTROS CONTENIDOS HTML ***
        if (query.startsWith('BAREMO_') && CHATBOT_RESPONSES.BAREMO_Y_DAÑO && CHATBOT_RESPONSES.BAREMO_Y_DAÑO[query.replace('BAREMO_','')]){
            customHtmlResponse = formatBaremoInfo(CHATBOT_RESPONSES.BAREMO_Y_DAÑO[query.replace('BAREMO_','')]);
            // Después de mostrar la información, se puede volver a mostrar el menú actual
            responseContent = CHATBOT_RESPONSES[mainState][currentMenuKey]; // Para mostrar los botones del menú anterior
            isButtonResponse = true;
        }
        // *** FIN LÓGICA PARA BAREMOS ***
        else if (currentAreaResponses && currentAreaResponses[query]) {
            const potentialResponse = currentAreaResponses[query];
            if (Array.isArray(potentialResponse)) {
                currentMenuKey = query;
                responseContent = potentialResponse;
                isButtonResponse = true;
            } else {
                responseContent = potentialResponse;
            }
        } else {
            responseContent = CHATBOT_RESPONSES.COMMON.ERROR_CONTEXTO_INVALIDO;
        }
    }

    // Finalmente, mostrar la respuesta
    if (customHtmlResponse) {
        appendMessage(customHtmlResponse, 'bot'); // Muestra el HTML formateado
        // Si después de un HTML complejo queremos que aparezcan botones, se añaden aquí
        if (isButtonResponse && Array.isArray(responseContent)) {
             appendButtons(responseContent, 'bot', '¿Deseas explorar otra opción?');
        } else if (mainState !== 'AREAS_PRINCIPAL' && CHATBOT_RESPONSES[mainState] && CHATBOT_RESPONSES[mainState][currentMenuKey]) {
            // Si no hay botones específicos, pero estamos en un área, mostrar el menú de esa área
            appendButtons(CHATBOT_RESPONSES[mainState][currentMenuKey], 'bot', '¿Deseas explorar otra opción?');
        } else if (mainState === 'AREAS_PRINCIPAL') {
            appendButtons(CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL, 'bot', '¿Necesitas algo más?');
        }
    } else if (isButtonResponse && Array.isArray(responseContent)) {
        appendButtons(responseContent, 'bot', 'Selecciona una opción:');
    } else {
        appendMessage(responseContent, 'bot');
        // Después de una respuesta de texto, podríamos querer volver a mostrar los botones del menú actual
        // Esto previene que el usuario tenga que escribir "MENÚ"
        if (mainState !== 'AREAS_PRINCIPAL' && CHATBOT_RESPONSES[mainState] && CHATBOT_RESPONSES[mainState][currentMenuKey]) {
            appendButtons(CHATBOT_RESPONSES[mainState][currentMenuKey], 'bot', '¿Algo más sobre este tema?');
        } else if (mainState === 'AREAS_PRINCIPAL' && currentMenuKey === 'MENU_AREAS_PRINCIPAL') {
            appendButtons(CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL, 'bot', '¿Algo más?');
        }
    }
}

// Función para remover los botones existentes
function removeExistingButtons() {
    const existingButtonGroups = chatbotBody.querySelectorAll('.button-group');
    existingButtonGroups.forEach(group => group.remove());
}


// Nueva función para formatear la información del baremo (sin cambios, ya que estaba bien)
function formatBaremoInfo(baremoData) {
    let html = `<div class="baremo-info">`; // Contenedor para aplicar estilos específicos

    html += `<strong>${baremoData.NOMBRE}</strong><br><br>`;

    html += `<strong>Fundamento:</strong><ul>`;
    baremoData.FUNDAMENTO.forEach(item => { html += `<li>${item}</li>`; });
    html += `</ul><br>`;

    html += `<strong>Descripción:</strong><br>${baremoData.DESCRIPCION.trim().replace(/\n/g, '<br>')}<br><br>`;

    if (baremoData.FACTORES_PONDERACION && baremoData.FACTORES_PONDERACION.length > 0) {
        html += `<strong>Factores de Ponderación:</strong><ul>`;
        baremoData.FACTORES_PONDERACION.forEach(item => { html += `<li>${item}</li>`; });
        html += `</ul><br>`;
    }

    if (baremoData.COMPONENTES && baremoData.COMPONENTES.length > 0) {
        html += `<strong>Componentes del Daño:</strong><ul>`;
        baremoData.COMPONENTES.forEach(item => { html += `<li>${item}</li>`; });
        html += `</ul><br>`;
    }

    html += `<strong>Método de Cálculo:</strong><br>${baremoData.METODO_CALCULO.trim().replace(/\n/g, '<br>')}<br><br>`;

    if (baremoData.OBSERVACIONES) {
        html += `<strong>Observaciones:</strong><br>${baremoData.OBSERVACIONES.trim().replace(/\n/g, '<br>')}<br><br>`;
    }

    html += `</div>`; // Cierra el contenedor baremo-info
    return html;
}

function appendMessage(text, sender) {
    if (!chatbotBody) return; // Protección

    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    let html = text
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>'); 
    msg.innerHTML = html;
    chatbotBody.appendChild(msg);
    chatbotBody.scrollTo({ top: chatbotBody.scrollHeight, behavior: 'smooth' });
}

// Función para agregar botones al chat
function appendButtons(options, sender, introText = 'Selecciona una opción:') {
    if (!chatbotBody) return; // Protección

    // No eliminar botones anteriores aquí, se hace antes en handleQuery
    
    // Mensaje introductorio
    if (introText) {
        const introMsg = document.createElement('div');
        introMsg.classList.add('message', 'bot');
        introMsg.innerHTML = introText;
        chatbotBody.appendChild(introMsg);
    }

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-group', sender);

    options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('chat-button');
        button.textContent = option.text;
        button.dataset.value = option.value; // Guardar el valor a procesar
        buttonContainer.appendChild(button);
    });
    chatbotBody.appendChild(buttonContainer);
    chatbotBody.scrollTo({ top: chatbotBody.scrollHeight, behavior: 'smooth' });
}

            
