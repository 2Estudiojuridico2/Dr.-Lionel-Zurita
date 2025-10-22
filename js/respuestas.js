// Archivo: js/CHATBOT_RESPONSES.js
// La variable global DEBE llamarse window.CHATBOT_RESPONSES.
window.CHATBOT_RESPONSES = {
    // =====================================================================
    // RESPUESTAS COMUNES / GLOBALES
    // =====================================================================
    COMMON: {
        WELCOME_MESSAGE: "¡Hola! Soy tu Asistente Legal. Navega por las áreas de práctica del Dr. Zurita para obtener información inmediata.",
        ERROR_INPUT_INVALIDO: "Disculpa, no entendí esa opción. Por favor, selecciona una de las opciones del menú o escribe VOLVER para empezar de nuevo.",
        OTRAS_CONSULTAS: "Para consultas no listadas, te recomiendo contactar directamente al estudio. Nuestro staff puede evaluar tu caso de forma personalizada. [Más info aquí](otras-consultas.html).",
        CONTACTO_DIRECTO_GENERAL: "¡Claro! Puedes iniciar un contacto directo por WhatsApp al [+(54) 11 3197-6852](https://wa.me/5491131976852) o al Email [Dr.Zuritalionel@gmail.com](mailto:Dr.Zuritalionel@gmail.com).",
        
        // BOTONES GLOBALES DE NAVEGACIÓN
        RETURN_TO_MAIN_MENU: { text: "Volver al Menú Principal", value: "VOLVER" },
        RETURN_TO_PREVIOUS_MENU: { text: "Volver al Menú Anterior", value: "MENU_ANTERIOR" },

        // MENÚ PRINCIPAL 
        MENU_AREAS_PRINCIPAL: [
            { text: "Derecho de Familia 👨‍👩‍👧‍👦", value: "FAMILY.MENU_FAMILY" },
            { text: "Derecho Laboral 👷", value: "LABORAL.MENU_LABORAL" },
            { text: "Sucesiones y Herencias 📜", value: "SUCESIONES.MENU_SUCESIONES" },
            { text: "Accidentes de Tránsito 🚗", value: "TRANSITO.MENU_TRANSITO" },
            { text: "Otras Consultas ❓", value: "COMMON.OTRAS_CONSULTAS" }, // Corregido: debe apuntar a COMMON.OTRAS_CONSULTAS
            { text: "Contacto Directo 📲", value: "COMMON.CONTACTO_DIRECTO_GENERAL" } // Corregido: debe apuntar a COMMON.CONTACTO_DIRECTO_GENERAL
        ]
    },

    // =====================================================================
    // ÁREA 1: FAMILIA
    // =====================================================================
    FAMILY: {
        MENU_FAMILY: [
            { text: "Divorcios y Uniones", value: "FAMILY.DIVORCIOS_TEXT" },
            { text: "Alimentos y Cuotas", value: "FAMILY.ALIMENTOS_TEXT" },
            { text: "Régimen de Comunicación", value: "FAMILY.REGIMEN_COMUNICACION_TEXT" },
            { text: "Contacto Familiar 👨‍⚖️", value: "CONTACTO_PERSONAL_FAMILY" },
            { text: "Volver al Menú Principal ↩️", value: "VOLVER" } 
        ],
        DIVORCIOS_TEXT: "El Dr. Zurita maneja divorcios de mutuo acuerdo y contenciosos. El proceso suele durar entre X y Y meses. Para comenzar, necesitamos... [Más info aquí](areas/familia.html).",
        ALIMENTOS_TEXT: "La cuota alimentaria se establece según las necesidades del menor y la capacidad económica del alimentante. Puedes iniciar el reclamo contactándonos.",
        REGIMEN_COMUNICACION_TEXT: "El régimen de comunicación busca garantizar el contacto del menor con el progenitor no conviviente. Esto se puede negociar o fijar judicialmente.",
    },

    // =====================================================================
    // ÁREA 2: LABORAL
    // =====================================================================
    LABORAL: {
        MENU_LABORAL: [
            { text: "Despido sin Causa", value: "LABORAL.DESPIDO_TEXT" },
            { text: "Accidentes Laborales (ART)", value: "LABORAL.ACCIDENTE_LABORAL_TEXT" },
            { text: "Baremo de Indemnizaciones", value: "BAREMO_Y_DAÑO.BAREMO_LABORAL" }, // Corregido para apuntar a la ruta completa
            { text: "Contacto Laboral 💼", value: "CONTACTO_PERSONAL_LABORAL" },
            { text: "Volver al Menú Principal ↩️", value: "VOLVER" }
        ],
        DESPIDO_TEXT: "Si fuiste despedido sin causa justa, tienes derecho a una indemnización completa. Te asesoramos en el SECLO y en sede judicial. [Ver Ley LCT](enlace-a-lct.html).",
        ACCIDENTE_LABORAL_TEXT: "Reclamos ante la ART por lesiones. Es crucial tener el certificado médico y el telegrama de denuncia de la enfermedad/accidente.",
    },
    
    // =====================================================================
    // ÁREA 3: SUCESIONES
    // =====================================================================
    SUCESIONES: {
        MENU_SUCESIONES: [
            { text: "Declaratoria de Herederos", value: "SUCESIONES.DECLARATORIA_TEXT" },
            { text: "Testamentos y Legados", value: "SUCESIONES.TESTAMENTOS_TEXT" },
            { text: "Requisitos de Sucesión", value: "SUCESIONES.REQUISITOS_TEXT" },
            { text: "Contacto Sucesorio 🏘️", value: "CONTACTO_PERSONAL_SUCESIONES" },
            { text: "Volver al Menú Principal ↩️", value: "VOLVER" }
        ],
        DECLARATORIA_TEXT: "La declaratoria de herederos es el paso principal. Se necesita la partida de defunción y los títulos de propiedad para comenzar.",
        TESTAMENTOS_TEXT: "Te asistimos en la redacción de testamentos para asegurar el cumplimiento de tu voluntad, respetando las porciones legítimas.",
        REQUISITOS_TEXT: "Se requiere: Partida de defunción, Libreta de Matrimonio, partidas de nacimiento de herederos y títulos de bienes.",
    },

    // =====================================================================
    // ÁREA 4: TRÁNSITO
    // =====================================================================
    TRANSITO: {
        MENU_TRANSITO: [
            { text: "Accidentes Viales", value: "TRANSITO.ACCIDENTES_TEXT" },
            { text: "Baremo de Daño Corporal", value: "BAREMO_Y_DAÑO.BAREMO_TRANSITO" }, // Corregido para apuntar a la ruta completa
            { text: "Servicio de Pericia Vial", value: "TRANSITO.PERICIA_TEXT" },
            { text: "Contacto Tránsito 🚨", value: "CONTACTO_PERSONAL_TRANSITO" },
            { text: "Volver al Menú Principal ↩️", value: "VOLVER" }
        ],
        ACCIDENTES_TEXT: "Como Accidentólogo Vial, el Dr. Zurita garantiza la mejor defensa y cálculo de indemnización. No aceptes acuerdos sin consultarnos.",
        PERICIA_TEXT: "Ofrecemos pericias accidentológicas para determinar la causalidad del siniestro y la responsabilidad de los involucrados.",
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
            FACTORES_PONDERACION: [
                "Tareas específicas realizadas",
                "Posibilidad de reubicación laboral",
                "Pérdida de oportunidad de progreso",
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
            DESCRIPCION: "Fórmula matemática comúnmente utilizada en Argentina para calcular el valor presente de la pérdida de capacidad de ganancia futura por lesiones en accidentes de tránsito.",
            FUNDAMENTO: [
                "Edad de la víctima",
                "Ingreso Anual Afectado",
                "Porcentaje de Incapacidad (según baremo médico)",
                "Tasa de Interés para el cálculo financiero",
            ],
            FACTORES_PONDERACION: [
                "Género y nivel educativo",
                "Probabilidad de ascenso/promoción",
                "Daño estético y psicológico adicional",
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
    CONTACTO_PERSONAL_FAMILY: "Para iniciar tu consulta de Derecho de Familia, haz clic en nuestro [WhatsApp directo](https://wa.me/5491131976852?text=Hola%2C%20quisiera%20asesoramiento%20sobre%20Derecho%20de%20Familia).",
    CONTACTO_PERSONAL_LABORAL: "Si se trata de un tema Laboral, envíanos un email a [Dr.Zuritalionel@gmail.com](mailto:Dr.Zuritalionel@gmail.com) con el telegrama y la fecha de ingreso/egreso.",
    CONTACTO_PERSONAL_SUCESIONES: "Para agilizar las Sucesiones, te recomendamos contactar por [Telegram](https://t.me/drzuritalionel) con la documentación inicial.",
    CONTACTO_PERSONAL_TRANSITO: "Ante un Accidente, la inmediatez es clave. Llámanos o envíanos un WhatsApp urgente al [+(54) 11 3197-6852](https://wa.me/5491131976852)."
};
