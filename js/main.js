// =========================================================================
// 1. DATA (El cerebro del chatbot)
// =========================================================================
const CHATBOT_RESPONSES = {
    // =====================================================================
    // RESPUESTAS COMUNES / GLOBALES
    // =====================================================================
    COMMON: {
        WELCOME_MESSAGE: "¡Hola! Soy tu Asistente Legal. Navega por las áreas de práctica del Dr. Zurita para obtener información inmediata. ",
        ERROR_INPUT_INVALIDO: "Disculpa, no entendí esa opción. Por favor, selecciona una de las opciones del menú o escribe **VOLVER** para empezar de nuevo.",
        OTRAS_CONSULTAS: "Para consultas no listadas, te recomiendo contactar directamente al estudio. Nuestro staff puede evaluar tu caso de forma personalizada. [Más info aquí](otras-consultas.html).",
        CONTACTO_DIRECTO_GENERAL: "¡Claro! Puedes iniciar un contacto directo por WhatsApp al [+(54) 11 3197-6852](https://wa.me/5491131976852) o al Email [Dr.Zuritalionel@gmail.com](mailto:Dr.Zuritalionel@gmail.com).",
        
        // BOTONES GLOBALES DE NAVEGACIÓN
        RETURN_TO_MAIN_MENU: { text: "Volver al Menú Principal ↩️", value: "VOLVER" },
        RETURN_TO_PREVIOUS_MENU: { text: "Volver al Menú Anterior 🔙", value: "MENU_ANTERIOR" },

        // MENÚ PRINCIPAL 
        MENU_AREAS_PRINCIPAL: [
            { text: "Derecho de Familia 👨‍👩‍👧‍👦", value: "FAMILY.MENU_FAMILY" },
            { text: "Derecho Laboral 👷", value: "LABORAL.MENU_LABORAL" },
            { text: "Sucesiones y Herencias 📜", value: "SUCESIONES.MENU_SUCESIONES" },
            { text: "Accidentes de Tránsito 🚗", value: "TRANSITO.MENU_TRANSITO" },
            { text: "Otras Consultas ❓", value: "COMMON.OTRAS_CONSULTAS" },
            { text: "Contacto Directo 📲", value: "COMMON.CONTACTO_DIRECTO_GENERAL" }
        ]
    },

    // =====================================================================
    // ÁREA 1: FAMILIA
    // =====================================================================
    FAMILY: {
        // MENÚ FAMILIA
        MENU_FAMILY: [
            { text: "Divorcios y Uniones", value: "FAMILY.DIVORCIOS_TEXT" },
            { text: "Alimentos y Cuotas", value: "FAMILY.ALIMENTOS_TEXT" },
            { text: "Régimen de Comunicación", value: "FAMILY.REGIMEN_COMUNICACION_TEXT" },
            { text: "Contacto Familiar 👨‍⚖️", value: "CONTACTO_PERSONAL_FAMILY" },
            { text: "Volver al Menú Principal ↩️", value: "VOLVER" } 
        ],
        DIVORCIOS_TEXT: "El Dr. Zurita maneja divorcios de mutuo acuerdo y contenciosos. El proceso se inicia con la presentación de la demanda. Para un divorcio exprés, ambos deben estar de acuerdo. [Más info aquí](areas/familia.html).",
        ALIMENTOS_TEXT: "La cuota alimentaria se establece según las necesidades del menor y la capacidad económica del alimentante. Puedes iniciar el reclamo contactándonos. Recomendamos juntar comprobantes de gastos. ",
        REGIMEN_COMUNICACION_TEXT: "El régimen de comunicación busca garantizar el contacto del menor con el progenitor no conviviente. Esto se puede negociar o fijar judicialmente.",
    },

    // =====================================================================
    // ÁREA 2: LABORAL
    // =====================================================================
    LABORAL: {
        // MENÚ LABORAL
        MENU_LABORAL: [
            { text: "Despido sin Causa", value: "LABORAL.DESPIDO_TEXT" },
            { text: "Accidentes Laborales (ART)", value: "LABORAL.ACCIDENTE_LABORAL_TEXT" },
            { text: "Baremo de Indemnizaciones", value: "BAREMO_Y_DAÑO.BAREMO_LABORAL" }, 
            { text: "Contacto Laboral 💼", value: "CONTACTO_PERSONAL_LABORAL" },
            { text: "Volver al Menú Principal ↩️", value: "VOLVER" }
        ],
        DESPIDO_TEXT: "Si fuiste despedido sin causa justa, tienes derecho a una indemnización completa. Te asesoramos en el SECLO y en sede judicial. Recuerda que tienes dos años para iniciar el reclamo. ",
        ACCIDENTE_LABORAL_TEXT: "Reclamos ante la ART por lesiones. Es crucial tener el certificado médico y el telegrama de denuncia de la enfermedad/accidente. No firmes el alta médica sin asesoramiento.",
    },
    
    // =====================================================================
    // ÁREA 3: SUCESIONES
    // =====================================================================
    SUCESIONES: {
        // MENÚ SUCESIONES
        MENU_SUCESIONES: [
            { text: "Declaratoria de Herederos", value: "SUCESIONES.DECLARATORIA_TEXT" },
            { text: "Testamentos y Legados", value: "SUCESIONES.TESTAMENTOS_TEXT" },
            { text: "Requisitos de Sucesión", value: "SUCESIONES.REQUISITOS_TEXT" },
            { text: "Contacto Sucesorio 🏘️", value: "CONTACTO_PERSONAL_SUCESIONES" },
            { text: "Volver al Menú Principal ↩️", value: "VOLVER" }
        ],
        DECLARATORIA_TEXT: "La declaratoria de herederos es el paso principal. Se necesita la partida de defunción y los títulos de propiedad para comenzar. El proceso puede ser más rápido si es de un único heredero.",
        TESTAMENTOS_TEXT: "Te asistimos en la redacción de testamentos para asegurar el cumplimiento de tu voluntad, respetando las porciones legítimas. ",
        REQUISITOS_TEXT: "Se requiere: Partida de defunción, Libreta de Matrimonio, partidas de nacimiento de herederos y títulos de bienes.",
    },

    // =====================================================================
    // ÁREA 4: TRÁNSITO
    // =====================================================================
    TRANSITO: {
        // MENÚ TRÁNSITO
        MENU_TRANSITO: [
            { text: "Accidentes Viales", value: "TRANSITO.ACCIDENTES_TEXT" },
            { text: "Baremo de Daño Corporal", value: "BAREMO_Y_DAÑO.BAREMO_TRANSITO" }, 
            { text: "Servicio de Pericia Vial", value: "TRANSITO.PERICIA_TEXT" },
            { text: "Contacto Tránsito 🚨", value: "CONTACTO_PERSONAL_TRANSITO" },
            { text: "Volver al Menú Principal ↩️", value: "VOLVER" }
        ],
        ACCIDENTES_TEXT: "Como Accidentólogo Vial, el Dr. Zurita garantiza la mejor defensa y cálculo de indemnización. No aceptes acuerdos sin consultarnos. Siempre reporta el siniestro a tu aseguradora.",
        PERICIA_TEXT: "Ofrecemos pericias accidentológicas para determinar la causalidad del siniestro y la responsabilidad de los involucrados. Un informe pericial es clave en la demanda.",
    },

    // =====================================================================
    // DATOS ESTRUCTURADOS: BAREMOS
    // =====================================================================
    BAREMO_Y_DAÑO: {
        BAREMO_LABORAL: {
            NOMBRE: "Baremo de Indemnización Laboral (Fórmula Méndez)",
            DESCRIPCION: "Fórmula utilizada para calcular la indemnización por incapacidad permanente y total resultante de accidentes de trabajo o enfermedades profesionales (Ley 26.773).",
            FUNDAMENTO: [
                "Edad de la víctima",
                "Salario Base (Ingreso Base Mensual)",
                "Porcentaje de Incapacidad",
                "Factor de Ponderación (Ganancias futuras)",
            ],
            COMPONENTES: [
                "Daño material (Lucro cesante)",
                "Daño moral (Daño extrapatrimonial)",
            ],
            METODO_CALCULO: "IBM x 53 / 100 x (65 / Edad) x Porcentaje de Incapacidad + Daño Moral.",
            OBSERVACIONES: "El cálculo final incluye intereses desde la fecha del hecho hasta el pago efectivo.",
        },
        BAREMO_TRANSITO: {
            NOMBRE: "Baremo de Daño Corporal (Fórmula Vuoto)",
            DESCRIPCION: "Fórmula matemática comúnmente utilizada en Argentina para calcular el valor presente de la pérdida de capacidad de ganancia futura por lesiones en accidentes de tránsito. ",
            FUNDAMENTO: [
                "Edad de la víctima",
                "Ingreso Anual Afectado",
                "Porcentaje de Incapacidad (según baremo médico)",
                "Tasa de Interés para el cálculo financiero",
            ],
            COMPONENTES: [
                "Lucro Cesante (Pérdida de ganancia)",
                "Daño Psicológico (Tratamiento)",
                "Daño Moral (Afectaciones subjetivas)",
            ],
            METODO_CALCULO: "Cálculo financiero de valor presente con renta vitalicia decreciente hasta la edad de jubilación.",
            OBSERVACIONES: "El valor es solo una base. El juez puede aumentarlo o disminuirlo según la prueba.",
        }
    },

    // =====================================================================
    // CONTACTOS PERSONALES ESPECÍFICOS (Rutas finales)
    // =====================================================================
    CONTACTO_PERSONAL_FAMILY: "Para iniciar tu consulta de **Derecho de Familia**, haz clic en nuestro [WhatsApp directo](https://wa.me/5491131976852?text=Hola%2C%20quisiera%20asesoramiento%20sobre%20Derecho%20de%20Familia).",
    CONTACTO_PERSONAL_LABORAL: "Si se trata de un tema **Laboral**, envíanos un email a [Dr.Zuritalionel@gmail.com](mailto:Dr.Zuritalionel@gmail.com) con el telegrama y la fecha de ingreso/egreso.",
    CONTACTO_PERSONAL_SUCESIONES: "Para agilizar las **Sucesiones**, te recomendamos contactar por [Telegram](https://t.me/drzuritalionel) con la documentación inicial.",
    CONTACTO_PERSONAL_TRANSITO: "Ante un **Accidente**, la inmediatez es clave. Llámanos o envíanos un WhatsApp urgente al [+(54) 11 3197-6852](https://wa.me/5491131976852)."
};


