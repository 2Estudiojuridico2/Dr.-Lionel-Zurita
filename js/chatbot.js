// chatbot.js
let mainState = 'AREAS_PRINCIPAL'; // Para controlar el área principal actual (ej. 'FAMILY', 'LABORAL')
let currentMenuKey = 'MENU_AREAS_PRINCIPAL'; // La clave del menú/submenú actual que se está mostrando al usuario
let chatInitialized = false;

document.addEventListener('DOMContentLoaded', () => {
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
    document.getElementById('chatbot-body').addEventListener('click', (event) => {
        if (event.target.classList.contains('chat-button')) {
            handleButtonClick(event.target.dataset.value, event.target.textContent);
        }
    });
});

function displayWelcomeMessage() {
    // Genera el mensaje de bienvenida y el menú principal
    if (typeof CHATBOT_RESPONSES !== 'undefined' && CHATBOT_RESPONSES['WELCOME_MESSAGE'] && CHATBOT_RESPONSES['MENU_AREAS_PRINCIPAL']) {
        appendMessage(CHATBOT_RESPONSES['WELCOME_MESSAGE'], 'bot');
        appendButtons(CHATBOT_RESPONSES['MENU_AREAS_PRINCIPAL'], 'bot');
    } else {
        appendMessage('¡Hola! Soy tu asistente legal. Error al cargar las opciones.', 'bot');
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
    }
};

function showTyping() {
    const body = document.getElementById('chatbot-body');
    const el = document.createElement('div');
    el.classList.add('message', 'bot', 'typing');
    el.textContent = 'Escribiendo...';
    body.appendChild(el);
    body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
}

function removeTyping() {
    const typing = document.querySelector('.typing');
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
    let response = CHATBOT_RESPONSES['ERROR_INPUT_INVALIDO']; // Respuesta por defecto de error
    let isButtonResponse = false; // Bandera para saber si la respuesta son botones

    // Manejar comandos de navegación global
    if (query === 'VOLVER_AREAS' || query === 'VOLVER') { // 'VOLVER' como texto libre
        displayWelcomeMessage(); // Vuelve al menú principal de áreas
        return; // Salir, ya se manejó la respuesta
    }
    if (query === 'MENU_FAMILIA_BACK' || query === 'MENU_LABORAL_BACK' || query === 'MENU_SUCESIONES_BACK' || query === 'MENU_CONTRATOS_BACK' || query === 'MENU_TRANSITO_BACK' || query === 'MENÚ') { // 'MENÚ' como texto libre
        // Vuelve al menú principal del área actual
        if (mainState !== 'AREAS_PRINCIPAL' && CHATBOT_RESPONSES[mainState] && CHATBOT_RESPONSES[mainState]['MENU_' + mainState]) {
             currentMenuKey = 'MENU_' + mainState;
             appendButtons(CHATBOT_RESPONSES[mainState][currentMenuKey], 'bot', `Escriba una opción o use los botones:`);
        } else {
             displayWelcomeMessage(); // Si no hay menú de área, vuelve al principal
        }
        return;
    }

    // Lógica para el estado principal (selección de área)
    if (mainState === 'AREAS_PRINCIPAL') {
        const areaMap = {
            'MENU_FAMILIA': 'FAMILY',
            'MENU_LABORAL': 'LABORAL',
            'MENU_SUCESIONES': 'SUCESIONES',
            'MENU_CONTRATOS': 'CONTRATOS',
            'MENU_TRANSITO': 'TRANSITO'
        };
        if (areaMap[query]) {
            mainState = areaMap[query]; // Establece el estado del área (ej. 'FAMILY')
            currentMenuKey = query; // Establece la clave del menú del área (ej. 'MENU_FAMILIA')
            response = CHATBOT_RESPONSES[mainState][currentMenuKey];
            isButtonResponse = true;
        } else {
            response = CHATBOT_RESPONSES['ERROR_INPUT_INVALIDO'];
        }
    }
    // Lógica para submenús y preguntas frecuentes dentro de un área
    else if (mainState !== 'AREAS_PRINCIPAL') {
        const currentAreaResponses = CHATBOT_RESPONSES[mainState];

        if (currentAreaResponses && currentAreaResponses[query]) {
            const potentialResponse = currentAreaResponses[query];
            if (Array.isArray(potentialResponse)) { // Es un submenú con botones
                currentMenuKey = query; // Actualiza el menú actual
                response = potentialResponse;
                isButtonResponse = true;
            } else { // Es una respuesta de pregunta frecuente o contacto
                response = potentialResponse;
                // Después de dar una respuesta, podemos volver al menú anterior
                // currentMenuKey se mantiene para que el usuario pueda "MENÚ" de nuevo
            }
        } else {
            response = CHATBOT_RESPONSES['ERROR_CONTEXTO_INVALIDO'];
        }
    }

    if (isButtonResponse) {
        appendButtons(response, 'bot', 'Selecciona una opción:');
    } else {
        appendMessage(response, 'bot');
    }
}


