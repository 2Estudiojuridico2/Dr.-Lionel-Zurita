// respuestas.js
// Base de Datos de Respuestas de las distintas áreas legales

// =========================================================================
// RESPUESTAS DE DERECHO DE FAMILIA (Provincia de Buenos Aires)
// =========================================================================
const RESPUESTAS_FAMILIA = {
    // Definiciones de preguntas frecuentes
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
    'MENU_FAMILIA': [
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
        { text: '⬅️ Volver a Familia', value: 'MENU_FAMILIA_BACK' }, // Necesita un value para volver al menú anterior
        { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ],

    'SUBMENU_CUIDADO_COMUNICACION': [
        { text: '¿Qué es el Cuidado Personal (Tenencia)?', value: 'CUIDADO_PERSONAL_QUE_ES' },
        { text: '¿Qué incluye el Régimen de Comunicación (Visitas)?', value: 'CUIDADO_PERSONAL_REGIMEN_COMUNICACION' },
        { text: '⬅️ Volver a Familia', value: 'MENU_FAMILIA_BACK' },
        { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ],

    'SUBMENU_INCUMPLIMIENTO_EJECUCION': [
        { text: '¿Qué hago si no me pagan la Cuota Alimentaria? (Embargos/REDAM)', value: 'INCUMPLIMIENTO_EJECUCION_ALIMENTOS' },
        { text: '⬅️ Volver a Familia', value: 'MENU_FAMILIA_BACK' },
        { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ],

    'SUBMENU_TEMAS_ESPECIALES': [
        { text: '¿Dónde presento la demanda (Competencia y Digital)?', value: 'TEMAS_ESPECIALES_COMPETENCIA' },
        { text: '¿Es obligatoria la Mediación Previa en PBA?', value: 'TEMAS_ESPECIALES_MEDIACION_PREVIA' },
        { text: '¿Puedo agregar el apellido paterno siendo adulto?', value: 'TEMAS_ESPECIALES_ADICION_APELLIDO' },
        { text: '¿Necesito permiso del otro progenitor para viajar al exterior?', value: 'TEMAS_ESPECIALES_VIAJE_EXTERIOR' },
        { text: '⬅️ Volver a Familia', value: 'MENU_FAMILIA_BACK' },
        { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ],

    'CONTACTO_PERSONAL_FAMILIA': `**CONTACTO PERSONAL (Familia)**
Para un asesoramiento detallado sobre su caso de familia, haga clic aquí:
- [WhatsApp] (https://wa.me/5491131976852)
- [Formulario Completo] (https://docs.google.com/forms/d/e/1FAIpQLSddw0zwc76GuSUHh2rpuxSO59BeyDItbWMVHDOp1d_rTp28Eg/viewform)
Escriba **MENÚ** para volver al menú de Familia o **VOLVER** para el menú de Áreas.`,
};

// =========================================================================
// RESPUESTAS DE DERECHO LABORAL
// =========================================================================
const RESPUESTAS_LABORAL = {
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

    'ACCIDENTE_TRABAJO_QUE_HACER': `**P6: ¿Qué hacer ante un Accidente de
Trabajo?**
Comunicar inmediatamente a la ART y al
empleador. La ART debe brindar atención médica y prestaciones. Si no responde,
podemos iniciar acciones.`,
    'ACCIDENTE_TRABAJO_ENFERMEDADES_PRO': `**P7: Enfermedades
Profesionales**
Son las contraídas a causa o en ocasión del
trabajo, listadas en la ley. También dan derecho a cobertura de la ART y, en
algunos casos, a indemnización adicional.`,

    'ACOSO_LABORAL_MOBBING': `**P8: Acoso Laboral (Mobbing)**
Es un trato hostil, abusivo o
discriminatorio recurrente en el ámbito laboral que daña la dignidad del
trabajador. Puede ser causa de despido indirecto y generar derecho a
indemnización.`,

    // MENÚS ESPECÍFICOS DE LABORAL
    'MENU_LABORAL': [
        { text: 'Despido 🧑‍⚖️', value: 'SUBMENU_DESPIDO_LABORAL' },
        { text: 'Indemnizaciones 💸', value: 'SUBMENU_INDEMNIZACIONES_LABORAL' },
        { text: 'Accidentes de Trabajo 🩹', value: 'SUBMENU_ACCIDENTES_TRABAJO_LABORAL' },
        { text: 'Acoso Laboral (Mobbing) 🚫', value: 'SUBMENU_ACOSO_LABORAL' },
        { text: 'Baremo Laboral (Incapacidad ART) 📊', value: 'BAREMO_LABORAL_INFO' }, // <-- Opción nueva
        { text: 'Contacto Personal 📞', value: 'CONTACTO_PERSONAL_LABORAL' },
        { text: '⬅️ Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ]
};
    'SUBMENU_DESPIDO_LABORAL': [
        { text: '¿Qué es el despido sin causa?', value: 'DESPIDO_SIN_CAUSA' },
        { text: '¿Qué es el despido con justa causa?', value: 'DESPIDO_POR_CAUSA' },
        { text: '¿Qué es el despido indirecto?', value: 'DESPIDO_INDIRECTO' },
        { text: '⬅️ Volver a Laboral', value: 'MENU_LABORAL_BACK' },
        { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ],

    'SUBMENU_INDEMNIZACIONES_LABORAL': [
        { text: '¿Cómo se calcula una indemnización?', value: 'INDEMNIZACION_CALCULO' },
        { text: '¿Qué rubros incluye la indemnización por despido?', value: 'INDEMNIZACION_RUBROS' },
        { text: '⬅️ Volver a Laboral', value: 'MENU_LABORAL_BACK' },
        { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ],

    'SUBMENU_ACCIDENTES_TRABAJO_LABORAL': [
        { text: '¿Qué hacer ante un accidente de trabajo?', value: 'ACCIDENTE_TRABAJO_QUE_HACER' },
        { text: '¿Qué son las enfermedades profesionales?', value: 'ACCIDENTE_TRABAJO_ENFERMEDADES_PRO' },
        { text: '⬅️ Volver a Laboral', value: 'MENU_LABORAL_BACK' },
        { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ],

    'SUBMENU_ACOSO_LABORAL': [
        { text: '¿Qué es el Acoso Laboral o Mobbing?', value: 'ACOSO_LABORAL_MOBBING' },
        { text: '⬅️ Volver a Laboral', value: 'MENU_LABORAL_BACK' },
        { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ],

    'CONTACTO_PERSONAL_LABORAL': `**CONTACTO PERSONAL (Laboral)**
Para un asesoramiento detallado sobre su caso laboral, haga clic aquí:
- [WhatsApp] (https://wa.me/5491131976852)
- [Formulario Completo] (https://docs.google.com/forms/d/e/1FAIpQLSddw0zwc76GuSUHh2rpuxSO59BeyDItbWMVHDOp1d_rTp28Eg/viewform)
Escriba **MENÚ** para volver al menú de Laboral o **VOLVER** para el menú de Áreas.`,
};

// =========================================================================
// RESPUESTAS DE DERECHO SUCESORIO
// =========================================================================
const RESPUESTAS_SUCESIONES = {
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
    'MENU_SUCESIONES': [
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
        { text: '⬅️ Volver a Sucesiones', value: 'MENU_SUCESIONES_BACK' },
        { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ],

    'SUBMENU_HEREDEROS_LEGATARIOS': [
        { text: '¿Quiénes son los herederos forzosos?', value: 'HEREDEROS_FORZOSOS' },
        { text: '¿Quiénes son los herederos no forzosos y legatarios?', value: 'HEREDEROS_NO_FORZOSOS' },
        { text: '⬅️ Volver a Sucesiones', value: 'MENU_SUCESIONES_BACK' },
        { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ],

    'SUBMENU_PROCESO_SUCESORIO': [
        { text: '¿Qué es la Declaratoria de Herederos?', value: 'PROCESO_DECLARATORIA_HEREDEROS' },
        { text: '¿Qué documentación necesito para iniciar una sucesión?', value: 'PROCESO_DOCUMENTACION_NECESARIA' },
        { text: '⬅️ Volver a Sucesiones', value: 'MENU_SUCESIONES_BACK' },
        { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ],

    'SUBMENU_PARTICION_HERENCIA': [
        { text: '¿Cómo se dividen los bienes de una herencia?', value: 'PARTICION_BIENES' },
        { text: '⬅️ Volver a Sucesiones', value: 'MENU_SUCESIONES_BACK' },
        { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ],

    'CONTACTO_PERSONAL_SUCESIONES': `**CONTACTO PERSONAL (Sucesiones)**
Para un asesoramiento detallado sobre su caso sucesorio, haga clic aquí:
- [WhatsApp] (https://wa.me/5491131976852)
- [Formulario Completo] (https://docs.google.com/forms/d/e/1FAIpQLSddw0zwc76GuSUHh2rpuxSO59BeyDItbWMVHDOp1d_rTp28Eg/viewform)
Escriba **MENÚ** para volver al menú de Sucesiones o **VOLVER** para el menú de Áreas.`,
};

// =========================================================================
// RESPUESTAS DE CONTRATOS
// =========================================================================
const RESPUESTAS_CONTRATOS = {
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
    'MENU_CONTRATOS': [
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
        { text: '⬅️ Volver a Contratos', value: 'MENU_CONTRATOS_BACK' },
        { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ],

    'SUBMENU_COMPRAVENTA_CONTRATOS': [
        { text: '¿Cómo funciona la compraventa de inmuebles?', value: 'COMPRAVENTA_INMUEBLES' },
        { text: '¿Qué cláusulas son importantes en una compraventa?', value: 'COMPRAVENTA_CLAUSULAS_ESENCIALES' },
        { text: '⬅️ Volver a Contratos', value: 'MENU_CONTRATOS_BACK' },
        { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ],

    'SUBMENU_INCUMPLIMIENTO_CONTRATOS': [
        { text: '¿Qué puedo hacer si hay un incumplimiento contractual?', value: 'INCUMPLIMIENTO_CONTRACTUAL' },
        { text: '⬅️ Volver a Contratos', value: 'MENU_CONTRATOS_BACK' },
        { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ],

    'SUBMENU_CLAUSULAS_IMPORTANTES': [
        { text: '¿Qué son las cláusulas de revisión?', value: 'CLAUSULAS_REVISION' },
        { text: '¿Qué son las cláusulas penales?', value: 'CLAUSULAS_PENALES' },
        { text: '⬅️ Volver a Contratos', value: 'MENU_CONTRATOS_BACK' },
        { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ],

    'CONTACTO_PERSONAL_CONTRATOS': `**CONTACTO PERSONAL (Contratos)**
Para un asesoramiento detallado sobre su caso de contratos, haga clic aquí:
- [WhatsApp] (https://wa.me/5491131976852)
- [Formulario Completo] (https://docs.google.com/forms/d/e/1FAIpQLSddw0zwc76GuSUHh2rpuxSO59BeyDItbWMVHDOp1d_rTp28Eg/viewform)
Escriba **MENÚ** para volver al menú de Contratos o **VOLVER** para el menú de Áreas.`,
};

// =========================================================================
// RESPUESTAS DE ACCIDENTES DE TRÁNSITO
// =========================================================================
const RESPUESTAS_TRANSITO = {
    'PRIMEROS_PASOS_QUE_HACER': `**P1: ¿Qué hacer inmediatamente después de un accidente?**
Priorizar la seguridad y salud. No mover heridos. Llamar a emergencias (107/911) y a la policía. Recopilar datos: patentes, seguros, datos de conductores, fotos.`,
    'PRIMEROS_PASOS_DENUNCIA_POLICIAL': `**P2: ¿Debo hacer la denuncia policial?**
Sí, es recomendable para dejar constancia del hecho, aunque no es indispensable para el reclamo civil si hay otros medios de prueba.`,
    'PRIMEROS_PASOS_DATOS_TOMAR': `**P3: ¿Qué datos debo tomar en el lugar del hecho?**
Patentes de todos los vehículos, datos de los conductores, seguros (compañía y número de póliza), al menos 3 testigos (nombre y teléfono), fotos de los daños, posición final de los vehículos y señales de tránsito.`,

    'RECLAMO_ASEGURADORAS_INICIAR': `**P4: ¿Cómo iniciar el reclamo a la aseguradora?**
Presentar la denuncia administrativa en la aseguradora del vehículo causante (o la propia si es tu cobertura). Es crucial hacerlo lo antes posible.`,
    'RECLAMO_ASEGURADORAS_ABOGADO': `**P5: ¿Necesito un abogado para el reclamo a la aseguradora?**
Es altamente recomendable. Las aseguradoras suelen ofrecer montos bajos o intentar dilatar el proceso. Un abogado especializado protegerá tus derechos.`,

    'PERICIA_QUE_ES': `**P6: ¿Qué es una Pericia Accidentológica?**
Es un estudio técnico-científico realizado por un ingeniero (accidentólogo vial) que reconstruye el accidente para determinar causas, velocidades, responsabilidades y daños. Es clave en juicios.`,
    'PERICIA_CUANDO_NECESARIA': `**P7: ¿Cuándo es necesaria una Pericia?**
En casos complejos, con versiones contradictorias, o cuando la aseguradora disputa la responsabilidad. Aclara la mecánica del hecho y es fundamental para la prueba en el juicio.`,

    'INDEMNIZACIONES_DANOS_RECLAMAR': `**P8: ¿Qué daños puedo reclamar?**
Daño emergente (gastos médicos, traslados, reparaciones del vehículo), lucro cesante (ganancias dejadas de percibir), daño moral (sufrimiento, angustia), incapacidad física o psíquica.`,
    'INDEMNIZACIONES_PLAZO_RECLAMAR': `**P9: ¿Cuánto tiempo tengo para reclamar?**
El plazo de prescripción es de **2 años** desde la fecha del accidente para iniciar la acción judicial.`,

    // MENÚS ESPECÍFICOS DE ACCIDENTES DE TRÁNSITO
    'MENU_TRANSITO': [
        { text: 'Primeros Pasos Post-Accidente 🚨', value: 'SUBMENU_PRIMEROS_PASOS_TRANSITO' },
        { text: 'Reclamo a Aseguradoras 🛡️', value: 'SUBMENU_RECLAMO_ASEGURADORAS_TRANSITO' },
        { text: 'Pericia Accidentológica 📊', value: 'SUBMENU_PERICIA_ACCIDENTOLOGICA_TRANSITO' },
        { text: 'Indemnizaciones y Daños 💵', value: 'SUBMENU_INDEMNIZACIONES_DANOS_TRANSITO' },
        { text: 'Contacto Personal 📞', value: 'CONTACTO_PERSONAL_TRANSITO' },
        { text: '⬅️ Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ],

    'SUBMENU_PRIMEROS_PASOS_TRANSITO': [
        { text: '¿Qué hacer inmediatamente después de un accidente?', value: 'PRIMEROS_PASOS_QUE_HACER' },
        { text: '¿Debo hacer la denuncia policial?', value: 'PRIMEROS_PASOS_DENUNCIA_POLICIAL' },
        { text: '¿Qué datos debo tomar en el lugar del hecho?', value: 'PRIMEROS_PASOS_DATOS_TOMAR' },
        { text: '⬅️ Volver a Tránsito', value: 'MENU_TRANSITO_BACK' },
        { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ],

    'SUBMENU_RECLAMO_ASEGURADORAS_TRANSITO': [
        { text: '¿Cómo iniciar el reclamo a la aseguradora?', value: 'RECLAMO_ASEGURADORAS_INICIAR' },
        { text: '¿Necesito un abogado para el reclamo a la aseguradora?', value: 'RECLAMO_ASEGURADORAS_ABOGADO' },
        { text: '⬅️ Volver a Tránsito', value: 'MENU_TRANSITO_BACK' },
        { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ],

    'SUBMENU_PERICIA_ACCIDENTOLOGICA_TRANSITO': [
        { text: '¿Qué es una Pericia Accidentológica?', value: 'PERICIA_QUE_ES' },
        { text: '¿Cuándo es necesaria una Pericia?', value: 'PERICIA_CUANDO_NECESARIA' },
        { text: '⬅️ Volver a Tránsito', value: 'MENU_TRANSITO_BACK' },
        { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ],

    'SUBMENU_INDEMNIZACIONES_DANOS_TRANSITO': [
        { text: '¿Qué daños puedo reclamar por un accidente?', value: 'INDEMNIZACIONES_DANOS_RECLAMAR' },
        { text: '¿Cuánto tiempo tengo para reclamar un accidente?', value: 'INDEMNIZACIONES_PLAZO_RECLAMAR' },
        { text: '⬅️ Volver a Tránsito', value: 'MENU_TRANSITO_BACK' },
        { text: '🏠 Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ],

    'CONTACTO_PERSONAL_TRANSITO': `**CONTACTO PERSONAL (Accidentes de Tránsito)**
Para un asesoramiento detallado sobre su caso de accidentes, haga clic aquí:
- [WhatsApp] (https://wa.me/5491131976852)
- [Formulario Completo] (https://docs.google.com/forms/d/e/1FAIpQLSddw0zwc76GuSUHh2rpuxSO59BeyDItbWMVHDOp1d_rTp28Eg/viewform)
Escriba **MENÚ** para volver al menú de Tránsito o **VOLVER** para el menú de Áreas.`,
};
// respuestas.js
// ... (código existente de RESPUESTAS_FAMILIA, RESPUESTAS_LABORAL, etc.) ...

// ===================== BAREMOS Y DAÑO PERSONAL ===================== //// Módulo dual: ámbito laboral (ART) y civil (responsabilidad extracontractual)
const BAREMO = {
    LABORAL: {
        NOMBRE: "Baremo Laboral – Decreto 659/96 (LRT)",
        FUNDAMENTO: [
            "Ley 24.557 sobre Riesgos del Trabajo, art. 8 inc. 3",
            "Decreto 659/96 (Tabla de Evaluación de Incapacidades Laborales)",
            "CSJN – Fallos: 'Silva c/ Unilever', 'Torres c/ Swiss Medical' (obligatoriedad del baremo)"
        ],
        DESCRIPCION: `
Este baremo establece los porcentajes de incapacidad según el tipo de lesión (músculo, hueso, órgano o sistema afectado).
Se aplican factores de ponderación (edad, tipo de tarea, posibilidad de reubicación).
El cálculo final combina el porcentaje base + factores personales.
        `,
        FACTORES_PONDERACION: [
            "Edad del trabajador",
            "Naturaleza de la tarea habitual",
            "Posibilidad de reubicación laboral",
            "Severidad clínica de la secuela"
        ],
        METODO_CALCULO: `
1. Identificar lesión en la Tabla del Decreto 659/96.
2. Tomar el rango porcentual (mínimo–máximo) correspondiente.
3. Aplicar factores de ponderación según las circunstancias personales.
4. Resultado: porcentaje de incapacidad laboral permanente parcial (ILPP).
5. Fórmula indemnizatoria (LRT): Capital = Base × %Incapacidad × Coeficiente Edad × 53 × Ingreso Base Mensual.
        `,
        OBSERVACIONES: `
• Si la lesión no está prevista, los tribunales pueden fijar un porcentaje análogo.
• Comisión Médica debe fundamentar los factores aplicados.
• En revisión 2024/2025 se prevé actualización del baremo (Comité Consultivo Permanente).
        `
    },

    CIVIL: {
        NOMBRE: "Baremo Civil – Reparación Integral del Daño (CCCN)",
        FUNDAMENTO: [
            "Código Civil y Comercial de la Nación, arts. 1738 a 1741",
            "Doctrina CSJN – principio de reparación plena (‘Grippo’, ‘Soria’, ‘Mosca’)",
            "Ausencia de tabla rígida: valoración judicial fundada"
        ],
        DESCRIPCION: `
El daño civil comprende todo menoscabo físico, moral o patrimonial.
Se distingue entre daño emergente, lucro cesante, daño físico (incapacidad) y daño moral.
No existe una tabla obligatoria; el juez valora caso por caso, atendiendo al principio de reparación integral.
        `,
        COMPONENTES: [
            "Daño emergente (gastos, reparaciones, tratamientos)",
            "Lucro cesante (pérdida de ingresos futuros)",
            "Incapacidad física o psíquica (pérdida funcional o vitalidad)",
            "Daño moral (sufrimiento, angustia, pérdida de calidad de vida)",
            "Daño estético (alteración visible o deformidad)"
        ],
        METODO_CALCULO: `
Daño Total = Daño Emergente + Lucro Cesante + (Valor Base × %Incapacidad) + Daño Moral + Daño Estético

• El daño moral se determina según la intensidad del padecimiento, gravedad del hecho y precedentes similares.
• El monto debe estar fundado (art. 1741 CCCN), evitando cifras arbitrarias.
• Se admite prueba presuncional del sufrimiento (CSJN, “Grippo”).
        `,
        OBSERVACIONES: `
• No hay baremo médico obligatorio, pero puede usarse el Decreto 659/96 como orientación técnica.
• El principio rector es la reparación plena: devolver al damnificado al estado anterior o compensar integralmente su pérdida.
• Jurisprudencia reciente: Cámara Civil 2025 – daño físico $40M + moral $15M.
        `
    }
};
// =========================================================================
// RESPUESTAS DE ACCIDENTES DE TRÁNSITO
// =========================================================================
const RESPUESTAS_TRANSITO = {
    // ... (restos de las respuestas de tránsito) ...

    // Menú de Tránsito, añadir opción para Baremo Civil
    'MENU_TRANSITO': [
        { text: 'Primeros Pasos Post-Accidente 🚨', value: 'SUBMENU_PRIMEROS_PASOS_TRANSITO' },
        { text: 'Reclamo a Aseguradoras 🛡️', value: 'SUBMENU_RECLAMO_ASEGURADORAS_TRANSITO' },
        { text: 'Pericia Accidentológica 📊', value: 'SUBMENU_PERICIA_ACCIDENTOLOGICA_TRANSITO' },
        { text: 'Indemnizaciones y Daños 💵', value: 'SUBMENU_INDEMNIZACIONES_DANOS_TRANSITO' },
        { text: 'Baremo Civil (Daño Personal) ⚖️', value: 'BAREMO_CIVIL_INFO' }, // Nueva opción
        { text: 'Contacto Personal 📞', value: 'CONTACTO_PERSONAL_TRANSITO' },
        { text: '⬅️ Volver a Áreas Principales', value: 'VOLVER_AREAS' }
    ],

    // ... (restos de los submenús de tránsito) ...
};

// =========================================================================
// MENÚ PRINCIPAL DE ÁREAS Y RESPUESTAS GENÉRICAS
// =========================================================================
const CHATBOT_RESPONSES = {
    'WELCOME_MESSAGE': '¡Hola! Soy el asistente virtual del Estudio Jurídico Dr. Lionel Zurita. Puedo asistirlo con las consultas más frecuentes en nuestras áreas de práctica.',

    'MENU_AREAS_PRINCIPAL': [
        { text: 'Derecho de Familia 👨‍👩‍👧‍👦', value: 'MENU_FAMILIA' },
        { text: 'Derecho Laboral 💼', value: 'MENU_LABORAL' },
        { text: 'Derecho Sucesorio 🏘️', value: 'MENU_SUCESIONES' },
        { text: 'Contratos 🤝', value: 'MENU_CONTRATOS' },
        { text: 'Accidentes de Tránsito 🚗', value: 'MENU_TRANSITO' },
    ],

    'ERROR_INPUT_INVALIDO': 'Lo siento, no entiendo tu consulta. Por favor, selecciona una de las opciones disponibles haciendo clic en los botones o escribe "VOLVER" para ir al menú principal de áreas.',
    'ERROR_CONTEXTO_INVALIDO': 'Parece que esa opción no corresponde al menú actual. Por favor, selecciona una de las opciones disponibles o escribe "MENÚ" para ver las opciones de este tema, o "VOLVER" para el menú de Áreas.',

    'FAMILY': RESPUESTAS_FAMILIA,
    'LABORAL': RESPUESTAS_LABORAL,
    'SUCESIONES': RESPUESTAS_SUCESIONES,
    'CONTRATOS': RESPUESTAS_CONTRATOS,
    'TRANSITO': RESPUESTAS_TRANSITO,
    'BAREMO_Y_DAÑO': BAREMO, // ¡Aquí se integra el nuevo módulo!
};