// =========================================================================
// 2. CHATBOT CORE LOGIC AND HELPERS
// =========================================================================

// --- Variables DOM (Deben definirse fuera de las funciones helper) ---
const chatMessages = document.getElementById('chat-messages');
const chatButtonsContainer = document.getElementById('chat-buttons');
const userInput = document.getElementById('user-input');
const chatForm = document.getElementById('chat-form');
const chatbotContainer = document.querySelector('.chatbot-container');

// Stack para manejar la navegación de los menús (Historial)
const menuStack = []; 

/**
 * Resuelve una ruta (ej: 'FAMILY.MENU_FAMILY') dentro del objeto CHATBOT_RESPONSES.
 * @param {string} path Ruta de la respuesta.
 * @returns {any} El valor encontrado o null.
 */
function resolveResponsePath(path) {
    if (!path || typeof path !== 'string') return null;
    
    const parts = path.split('.');
    let current = CHATBOT_RESPONSES;

    for (const part of parts) {
        if (current && typeof current === 'object' && current[part] !== undefined) {
            current = current[part];
        } else {
            if (typeof current === 'string') return current; 
            return null;
        }
    }
    return current;
}

/**
 * Genera HTML para un mensaje del bot.
 * @param {string} text Texto del mensaje.
 * @returns {string} HTML del mensaje.
 */