function appendMessage(text, sender) {
    const body = document.getElementById('chatbot-body');
    if (!body) return;

    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    let html = text
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
    msg.innerHTML = html;
    body.appendChild(msg);
    body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
}

// Función para agregar botones al chat
function appendButtons(options, sender, introText = 'Selecciona una opción:') {
    const body = document.getElementById('chatbot-body');
    if (!body) return;

    // Mensaje introductorio
    if (introText) {
        const introMsg = document.createElement('div');
        introMsg.classList.add('message', 'bot');
        introMsg.innerHTML = introText;
        body.appendChild(introMsg);
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
    body.appendChild(buttonContainer);
    body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
}
// chatbot.js
// ... (código existente de let mainState, currentMenuKey, document.addEventListener, etc.) ...

// ... (displayWelcomeMessage, toggleChat, showTyping, removeTyping, processUserQuery, handleButtonClick) ...

function handleQuery(query) {
    let response = CHATBOT_RESPONSES['ERROR_INPUT_INVALIDO'];
    let isButtonResponse = false;
    let customTextResponse = null; // Para respuestas de texto complejas como los baremos

    // Manejar comandos de navegación global
    if (query === 'VOLVER_AREAS' || query === 'VOLVER') {
        displayWelcomeMessage();
        return;
    }
    if (query.endsWith('_BACK') || query === 'MENÚ') {
        if (mainState !== 'AREAS_PRINCIPAL' && CHATBOT_RESPONSES[mainState]) {
            // Determinar la clave del menú principal del área actual
            let backMenuKey = 'MENU_' + mainState; // ej. 'MENU_FAMILIA'
            if (CHATBOT_RESPONSES[mainState][backMenuKey]) {
                currentMenuKey = backMenuKey;
                response = CHATBOT_RESPONSES[mainState][currentMenuKey];
                isButtonResponse = true;
                appendButtons(response, 'bot', `Has vuelto al menú de ${mainState.charAt(0).toUpperCase() + mainState.slice(1).toLowerCase()}. Selecciona una opción:`);
                return;
            }
        }
        displayWelcomeMessage(); // Si no hay menú de área, vuelve al principal
        return;
    }

    // Lógica para el estado principal (selección de área)
    if (mainState === 'AREAS_PRINCIPAL') {
        const areaMap = {
            'MENU_FAMILIA': 'FAMILY',
            'MENU_LABORAL': 'LABORAL',
            'MENU_SUCESIONES': 'SUCESIONES',
            'MENU_CONTRATOS': 'CONTRATOS',
            'MENU_TRANSITO': 'TRANSITO'
        };
        if (areaMap[query]) {
            mainState = areaMap[query];
            currentMenuKey = query;
            response = CHATBOT_RESPONSES[mainState][currentMenuKey];
            isButtonResponse = true;
        } else {
            response = CHATBOT_RESPONSES['ERROR_INPUT_INVALIDO'];
        }
    }
    // Lógica para submenús y preguntas frecuentes dentro de un área
    else if (mainState !== 'AREAS_PRINCIPAL') {
        const currentAreaResponses = CHATBOT_RESPONSES[mainState];

        // *** NUEVA LÓGICA PARA BAREMOS ***
        if (query === 'BAREMO_LABORAL_INFO' && CHATBOT_RESPONSES.BAREMO_Y_DAÑO.LABORAL) {
            customTextResponse = formatBaremoInfo(CHATBOT_RESPONSES.BAREMO_Y_DAÑO.LABORAL);
            // Después de mostrar la información, se mantiene el menú actual
            // Para que el usuario pueda volver al menú del área (ej. Laboral) con "MENÚ"
            response = CHATBOT_RESPONSES[mainState][currentMenuKey]; // Para mostrar los botones del menú anterior
            isButtonResponse = true;
        } else if (query === 'BAREMO_CIVIL_INFO' && CHATBOT_RESPONSES.BAREMO_Y_DAÑO.CIVIL) {
            customTextResponse = formatBaremoInfo(CHATBOT_RESPONSES.BAREMO_Y_DAÑO.CIVIL);
            // Después de mostrar la información, se mantiene el menú actual
            response = CHATBOT_RESPONSES[mainState][currentMenuKey]; // Para mostrar los botones del menú anterior
            isButtonResponse = true;
        }
        // *** FIN NUEVA LÓGICA PARA BAREMOS ***
        else if (currentAreaResponses && currentAreaResponses[query]) {
            const potentialResponse = currentAreaResponses[query];
            if (Array.isArray(potentialResponse)) {
                currentMenuKey = query;
                response = potentialResponse;
                isButtonResponse = true;
            } else {
                response = potentialResponse;
            }
        } else {
            response = CHATBOT_RESPONSES['ERROR_CONTEXTO_INVALIDO'];
        }
    }

    if (customTextResponse) {
        appendMessage(customTextResponse, 'bot');
        // Si después de un texto complejo queremos que aparezcan los botones del menú anterior
        // esto se maneja con la línea `response = CHATBOT_RESPONSES[mainState][currentMenuKey];`
        // y la siguiente llamada a appendButtons.
        if (isButtonResponse) { // Si también hay botones para mostrar después del texto
             appendButtons(response, 'bot', '¿Deseas explorar otra opción?');
        }
    } else if (isButtonResponse) {
        appendButtons(response, 'bot', 'Selecciona una opción:');
    } else {
        appendMessage(response, 'bot');
        // Después de una respuesta de texto, podríamos querer volver a mostrar los botones del menú actual
        // Esto previene que el usuario tenga que escribir "MENÚ"
        if (mainState !== 'AREAS_PRINCIPAL' && CHATBOT_RESPONSES[mainState] && CHATBOT_RESPONSES[mainState][currentMenuKey]) {
            appendButtons(CHATBOT_RESPONSES[mainState][currentMenuKey], 'bot', '¿Algo más sobre este tema?');
        } else if (mainState === 'AREAS_PRINCIPAL' && currentMenuKey === 'MENU_AREAS_PRINCIPAL') {
            appendButtons(CHATBOT_RESPONSES['MENU_AREAS_PRINCIPAL'], 'bot', '¿Algo más?');
        }
    }
}

// Nueva función para formatear la información del baremo
function formatBaremoInfo(baremoData) {
    let html = `<strong>${baremoData.NOMBRE}</strong><br><br>`;

    html += `**Fundamento:**<ul>`;
    baremoData.FUNDAMENTO.forEach(item => { html += `<li>${item}</li>`; });
    html += `</ul><br>`;

    html += `**Descripción:**<br>${baremoData.DESCRIPCION.trim().replace(/\n/g, '<br>')}<br><br>`;

    if (baremoData.FACTORES_PONDERACION) {
        html += `**Factores de Ponderación:**<ul>`;
        baremoData.FACTORES_PONDERACION.forEach(item => { html += `<li>${item}</li>`; });
        html += `</ul><br>`;
    }

    if (baremoData.COMPONENTES) {
        html += `**Componentes del Daño:**<ul>`;
        baremoData.COMPONENTES.forEach(item => { html += `<li>${item}</li>`; });
        html += `</ul><br>`;
    }

    html += `**Método de Cálculo:**<br>${baremoData.METODO_CALCULO.trim().replace(/\n/g, '<br>')}<br><br>`;

    if (baremoData.OBSERVACIONES) {
        html += `**Observaciones:**<br>${baremoData.OBSERVACIONES.trim().replace(/\n/g, '<br>')}<br><br>`;
    }

    // Añadir opciones para volver al menú anterior
    html += `Para más información, puedes volver al menú anterior.`;
    return html;
}

// ... (appendMessage y appendButtons existentes) ...
