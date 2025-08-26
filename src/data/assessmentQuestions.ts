// Estructura mejorada de preguntas con descripciones y ejemplos
// Adaptadas al español paraguayo formal

export interface QuestionData {
  question: string;
  description?: string;
  examples?: string[];
}

export interface AssessmentQuestions {
  [key: string]: QuestionData[];
}

export const assessmentQuestions: AssessmentQuestions = {
  // GAD-7 - Ansiedad
  anxiety: [
    {
      question: "Sentirse nervioso/a, ansioso/a o con los nervios de punta",
      description: "Sensación de tensión, preocupación o nerviosismo que no puede controlar",
      examples: [
        "Sentir el corazón acelerado sin razón aparente",
        "Tensión en los músculos del cuello y hombros",
        "Sensación de estar siempre alerta o en guardia"
      ]
    },
    {
      question: "No poder dejar de preocuparse o no poder controlar la preocupación",
      description: "Pensamientos preocupantes que vuelven una y otra vez a su mente",
      examples: [
        "Dar vueltas al mismo tema sin poder parar",
        "Preocuparse excesivamente por cosas cotidianas",
        "No poder 'apagar' los pensamientos preocupantes"
      ]
    },
    {
      question: "Preocuparse demasiado por diferentes cosas",
      description: "Inquietud excesiva por múltiples aspectos de la vida diaria",
      examples: [
        "Preocuparse por el trabajo, la familia y la salud al mismo tiempo",
        "Anticipar siempre lo peor que podría pasar",
        "Sentir que todo es motivo de preocupación"
      ]
    },
    {
      question: "Dificultad para relajarse",
      description: "Incapacidad para sentirse tranquilo/a incluso en momentos de descanso",
      examples: [
        "No poder disfrutar de momentos libres",
        "Sentirse tenso/a incluso cuando intenta descansar",
        "Dificultad para 'desconectar' mentalmente"
      ]
    },
    {
      question: "Estar tan inquieto/a que es difícil permanecer sentado/a",
      description: "Sensación de agitación física que le impide estar quieto/a",
      examples: [
        "Necesidad de moverse constantemente",
        "Levantarse frecuentemente sin necesidad",
        "Sentir que debe estar haciendo algo todo el tiempo"
      ]
    },
    {
      question: "Enojarse o irritarse con facilidad",
      description: "Reaccionar con molestia o enojo ante situaciones menores",
      examples: [
        "Perder la paciencia más rápido que antes",
        "Molestarse por cosas que normalmente no le afectarían",
        "Sentirse 'con poca mecha' o tolerancia"
      ]
    },
    {
      question: "Sentir miedo como si algo terrible fuera a suceder",
      description: "Sensación de peligro inminente sin causa aparente",
      examples: [
        "Presentimientos negativos constantes",
        "Temor de que ocurra una catástrofe",
        "Sensación de que algo malo está por pasar"
      ]
    }
  ],

  // PHQ-9 - Depresión
  depression: [
    {
      question: "Poco interés o placer en hacer las cosas",
      description: "Pérdida de entusiasmo por actividades que antes disfrutaba",
      examples: [
        "No tener ganas de ver a amigos o familiares",
        "Perder interés en pasatiempos o hobbies",
        "Sentir que nada le produce satisfacción"
      ]
    },
    {
      question: "Sentirse desanimado/a, deprimido/a o sin esperanzas",
      description: "Sensación persistente de tristeza o desesperanza sobre el futuro",
      examples: [
        "Ver todo 'gris' o negativo",
        "Sentir que las cosas no van a mejorar",
        "Tristeza que no se va con el tiempo"
      ]
    },
    {
      question: "Dificultad para dormir o permanecer dormido/a, o dormir demasiado",
      description: "Cambios significativos en sus patrones de sueño habituales",
      examples: [
        "Despertarse varias veces durante la noche",
        "No poder conciliar el sueño por más de 30 minutos",
        "Dormir más de 10-12 horas y seguir cansado/a"
      ]
    },
    {
      question: "Sentirse cansado/a o tener poca energía",
      description: "Fatiga constante que no mejora con el descanso",
      examples: [
        "Sentirse agotado/a desde la mañana",
        "Necesitar mucho esfuerzo para tareas simples",
        "Sensación de 'cargar piedras' todo el día"
      ]
    },
    {
      question: "Poco apetito o comer en exceso",
      description: "Cambios importantes en sus hábitos alimenticios",
      examples: [
        "Perder el gusto por la comida",
        "Comer por ansiedad o vacío emocional",
        "Saltarse comidas o comer compulsivamente"
      ]
    },
    {
      question: "Sentirse mal consigo mismo/a - o sentir que es un fracaso o que ha defraudado a su familia",
      description: "Pensamientos negativos sobre su valor como persona",
      examples: [
        "Sentirse inútil o sin valor",
        "Culparse excesivamente por errores pequeños",
        "Creer que decepciona a todos"
      ]
    },
    {
      question: "Dificultad para concentrarse en cosas como leer el periódico o ver televisión",
      description: "Problemas para mantener la atención incluso en actividades simples",
      examples: [
        "Leer la misma página varias veces sin entender",
        "No poder seguir el hilo de una película",
        "Olvidar lo que estaba haciendo"
      ]
    },
    {
      question: "Moverse o hablar tan lentamente que otros podrían notarlo. O lo contrario - estar tan inquieto/a que se mueve mucho más de lo habitual",
      description: "Cambios notorios en su velocidad de movimiento o habla",
      examples: [
        "Sentir que todo requiere esfuerzo extra",
        "Caminar como en cámara lenta",
        "O estar tan agitado/a que no puede estar quieto/a"
      ]
    },
    {
      question: "Pensamientos de que estaría mejor muerto/a o de hacerse daño",
      description: "Ideas sobre no querer vivir o lastimarse (busque ayuda inmediata si tiene estos pensamientos)",
      examples: [
        "Pensar que otros estarían mejor sin usted",
        "Desear no despertar",
        "Ideas de hacerse daño"
      ]
    }
  ],

  // ADHD/TDAH
  adhd: [
    {
      question: "¿Con qué frecuencia tiene problemas para terminar los detalles finales de un proyecto, una vez completadas las partes más difíciles?",
      description: "Dificultad para completar las últimas tareas o 'pulir' los detalles",
      examples: [
        "Dejar proyectos al 90% sin terminar",
        "Perder interés cuando falta poco para finalizar",
        "Acumular tareas casi completas"
      ]
    },
    {
      question: "¿Con qué frecuencia tiene dificultad para organizar tareas y actividades?",
      description: "Problemas para planificar y estructurar sus responsabilidades",
      examples: [
        "No saber por dónde empezar un proyecto",
        "Mezclar prioridades importantes con secundarias",
        "Sentirse abrumado/a al organizar actividades"
      ]
    },
    {
      question: "¿Con qué frecuencia tiene problemas para recordar citas u obligaciones?",
      description: "Olvidar compromisos, reuniones o responsabilidades importantes",
      examples: [
        "Olvidar citas médicas o reuniones",
        "No recordar fechas de pago o vencimientos",
        "Necesitar múltiples recordatorios"
      ]
    },
    {
      question: "¿Con qué frecuencia evita o posterga tareas que requieren mucho esfuerzo mental?",
      description: "Tendencia a aplazar actividades que demandan concentración",
      examples: [
        "Postergar la lectura de documentos importantes",
        "Evitar tareas que requieren análisis detallado",
        "Dejar para último momento trabajos complejos"
      ]
    },
    {
      question: "¿Con qué frecuencia mueve las manos o pies cuando está sentado/a?",
      description: "Movimientos repetitivos o inquietud física al estar quieto/a",
      examples: [
        "Golpear con los dedos sobre la mesa",
        "Mover las piernas constantemente",
        "Jugar con objetos mientras está sentado/a"
      ]
    },
    {
      question: "¿Con qué frecuencia se siente excesivamente activo/a, con mucha energía interna?",
      description: "Sensación de tener un 'motor interno' que no se apaga",
      examples: [
        "Sentir que debe estar siempre haciendo algo",
        "Dificultad para estar tranquilo/a en momentos de descanso",
        "Energía que parece no agotarse pero que es difícil de dirigir"
      ]
    },
    {
      question: "¿Con qué frecuencia comete errores por descuido en el trabajo o actividades?",
      description: "Equivocaciones por falta de atención a los detalles",
      examples: [
        "Errores en cálculos simples",
        "Omitir información importante en formularios",
        "Equivocarse en tareas que sabe hacer bien"
      ]
    },
    {
      question: "¿Con qué frecuencia tiene dificultad para mantener la atención en tareas monótonas?",
      description: "Problemas para concentrarse en actividades repetitivas o poco estimulantes",
      examples: [
        "Distraerse fácilmente durante tareas rutinarias",
        "Necesitar estímulos constantes para mantener el foco",
        "La mente 'se va' durante actividades aburridas"
      ]
    },
    {
      question: "¿Con qué frecuencia tiene dificultad para prestar atención cuando le hablan directamente?",
      description: "Problemas para mantener el foco durante conversaciones",
      examples: [
        "Perderse en sus pensamientos mientras otros hablan",
        "Necesitar que le repitan las cosas",
        "Parecer que escucha pero no retener la información"
      ]
    },
    {
      question: "¿Con qué frecuencia pierde o no encuentra objetos necesarios?",
      description: "Extraviar frecuentemente cosas importantes para sus actividades",
      examples: [
        "Perder llaves, billetera o celular constantemente",
        "No recordar dónde dejó documentos importantes",
        "Buscar los mismos objetos repetidamente"
      ]
    },
    {
      question: "¿Con qué frecuencia se distrae con estímulos externos?",
      description: "Interrumpir lo que hace por ruidos, movimientos o actividades alrededor",
      examples: [
        "Perder concentración por conversaciones ajenas",
        "Distraerse con cualquier movimiento o sonido",
        "Dificultad para trabajar en ambientes con actividad"
      ]
    },
    {
      question: "¿Con qué frecuencia se levanta en situaciones donde debe permanecer sentado/a?",
      description: "Pararse cuando socialmente se espera que permanezca en su lugar",
      examples: [
        "Levantarse durante reuniones largas",
        "Necesitar caminar durante conferencias",
        "Inquietud física en situaciones formales"
      ]
    },
    {
      question: "¿Con qué frecuencia se siente inquieto/a o impaciente?",
      description: "Sensación interna de agitación o urgencia",
      examples: [
        "Sentir que el tiempo pasa muy lento",
        "Impaciencia en filas o esperas",
        "Necesidad de que las cosas sucedan 'ya'"
      ]
    },
    {
      question: "¿Con qué frecuencia tiene dificultad para relajarse en su tiempo libre?",
      description: "Problemas para descansar incluso cuando tiene oportunidad",
      examples: [
        "Sentirse culpable al no hacer nada",
        "Buscar actividades constantemente",
        "No poder disfrutar momentos de ocio"
      ]
    },
    {
      question: "¿Con qué frecuencia habla excesivamente en situaciones sociales?",
      description: "Tendencia a dominar conversaciones o hablar más de lo apropiado",
      examples: [
        "Monopolizar conversaciones sin darse cuenta",
        "Compartir demasiada información personal",
        "Dificultad para dar espacio a otros en diálogos"
      ]
    },
    {
      question: "¿Con qué frecuencia completa las frases de otros antes de que terminen?",
      description: "Anticipar y expresar lo que otros van a decir",
      examples: [
        "Terminar las oraciones de otros por impaciencia",
        "Interrumpir porque cree saber qué dirán",
        "No poder esperar a que otros terminen de hablar"
      ]
    },
    {
      question: "¿Con qué frecuencia tiene dificultad para esperar su turno?",
      description: "Problemas para respetar el orden en situaciones que lo requieren",
      examples: [
        "Adelantarse en filas o colas",
        "Interrumpir actividades grupales",
        "Impaciencia cuando debe esperar"
      ]
    },
    {
      question: "¿Con qué frecuencia interrumpe a otros cuando están ocupados?",
      description: "Interferir en actividades ajenas sin considerar el momento",
      examples: [
        "Interrumpir conversaciones o llamadas importantes",
        "No respetar cuando alguien está concentrado",
        "Urgencia por comunicar algo sin esperar el momento adecuado"
      ]
    }
  ],

  // Bipolar
  bipolar: [
    {
      question: "¿Alguna vez ha tenido un período en que se sintió tan bien o con tanta energía que otros pensaron que no era su forma habitual de ser?",
      description: "Episodios de energía o ánimo excesivamente elevado",
      examples: [
        "Sentirse 'en la cima del mundo' sin razón especial",
        "Tener energía ilimitada durante días",
        "Otros le dijeron que estaba muy acelerado/a o diferente"
      ]
    },
    {
      question: "¿Durante esos períodos se sintió tan irritable que gritó a personas o inició peleas o discusiones?",
      description: "Irritabilidad extrema durante períodos de mucha energía",
      examples: [
        "Explotar por cosas mínimas",
        "Discutir agresivamente sin motivo real",
        "Sentirse molesto/a con todos a su alrededor"
      ]
    },
    {
      question: "¿Se sintió mucho más seguro/a de sí mismo/a de lo habitual?",
      description: "Confianza excesiva o sensación de grandiosidad",
      examples: [
        "Creer que puede lograr cualquier cosa",
        "Sentirse superior a los demás",
        "Tomar riesgos sin considerar consecuencias"
      ]
    },
    {
      question: "¿Durmió mucho menos de lo habitual y sintió que no necesitaba dormir?",
      description: "Reducción drástica del sueño sin sentir cansancio",
      examples: [
        "Dormir solo 2-3 horas y sentirse lleno/a de energía",
        "Pasar días con muy poco sueño",
        "No sentir necesidad de descansar"
      ]
    },
    {
      question: "¿Habló mucho más rápido de lo habitual o sintió presión para seguir hablando?",
      description: "Aceleración del habla o necesidad compulsiva de hablar",
      examples: [
        "Hablar tan rápido que otros no le entienden",
        "Saltar de tema en tema sin parar",
        "Sentir que debe expresar todos sus pensamientos"
      ]
    },
    {
      question: "¿Los pensamientos pasaban rápidamente por su cabeza o no podía hacer que su mente fuera más lenta?",
      description: "Pensamientos acelerados o 'mente corriendo'",
      examples: [
        "Ideas que vienen y van muy rápido",
        "Dificultad para seguir un solo pensamiento",
        "Sensación de que el cerebro va a mil por hora"
      ]
    },
    {
      question: "¿Se distrajo tan fácilmente que cualquier cosa a su alrededor podía desviar su atención?",
      description: "Distracción extrema por estímulos mínimos",
      examples: [
        "No poder completar tareas por distracciones constantes",
        "Saltar de actividad en actividad",
        "Atención dispersa en múltiples direcciones"
      ]
    },
    {
      question: "¿Tuvo mucha más energía de la habitual?",
      description: "Niveles de energía anormalmente elevados",
      examples: [
        "Sentir que puede hacer todo sin descansar",
        "Energía física y mental desbordante",
        "No sentir fatiga normal"
      ]
    },
    {
      question: "¿Fue mucho más activo/a o hizo muchas más cosas de lo habitual?",
      description: "Aumento significativo en actividades o proyectos",
      examples: [
        "Iniciar múltiples proyectos al mismo tiempo",
        "Actividad física o laboral excesiva",
        "No poder estar quieto/a"
      ]
    },
    {
      question: "¿Fue mucho más sociable o extrovertido/a de lo habitual?",
      description: "Cambio drástico hacia mayor sociabilidad",
      examples: [
        "Buscar constantemente compañía o fiestas",
        "Hablar con extraños como si fueran amigos",
        "Necesidad extrema de interacción social"
      ]
    },
    {
      question: "¿Hizo cosas que le trajeron problemas a usted o su familia?",
      description: "Comportamientos riesgosos con consecuencias negativas",
      examples: [
        "Gastar dinero excesivamente",
        "Tomar decisiones impulsivas importantes",
        "Comportamientos que luego lamentó"
      ]
    },
    {
      question: "¿Estos síntomas ocurrieron al mismo tiempo y duraron al menos una semana?",
      description: "Duración y simultaneidad de los síntomas descritos",
      examples: [
        "Varios síntomas juntos por 7 días o más",
        "Un período claro de cambio en su comportamiento",
        "Episodio definido con inicio y fin"
      ]
    }
  ],

  // PTSD
  ptsd: [
    {
      question: "¿Ha experimentado, presenciado o enfrentado un evento extremadamente traumático?",
      description: "Exposición a situaciones de peligro grave, violencia o amenaza",
      examples: [
        "Accidentes graves, asaltos o violencia",
        "Desastres naturales o situaciones de guerra",
        "Pérdida traumática o amenaza de muerte"
      ]
    },
    {
      question: "¿Tiene recuerdos perturbadores y no deseados del evento?",
      description: "Memorias intrusivas que aparecen sin aviso",
      examples: [
        "Imágenes del evento que vuelven a su mente",
        "Recuerdos que aparecen en momentos inesperados",
        "Flashbacks vívidos del trauma"
      ]
    },
    {
      question: "¿Tiene pesadillas relacionadas con el evento?",
      description: "Sueños perturbadores sobre la experiencia traumática",
      examples: [
        "Despertar angustiado/a por pesadillas",
        "Sueños recurrentes sobre el trauma",
        "Temor a dormir por las pesadillas"
      ]
    },
    {
      question: "¿Se siente como si el evento estuviera ocurriendo nuevamente?",
      description: "Sensación de revivir el trauma en el presente",
      examples: [
        "Sentir que está de vuelta en la situación",
        "Reacciones físicas como si estuviera en peligro",
        "Perder noción del presente durante flashbacks"
      ]
    },
    {
      question: "¿Se siente muy alterado/a cuando algo le recuerda el evento?",
      description: "Malestar intenso ante recordatorios del trauma",
      examples: [
        "Ansiedad extrema con ciertos sonidos o imágenes",
        "Pánico al pasar por lugares similares",
        "Angustia con fechas o aniversarios"
      ]
    },
    {
      question: "¿Tiene reacciones físicas cuando algo le recuerda el evento?",
      description: "Síntomas corporales ante recordatorios",
      examples: [
        "Corazón acelerado, sudoración o temblores",
        "Náuseas o malestar estomacal",
        "Tensión muscular o dolor de cabeza"
      ]
    },
    {
      question: "¿Evita pensamientos o sentimientos sobre el evento?",
      description: "Esfuerzo activo por no recordar o sentir",
      examples: [
        "Cambiar de tema cuando surge el recuerdo",
        "Mantenerse ocupado/a para no pensar",
        "Usar alcohol u otras sustancias para olvidar"
      ]
    },
    {
      question: "¿Evita lugares, personas o actividades que le recuerdan el evento?",
      description: "Cambios en rutina para evitar recordatorios",
      examples: [
        "No pasar por ciertos lugares",
        "Evitar personas relacionadas con el evento",
        "Dejar de hacer actividades que disfrutaba"
      ]
    },
    {
      question: "¿Tiene dificultad para recordar partes importantes del evento?",
      description: "Lagunas en la memoria sobre el trauma",
      examples: [
        "No recordar detalles significativos",
        "Confusión sobre el orden de los eventos",
        "Bloqueo de memorias específicas"
      ]
    },
    {
      question: "¿Tiene creencias negativas sobre sí mismo/a o el mundo?",
      description: "Pensamientos pesimistas generalizados desde el trauma",
      examples: [
        "Creer que el mundo es completamente peligroso",
        "Pensar que no puede confiar en nadie",
        "Sentir que es su culpa lo que pasó"
      ]
    },
    {
      question: "¿Se culpa a sí mismo/a o a otros de manera no realista?",
      description: "Atribución incorrecta de responsabilidad",
      examples: [
        "Culparse por cosas fuera de su control",
        "Responsabilizar a otros sin razón real",
        "Rumiación sobre qué pudo hacer diferente"
      ]
    },
    {
      question: "¿Tiene sentimientos negativos persistentes?",
      description: "Estados emocionales negativos constantes",
      examples: [
        "Miedo, horror o ira permanentes",
        "Vergüenza o culpa intensa",
        "Tristeza profunda que no mejora"
      ]
    },
    {
      question: "¿Ha perdido interés en actividades importantes?",
      description: "Desconexión de actividades previamente significativas",
      examples: [
        "Abandonar hobbies o deportes",
        "No disfrutar tiempo con familia",
        "Pérdida de motivación general"
      ]
    },
    {
      question: "¿Se siente distante o desconectado/a de otros?",
      description: "Sensación de separación emocional de las personas",
      examples: [
        "Sentir que nadie le entiende",
        "Dificultad para sentir cercanía",
        "Aislamiento emocional"
      ]
    },
    {
      question: "¿Tiene dificultad para experimentar emociones positivas?",
      description: "Incapacidad para sentir alegría o felicidad",
      examples: [
        "No poder sentir amor o cariño",
        "Ausencia de alegría en momentos felices",
        "Embotamiento emocional"
      ]
    },
    {
      question: "¿Se siente irritable o tiene arrebatos de ira?",
      description: "Enojo desproporcionado o explosiones emocionales",
      examples: [
        "Explotar por cosas pequeñas",
        "Ira intensa sin provocación",
        "Conflictos frecuentes con otros"
      ]
    },
    {
      question: "¿Tiene comportamientos arriesgados o autodestructivos?",
      description: "Acciones peligrosas sin considerar consecuencias",
      examples: [
        "Conducir de manera temeraria",
        "Consumo excesivo de alcohol",
        "Ponerse en situaciones peligrosas"
      ]
    },
    {
      question: "¿Está constantemente alerta o vigilante?",
      description: "Estado de alerta excesivo ante posibles peligros",
      examples: [
        "Revisar constantemente las salidas",
        "Sentarse siempre mirando la puerta",
        "Estar siempre 'en guardia'"
      ]
    },
    {
      question: "¿Se sobresalta fácilmente?",
      description: "Reacciones exageradas a estímulos repentinos",
      examples: [
        "Saltar con ruidos normales",
        "Sobresaltarse cuando alguien se acerca",
        "Reacciones físicas intensas a estímulos menores"
      ]
    },
    {
      question: "¿Tiene problemas de concentración?",
      description: "Dificultad para enfocarse en tareas o conversaciones",
      examples: [
        "No poder concentrarse en el trabajo",
        "Olvidar lo que estaba haciendo",
        "Mente dispersa o en blanco"
      ]
    }
  ],

  // Psicosis
  psychosis: [
    {
      question: "¿Ha sentido que alguien puede controlar sus pensamientos o leer su mente?",
      description: "Sensación de que otros tienen acceso o control sobre sus pensamientos",
      examples: [
        "Sentir que otros saben lo que piensa sin decirlo",
        "Creer que alguien puede insertar o quitar pensamientos de su mente",
        "Sensación de que sus pensamientos son transmitidos"
      ]
    },
    {
      question: "¿Ha escuchado voces o sonidos que otros no pueden escuchar?",
      description: "Percibir sonidos, voces o ruidos sin fuente externa real",
      examples: [
        "Escuchar voces que comentan sus acciones",
        "Oír su nombre cuando nadie lo llama",
        "Sonidos o música que otros no perciben"
      ]
    },
    {
      question: "¿Ha visto cosas que otros no pueden ver?",
      description: "Percibir imágenes, personas o cosas que otros no ven",
      examples: [
        "Ver sombras o figuras que desaparecen",
        "Percibir personas que no están presentes",
        "Ver objetos moverse sin causa aparente"
      ]
    },
    {
      question: "¿Ha sentido que es vigilado, perseguido o que conspiran contra usted?",
      description: "Creencia de que otros tienen intenciones maliciosas hacia usted",
      examples: [
        "Sentir que lo siguen o espían",
        "Creer que hablan de usted en secreto",
        "Pensar que hay un complot en su contra"
      ]
    },
    {
      question: "¿Ha tenido experiencias o creencias que otros consideran extrañas?",
      description: "Ideas o experiencias inusuales que otros no comprenden",
      examples: [
        "Creer tener poderes especiales",
        "Sentir conexiones especiales con eventos casuales",
        "Ideas que otros consideran irreales o imposibles"
      ]
    },
    {
      question: "¿Ha tenido dificultad para distinguir entre lo real y lo imaginario?",
      description: "Confusión sobre qué experiencias son reales",
      examples: [
        "Dudar si algo realmente ocurrió",
        "Confundir sueños con realidad",
        "No estar seguro de sus percepciones"
      ]
    },
    {
      question: "¿Ha notado cambios en cómo percibe los colores, sonidos o su entorno?",
      description: "Alteraciones en la percepción sensorial",
      examples: [
        "Colores más brillantes o apagados de lo normal",
        "Sonidos distorsionados o amplificados",
        "Sensación de que el mundo se ve diferente"
      ]
    },
    {
      question: "¿Ha sentido que su cuerpo ha cambiado de forma extraña?",
      description: "Percepciones inusuales sobre su propio cuerpo",
      examples: [
        "Sentir que partes del cuerpo han cambiado de tamaño",
        "Sensación de que el cuerpo no le pertenece",
        "Percibir cambios físicos que otros no ven"
      ]
    },
    {
      question: "¿Ha tenido dificultades para organizar sus pensamientos o hablar coherentemente?",
      description: "Problemas para estructurar ideas o comunicarse claramente",
      examples: [
        "Perder el hilo de lo que está diciendo",
        "Saltar de tema sin conexión lógica",
        "Otros no entienden lo que quiere comunicar"
      ]
    },
    {
      question: "¿Se ha aislado socialmente más de lo habitual?",
      description: "Tendencia a evitar el contacto con otros",
      examples: [
        "Preferir estar completamente solo/a",
        "Evitar amigos y familiares",
        "Sentirse incómodo/a en presencia de otros"
      ]
    }
  ],

  // Trastorno Alimentario
  "eating-disorder": [
    {
      question: "¿Se preocupa excesivamente por su peso o figura corporal?",
      description: "Pensamientos constantes sobre el cuerpo y el peso",
      examples: [
        "Pensar en su peso varias veces al día",
        "Evitar actividades por su apariencia",
        "Compararse constantemente con otros"
      ]
    },
    {
      question: "¿Ha restringido severamente su alimentación o ayunado?",
      description: "Limitar drásticamente la cantidad o tipo de alimentos",
      examples: [
        "Saltarse comidas regularmente",
        "Comer porciones extremadamente pequeñas",
        "Eliminar grupos completos de alimentos"
      ]
    },
    {
      question: "¿Ha tenido episodios de comer grandes cantidades sin control?",
      description: "Consumir mucha comida sintiendo que no puede parar",
      examples: [
        "Comer rápidamente grandes cantidades",
        "Sentirse fuera de control al comer",
        "Comer hasta sentirse incómodamente lleno/a"
      ]
    },
    {
      question: "¿Ha vomitado, usado laxantes o hecho ejercicio excesivo para controlar su peso?",
      description: "Comportamientos compensatorios después de comer",
      examples: [
        "Provocarse el vómito después de comer",
        "Ejercitarse de forma compulsiva",
        "Usar medicamentos para perder peso"
      ]
    },
    {
      question: "¿Su autoestima depende principalmente de su peso o figura?",
      description: "Valor personal basado en la apariencia física",
      examples: [
        "Sentirse valioso/a solo si está delgado/a",
        "El peso determina su estado de ánimo",
        "Medir su éxito por su apariencia"
      ]
    },
    {
      question: "¿Evita comer con otros o situaciones sociales con comida?",
      description: "Ansiedad o incomodidad al comer en público",
      examples: [
        "Inventar excusas para no comer con otros",
        "Sentir pánico en eventos con comida",
        "Comer en secreto"
      ]
    },
    {
      question: "¿Se pesa con frecuencia o evita pesarse completamente?",
      description: "Relación problemática con la báscula",
      examples: [
        "Pesarse varias veces al día",
        "Terror a subirse a la báscula",
        "El número en la báscula arruina su día"
      ]
    },
    {
      question: "¿Ha notado problemas físicos por sus hábitos alimenticios?",
      description: "Consecuencias físicas de patrones alimenticios alterados",
      examples: [
        "Pérdida de menstruación",
        "Debilidad o mareos frecuentes",
        "Problemas digestivos o dentales"
      ]
    },
    {
      question: "¿Siente culpa o vergüenza intensa después de comer?",
      description: "Emociones negativas asociadas con la alimentación",
      examples: [
        "Sentirse culpable por comer normalmente",
        "Vergüenza extrema después de comer",
        "Castigarse mentalmente por comer"
      ]
    },
    {
      question: "¿Sus hábitos alimenticios interfieren con su vida diaria?",
      description: "Impacto de la alimentación en actividades normales",
      examples: [
        "Rechazar invitaciones por la comida",
        "Planificar el día alrededor de la comida",
        "Dificultad para concentrarse por pensar en comida"
      ]
    }
  ],

  // Adicción
  addiction: [
    {
      question: "¿Ha consumido alcohol o drogas más de lo que planeaba?",
      description: "Pérdida de control sobre la cantidad consumida",
      examples: [
        "Beber 'solo una copa' y terminar bebiendo mucho más",
        "Usar sustancias más tiempo del previsto",
        "No poder parar una vez que empieza"
      ]
    },
    {
      question: "¿Ha intentado reducir o dejar de consumir sin éxito?",
      description: "Intentos fallidos de controlar el consumo",
      examples: [
        "Promesas rotas de dejar de consumir",
        "Múltiples intentos sin éxito",
        "Volver a consumir después de períodos de abstinencia"
      ]
    },
    {
      question: "¿Pasa mucho tiempo obteniendo, consumiendo o recuperándose de sustancias?",
      description: "Gran parte del día dedicada al consumo",
      examples: [
        "Planificar el día alrededor del consumo",
        "Largas resacas o períodos de recuperación",
        "Tiempo buscando cómo conseguir sustancias"
      ]
    },
    {
      question: "¿Ha sentido deseos intensos o urgencia de consumir?",
      description: "Antojos fuertes o compulsión por usar sustancias",
      examples: [
        "Pensamientos obsesivos sobre consumir",
        "Ansiedad intensa si no puede consumir",
        "Sentir que 'necesita' la sustancia"
      ]
    },
    {
      question: "¿El consumo ha afectado su trabajo, estudios o responsabilidades familiares?",
      description: "Problemas en áreas importantes de la vida",
      examples: [
        "Faltar al trabajo por consumir o resaca",
        "Descuidar obligaciones familiares",
        "Bajo rendimiento académico o laboral"
      ]
    },
    {
      question: "¿Continúa consumiendo a pesar de problemas sociales o interpersonales?",
      description: "Persistir pese a conflictos relacionados con el consumo",
      examples: [
        "Peleas con familia por el consumo",
        "Pérdida de amistades",
        "Problemas de pareja por las sustancias"
      ]
    },
    {
      question: "¿Ha dejado actividades importantes por el consumo?",
      description: "Abandono de intereses o actividades previas",
      examples: [
        "Dejar deportes o hobbies",
        "No participar en eventos familiares",
        "Aislarse para poder consumir"
      ]
    },
    {
      question: "¿Ha consumido en situaciones peligrosas?",
      description: "Uso de sustancias en contextos de riesgo",
      examples: [
        "Conducir bajo los efectos",
        "Usar en el trabajo con maquinaria",
        "Mezclar sustancias peligrosamente"
      ]
    },
    {
      question: "¿Continúa consumiendo sabiendo que le causa problemas físicos o psicológicos?",
      description: "Persistir pese a daños conocidos a la salud",
      examples: [
        "Beber con problemas hepáticos",
        "Usar pese a problemas cardíacos",
        "Consumir sabiendo que empeora ansiedad o depresión"
      ]
    },
    {
      question: "¿Necesita consumir más cantidad para sentir el mismo efecto?",
      description: "Desarrollo de tolerancia a la sustancia",
      examples: [
        "Duplicar o triplicar las dosis iniciales",
        "El efecto dura menos que antes",
        "Necesitar cantidades que asustarían a otros"
      ]
    },
    {
      question: "¿Ha tenido síntomas de abstinencia al reducir o dejar de consumir?",
      description: "Malestar físico o mental al no consumir",
      examples: [
        "Temblores, sudoración o náuseas",
        "Ansiedad o irritabilidad intensa",
        "Insomnio o pesadillas al dejar de usar"
      ]
    }
  ],

  // Depresión Postparto
  "postpartum-depression": [
    {
      question: "¿Ha llorado más de lo habitual desde el nacimiento de su bebé?",
      description: "Episodios frecuentes de llanto sin causa clara",
      examples: [
        "Llorar varias veces al día",
        "Lágrimas sin motivo aparente",
        "Sentirse abrumada emocionalmente"
      ]
    },
    {
      question: "¿Se ha sentido triste o deprimida la mayor parte del día?",
      description: "Estado de ánimo bajo persistente desde el parto",
      examples: [
        "Tristeza que no mejora con el tiempo",
        "Sentirse vacía o sin esperanza",
        "Pérdida de alegría en la maternidad"
      ]
    },
    {
      question: "¿Ha tenido dificultades para conectar emocionalmente con su bebé?",
      description: "Problemas para desarrollar vínculo afectivo",
      examples: [
        "No sentir amor instantáneo por el bebé",
        "Sentirse distante o desconectada",
        "Preocupación por no ser 'buena madre'"
      ]
    },
    {
      question: "¿Se siente abrumada por las responsabilidades de cuidar a su bebé?",
      description: "Sensación de no poder manejar las tareas de maternidad",
      examples: [
        "Pánico ante el llanto del bebé",
        "Sentir que no puede hacerlo",
        "Agobio con las rutinas diarias"
      ]
    },
    {
      question: "¿Ha tenido pensamientos de hacerse daño a sí misma o al bebé?",
      description: "Ideas intrusivas sobre daño (busque ayuda inmediata si las tiene)",
      examples: [
        "Pensamientos de escape o huida",
        "Ideas de que estarían mejor sin usted",
        "Temor de lastimar al bebé"
      ]
    },
    {
      question: "¿Ha perdido interés en actividades que antes disfrutaba?",
      description: "Apatía hacia cosas que solían ser placenteras",
      examples: [
        "No disfrutar de visitas o salidas",
        "Pérdida de interés en hobbies",
        "Indiferencia hacia el autocuidado"
      ]
    },
    {
      question: "¿Ha experimentado cambios significativos en su apetito?",
      description: "Alteraciones en los patrones de alimentación",
      examples: [
        "Olvidar comer por horas",
        "Comer en exceso por ansiedad",
        "Pérdida completa del apetito"
      ]
    },
    {
      question: "¿Tiene dificultades para dormir incluso cuando el bebé duerme?",
      description: "Problemas de sueño no relacionados con el cuidado del bebé",
      examples: [
        "Insomnio pese al cansancio",
        "Despertar con ansiedad",
        "No poder volver a dormir"
      ]
    },
    {
      question: "¿Se siente irritable o enojada con frecuencia?",
      description: "Cambios de humor o enojo desproporcionado",
      examples: [
        "Explotar por cosas pequeñas",
        "Resentimiento hacia la pareja",
        "Frustración constante"
      ]
    },
    {
      question: "¿Se siente como una fracaso como madre?",
      description: "Sentimientos intensos de inadecuación maternal",
      examples: [
        "Compararse negativamente con otras madres",
        "Creer que el bebé estaría mejor con otra persona",
        "Culpa constante por todo"
      ]
    }
  ],

  // Evaluación para Padres (Salud Mental Infantil)
  "parent-child-mental-health": [
    {
      question: "¿Su hijo/a parece más irritable o enojado/a que otros niños de su edad?",
      description: "Cambios de humor frecuentes o intensos",
      examples: [
        "Berrinches desproporcionados",
        "Enojo por cosas mínimas",
        "Dificultad para calmarse"
      ]
    },
    {
      question: "¿Ha notado cambios en los hábitos de sueño de su hijo/a?",
      description: "Alteraciones significativas en patrones de sueño",
      examples: [
        "Pesadillas frecuentes",
        "Resistencia extrema a dormir",
        "Despertar múltiples veces"
      ]
    },
    {
      question: "¿Su hijo/a se queja frecuentemente de dolores físicos sin causa médica?",
      description: "Síntomas somáticos recurrentes",
      examples: [
        "Dolores de cabeza antes de la escuela",
        "Dolor de estómago sin enfermedad",
        "Quejas físicas cuando está ansioso/a"
      ]
    },
    {
      question: "¿Ha observado comportamientos regresivos en su hijo/a?",
      description: "Retroceso en habilidades ya adquiridas",
      examples: [
        "Volver a mojar la cama",
        "Hablar como bebé",
        "Necesitar más ayuda de lo normal"
      ]
    },
    {
      question: "¿Su hijo/a tiene dificultades para hacer o mantener amigos?",
      description: "Problemas en las relaciones sociales",
      examples: [
        "Jugar solo/a en el recreo",
        "Conflictos frecuentes con pares",
        "No ser invitado/a a cumpleaños"
      ]
    },
    {
      question: "¿Ha notado cambios en el rendimiento escolar?",
      description: "Deterioro en el desempeño académico",
      examples: [
        "Bajar las calificaciones",
        "No completar tareas",
        "Quejas de los maestros"
      ]
    },
    {
      question: "¿Su hijo/a expresa miedos excesivos o preocupaciones?",
      description: "Ansiedad desproporcionada para su edad",
      examples: [
        "Terror a separarse de los padres",
        "Preocupación excesiva por el futuro",
        "Miedos que interfieren con actividades"
      ]
    },
    {
      question: "¿Ha observado comportamientos agresivos hacia otros o hacia sí mismo/a?",
      description: "Conductas violentas o autolesivas",
      examples: [
        "Golpear a hermanos o compañeros",
        "Lastimarse a propósito",
        "Destruir objetos cuando está enojado/a"
      ]
    },
    {
      question: "¿Su hijo/a parece triste o retraído/a la mayor parte del tiempo?",
      description: "Estado de ánimo deprimido persistente",
      examples: [
        "Pérdida de interés en jugar",
        "Aislarse en su habitación",
        "Expresar que nada es divertido"
      ]
    },
    {
      question: "¿Ha notado cambios significativos en el apetito o peso?",
      description: "Alteraciones en patrones alimenticios",
      examples: [
        "Rechazar comidas favoritas",
        "Comer en exceso cuando está ansioso/a",
        "Pérdida o ganancia notable de peso"
      ]
    }
  ],

  // Salud Mental Juvenil
  "youth-mental-health": [
    {
      question: "¿Te has sentido triste o sin esperanza casi todos los días?",
      description: "Estado de ánimo bajo persistente",
      examples: [
        "Sentir que nada mejorará",
        "Llorar sin razón aparente",
        "Vacío emocional constante"
      ]
    },
    {
      question: "¿Has perdido interés en actividades que antes disfrutabas?",
      description: "Apatía hacia pasatiempos o actividades sociales",
      examples: [
        "Ya no querer salir con amigos",
        "Abandonar deportes o hobbies",
        "Todo parece aburrido o sin sentido"
      ]
    },
    {
      question: "¿Has tenido problemas para concentrarte en la escuela o tareas?",
      description: "Dificultades de atención y enfoque",
      examples: [
        "Leer lo mismo varias veces sin entender",
        "No poder terminar tareas",
        "Mente en blanco durante clases"
      ]
    },
    {
      question: "¿Has sentido que no vales nada o que eres una carga para otros?",
      description: "Pensamientos negativos sobre tu valor personal",
      examples: [
        "Creer que todos estarían mejor sin ti",
        "Sentirte inútil o fracasado/a",
        "Pensar que solo causas problemas"
      ]
    },
    {
      question: "¿Has tenido cambios importantes en tu sueño?",
      description: "Dormir mucho más o mucho menos de lo normal",
      examples: [
        "Quedarte despierto/a hasta muy tarde",
        "Dormir todo el día",
        "Despertar muy temprano sin poder volver a dormir"
      ]
    },
    {
      question: "¿Te has sentido muy nervioso/a o con ataques de pánico?",
      description: "Episodios de ansiedad intensa",
      examples: [
        "Corazón acelerado sin razón",
        "Sentir que no puedes respirar",
        "Miedo intenso de que algo malo pasará"
      ]
    },
    {
      question: "¿Has pensado en hacerte daño o en la muerte?",
      description: "Pensamientos de autolesión o suicidas (busca ayuda inmediata)",
      examples: [
        "Pensar en formas de lastimarte",
        "Desear no existir",
        "Planear cómo terminar con tu vida"
      ]
    },
    {
      question: "¿Has tenido problemas con amigos o te has aislado?",
      description: "Dificultades en relaciones sociales",
      examples: [
        "Peleas frecuentes con amigos",
        "Preferir estar solo/a siempre",
        "Sentir que nadie te entiende"
      ]
    },
    {
      question: "¿Has notado cambios grandes en tu apetito o peso?",
      description: "Comer mucho más o mucho menos de lo normal",
      examples: [
        "Saltarte comidas frecuentemente",
        "Comer cuando estás ansioso/a",
        "Preocupación excesiva por tu peso"
      ]
    },
    {
      question: "¿Has tenido problemas de comportamiento en casa o escuela?",
      description: "Conflictos o conductas problemáticas",
      examples: [
        "Discusiones constantes con padres",
        "Problemas de disciplina en la escuela",
        "Hacer cosas que sabes que están mal"
      ]
    }
  ],

  // SWED - Trastorno Alimentario
  eatingDisorder: [
    {
      question: "¿Se ha sentido culpable después de comer?",
      description: "Sentimientos negativos relacionados con la alimentación",
      examples: [
        "Arrepentimiento después de comer",
        "Sentir que ha comido demasiado",
        "Culpa por romper la dieta"
      ]
    },
    {
      question: "¿Ha sentido que no puede controlar lo que come?",
      description: "Pérdida de control sobre la alimentación",
      examples: [
        "Comer sin poder parar",
        "Atracones de comida",
        "Sentir que la comida lo controla"
      ]
    },
    {
      question: "¿Ha perdido peso recientemente?",
      description: "Pérdida de peso en los últimos meses",
      examples: [
        "Bajar varios kilos sin intentarlo",
        "Ropa que queda más suelta",
        "Comentarios de otros sobre su delgadez"
      ]
    },
    {
      question: "¿Cree que está gordo/a cuando otros dicen que está delgado/a?",
      description: "Distorsión de la imagen corporal",
      examples: [
        "Verse con sobrepeso en el espejo",
        "No creer los comentarios positivos",
        "Obsesión con partes del cuerpo"
      ]
    },
    {
      question: "¿Diría que la comida domina su vida?",
      description: "Preocupación excesiva por la alimentación",
      examples: [
        "Pensar constantemente en comida",
        "Planificar obsesivamente las comidas",
        "Evitar eventos sociales por la comida"
      ]
    },
    {
      question: "¿Qué tan asustado/a está de ganar peso?",
      description: "Nivel de miedo al aumento de peso",
      examples: [
        "Pesarse varias veces al día",
        "Pánico al ver números más altos",
        "Evitar alimentos por miedo a engordar"
      ]
    },
    {
      question: "¿Cuándo fue la última vez que hizo dieta?",
      description: "Frecuencia de comportamientos dietéticos",
      examples: [
        "Restricción calórica severa",
        "Eliminar grupos de alimentos",
        "Seguir dietas extremas"
      ]
    },
    {
      question: "¿Qué tan importante es su peso para su autoestima?",
      description: "Relación entre peso y valor personal",
      examples: [
        "El peso determina su humor del día",
        "Sentirse valioso solo si está delgado",
        "Basar la autoestima en el número de la balanza"
      ]
    }
  ],

  // PSC-35 - Evaluación Padres-Hijos
  parentChild: [
    {
      question: "¿Su hijo/a se queja de dolores y molestias?",
      description: "Quejas físicas frecuentes sin causa médica clara",
      examples: [
        "Dolores de cabeza o estómago frecuentes",
        "Molestias antes de ir a la escuela",
        "Síntomas que aparecen en situaciones de estrés"
      ]
    },
    {
      question: "¿Su hijo/a pasa mucho tiempo solo/a?",
      description: "Aislamiento social o preferencia por la soledad",
      examples: [
        "Evitar jugar con otros niños",
        "Preferir actividades solitarias",
        "No tener amigos cercanos"
      ]
    },
    {
      question: "¿Su hijo/a se cansa fácilmente o tiene poca energía?",
      description: "Fatiga o falta de energía inusual para su edad",
      examples: [
        "Cansancio después de poco esfuerzo",
        "Preferir actividades sedentarias",
        "Falta de entusiasmo para jugar"
      ]
    },
    {
      question: "¿Su hijo/a es inquieto/a o no puede estar quieto/a?",
      description: "Hiperactividad o dificultad para permanecer tranquilo",
      examples: [
        "Moverse constantemente en la silla",
        "Correr cuando debería caminar",
        "Dificultad para actividades tranquilas"
      ]
    },
    {
      question: "¿Su hijo/a tiene problemas con el/la maestro/a?",
      description: "Conflictos o dificultades en el ambiente escolar",
      examples: [
        "Llamadas frecuentes de la escuela",
        "Reportes de mal comportamiento",
        "Problemas para seguir las reglas"
      ]
    },
    {
      question: "¿Su hijo/a está menos interesado/a en la escuela?",
      description: "Pérdida de motivación académica",
      examples: [
        "No querer hacer tareas",
        "Bajar las calificaciones",
        "Quejas frecuentes sobre la escuela"
      ]
    },
    {
      question: "¿Su hijo/a actúa como si fuera más pequeño/a?",
      description: "Comportamientos regresivos o inmaduros",
      examples: [
        "Hablar como bebé",
        "Querer dormir con los padres",
        "Perder habilidades ya adquiridas"
      ]
    },
    {
      question: "¿Su hijo/a se niega a obedecer?",
      description: "Conducta desafiante o desobediencia persistente",
      examples: [
        "Ignorar instrucciones deliberadamente",
        "Hacer lo contrario de lo que se pide",
        "Desafiar constantemente la autoridad"
      ]
    },
    {
      question: "¿Su hijo/a tiene dificultades para dormir?",
      description: "Problemas relacionados con el sueño",
      examples: [
        "Dificultad para conciliar el sueño",
        "Pesadillas frecuentes",
        "Despertarse varias veces en la noche"
      ]
    },
    {
      question: "¿Su hijo/a parece preocupado/a o ansioso/a?",
      description: "Signos de ansiedad o preocupación excesiva",
      examples: [
        "Preocuparse por todo",
        "Miedos irracionales",
        "Preguntar constantemente '¿qué pasaría si...?'"
      ]
    }
  ],

  // EPDS - Escala de Depresión Postparto de Edimburgo
  postpartumDepression: [
    {
      question: "He sido capaz de reír y ver el lado bueno de las cosas",
      description: "Evalúa su capacidad para mantener el sentido del humor",
      examples: [
        "Reír con naturalidad ante situaciones divertidas",
        "Encontrar aspectos positivos en la vida diaria",
        "Mantener el optimismo ante los desafíos"
      ]
    },
    {
      question: "He mirado el futuro con placer",
      description: "Evalúa su capacidad de anticipar eventos positivos",
      examples: [
        "Planear actividades con entusiasmo",
        "Tener esperanza sobre el futuro",
        "Imaginar momentos felices por venir"
      ]
    },
    {
      question: "Me he culpado sin necesidad cuando las cosas no salían bien",
      description: "Tendencia a la autoculpabilización excesiva",
      examples: [
        "Sentirse responsable por el llanto del bebé",
        "Culparse por no ser 'perfecta' como madre",
        "Asumir la culpa de situaciones fuera de su control"
      ]
    },
    {
      question: "He estado ansiosa o preocupada sin motivo",
      description: "Ansiedad o preocupación desproporcionada",
      examples: [
        "Preocuparse constantemente por el bebé sin razón",
        "Ansiedad sobre ser buena madre",
        "Temores irracionales sobre el futuro"
      ]
    },
    {
      question: "He sentido miedo o pánico sin motivo alguno",
      description: "Episodios de miedo intenso sin causa aparente",
      examples: [
        "Ataques de pánico repentinos",
        "Terror inexplicable",
        "Sensación de que algo terrible va a pasar"
      ]
    },
    {
      question: "Las cosas me han sobrepasado o agobiado",
      description: "Sensación de estar abrumada por las responsabilidades",
      examples: [
        "Sentir que no puede con todas las tareas",
        "Estar desbordada por el cuidado del bebé",
        "No poder manejar las actividades diarias"
      ]
    },
    {
      question: "Me he sentido tan infeliz que he tenido dificultad para dormir",
      description: "Problemas de sueño relacionados con el estado emocional",
      examples: [
        "No poder dormir aunque el bebé esté durmiendo",
        "Despertarse con pensamientos negativos",
        "Insomnio por tristeza o preocupación"
      ]
    },
    {
      question: "Me he sentido triste o desgraciada",
      description: "Sentimientos persistentes de tristeza",
      examples: [
        "Llorar frecuentemente",
        "Sentir un vacío emocional",
        "Tristeza que no mejora con el tiempo"
      ]
    },
    {
      question: "He sido tan infeliz que he estado llorando",
      description: "Llanto frecuente debido a la infelicidad",
      examples: [
        "Llorar sin razón aparente",
        "No poder contener las lágrimas",
        "Episodios de llanto prolongados"
      ]
    },
    {
      question: "He pensado en hacerme daño a mí misma",
      description: "Pensamientos de autolesión o suicidio",
      examples: [
        "Pensar que estarían mejor sin usted",
        "Ideas de lastimarse",
        "Pensamientos sobre terminar con su vida"
      ]
    }
  ],

  // PSC-35 - Cuestionario de Síntomas Pediátricos (versión para padres)
  parentChildMentalHealth: [
    {
      question: "Se queja de dolores y molestias",
      description: "Quejas físicas sin causa médica aparente"
    },
    {
      question: "Pasa mucho tiempo solo/a",
      description: "Aislamiento social o preferencia por estar solo"
    },
    {
      question: "Se cansa fácilmente, tiene poca energía",
      description: "Fatiga o falta de energía persistente"
    },
    {
      question: "Es inquieto/a o hiperactivo/a, no puede estar quieto/a",
      description: "Hiperactividad o dificultad para permanecer quieto"
    },
    {
      question: "Tiene problemas con el/la profesor/a",
      description: "Conflictos o dificultades en el ambiente escolar"
    },
    {
      question: "Está menos interesado/a en la escuela",
      description: "Pérdida de interés o motivación académica"
    },
    {
      question: "Actúa como si fuera más pequeño/a",
      description: "Comportamiento regresivo o inmaduro para su edad"
    },
    {
      question: "No obedece las reglas",
      description: "Desobediencia o desafío a la autoridad"
    },
    {
      question: "No muestra sus sentimientos",
      description: "Dificultad para expresar emociones"
    },
    {
      question: "No entiende los sentimientos de otros",
      description: "Falta de empatía o comprensión emocional"
    },
    {
      question: "Molesta o se burla de otros",
      description: "Comportamiento de acoso o burla hacia otros"
    },
    {
      question: "Culpa a otros por sus problemas",
      description: "Tendencia a no asumir responsabilidad"
    },
    {
      question: "Toma cosas que no le pertenecen",
      description: "Comportamiento de robo o apropiación indebida"
    },
    {
      question: "Se distrae fácilmente",
      description: "Problemas de atención o concentración"
    },
    {
      question: "Tiene pesadillas",
      description: "Sueños perturbadores frecuentes"
    },
    {
      question: "Se siente triste o infeliz",
      description: "Estado de ánimo depresivo persistente"
    },
    {
      question: "Se siente sin esperanza",
      description: "Sentimientos de desesperanza sobre el futuro"
    },
    {
      question: "Está preocupado/a por muchas cosas",
      description: "Ansiedad o preocupación excesiva"
    },
    {
      question: "Parece estar divirtiéndose menos",
      description: "Pérdida de interés en actividades placenteras"
    },
    {
      question: "Se niega a compartir",
      description: "Dificultad para compartir con otros"
    },
    {
      question: "Pelea con otros niños",
      description: "Comportamiento agresivo con pares"
    },
    {
      question: "Está ausente de la escuela",
      description: "Ausentismo escolar"
    },
    {
      question: "Tiene bajo rendimiento escolar",
      description: "Calificaciones o desempeño académico deficiente"
    },
    {
      question: "Visita frecuentemente al médico",
      description: "Quejas somáticas frecuentes"
    },
    {
      question: "Tiene miedo de estar solo/a",
      description: "Ansiedad de separación"
    },
    {
      question: "Siente que es malo/a",
      description: "Sentimientos de culpa o baja autoestima"
    },
    {
      question: "Toma riesgos innecesarios",
      description: "Comportamiento impulsivo o temerario"
    },
    {
      question: "Se lastima a sí mismo/a",
      description: "Comportamiento autolesivo"
    },
    {
      question: "Parece estar teniendo menos diversión",
      description: "Anhedonia o pérdida de placer"
    },
    {
      question: "Actúa como si fuera manejado/a por un motor",
      description: "Hiperactividad extrema"
    },
    {
      question: "Pelea con usted",
      description: "Conflictos con los padres"
    },
    {
      question: "No se comunica bien",
      description: "Problemas de comunicación"
    },
    {
      question: "Ve u oye cosas que no existen",
      description: "Posibles síntomas psicóticos"
    },
    {
      question: "Es nervioso/a o tenso/a",
      description: "Ansiedad o tensión persistente"
    },
    {
      question: "Tiene cambios de humor repentinos",
      description: "Inestabilidad emocional"
    }
  ],

  // PSC-Y - Cuestionario de Síntomas Pediátricos (versión para jóvenes)
  youthMentalHealth: [
    {
      question: "Me quejo de dolores y molestias",
      description: "Molestias físicas sin causa médica clara"
    },
    {
      question: "Paso mucho tiempo solo/a",
      description: "Preferencia por el aislamiento social"
    },
    {
      question: "Me canso fácilmente, tengo poca energía",
      description: "Fatiga persistente o falta de energía"
    },
    {
      question: "Soy inquieto/a, no puedo estar quieto/a",
      description: "Dificultad para permanecer tranquilo"
    },
    {
      question: "Tengo problemas con mis profesores",
      description: "Conflictos en el ambiente escolar"
    },
    {
      question: "Estoy menos interesado/a en la escuela",
      description: "Pérdida de motivación académica"
    },
    {
      question: "Actúo como si fuera más pequeño/a",
      description: "Comportamiento inmaduro para mi edad"
    },
    {
      question: "No obedezco las reglas",
      description: "Dificultad para seguir normas"
    },
    {
      question: "No muestro mis sentimientos",
      description: "Dificultad para expresar emociones"
    },
    {
      question: "No entiendo los sentimientos de otros",
      description: "Dificultad con la empatía"
    },
    {
      question: "Molesto o me burlo de otros",
      description: "Comportamiento de burla hacia otros"
    },
    {
      question: "Culpo a otros por mis problemas",
      description: "Dificultad para asumir responsabilidad"
    },
    {
      question: "Tomo cosas que no me pertenecen",
      description: "Comportamiento de apropiación indebida"
    },
    {
      question: "Me distraigo fácilmente",
      description: "Problemas de concentración"
    },
    {
      question: "Tengo pesadillas",
      description: "Sueños perturbadores frecuentes"
    },
    {
      question: "Me siento triste o infeliz",
      description: "Estado de ánimo depresivo"
    },
    {
      question: "Me siento sin esperanza",
      description: "Sentimientos de desesperanza"
    },
    {
      question: "Estoy preocupado/a por muchas cosas",
      description: "Ansiedad o preocupación excesiva"
    },
    {
      question: "Parece que me divierto menos",
      description: "Pérdida de interés en actividades"
    },
    {
      question: "Me niego a compartir",
      description: "Dificultad para compartir"
    },
    {
      question: "Peleo con otros jóvenes",
      description: "Comportamiento agresivo con pares"
    },
    {
      question: "Falto a la escuela",
      description: "Ausentismo escolar"
    },
    {
      question: "Tengo bajo rendimiento escolar",
      description: "Dificultades académicas"
    },
    {
      question: "Visito frecuentemente al médico",
      description: "Quejas físicas frecuentes"
    },
    {
      question: "Tengo miedo de estar solo/a",
      description: "Ansiedad cuando estoy solo"
    },
    {
      question: "Siento que soy malo/a",
      description: "Sentimientos de culpa"
    },
    {
      question: "Tomo riesgos innecesarios",
      description: "Comportamiento impulsivo"
    },
    {
      question: "Me lastimo a mí mismo/a",
      description: "Comportamiento autolesivo"
    },
    {
      question: "Tengo menos diversión",
      description: "Pérdida de placer en actividades"
    },
    {
      question: "Actúo como si fuera manejado/a por un motor",
      description: "Hiperactividad extrema"
    },
    {
      question: "Peleo con mis padres",
      description: "Conflictos familiares"
    },
    {
      question: "No me comunico bien",
      description: "Problemas de comunicación"
    },
    {
      question: "Veo u oigo cosas que no existen",
      description: "Experiencias perceptuales inusuales"
    },
    {
      question: "Soy nervioso/a o tenso/a",
      description: "Ansiedad o tensión persistente"
    },
    {
      question: "Tengo cambios de humor repentinos",
      description: "Inestabilidad emocional"
    }
  ]
};

// Función helper para obtener las preguntas de un tipo de evaluación
export function getAssessmentQuestions(type: string): QuestionData[] {
  return assessmentQuestions[type] || [];
}

// Función para obtener solo el texto de las preguntas (compatibilidad con código existente)
export function getQuestionTexts(type: string): string[] {
  return getAssessmentQuestions(type).map(q => q.question);
}