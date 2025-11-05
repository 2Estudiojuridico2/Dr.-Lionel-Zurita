// Archivo: js/respuestas.js
// La variable global DEBE llamarse window.CHATBOT_RESPONSES.
window.CHATBOT_RESPONSES = {
    // =====================================================================
    // RESPUESTAS COMUNES / GLOBALES
    // =====================================================================
    COMMON: {
        WELCOME_MESSAGE: "¡Hola! Soy tu **Asistente Legal**. Navega por las áreas de práctica del Dr. Zurita para obtener información inmediata. ",
        ERROR_INPUT_INVALIDO: "Disculpa, no entendí esa opción. Por favor, selecciona una de las opciones del menú o escribe **VOLVER** para empezar de nuevo.",
        
        // 🚨 COHERENCIA: Enlace a la página estática "otras-consultas.html"
        OTRAS_CONSULTAS: "Para consultas no listadas, te recomiendo contactar directamente al estudio. Nuestro staff puede evaluar tu caso de forma personalizada. Puedes [agendar un turno aquí](agendar-turno.html).",
        
        CONTACTO_DIRECTO_GENERAL: "¡Claro! Puedes iniciar un contacto directo por **WhatsApp** al [+(54) 11 3197-6852](https://wa.me/5491131976852) o al **Email** [Dr.Zuritalionel@gmail.com](mailto:Dr.Zuritalionel@gmail.com).",
        
        // BOTONES GLOBALES DE NAVEGACIÓN
        RETURN_TO_MAIN_MENU: { text: "Volver al Menú Principal ↩️", value: "VOLVER" },
        // Se mantiene, pero 'VOLVER' suele ser suficiente para el flujo de la mayoría de los chatbots
        RETURN_TO_PREVIOUS_MENU: { text: "Volver al Menú Anterior 🔙", value: "MENU_ANTERIOR" }, 

        // MENÚ PRINCIPAL (SE MANTIENE, YA ESTABA PERFECTO)
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
            // 💡 FUNCIONALIDAD ADICIONAL: Se añade el simulador
            { text: "Simulador Cuota Alimentaria 🧮", value: "FAMILY.SIMULADOR_TEXT" }, 
            { text: "Contacto Familiar 👨‍⚖️", value: "CONTACTO_PERSONAL_FAMILY" },
            { text: "Volver al Menú Principal ↩️", value: "VOLVER" } 
        ],
        // 💡 RUTA: Se corrige la ruta a la página de detalle
        DIVORCIOS_TEXT: "El Dr. Zurita maneja divorcios de mutuo acuerdo y contenciosos. El proceso se inicia con la presentación de la demanda. Para un divorcio exprés, ambos deben estar de acuerdo. [Más info aquí](areas/familia.html).",
        // 💡 CONTEXTO: Se añade el contexto de la imagen (que no se renderiza en texto)
        ALIMENTOS_TEXT: "La cuota alimentaria se establece según las necesidades del menor y la capacidad económica del alimentante. Puedes iniciar el reclamo contactándonos. Recomendamos juntar comprobantes de gastos.",
        REGIMEN_COMUNICACION_TEXT: "El régimen de comunicación busca garantizar el contacto del menor con el progenitor no conviviente. Esto se puede negociar o fijar judicialmente. [Ver detalles](areas/familia.html).",
        // 💡 NUEVO: Respuesta para el simulador
        SIMULADOR_TEXT: "Utiliza nuestra herramienta para obtener una estimación de la cuota alimentaria: [Ir al Simulador](areas/calculadora-cuota.html). Recuerda que es solo una guía, el monto final lo fija el juez."
    },

    // =====================================================================
    // ÁREA 2: LABORAL
    // =====================================================================
    LABORAL: {
        // MENÚ LABORAL
        MENU_LABORAL: [
            { text: "Despido sin Causa / Trabajo en Negro", value: "LABORAL.DESPIDO_TEXT" }, // 💡 MEJORA: Unificación del concepto
            { text: "Accidentes Laborales (ART)", value: "LABORAL.ACCIDENTE_LABORAL_TEXT" },
            { text: "Baremo de Indemnizaciones", value: "BAREMO_Y_DAÑO.BAREMO_LABORAL" }, 
            { text: "Ver página completa 🌐", value: "LABORAL.PAGINA_LABORAL_ENLACE" },
            { text: "Contacto Laboral 💼", value: "CONTACTO_PERSONAL_LABORAL" },
            { text: "Volver al Menú Principal ↩️", value: "VOLVER" }
        ],
        DESPIDO_TEXT: "Si fuiste despedido sin causa justa o trabajas sin estar registrado (**en negro**), tienes derecho a una indemnización completa. Te asesoramos en el SECLO y en sede judicial. Recuerda que tienes dos años para iniciar el reclamo. [Más detalles en nuestra web](areas/laboral.html).",
        ACCIDENTE_LABORAL_TEXT: "Reclamos ante la ART por lesiones. Es crucial tener el certificado médico y el telegrama de denuncia de la enfermedad/accidente. No firmes el alta médica sin asesoramiento. [Ver qué hacer ante un accidente](areas/laboral.html#nuestros-servicios).",
        // 💡 NUEVO: Enlace directo a la página completa
        PAGINA_LABORAL_ENLACE: "Para información detallada sobre **Trabajo en Negro, licencias y otros reclamos**, visita la página completa: [Derecho Laboral](areas/laboral.html)."
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
            { text: "Ver página completa 🌐", value: "SUCESIONES.PAGINA_SUCESIONES_ENLACE" },
            { text: "Contacto Sucesorio 🏘️", value: "CONTACTO_PERSONAL_SUCESIONES" },
            { text: "Volver al Menú Principal ↩️", value: "VOLVER" }
        ],
        DECLARATORIA_TEXT: "La declaratoria de herederos es el paso principal. Se necesita la partida de defunción y los títulos de propiedad para comenzar. El proceso puede ser más rápido si es de un único heredero. [Ver pasos](areas/sucesiones.html).",
        TESTAMENTOS_TEXT: "Te asistimos en la redacción de testamentos para asegurar el cumplimiento de tu voluntad, respetando las porciones legítimas.",
        REQUISITOS_TEXT: "Se requiere: Partida de defunción, Libreta de Matrimonio, partidas de nacimiento de herederos y títulos de bienes.",
        // 💡 NUEVO: Enlace directo a la página completa
        PAGINA_SUCESIONES_ENLACE: "Para ver detalles sobre la división de bienes y costos, visita nuestra página de **Sucesiones**: [Derecho Sucesorio](areas/sucesiones.html)."
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
            { text: "Ver página completa 🌐", value: "TRANSITO.PAGINA_TRANSITO_ENLACE" },
            { text: "Contacto Tránsito 🚨", value: "CONTACTO_PERSONAL_TRANSITO" },
            { text: "Volver al Menú Principal ↩️", value: "VOLVER" }
        ],
        ACCIDENTES_TEXT: "Como Accidentólogo Vial, el Dr. Zurita garantiza la mejor defensa y cálculo de indemnización. No aceptes acuerdos sin consultarnos. Siempre reporta el siniestro a tu aseguradora. [Guía de pasos](areas/transito.html).",
        PERICIA_TEXT: "Ofrecemos pericias accidentológicas para determinar la causalidad del siniestro y la responsabilidad de los involucrados. Un informe pericial es clave en la demanda.",
        // 💡 NUEVO: Enlace directo a la página completa
        PAGINA_TRANSITO_ENLACE: "Para ver los pasos a seguir inmediatamente después de un siniestro, visita la página completa: [Accidentes de Tránsito](areas/transito.html)."
    },

    // =====================================================================
    // DATOS ESTRUCTURADOS: BAREMOS (Se mantiene, es una excelente estructura)
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
            METODO_CALCULO: "**IBM x 53 / 100 x (65 / Edad) x Porcentaje de Incapacidad + Daño Moral.**", // 💡 Énfasis en la fórmula
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
            METODO_CALCULO: "**Cálculo financiero de valor presente con renta vitalicia decreciente** hasta la edad de jubilación.", // 💡 Énfasis y concisión
            OBSERVACIONES: "El valor es solo una base. El juez puede aumentarlo o disminuirlo según la prueba.",
        }
    },

    // =====================================================================
    // CONTACTOS PERSONALES ESPECÍFICOS (Rutas finales)
    // =====================================================================
    // 💡 MEJORA: Se asegura que todos usen el mismo número de WhatsApp y se unifica la estructura
    CONTACTO_PERSONAL_FAMILY: "Para iniciar tu consulta de **Derecho de Familia**, haz clic en nuestro [WhatsApp directo](https://wa.me/5491131976852?text=Hola%2C%20quisiera%20asesoramiento%20sobre%20Derecho%20de%20Familia).",
    CONTACTO_PERSONAL_LABORAL: "Si se trata de un tema **Laboral**, envíanos un email a [Dr.Zuritalionel@gmail.com](mailto:Dr.Zuritalionel@gmail.com) con el telegrama y la fecha de ingreso/egreso. O [contáctanos por WhatsApp](https://wa.me/5491131976852).",
    // 💡 COHERENCIA: Se unifica la acción de contacto directo con un link de WhatsApp/Email conocido
    CONTACTO_PERSONAL_SUCESIONES: "Para agilizar las **Sucesiones**, te recomendamos contactar por [WhatsApp](https://wa.me/5491131976852?text=Hola%2C%20necesito%20iniciar%20una%20Sucesión).",
    CONTACTO_PERSONAL_TRANSITO: "Ante un **Accidente**, la inmediatez es clave. Llámanos o envíanos un WhatsApp urgente al [+(54) 11 3197-6852](https://wa.me/5491131976852)."
};