function generateBotMessageHTML(text) {
    const botIcon = '<i class="fas fa-robot text-lg text-white"></i>';
    // Simple markdown parsing for **bold** and newlines
    const formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');

    return `
        <div class="flex items-start">
            <div class="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2 shadow-md">
                ${botIcon}
            </div>
            <div class="bg-blue-100 p-3 rounded-tr-xl rounded-b-xl max-w-xs shadow-sm text-gray-800 text-sm">
                ${formattedText}
            </div>
        </div>
    `;
}

/**
 * Genera HTML para un mensaje del usuario.
 * @param {string} text Texto del mensaje.
 * @returns {string} HTML del mensaje.
 */
function generateUserMessageHTML(text) {
    const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return `
        <div class="flex justify-end">
            <div class="bg-gray-800 text-white p-3 rounded-tl-xl rounded-b-xl max-w-xs shadow-sm text-sm">
                ${formattedText}
            </div>
        </div>
    `;
}

/**
 * Renderiza un mensaje en el chat y actualiza la lista de botones.
 */
function appendMessage(sender, text, buttons = []) {
    const html = sender === 'bot' ? generateBotMessageHTML(text) : generateUserMessageHTML(text);
    chatMessages.innerHTML += html;
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll

    renderButtons(buttons);
}

