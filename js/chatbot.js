// chatbot.js
// Variable global para rastrear el estado del chatbot (en qué menú estamos)
let currentState = 'PRINCIPAL';
let chatInitialized = false; // Bandera para saber si el chat ya mostró el mensaje de bienvenida

// --- CONFIGURACIÓN DE ARCHIVOS ---
// ¡Importante! El archivo respuestas.js debe cargarse en el HTML ANTES de este archivo.

document.addEventListener('DOMContentLoaded', () => {
    // Hace que ENTER funcione para enviar el mensaje
    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                processUserQuery();
            }
        });
    }
});

// Función para mostrar el mensaje de bienvenida y el menú principal
function displayWelcomeMessage() {
    appendMessage(RESPUESTAS_FAMILIA['WELCOME'] + '<br><br>' + RESPUESTAS_FAMILIA['MENU_PRINCIPAL'], 'bot');
    currentState = 'PRINCIPAL';
    chatInitialized = true;
}

// Función para mostrar/ocultar el widget completo
window.toggleChat = function() {
    const container = document.getElementById('chatbot-container');
    const chatbotBody = document.getElementById('chatbot-body'); // Necesario para limpiar o inicializar

    if (container.style.display === 'none' || container.style.display === '') {
        container.style.display = 'flex';
        // Si el chat no ha sido inicializado o se ha reseteado, muestra el mensaje de bienvenida
        if (!chatInitialized || chatbotBody.children.length === 0) {
            displayWelcomeMessage();
        }
    } else {
        container.style.display = 'none';
    }
}


// Función principal de la lógica del Chatbot
window.processUserQuery = function() {
    const inputField = document.getElementById('user-input');
    // Convertir a mayúsculas para las claves, pero solo el input real.
    // Mantenemos la original para el mensaje del usuario si fuera necesario.
    const rawQuery = inputField.value.trim();
    const query = rawQuery.toUpperCase();
    inputField.value = ''; // Limpiar input

    if (!rawQuery) return; // Si la entrada está vacía, no hacer nada

    // 1. Agregar el mensaje del usuario
    appendMessage(rawQuery, 'user'); // Mostrar el mensaje tal cual lo escribió el usuario

    // 2. Procesar la respuesta con un pequeño delay para simular que el bot "piensa"
    setTimeout(() => {
        handleQuery(query);
    }, 500);
}

// Lógica de respuesta central basada en el estado actual
function handleQuery(query) {
    let responseKey = 'ERROR'; // Mensaje de error por defecto
    let nextState = currentState; // El próximo estado, por defecto se mantiene

    // Siempre permitir "MENÚ" para volver al principal, sin importar el estado
    if (query === 'MENÚ' || query === 'MENU') {
        responseKey = 'MENU_PRINCIPAL';
        nextState = 'PRINCIPAL';
    }
    // ---- ESTADO PRINCIPAL (Pide 1, 2, 3, 4, 5) ----
    else if (currentState === 'PRINCIPAL') {
        if (['1', '2', '3', '4', '5'].includes(query)) {
            responseKey = `OPCIONES_${query}`; // Ejemplo: 'OPCIONES_1'
            nextState = query; // El próximo estado es el número del menú principal (ej. '1' para Familia)
        }
    }
    // ---- ESTADOS DE SUB-MENÚS (Pide 1.1, 2.2, 3.1, etc.) ----
    // Si estamos en un sub-estado (ej. '1' para Familia) y la query es una sub-opción (ej. '1.1')
    else if (RESPUESTAS_FAMILIA[query]) { // Busca si la query es una clave directa de respuesta (ej. "1.1", "2.1")
        // Asegurarse de que la sub-opción corresponda al menú actual
        const menuPrefix = query.split('.')[0]; // Obtiene '1', '2', etc. de '1.1'
        if (menuPrefix === currentState) {
            responseKey = query;
            // Después de dar la respuesta, mantenemos el estado del sub-menú
            // para que el usuario pueda seguir preguntando dentro de ese sub-tema
            // o se le recuerde cómo volver.
        } else {
            responseKey = 'ERROR'; // La opción no corresponde al menú actual
        }
    }


    // 3. Agregar la respuesta del bot
    const finalResponse = RESPUESTAS_FAMILIA[responseKey];
    appendMessage(finalResponse, 'bot');

    // 4. Lógica para guiar al usuario después de una respuesta
    if (responseKey.includes('.') && responseKey !== 'ERROR') { // Si la respuesta es de un sub-tema (ej. "1.1")
        setTimeout(() => {
            // Muestra un recordatorio de las opciones del submenú actual
            appendMessage(`---<br>Continúe con las opciones de **${RESPUESTAS_FAMILIA[currentState]}**, o escriba **MENÚ** para volver al principal.`, 'bot');
        }, 1000);
    } else if (responseKey.startsWith('OPCIONES_') && responseKey !== 'OPCIONES_5' && nextState !== 'PRINCIPAL') {
        // Si acabamos de mostrar un submenú (OPCIONES_1, OPCIONES_2, etc.),
        // el mensaje de las opciones ya se mostró, no necesitamos añadir nada más.
    } else if (responseKey === 'MENU_PRINCIPAL' || responseKey === 'WELCOME') {
        // No hay necesidad de añadir más mensajes si ya se ha mostrado el menú principal o bienvenida.
    }

    // 5. Actualizar el estado
    currentState = nextState;
}


// Función para añadir mensajes al cuerpo del chat y hacer scroll
function appendMessage(text, sender) {
    const body = document.getElementById('chatbot-body');
    if (!body) return;

    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);

    // Procesar Markdown para enlaces [Texto](URL) y negritas **Texto**
    let formattedText = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedText = formattedText.replace(/\n/g, '<br>'); // Convertir saltos de línea a <br>

    messageElement.innerHTML = formattedText;

    body.appendChild(messageElement);

    // Hacer scroll al último mensaje
    body.scrollTop = body.scrollHeight;
}
