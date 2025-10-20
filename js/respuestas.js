// respuestas.js
// Base de Datos Centralizada de Respuestas y Menús del Chatbot

const CHATBOT_RESPONSES = {
    // =========================================================================
    // COMUNES (Mensajes de Bienvenida, Errores, Menú Principal, etc.)
    // =========================================================================
    COMMON: {
        'WELCOME_MESSAGE': '¡Hola! Soy tu asistente legal. ¿En qué área jurídica necesitas asesoramiento hoy?',
        
        'MENU_AREAS_PRINCIPAL': [
            { text: 'Derecho de Familia 👨‍👩‍👧‍👦', value: 'FAMILIA' },
            { text: 'Derecho Laboral 💼', value: 'LABORAL' },
            { text: 'Sucesiones 📝', value: 'SUCESIONES' },
            { text: 'Contratos y Acuerdos ✍️', value: 'CONTRATOS' },
            { text: 'Accidentes de Tránsito 🚗', value: 'TRANSITO' },
            { text: 'Otras Consultas ❓', value: 'OTRAS_CONSULTAS' },
            { text: 'Contacto Directo 📞', value: 'CONTACTO_DIRECTO_GENERAL' } // Nuevo: Contacto general
        ],

        'OTRAS_CONSULTAS_TEXT': `Entiendo. Algunas consultas no encajan en una categoría específica o requieren un análisis particular.
Para una consulta sobre temas no listados o de mayor complejidad, te sugiero contactarnos directamente.
- [WhatsApp] (https://wa.me/5491131976852)
- [Formulario Completo] (https://docs.google.com/forms/d/e/1FAIpQLSddw0zwc76GuSUHh2rpuxSO59BeyDItbWMVHDOp1d_rTp28Eg/viewform)
Vuelve al menú principal si deseas explorar otras áreas.`,

        'CONTACTO_DIRECTO_GENERAL': `**CONTACTO DIRECTO**
Estamos disponibles para brindarte una atención personalizada. Puedes contactarnos a través de:
- [WhatsApp] (https://wa.me/5491131976852)
- [Formulario Completo] (https://docs.google.com/forms/d/e/1FAIpQLSddw0zwc76GuSUHh2rpuxSO59BeyDItbWMVHDOp1d_rTp28Eg/viewform)
- Correo Electrónico: dr.zuritalionel@gmail.com
Escribe **VOLVER** para regresar al menú de Áreas Principales.`,


        'ERROR_INPUT_INVALIDO': 'Disculpe, no he entendido su consulta. Por favor, intente con otra opción o escriba "VOLVER" para regresar al menú principal.',
        'ERROR_CONTEXTO_INVALIDO': 'Lo siento, no puedo responder a esa pregunta en este contexto. Por favor, elija una opción del menú o escriba "VOLVER".',
    },

    // =========================================================================
    // RESPUESTAS DE DERECHO DE FAMILIA (Provincia de Buenos Aires)
    // =========================================================================
    FAMILY: { // Cambiado a 'FAMILY' para coincidir con el mainState en chatbot.js
        'CUOTA_ALIMENTARIA_ALCANCE': `**P1: Alcance y Edad Límite (Art. 658, 662 CCCN)**
La cuota no es solo comida, abarca manutención, educación, esparcimiento, vestimenta, salud y vivienda.
Edad: Obligatoria hasta los **21 años**, y se extiende hasta los **25 años** si el hijo/a se capacita o estudia.
Cálculo: Se basa en las **Necesidades** del Niño/a y la **Capacidad Económica** del Alimentante.`,

        'CUOTA_ALIMENTARIA_TAREAS_CUIDADO': `**P2: Tareas de Cuidado (Art. 660 CCCN)**
Las tareas de cuidado personal del progenitor conviviente tienen **valor económico** y constituyen un aporte a la manutención.
El Juez equilibra los aportes: el progenitor no conviviente debe realizar un aporte económico proporcional a la diferencia de tareas.`,

        'CUOTA_ALIMENTARIA_PROVISIONAL': `**P3: Cuota Provisional Urgente (Art. 544 CCCN)**
Sí. Se puede solicitar una Cuota Provisional desde el inicio de la demanda (o en cualquier momento) para cubrir necesidades urgentes, sin esperar la sentencia. Requiere acreditar el vínculo y las necesidades básicas.`,

        'CUIDADO_PERSONAL_QUE_ES': `**P4: Cuidado Personal (Art. 650 CCCN)**
Es la responsabilidad sobre la vida diaria.
Regla General: El **Cuidado Compartido** es la regla general, en modalidad Indistinta (un solo domicilio) o Alternada (tiempo dividido).
Excepción: El Cuidado Unilateral se reserva solo si el Interés Superior del Niño/a lo exige (ej. violencia).`,

        'CUIDADO_PERSONAL_REGIMEN_COMUNICACION': `**P5: Régimen de Comunicación (Art. 652 CCCN)**
Es un derecho del hijo/a a mantener contacto con el progenitor no conviviente.
Incluye visitas presenciales, contacto telefónico, videollamadas y participación en decisiones trascendentales (salud/educación).`,

        'INCUMPLIMIENTO_EJECUCION_ALIMENTOS': `**P8: Ejecución de Alimentos**
Se inicia la Acción de Ejecución de Alimentos (Apremio), un proceso rápido para el cobro forzado. El Juez puede ordenar:
1. **Embargos** sobre sueldos, cuentas y bienes.
2. Inscripción en el **Registro de Deudores Alimentarios Morosos (REDAM)** de PBA.
3. **Astrenties** (sanciones conminatorias).`,

        'TEMAS_ESPECIALES_COMPETENCIA': `**P6: Competencia y Presentación Digital**
Competencia: Juzgados de Familia de PBA. El Juez competente es el del **“Centro de Vida”** del niño/a (donde reside habitualmente).
Presentación: Todo escrito se presenta por Mesa de Entradas Virtual (MEV), con constitución obligatoria de Domicilio Electrónico.`,

        'TEMAS_ESPECIALES_MEDIACION_PREVIA': `**P7: Mediación Previa Obligatoria**
Sí (Ley 13.951). Es un requisito procesal ineludible para Alimentos, Comunicación y Divorcio.
Se debe obtener el **Acta de Cierre** para iniciar la demanda.
Excepción: Medidas cautelares urgentes (Cuota Provisional) y denuncias de Violencia Familiar.`,

        'TEMAS_ESPECIALES_ADICION_APELLIDO': `**P9: Adición de Apellido**
Sí. Se llama Adición de Apellido por Justo Motivo (Art. 69 CCCN), fundamentado en el Derecho a la Identidad.
La acción de reclamación de filiación es **imprescriptible**.`,

        'TEMAS_ESPECIALES_VIAJE_EXTERIOR': `**P10: Viaje al Exterior**
Se requiere el **consentimiento de ambos progenitores** (Art. 645 CCCN).
Si hay negativa: Se inicia la Acción Judicial de **Autorización Supletoria** para Salir del País ante el Juzgado de Familia.`,

        // MENÚS ESPECÍFICOS DE FAMILIA (AHORA CON ESTRUCTURA DE BOTONES)
        'MENU_FAMILY': [ // Cambiado a 'MENU_FAMILY'
            { text: 'Cuota Alimentaria 💰', value: 'SUBMENU_CUOTA_ALIMENTARIA' },
            { text: 'Cuidado Personal y Comunicación 🏡', value: 'SUBMENU_CUIDADO_COMUNICACION' },
            { text: 'Incumplimiento y Ejecución 🔴', value: 'SUBMENU_INCUMPLIMIENTO_EJECUCION' },
            { text: 'Temas Especiales y Procesales ⚖️', value: 'SUBMENU_TEMAS_ESPECIALES' },
            { text: 'Contacto Personal 📞', value: 'CONTACTO_PERSONAL_FAMILIA' },
            { text: '⬅️ Volver a Áreas Principales', value: 'VOLVER_AREAS' }
        ],

        'SUBMENU_CUOTA_ALIMENTARIA': [
            { text: '¿Hasta qué edad se paga y qué incluye?', value: 'CUOTA_ALIMENTARIA_ALCANCE' },
            { text: '¿Cómo influyen las tareas de cuidado?', value: 'CUOTA_ALIMENTARIA_TAREAS_CUIDADO' },
            { text: '¿Puedo pedir una Cuota Provisional urgente?', value: 'CUOTA_ALIMENTARIA_PROVISIONAL' },
            { text: '⬅️ Volver a Familia', value: 'MENU_FAMILY_BACK' }, // Ajustado el value
            { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
        ],

        'SUBMENU_CUIDADO_COMUNICACION': [
            { text: '¿Qué es el Cuidado Personal (Tenencia)?', value: 'CUIDADO_PERSONAL_QUE_ES' },
            { text: '¿Qué incluye el Régimen de Comunicación (Visitas)?', value: 'CUIDADO_PERSONAL_REGIMEN_COMUNICACION' },
            { text: '⬅️ Volver a Familia', value: 'MENU_FAMILY_BACK' }, // Ajustado el value
            { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
        ],

        'SUBMENU_INCUMPLIMIENTO_EJECUCION': [
            { text: '¿Qué hago si no me pagan la Cuota Alimentaria? (Embargos/REDAM)', value: 'INCUMPLIMIENTO_EJECUCION_ALIMENTOS' },
            { text: '⬅️ Volver a Familia', value: 'MENU_FAMILY_BACK' }, // Ajustado el value
            { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
        ],

        'SUBMENU_TEMAS_ESPECIALES': [
            { text: '¿Dónde presento la demanda (Competencia y Digital)?', value: 'TEMAS_ESPECIALES_COMPETENCIA' },
            { text: '¿Es obligatoria la Mediación Previa en PBA?', value: 'TEMAS_ESPECIALES_MEDIACION_PREVIA' },
            { text: '¿Puedo agregar el apellido paterno siendo adulto?', value: 'TEMAS_ESPECIALES_ADICION_APELLIDO' },
            { text: '¿Necesito permiso del otro progenitor para viajar al exterior?', value: 'TEMAS_ESPECIALES_VIAJE_EXTERIOR' },
            { text: '⬅️ Volver a Familia', value: 'MENU_FAMILY_BACK' }, // Ajustado el value
            { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
        ],

        'CONTACTO_PERSONAL_FAMILIA': `**CONTACTO PERSONAL (Familia)**
Para un asesoramiento detallado sobre su caso de familia, haga clic aquí:
- [WhatsApp] (https://wa.me/5491131976852)
- [Formulario Completo] (https://docs.google.com/forms/d/e/1FAIpQLSddw0zwc76GuSUHh2rpuxSO59BeyDItbWMVHDOp1d_rTp28Eg/viewform)
Escriba **MENU_ANTERIOR** para volver al menú de Familia o **VOLVER** para el menú de Áreas.`, // Ajustado el texto del comando para volver
    },

    // =========================================================================
    // RESPUESTAS DE DERECHO LABORAL
    // =========================================================================
    LABORAL: { // Cambiado a 'LABORAL'
        'DESPIDO_SIN_CAUSA': `**P1: Despido sin Causa (Art. 245 LCT)**
Es cuando el empleador decide terminar la
relación laboral sin un motivo válido. Da derecho a indemnización por
antigüedad, preaviso y otros rubros.`,
        'DESPIDO_POR_CAUSA': `**P2: Despido por Causa (Justa Causa)**
El empleador debe probar un incumplimiento
grave del trabajador. Si no lo prueba, se considera despido sin causa y hay
derecho a indemnización.`,
        'DESPIDO_INDIRECTO': `**P3: Despido Indirecto (Art. 246 LCT)**
Ocurre cuando el empleador incumple
gravemente el contrato (ej. falta de pago, cambio de condiciones) y el
trabajador se considera despedido, teniendo derecho a la misma indemnización
que en un despido sin causa.`,

        'INDEMNIZACION_CALCULO': `**P4: Cálculo de Indemnización**
Se calcula en base al mejor sueldo normal y
habitual de los últimos 12 meses, considerando un mes de sueldo por cada año de
antigüedad o fracción mayor a 3 meses. (Art. 245 LCT).`,
        'INDEMNIZACION_RUBROS': `**P5: Rubros Indemnizatorios**
Incluye: Indemnización por antigüedad,
preaviso, integración mes de despido, vacaciones no gozadas, SAC
proporcional.`,

        'ACCIDENTE_TRABAJO_QUE_HACER': `**P6: ¿Qué hacer ante un Accidente de Trabajo?**
Comunicar inmediatamente a la ART y al
empleador. La ART debe brindar atención médica y prestaciones. Si no responde,
podemos iniciar acciones.`,
        'ACCIDENTE_TRABAJO_ENFERMEDADES_PRO': `**P7: Enfermedades Profesionales**
Son las contraídas a causa o en ocasión del
trabajo, listadas en la ley. También dan derecho a cobertura de la ART y, en
algunos casos, a indemnización adicional.`,

        'ACOSO_LABORAL_MOBBING': `**P8: Acoso Laboral (Mobbing)**
Es un trato hostil, abusivo o
discriminatorio recurrente en el ámbito laboral que daña la dignidad del
trabajador. Puede ser causa de despido indirecto y generar derecho a
indemnización.`,
        
        // MENÚS ESPECÍFICOS DE LABORAL
        'MENU_LABORAL': [ // Cambiado a 'MENU_LABORAL'
            { text: 'Despido 🧑‍⚖️', value: 'SUBMENU_DESPIDO_LABORAL' },
            { text: 'Indemnizaciones 💸', value: 'SUBMENU_INDEMNIZACIONES_LABORAL' },
            { text: 'Accidentes de Trabajo 🩹', value: 'SUBMENU_ACCIDENTES_TRABAJO_LABORAL' },
            { text: 'Acoso Laboral (Mobbing) 🚫', value: 'SUBMENU_ACOSO_LABORAL' },
            { text: 'Baremo Laboral (Incapacidad ART) 📊', value: 'BAREMO_LABORAL' }, // <-- Usar solo 'BAREMO_LABORAL'
            { text: 'Contacto Personal 📞', value: 'CONTACTO_PERSONAL_LABORAL' },
            { text: '⬅️ Volver a Áreas Principales', value: 'VOLVER_AREAS' }
        ],

        'SUBMENU_DESPIDO_LABORAL': [
            { text: '¿Qué es el despido sin causa?', value: 'DESPIDO_SIN_CAUSA' },
            { text: '¿Qué es el despido con justa causa?', value: 'DESPIDO_POR_CAUSA' },
            { text: '¿Qué es el despido indirecto?', value: 'DESPIDO_INDIRECTO' },
            { text: '⬅️ Volver a Laboral', value: 'MENU_LABORAL_BACK' }, // Ajustado el value
            { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
        ],

        'SUBMENU_INDEMNIZACIONES_LABORAL': [
            { text: '¿Cómo se calcula una indemnización?', value: 'INDEMNIZACION_CALCULO' },
            { text: '¿Qué rubros incluye la indemnización por despido?', value: 'INDEMNIZACION_RUBROS' },
            { text: '⬅️ Volver a Laboral', value: 'MENU_LABORAL_BACK' }, // Ajustado el value
            { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
        ],

        'SUBMENU_ACCIDENTES_TRABAJO_LABORAL': [
            { text: '¿Qué hacer ante un accidente de trabajo?', value: 'ACCIDENTE_TRABAJO_QUE_HACER' },
            { text: '¿Qué son las enfermedades profesionales?', value: 'ACCIDENTE_TRABAJO_ENFERMEDADES_PRO' },
            { text: '⬅️ Volver a Laboral', value: 'MENU_LABORAL_BACK' }, // Ajustado el value
            { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
        ],

        'SUBMENU_ACOSO_LABORAL': [
            { text: '¿Qué es el Acoso Laboral o Mobbing?', value: 'ACOSO_LABORAL_MOBBING' },
            { text: '⬅️ Volver a Laboral', value: 'MENU_LABORAL_BACK' }, // Ajustado el value
            { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
        ],

        'CONTACTO_PERSONAL_LABORAL': `**CONTACTO PERSONAL (Laboral)**
Para un asesoramiento detallado sobre su caso laboral, haga clic aquí:
- [WhatsApp] (https://wa.me/5491131976852)
- [Formulario Completo] (https://docs.google.com/forms/d/e/1FAIpQLSddw0zwc76GuSUHh2rpuxSO59BeyDItbWMVHDOp1d_rTp28Eg/viewform)
Escriba **MENU_ANTERIOR** para volver al menú de Laboral o **VOLVER** para el menú de Áreas.`, // Ajustado el texto del comando para volver
    },

    // =========================================================================
    // RESPUESTAS DE DERECHO SUCESORIO
    // =========================================================================
    SUCESIONES: { // Cambiado a 'SUCESIONES'
        'SUCESION_AB_INTESTATO': `**P1: Sucesión Ab Intestato (Sin Testamento)**
Es la más común. La ley determina quiénes son los herederos y en qué proporción (ej. hijos, cónyuge, padres).`,
        'SUCESION_TESTAMENTARIA': `**P2: Sucesión Testamentaria (Con Testamento)**
Hay un testamento válido que establece la distribución de los bienes. Debe respetar la porción legítima de los herederos forzosos.`,

        'HEREDEROS_FORZOSOS': `**P3: Herederos Forzosos**
Son los descendientes (hijos), ascendientes (padres) y el cónyuge. No pueden ser privados de su porción de la herencia (legítima) salvo causas muy graves.`,
        'HEREDEROS_NO_FORZOSOS': `**P4: Herederos No Forzosos y Legatarios**
Herederos no forzosos (ej. hermanos) heredan si no hay forzosos. Legatarios son quienes reciben un bien o porción específica de la herencia a través de un testamento.`,

        'PROCESO_DECLARATORIA_HEREDEROS': `**P5: ¿Qué es la Declaratoria de Herederos?**
Es la resolución judicial que reconoce formalmente quiénes son los herederos del fallecido, en base a la ley y las pruebas presentadas (partidas de nacimiento, matrimonio).`,
        'PROCESO_DOCUMENTACION_NECESARIA': `**P6: Documentación Necesaria**
Partida de defunción, partidas de vínculo (nacimiento, matrimonio), título de propiedad de los bienes.`,

        'PARTICION_BIENES': `**P7: Partición de Bienes**
Es el acto por el cual los bienes de la herencia se dividen entre los herederos. Puede ser privada (por acuerdo) o judicial (si no hay acuerdo).`,

        // MENÚS ESPECÍFICOS DE SUCESIONES
        'MENU_SUCESIONES': [ // Cambiado a 'MENU_SUCESIONES'
            { text: 'Tipos de Sucesiones 📜', value: 'SUBMENU_TIPOS_SUCESIONES' },
            { text: 'Herederos y Legatarios 👪', value: 'SUBMENU_HEREDEROS_LEGATARIOS' },
            { text: 'Proceso Sucesorio 🏛️', value: 'SUBMENU_PROCESO_SUCESORIO' },
            { text: 'Partición de Herencia 🤝', value: 'SUBMENU_PARTICION_HERENCIA' },
            { text: 'Contacto Personal 📞', value: 'CONTACTO_PERSONAL_SUCESIONES' },
            { text: '⬅️ Volver a Áreas Principales', value: 'VOLVER_AREAS' }
        ],

        'SUBMENU_TIPOS_SUCESIONES': [
            { text: '¿Qué es la sucesión ab intestato (sin testamento)?', value: 'SUCESION_AB_INTESTATO' },
            { text: '¿Qué es la sucesión testamentaria?', value: 'SUCESION_TESTAMENTARIA' },
            { text: '⬅️ Volver a Sucesiones', value: 'MENU_SUCESIONES_BACK' }, // Ajustado el value
            { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
        ],

        'SUBMENU_HEREDEROS_LEGATARIOS': [
            { text: '¿Quiénes son los herederos forzosos?', value: 'HEREDEROS_FORZOSOS' },
            { text: '¿Quiénes son los herederos no forzosos y legatarios?', value: 'HEREDEROS_NO_FORZOSOS' },
            { text: '⬅️ Volver a Sucesiones', value: 'MENU_SUCESIONES_BACK' }, // Ajustado el value
            { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
        ],

        'SUBMENU_PROCESO_SUCESORIO': [
            { text: '¿Qué es la Declaratoria de Herederos?', value: 'PROCESO_DECLARATORIA_HEREDEROS' },
            { text: '¿Qué documentación necesito para iniciar una sucesión?', value: 'PROCESO_DOCUMENTACION_NECESARIA' },
            { text: '⬅️ Volver a Sucesiones', value: 'MENU_SUCESIONES_BACK' }, // Ajustado el value
            { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
        ],

        'SUBMENU_PARTICION_HERENCIA': [
            { text: '¿Cómo se dividen los bienes de una herencia?', value: 'PARTICION_BIENES' },
            { text: '⬅️ Volver a Sucesiones', value: 'MENU_SUCESIONES_BACK' }, // Ajustado el value
            { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
        ],

        'CONTACTO_PERSONAL_SUCESIONES': `**CONTACTO PERSONAL (Sucesiones)**
Para un asesoramiento detallado sobre su caso sucesorio, haga clic aquí:
- [WhatsApp] (https://wa.me/5491131976852)
- [Formulario Completo] (https://docs.google.com/forms/d/e/1FAIpQLSddw0zwc76GuSUHh2rpuxSO59BeyDItbWMVHDOp1d_rTp28Eg/viewform)
Escriba **MENU_ANTERIOR** para volver al menú de Sucesiones o **VOLVER** para el menú de Áreas.`, // Ajustado el texto del comando para volver
    },

    // =========================================================================
    // RESPUESTAS DE CONTRATOS
    // =========================================================================
    CONTRATOS: { // Cambiado a 'CONTRATOS'
        'ALQUILER_LEY': `**P1: Ley de Alquileres (Ley 27.551/27.737)**
La ley actual establece plazos mínimos, ajustes semestrales o anuales por un índice específico, y otras condiciones para proteger al inquilino y locador.`,
        'ALQUILER_RESCISION_ANTICIPADA': `**P2: Rescisión Anticipada del Contrato de Alquiler**
El inquilino puede rescindir, pero con preaviso y posible pago de indemnización si no se cumple el plazo mínimo o el preaviso.`,
        'ALQUILER_GARANTIAS': `**P3: Garantías en Alquileres**
Las garantías más comunes son fianza (garantía propietaria), seguro de caución o recibos de sueldo. La ley actual limita la cantidad de garantías.`,

        'COMPRAVENTA_INMUEBLES': `**P4: Contrato de Compraventa de Inmuebles**
Requiere escritura pública para su validez y oponibilidad a terceros. El boleto de compraventa es un precontrato que genera obligaciones.`,
        'COMPRAVENTA_CLAUSULAS_ESENCIALES': `**P5: Cláusulas Esenciales en Compraventa**
Identificación de partes, descripción del bien, precio y forma de pago, plazos de entrega, y condiciones resolutorias.`,

        'INCUMPLIMIENTO_CONTRACTUAL': `**P6: ¿Qué hacer ante un Incumplimiento Contractual?**
Se puede exigir el cumplimiento forzado del contrato, la resolución del mismo con daños y perjuicios, o la aplicación de cláusulas penales.`,

        'CLAUSULAS_REVISION': `**P7: Cláusulas de Revisión**
Permiten adaptar el contrato a cambios de circunstancias (ej. inflación) para mantener el equilibrio de las prestaciones.`,
        'CLAUSULAS_PENALES': `**P8: Cláusulas Penales**
Fijan de antemano una multa o indemnización para el caso de incumplimiento, facilitando el reclamo sin necesidad de probar el daño exacto.`,

        // MENÚS ESPECÍFICOS DE CONTRATOS
        'MENU_CONTRATOS': [ // Cambiado a 'MENU_CONTRATOS'
            { text: 'Contratos de Alquiler 🏠', value: 'SUBMENU_ALQUILER_CONTRATOS' },
            { text: 'Contratos de Compraventa ✍️', value: 'SUBMENU_COMPRAVENTA_CONTRATOS' },
            { text: 'Incumplimiento de Contratos 💔', value: 'SUBMENU_INCUMPLIMIENTO_CONTRATOS' },
            { text: 'Cláusulas Importantes 📝', value: 'SUBMENU_CLAUSULAS_IMPORTANTES' },
            { text: 'Contacto Personal 📞', value: 'CONTACTO_PERSONAL_CONTRATOS' },
            { text: '⬅️ Volver a Áreas Principales', value: 'VOLVER_AREAS' }
        ],

        'SUBMENU_ALQUILER_CONTRATOS': [
            { text: '¿Qué dice la Ley de Alquileres?', value: 'ALQUILER_LEY' },
            { text: '¿Cómo rescindo un contrato de alquiler anticipadamente?', value: 'ALQUILER_RESCISION_ANTICIPADA' },
            { text: '¿Qué garantías se piden en un alquiler?', value: 'ALQUILER_GARANTIAS' },
            { text: '⬅️ Volver a Contratos', value: 'MENU_CONTRATOS_BACK' }, // Ajustado el value
            { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
        ],

        'SUBMENU_COMPRAVENTA_CONTRATOS': [
            { text: '¿Cómo funciona la compraventa de inmuebles?', value: 'COMPRAVENTA_INMUEBLES' },
            { text: '¿Qué cláusulas son importantes en una compraventa?', value: 'COMPRAVENTA_CLAUSULAS_ESENCIALES' },
            { text: '⬅️ Volver a Contratos', value: 'MENU_CONTRATOS_BACK' }, // Ajustado el value
            { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
        ],

        'SUBMENU_INCUMPLIMIENTO_CONTRATOS': [
            { text: '¿Qué puedo hacer si hay un incumplimiento contractual?', value: 'INCUMPLIMIENTO_CONTRACTUAL' },
            { text: '⬅️ Volver a Contratos', value: 'MENU_CONTRATOS_BACK' }, // Ajustado el value
            { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
        ],

        'SUBMENU_CLAUSULAS_IMPORTANTES': [
            { text: '¿Qué son las cláusulas de revisión?', value: 'CLAUSULAS_REVISION' },
            { text: '¿Qué son las cláusulas penales?', value: 'CLAUSULAS_PENALES' },
            { text: '⬅️ Volver a Contratos', value: 'MENU_CONTRATOS_BACK' }, // Ajustado el value
            { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
        ],

        'CONTACTO_PERSONAL_CONTRATOS': `**CONTACTO PERSONAL (Contratos)**
Para un asesoramiento detallado sobre su caso de contratos, haga clic aquí:
- [WhatsApp] (https://wa.me/5491131976852)
- [Formulario Completo] (https://docs.google.com/forms/d/e/1FAIpQLSddw0zwc76GuSUHh2rpuxSO59BeyDItbWMVHDOp1d_rTp28Eg/viewform)
Escriba **MENU_ANTERIOR** para volver al menú de Contratos o **VOLVER** para el menú de Áreas.`, // Ajustado el texto del comando para volver
    },

    // =========================================================================
    // RESPUESTAS DE ACCIDENTES DE TRÁNSITO
    // =========================================================================
    TRANSITO: { // Cambiado a 'TRANSITO'
        'ACCIDENTE_QUE_HACER': `**P1: ¿Qué hacer en el momento del Accidente?**
1. **No mover** los vehículos ni la escena (salvo riesgo).
2. Llamar a la policía (si hay lesionados o dudas).
3. Tomar **fotos y videos** (daños, patentes, ubicación, personas).
4. Recopilar **datos de terceros** (nombre, DNI, teléfono, seguro, patente).
5. No admitir responsabilidad ni llegar a acuerdos en el lugar.
6. Si hay lesiones, ir a un centro médico y guardar comprobantes.`,

        'LESIONES_RECLAMO_SEGURO': `**P2: Lesiones: ¿Cómo reclamo a la aseguradora?**
Una vez atendido, notificar a su compañía y a la del tercero (si lo hubiera). Se inicia un reclamo administrativo con la aseguradora del responsable. Si no hay acuerdo, se puede ir a juicio.`,

        'DAÑOS_MATERIALES_RECLAMO': `**P3: Daños Materiales: ¿Cómo reclamo?**
Presentar denuncia a su aseguradora y/o a la del tercero. Se peritan los daños. Si no hay acuerdo en el monto de la reparación, se puede litigar.`,


        // MENÚS ESPECÍFICOS DE TRÁNSITO
        'MENU_TRANSITO': [ // Cambiado a 'MENU_TRANSITO'
            { text: '¿Qué hacer en un Accidente? 🚨', value: 'ACCIDENTE_QUE_HACER' },
            { text: 'Reclamo por Lesiones Personales 🤕', value: 'LESIONES_RECLAMO_SEGURO' },
            { text: 'Reclamo por Daños Materiales al Vehículo 🔨', value: 'DAÑOS_MATERIALES_RECLAMO' },
            { text: 'Baremo de Lesiones (Daño Civil) 📊', value: 'BAREMO_CIVIL' }, // <-- Usar solo 'BAREMO_CIVIL'
            { text: 'Contacto Personal 📞', value: 'CONTACTO_PERSONAL_TRANSITO' },
            { text: '⬅️ Volver a Áreas Principales', value: 'VOLVER_AREAS' }
        ],

        'CONTACTO_PERSONAL_TRANSITO': `**CONTACTO PERSONAL (Accidentes de Tránsito)**
Para un asesoramiento detallado sobre su caso de tránsito, haga clic aquí:
- [WhatsApp] (https://wa.me/5491131976852)
- [Formulario Completo] (https://docs.google.com/forms/d/e/1FAIpQLSddw0zwc76GuSUHh2rpuxSO59BeyDItbWMVHDOp1d_rTp28Eg/viewform)
Escriba **MENU_ANTERIOR** para volver al menú de Tránsito o **VOLVER** para el menú de Áreas.`, // Ajustado el texto del comando para volver
    },

    // =========================================================================
    // INFORMACIÓN DE BAREMOS Y DAÑOS (ahora fuera de las RESPUESTAS_X)
    // =========================================================================
    BAREMO_Y_DAÑO: {
        'LABORAL': {
            NOMBRE: "Baremo Laboral (Incapacidad ART)",
            FUNDAMENTO: [
                "Ley de Riesgos del Trabajo N° 24.557",
                "Decreto PEN 659/96 (Tabla de Evaluación de Incapacidades Laborales)",
                "Jurisprudencia específica de cada fuero (ej. 'Méndez' o 'Milone' para topes indemnizatorios)"
            ],
            DESCRIPCION: `Este baremo se utiliza para determinar el porcentaje de incapacidad laboral permanente que sufre un trabajador a causa de un accidente de trabajo o enfermedad profesional. Este porcentaje es fundamental para calcular la indemnización correspondiente por parte de la Aseguradora de Riesgos del Trabajo (ART).`,
            FACTORES_PONDERACION: [
                "Edad del trabajador",
                "Tipo de actividad laboral (esfuerzo, calificación)",
                "Dificultad para la reubicación en el mercado laboral",
                "Factores de ponderación de la tabla del Decreto 659/96."
            ],
            COMPONENTES: [
                "Daño Físico (lesiones)",
                "Daño Psíquico (secuelas psicológicas)",
                "Daño Estético (en algunos casos, si afecta la capacidad laboral)",
                "Gastos de tratamiento y rehabilitación"
            ],
            METODO_CALCULO: `La incapacidad se determina por examen médico pericial siguiendo las pautas del Decreto 659/96. El porcentaje final de incapacidad se aplica sobre un cálculo que considera el salario base del trabajador, su edad y un coeficiente de ajuste según la fórmula 'Vuotto' o similar, dependiendo del criterio judicial.`,
            OBSERVACIONES: `Es crucial contar con un seguimiento médico adecuado y asesoramiento legal para asegurar la correcta determinación de la incapacidad y la liquidación de la indemnización. Las ART suelen ofrecer una primera liquidación que puede ser inferior a lo que realmente corresponde.
            
            Para un asesoramiento especializado sobre incapacidades laborales, le sugerimos contactarnos directamente.`
        },
        'CIVIL': {
            NOMBRE: "Baremo de Lesiones (Daño Civil)",
            FUNDAMENTO: [
                "Jurisprudencia de la Corte Suprema de Justicia de la Nación (ej. 'Méndez', 'Vuotto', 'Peralta')",
                "Doctrina jurídica sobre la cuantificación del daño",
                "Dictámenes periciales médicos y psicológicos"
            ],
            DESCRIPCION: `Este baremo (más bien un conjunto de criterios jurisprudenciales y doctrinales) se aplica en reclamos por daños y perjuicios en el ámbito civil (ej. accidentes de tránsito, mala praxis, caídas) para cuantificar la indemnización por las lesiones sufridas. No es una tabla rígida, sino una guía para la valoración judicial.`,
            FACTORES_PONDERACION: [
                "Gravedad y extensión de las lesiones (físicas y psíquicas)",
                "Edad de la víctima",
                "Ingresos de la víctima (capacidad de generar ganancias)",
                "Actividades que realizaba y dejó de realizar",
                "Gastos médicos, de rehabilitación y farmacéuticos",
                "Padecimientos sufridos (daño moral/extrapatrimonial)"
            ],
            COMPONENTES: [
                "Lucro Cesante (pérdida de ganancias futuras)",
                "Daño Emergente (gastos médicos, traslados, etc.)",
                "Incapacidad Sobreviniente (pérdida de capacidad física o psíquica para el trabajo o la vida diaria)",
                "Daño Moral (sufrimientos, angustias, impacto emocional)",
                "Daño Estético (en algunos casos, si no está ya incluido en la incapacidad)"
            ],
            METODO_CALCULO: `La cuantificación se realiza "caso por caso", aunque los jueces utilizan fórmulas matemáticas (ej. 'Vuotto', 'Méndez', 'Peralta') para guiar el cálculo de la incapacidad sobreviniente y el lucro cesante, adaptándolas a las circunstancias particulares de la víctima y los montos de referencia en casos similares.`,
            OBSERVACIONES: `La valoración del daño civil es compleja y requiere pericias médicas, psicológicas y contables. Es fundamental contar con representación legal especializada para obtener una indemnización justa.
            
            Para un asesoramiento especializado sobre daños civiles, le sugerimos contactarnos directamente.`
        }
    }
}; // <<-- ¡Este es el cierre final y crucial que faltaba!
