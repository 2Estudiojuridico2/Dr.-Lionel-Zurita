// Variable global para rastrear el estado del chatbot (en qué menú estamos)
let currentState = 'PRINCIPAL';

// --- CONFIGURACIÓN DE ARCHIVOS ---
// ¡Importante! El archivo respuestas.js debe cargarse en el HTML ANTES de este archivo.

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa el estado del chatbot al cargar
    displayWelcomeMessage(); 
    
    // Hace que ENTER funcione para enviar el mensaje
    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                processUserQuery();
            }
        });
    }

    // Asegura que el contenedor esté en la vista al cargar (si quieres que esté visible)
    const container = document.getElementById('chatbot-container');
    if (container) {
        container.style.display = 'flex'; 
    }
});

// Función para mostrar el mensaje de bienvenida y el menú principal
function displayWelcomeMessage() {
    appendMessage(RESPUESTAS_FAMILIA['WELCOME'] + '<br>' + RESPUESTAS_FAMILIA['MENU_PRINCIPAL'], 'bot');
    currentState = 'PRINCIPAL';
}

// Función para mostrar/ocultar el widget completo
window.toggleChat = function() {
    const container = document.getElementById('chatbot-container');
    container.style.display = (container.style.display === 'none' || container.style.display === '') ? 'flex' : 'none';
}

// Función principal de la lógica del Chatbot
window.processUserQuery = function() {
    const inputField = document.getElementById('user-input');
    const query = inputField.value.trim().toUpperCase();
    inputField.value = ''; // Limpiar input

    if (!query) return;

    // 1. Agregar el mensaje del usuario
    appendMessage(query, 'user');

    // 2. Procesar la respuesta
    setTimeout(() => {
        handleQuery(query);
    }, 500);
}

// Lógica de respuesta central basada en el estado actual
function handleQuery(query) {
    let responseKey = 'ERROR';
    let nextState = currentState;

    if (query === 'MENÚ' || query === 'MENU') {
        responseKey = 'WELCOME';
        nextState = 'PRINCIPAL';
    } 
    // ---- ESTADO PRINCIPAL (Pide 1, 2, 3, 4, 5) ----
    else if (currentState === 'PRINCIPAL') {
        if (query === '1') {
            responseKey = 'OPCIONES_1';
            nextState = '1';
        } else if (query === '2') {
            responseKey = 'OPCIONES_2';
            nextState = '2';
        } else if (query === '3') {
            responseKey = 'OPCIONES_3';
            nextState = '3';
        } else if (query === '4') {
            responseKey = 'OPCIONES_4';
            nextState = '4';
        } else if (query === '5') {
            responseKey = 'OPCIONES_5';
            nextState = '5'; // Se mantiene en este estado (o puede volver a principal)
        }
    } 
    // ---- ESTADOS DE SUB-MENÚS (Pide 1.1, 2.2, 3.1, etc.) ----
    else if (currentState === '1' && RESPUESTAS_FAMILIA[`${currentState}.${query}`]) {
        responseKey = `${currentState}.${query}`;
        // Después de la respuesta, volvemos a mostrar el sub-menú
        nextState = '1'; 
    } else if (currentState === '2' && RESPUESTAS_FAMILIA[`${currentState}.${query}`]) {
        responseKey = `${currentState}.${query}`;
        nextState = '2';
    } else if (currentState === '3' && RESPUESTAS_FAMILIA[`${currentState}.${query}`]) {
        responseKey = `${currentState}.${query}`;
        nextState = '3';
    } else if (currentState === '4' && RESPUESTAS_FAMILIA[`${currentState}.${query}`]) {
        responseKey = `${currentState}.${query}`;
        nextState = '4';
    }

    // 3. Agregar la respuesta del bot
    const finalResponse = RESPUESTAS_FAMILIA[responseKey];
    appendMessage(finalResponse, 'bot');
    
    // Si la respuesta fue una pregunta específica, volvemos a mostrar el submenú para guiar al usuario
    if (responseKey.includes('.') && responseKey !== 'ERROR') {
        setTimeout(() => {
            appendMessage(`---<br>Continúe con las opciones de ${RESPUESTAS_FAMILIA[currentState]}, o escriba **MENÚ** para volver.`, 'bot');
        }, 1000);
    } else if (nextState !== 'PRINCIPAL' && responseKey !== 'WELCOME' && responseKey !== 'ERROR' && responseKey !== 'OPCIONES_5') {
        // Si entramos a un submenú (OPCIONES_1, OPCIONES_2...), mostramos la lista de preguntas
        appendMessage(RESPUESTAS_FAMILIA[`OPCIONES_${nextState}`], 'bot');
    }
    
    // 4. Actualizar el estado
    currentState = nextState;
}


// Función para añadir mensajes al cuerpo del chat y hacer scroll
function appendMessage(text, sender) {
    const body = document.getElementById('chatbot-body');
    if (!body) return;
    
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    
    // Usamos innerHTML para que reconozca los <br> y los enlaces
    messageElement.innerHTML = text.replace(/\n/g, '<br>');

    body.appendChild(messageElement);

    // Hacer scroll al último mensaje
    body.scrollTop = body.scrollHeight;
}