/**
 * Renderiza datos estructurados (e.g., Baremos) de manera elegante.
 * @param {object} data El objeto de Baremo (BAREMO_LABORAL o BAREMO_TRANSITO).
 */
function renderStructuredResponse(data) {
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
    
    chatMessages.innerHTML += generateBotMessageHTML(content);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


/**
 * Renderiza los botones de opciones.
 * @param {Array<Object>} buttons Array de objetos {text: string, value: string}
 */
function renderButtons(buttons) {
    chatButtonsContainer.innerHTML = '';
    
    // Añadir el botón de Volver al menú anterior si el stack tiene elementos
    if (menuStack.length > 0) {
        const prevMenu = CHATBOT_RESPONSES.COMMON.RETURN_TO_PREVIOUS_MENU;
        buttons.unshift(prevMenu); // Agrega al principio
    }

    buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.textContent = button.text;
        btn.dataset.value = button.value;
        btn.classList.add('w-full', 'p-3', 'text-sm', 'bg-gray-100', 'text-blue-700', 'border', 'border-blue-300', 'rounded-lg', 'hover:bg-blue-50', 'transition', 'duration-200', 'font-medium', 'text-left');
        btn.addEventListener('click', () => {
            appendMessage('user', button.text);
            processChatInput(button.value, buttons);
        });
        chatButtonsContainer.appendChild(btn);
    });

    // Si hay botones, deshabilitar el input de texto.
    if (buttons.length > 0) {
        userInput.disabled = true;
        userInput.placeholder = "Selecciona una opción...";
    } else {
        userInput.disabled = false;
        userInput.placeholder = "Escribe tu consulta...";
    }
}

/**
 * Función principal de procesamiento de la entrada del chat.
 * @param {string} value El valor de la acción (o texto directo).
 * @param {Array<Object>} currentButtons El array de botones que se está reemplazando (para el stack).
 */
