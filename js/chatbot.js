let currentState = 'PRINCIPAL';
let chatInitialized = false;

document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') processUserQuery();
        });
    }

    // AGREGAR EVENTO DE CLICK PARA EL BOTÓN DE ENVÍO
    const sendButton = document.getElementById('send-button');
    if (sendButton) {
        sendButton.addEventListener('click', processUserQuery);
    }

    // AGREGAR EVENTO DE CLICK PARA EL BOTÓN FLOTANTE (ABRIR/CERRAR)
    const openChatbotBtn = document.getElementById('chatbot-toggler');
    if (openChatbotBtn) {
        openChatbotBtn.addEventListener('click', toggleChat);
    }

    // AGREGAR EVENTO DE CLICK PARA EL BOTÓN DE CERRAR DENTRO DEL CHAT
    const closeChatBtn = document.getElementById('close-chat');
    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', toggleChat);
    }
});

function displayWelcomeMessage() {
    appendMessage(RESPUESTAS_FAMILIA['WELCOME'] + '<br><br>' + RESPUESTAS_FAMILIA['MENU_PRINCIPAL'], 'bot');
    currentState = 'PRINCIPAL';
    chatInitialized = true;
}

window.toggleChat = function() {
    const container = document.getElementById('chatbot-container'); // ID CORREGIDO AQUÍ
    if (container.classList.contains('show')) {
        container.classList.remove('show');
        // Opcional: si quieres reiniciar el estado o el chat al cerrar
        // currentState = 'PRINCIPAL';
        // chatInitialized = false;
    } else {
        container.classList.add('show');
        if (!chatInitialized) displayWelcomeMessage();
    }
};

function showTyping() {
    const body = document.getElementById('chatbot-body'); // ID CORREGIDO AQUÍ
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
    const query = raw.toUpperCase(); // Convertimos a mayúsculas para las búsquedas
    input.value = '';
    appendMessage(raw, 'user'); // Mostramos el mensaje original del usuario
    showTyping();
    setTimeout(() => {
        removeTyping();
        handleQuery(query);
    }, 600);
};

function handleQuery(query) {
    let key = 'ERROR';
    let next = currentState; // Mantener el estado actual por defecto

    // Reiniciar o ir al menú principal
    if (['MENÚ', 'MENU', 'INICIO', 'REINICIAR'].includes(query)) {
        key = 'MENU_PRINCIPAL';
        next = 'PRINCIPAL';
    }
    // Manejar opciones del menú principal (1, 2, 3, 4, 5)
    else if (currentState === 'PRINCIPAL' && ['1', '2', '3', '4', '5'].includes(query)) {
        key = `OPCIONES_${query}`;
        next = query; // El nuevo estado es el número del tema principal
    }
    // Manejar sub-opciones (1.1, 1.2, etc.)
    else if (query.match(/^\d\.\d$/) && RESPUESTAS_FAMILIA[query]) { // Verifica formato X.X y existencia
        const prefix = query.split('.')[0];
        // Si el prefijo de la pregunta coincide con el estado actual del tema, o estamos en el menú principal
        // (esto último puede ser opcional si queremos que siempre pase por el submenú)
        if (prefix === currentState || currentState === 'PRINCIPAL') {
            key = query;
            // No cambiamos el estado aquí, permanecemos en el submenú o volvemos a PRINCIPAL después de la respuesta
            // Podríamos volver a "PRINCIPAL" o al "prefijo" del submenú.
            // Si quieres que después de responder una pregunta 1.1, siga en "1", usa `next = prefix;`
            // Si quieres que después de 1.1 vuelva al menú principal, usa `next = 'PRINCIPAL';`
            // Por simplicidad para este ejemplo, lo dejaremos para que al responder 1.1,
            // luego al escribir "MENÚ" vuelva al principal, o si pone otra 1.X, siga en el mismo flujo.
        } else {
            // Si intenta preguntar 2.1 estando en el menú de "Cuota Alimentaria" (estado 1)
            key = 'ERROR';
        }
    }
    // Si el usuario escribe una palabra clave de tema principal directamente (ej. "CUOTA ALIMENTARIA")
    else if (Object.values(RESPUESTAS_FAMILIA).some(res => res.includes(query))) {
        // Esto es más flexible, pero puede llevar a ambigüedades.
        // Por simplicidad, nos basamos en los números y "MENÚ"
        key = 'ERROR'; // Por ahora, mantenemos la estrictez de números
    }


    // Si el usuario entró a la opción 5 "Contacto Personal" y luego quiere otra cosa que no sea MENÚ
    if (currentState === '5' && !['MENÚ', 'MENU', 'INICIO', 'REINICIAR'].includes(query)) {
        // Asumiendo que después de mostrar el contacto, no hay más opciones para ese estado
        // y debería volver al menú principal si quiere hacer otra consulta.
        key = 'ERROR';
        next = 'PRINCIPAL';
    }

    appendMessage(RESPUESTAS_FAMILIA[key], 'bot');
    currentState = next;
}

function appendMessage(text, sender) {
    const body = document.getElementById('chatbot-body'); // ID CORREGIDO AQUÍ
    if (!body) return;
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    let html = text
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>'); // Convierte saltos de línea a <br>
    msg.innerHTML = html;
    body.appendChild(msg);
    body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
}
