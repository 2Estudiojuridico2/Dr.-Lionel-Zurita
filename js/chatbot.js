let currentState = 'PRINCIPAL';
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
});

function displayWelcomeMessage() {
    // Asegúrate de que RESPUESTAS_FAMILIA esté definido y accesible.
    // Podría ser necesario que sea una variable global en respuestas.js o importada.
    if (typeof RESPUESTAS_FAMILIA !== 'undefined' && RESPUESTAS_FAMILIA['WELCOME'] && RESPUESTAS_FAMILIA['MENU_PRINCIPAL']) {
        appendMessage(RESPUESTAS_FAMILIA['WELCOME'] + '<br><br>' + RESPUESTAS_FAMILIA['MENU_PRINCIPAL'], 'bot');
    } else {
        appendMessage('¡Hola! Soy tu asistente legal. Por favor, selecciona una opción del menú principal.<br><br>1. Derecho de Familia<br>2. Derecho Laboral<br>3. Sucesiones<br>4. Contratos<br>5. Contacto Personal', 'bot');
    }
    currentState = 'PRINCIPAL';
    chatInitialized = true;
}

window.toggleChat = function() {
    const container = document.getElementById('chatbot-container');
    if (!container) return; // Asegurarse de que el contenedor existe

    // Toggle la clase 'show' para controlar la visibilidad con CSS
    container.classList.toggle('show');

    // Inicializar el mensaje de bienvenida si el chat se está abriendo por primera vez
    if (container.classList.contains('show') && !chatInitialized) {
        displayWelcomeMessage();
    }
    // Opcional: si quieres reiniciar el chat cada vez que se abre
    // else if (container.classList.contains('show') && chatInitialized) {
    //     // Limpiar mensajes anteriores o volver a mostrar el menú principal
    //     const chatBody = document.getElementById('chatbot-body');
    //     if (chatBody) chatBody.innerHTML = '';
    //     displayWelcomeMessage();
    // }
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

window.processUserQuery = function() {
    const input = document.getElementById('user-input');
    const raw = input.value.trim();
    if (!raw) return;
    const query = raw.toUpperCase();
    input.value = '';
    appendMessage(raw, 'user');
    showTyping();
    setTimeout(() => {
        removeTyping();
        handleQuery(query);
    }, 600);
};

function handleQuery(query) {
    let responseKey = 'ERROR';
    let nextState = currentState;

    if (['MENÚ', 'MENU', 'INICIO', 'REINICIAR'].includes(query)) {
        responseKey = 'MENU_PRINCIPAL';
        nextState = 'PRINCIPAL';
    } else if (currentState === 'PRINCIPAL') {
        if (['1', '2', '3', '4', '5'].includes(query)) {
            responseKey = `OPCIONES_${query}`;
            nextState = query; // El nuevo estado es el número del tema principal
        } else {
            responseKey = 'ERROR';
        }
    } else if (query.match(/^\d\.\d$/)) { // Maneja sub-opciones como 1.1, 1.2
        const prefix = query.split('.')[0];
        // Verificar si la sub-opción es válida para el estado actual
        if (prefix === currentState && RESPUESTAS_FAMILIA[query]) {
            responseKey = query;
            nextState = currentState; // Permanece en el submenú del tema principal
        } else if (RESPUESTAS_FAMILIA[query]) { // Si intenta preguntar una sub-opción de otro tema
             responseKey = 'ERROR_CONTEXTO'; // Mensaje de error más específico
             nextState = currentState; // Permanece en el estado actual
        } else {
            responseKey = 'ERROR';
        }
    } else if (currentState === '5' && !['MENÚ', 'MENU', 'INICIO', 'REINICIAR'].includes(query)) {
        // Si ya se mostró el contacto, cualquier otra entrada que no sea para reiniciar, es un error
        responseKey = 'ERROR';
        nextState = 'PRINCIPAL'; // Forzar a volver al menú principal
    } else {
        responseKey = 'ERROR';
    }

    // Asegurarse de que la clave de respuesta exista antes de usarla
    if (RESPUESTAS_FAMILIA[responseKey]) {
        appendMessage(RESPUESTAS_FAMILIA[responseKey], 'bot');
    } else {
        // Fallback si la clave de respuesta específica no existe
        appendMessage(RESPUESTAS_FAMILIA['ERROR'] || 'Lo siento, no entiendo tu consulta. Por favor, intenta de nuevo o escribe "MENÚ" para ver las opciones principales.', 'bot');
    }
    
    currentState = nextState;
}


function appendMessage(text, sender) {
    const body = document.getElementById('chatbot-body');
    if (!body) return;
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    let html = text
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>') // Asegúrate de añadir rel="noopener noreferrer" por seguridad en enlaces externos
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
    msg.innerHTML = html;
    body.appendChild(msg);
    body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
}