function processChatInput(value, currentButtons = []) {
    let response, nextButtons = [];

    // 1. Manejo de comandos especiales
    if (value === 'VOLVER') {
        // Comando Volver al Menú Principal
        menuStack.length = 0; // Limpiar stack
        response = CHATBOT_RESPONSES.COMMON.WELCOME_MESSAGE;
        nextButtons = CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL;
    } else if (value === 'MENU_ANTERIOR') {
        // Comando Volver al Menú Anterior
        menuStack.pop(); // Quitar el menú actual
        const previousMenu = menuStack.pop(); // Obtener el menú anterior
        
        // Si el stack está vacío después de pop, volvemos al principal
        if (!previousMenu) {
            processChatInput('VOLVER');
            return;
        }
        
        response = previousMenu.text; // Usamos el texto del menú anterior para mostrar el contexto
        nextButtons = previousMenu.buttons;
        menuStack.push({ text: response, buttons: nextButtons }); // Volver a añadir el menú (solo el último)
        
    } else {
        // 2. Resolver la ruta
        response = resolveResponsePath(value);

        if (response === null || value === 'INVALID_INPUT_TEXT_TRIGGER') {
            // Si el valor no es una ruta válida (ej: texto libre o error)
            response = CHATBOT_RESPONSES.COMMON.ERROR_INPUT_INVALIDO;
            // Mantener los botones del menú anterior (el último en el stack)
            const lastMenu = menuStack[menuStack.length - 1];
            nextButtons = lastMenu ? lastMenu.buttons : CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL;
        } else if (Array.isArray(response)) {
            // 3. Respuesta es un nuevo menú (Array de botones)
            response = `Perfecto. ¿Sobre qué aspecto de la práctica legal te gustaría más información?`;
            nextButtons = response;

            // Guardar el menú actual en el stack para la navegación de 'MENU_ANTERIOR'
            menuStack.push({ text: currentButtons.find(b => b.value === value)?.text || 'Menú Anterior', buttons: currentButtons });
            
            // Asegurar que el nuevo menú se guarde para el próximo 'MENU_ANTERIOR'
            menuStack.push({ text: 'Opción Principal', buttons: nextButtons });

        } else if (typeof response === 'object' && response !== null) {
            // 4. Respuesta es un objeto estructurado (Baremo)
            renderStructuredResponse(response);
            // Mantener los botones del menú anterior
            const lastMenu = menuStack[menuStack.length - 1];
            nextButtons = lastMenu ? lastMenu.buttons : CHATBOT_RESPONSES.COMMON.MENU_AREAS_PRINCIPAL;
            // Asegurar el botón principal de volver siempre esté disponible
            nextButtons.push(CHATBOT_RESPONSES.COMMON.RETURN_TO_MAIN_MENU);
            renderButtons(nextButtons);
            return; // Terminar aquí, ya se renderizó el mensaje estructurado
        
        } else {
            // 5. Respuesta es un string final (Contacto o Respuesta de Texto)
            
            // Añadir el botón principal de volver al final de la respuesta de texto.
            nextButtons = [CHATBOT_RESPONSES.COMMON.RETURN_TO_MAIN_MENU]; 
        }
    }

    // Renderizar el mensaje y los botones (o solo el mensaje si no hay botones)
    appendMessage('bot', response, nextButtons);
}

// =========================================================================
// 3. EVENT LISTENERS Y SETUP (Incluye tu código y la lógica del chatbot)
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- 3.1 Funciones de Interfaz (Tu Código) ---
    
    // SCROLL SUAVE
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (const link of smoothLinks) {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // NAVBAR ACTIVA AL HACER SCROLL
    const navbar = document.querySelector('.custom-navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // BOTÓN SCROLL TOP (Ajuste para no solapar el botón del chat)
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.classList.add('scroll-top-btn');
    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Ajuste de posición del botón de scroll-top para el chatbot
    window.addEventListener('scroll', () => {
        // La altura del botón de chat flotante es de unos 60px + 20px de margen = 80px. 
        // Movemos el botón de scroll-top hacia arriba para que no lo tape.
        const chatButtonHeight = 80; 
        scrollTopBtn.style.bottom = window.scrollY > 400 ? `${20 + chatButtonHeight}px` : '90px'; 
        scrollTopBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
    });

    // --- 3.2 Lógica de Inicialización del Chatbot ---

    // Toggle Chatbot UI
    document.getElementById('chatbot-toggle-btn').addEventListener('click', () => {
        chatbotContainer.style.display = chatbotContainer.style.display === 'flex' ? 'none' : 'flex';
        // Cargar el mensaje de bienvenida solo si el chat está vacío
        if (chatMessages.innerHTML.trim() === '') {
            processChatInput('VOLVER');
        }
    });

    document.getElementById('chatbot-close-btn').addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
    });


    // Manejar el envío de texto (opción de fallback cuando no hay botones)
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = userInput.value.trim();
        if (text && !userInput.disabled) {
            appendMessage('user', text);
            // Comandos especiales de texto
            if (text.toUpperCase() === 'VOLVER') {
                processChatInput('VOLVER');
            } else if (text.toUpperCase() === 'MENU_ANTERIOR') {
                processChatInput('MENU_ANTERIOR');
            } else {
                // Para texto genérico, muestra el mensaje de error
                processChatInput('INVALID_INPUT_TEXT_TRIGGER'); 
            }
            userInput.value = '';
        }
    });
});
