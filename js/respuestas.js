// Base de Datos de Respuestas de Derecho de Familia (Provincia de Buenos Aires)
const RESPUESTAS_FAMILIA = {
    // TEMAS PRINCIPALES DEL MENÚ
    '1': 'Cuota Alimentaria',
    '2': 'Cuidado Personal y Comunicación',
    '3': 'Incumplimiento y Ejecución',
    '4': 'Temas Especiales y Procesales',
    '5': 'Contacto Personal',

    // SUB-TEMAS DE CUOTA ALIMENTARIA (1.1, 1.2, 1.3)
    '1.1': `**P1: Alcance y Edad Límite (Art. 658, 662 CCCN)**
La cuota no es solo comida, abarca manutención, educación, esparcimiento, vestimenta, salud y vivienda.
Edad: Obligatoria hasta los **21 años**, y se extiende hasta los **25 años** si el hijo/a se capacita o estudia.
Cálculo: Se basa en las **Necesidades** del Niño/a y la **Capacidad Económica** del Alimentante.`,

    '1.2': `**P2: Tareas de Cuidado (Art. 660 CCCN)**
Las tareas de cuidado personal del progenitor conviviente tienen **valor económico** y constituyen un aporte a la manutención.
El Juez equilibra los aportes: el progenitor no conviviente debe realizar un aporte económico proporcional a la diferencia de tareas.`,
    
    '1.3': `**P3: Cuota Provisional Urgente (Art. 544 CCCN)**
Sí. Se puede solicitar una Cuota Provisional desde el inicio de la demanda (o en cualquier momento) para cubrir necesidades urgentes, sin esperar la sentencia. Requiere acreditar el vínculo y las necesidades básicas.`,

    // SUB-TEMAS DE CUIDADO PERSONAL Y COMUNICACIÓN (2.1, 2.2)
    '2.1': `**P4: Cuidado Personal (Art. 650 CCCN)**
Es la responsabilidad sobre la vida diaria.
Regla General: El **Cuidado Compartido** es la regla general, en modalidad Indistinta (un solo domicilio) o Alternada (tiempo dividido).
Excepción: El Cuidado Unilateral se reserva solo si el Interés Superior del Niño/a lo exige (ej. violencia).`,

    '2.2': `**P5: Régimen de Comunicación (Art. 652 CCCN)**
Es un derecho del hijo/a a mantener contacto con el progenitor no conviviente.
Incluye visitas presenciales, contacto telefónico, videollamadas y participación en decisiones trascendentales (salud/educación).`,

    // SUB-TEMAS DE INCUMPLIMIENTO Y EJECUCIÓN (3.1)
    '3.1': `**P8: Ejecución de Alimentos**
Se inicia la Acción de Ejecución de Alimentos (Apremio), un proceso rápido para el cobro forzado. El Juez puede ordenar:
1. **Embargos** sobre sueldos, cuentas y bienes.
2. Inscripción en el **Registro de Deudores Alimentarios Morosos (REDAM)** de PBA.
3. **Astrenties** (sanciones conminatorias).`,

    // SUB-TEMAS ESPECIALES Y PROCESALES (4.1, 4.2, 4.3, 4.4)
    '4.1': `**P6: Competencia y Presentación Digital**
Competencia: Juzgados de Familia de PBA. El Juez competente es el del **“Centro de Vida”** del niño/a (donde reside habitualmente).
Presentación: Todo escrito se presenta por Mesa de Entradas Virtual (MEV), con constitución obligatoria de Domicilio Electrónico.`,

    '4.2': `**P7: Mediación Previa Obligatoria**
Sí (Ley 13.951). Es un requisito procesal ineludible para Alimentos, Comunicación y Divorcio.
Se debe obtener el **Acta de Cierre** para iniciar la demanda.
Excepción: Medidas cautelares urgentes (Cuota Provisional) y denuncias de Violencia Familiar.`,

    '4.3': `**P9: Adición de Apellido**
Sí. Se llama Adición de Apellido por Justo Motivo (Art. 69 CCCN), fundamentado en el Derecho a la Identidad.
La acción de reclamación de filiación es **imprescriptible**.`,

    '4.4': `**P10: Viaje al Exterior**
Se requiere el **consentimiento de ambos progenitores** (Art. 645 CCCN).
Si hay negativa: Se inicia la Acción Judicial de **Autorización Supletoria** para Salir del País ante el Juzgado de Familia.`,

    // RESPUESTAS AUXILIARES Y MENÚS
    'MENU_PRINCIPAL': `Escriba el número del tema para ver las opciones detalladas:
1. Cuota Alimentaria 💰
2. Cuidado Personal y Comunicación 🏡
3. Incumplimiento y Ejecución 🔴
4. Temas Especiales y Procesales ⚖️
5. Contacto Personal 📞`,

    'OPCIONES_1': `**CUOTA ALIMENTARIA**
Escriba el número de la pregunta que desea revisar:
1.1. ¿Hasta qué edad se paga y qué incluye?
1.2. ¿Cómo influyen las tareas de cuidado?
1.3. ¿Puedo pedir una Cuota Provisional urgente?
Escriba **MENÚ** para volver al principal.`,

    'OPCIONES_2': `**CUIDADO PERSONAL Y COMUNICACIÓN**
Escriba el número de la pregunta que desea revisar:
2.1. ¿Qué es el Cuidado Personal (Tenencia)?
2.2. ¿Qué incluye el Régimen de Comunicación (Visitas)?
Escriba **MENÚ** para volver al principal.`,

    'OPCIONES_3': `**INCUMPLIMIENTO Y EJECUCIÓN**
Escriba el número de la pregunta que desea revisar:
3.1. ¿Qué hago si no me pagan la Cuota Alimentaria? (Embargos/REDAM)
Escriba **MENÚ** para volver al principal.`,

    'OPCIONES_4': `**TEMAS ESPECIALES Y PROCESALES**
Escriba el número de la pregunta que desea revisar:
4.1. ¿Dónde presento la demanda (Competencia y Digital)?
4.2. ¿Es obligatoria la Mediación Previa en PBA?
4.3. ¿Puedo agregar el apellido paterno siendo adulto?
4.4. ¿Necesito permiso del otro progenitor para viajar al exterior?
Escriba **MENÚ** para volver al principal.`,

    'OPCIONES_5': `**CONTACTO PERSONAL**
Para un asesoramiento detallado sobre su caso, haga clic aquí:
- **WhatsApp:** [Enviar Mensaje Directo] (https://wa.me/5491131976852)
- **Formulario Completo:** [Completar Consulta Detallada] (https://ejemplo.com/formulario)
Escriba **MENÚ** para volver al principal.`,

    // Mensajes genéricos
    'WELCOME': '¡Hola! Soy el asistente virtual del Estudio Jurídico Zurita Lionel. Puedo asistirlo con las consultas más frecuentes sobre Derecho de Familia en PBA. Escriba el número del tema que le interesa:',
    'ERROR': 'Opción inválida. Por favor, escriba el número de la pregunta (ej. 1.1) o **MENÚ** para volver a la lista principal.'
};
