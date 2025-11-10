// Introduction content structure for LSM learning app
export type IntroductionExerciseType = "video" | "text" | "interactive" | "quiz"

export interface IntroductionExercise {
  id: string
  type: IntroductionExerciseType
  title: string
  content: string // URL for video, text content, etc.
  duration?: number // in seconds
  description?: string
}

export interface IntroductionLesson {
  id: string
  title: string
  description: string
  icon: string
  order: number
  totalDuration: number // in seconds
  exercises: IntroductionExercise[]
}

// General introduction lessons
export const generalIntroductionLessons: IntroductionLesson[] = [
  {
    id: "introduction",
    title: "Introducción a LSM",
    description: "Aprende qué es la Lengua de Señas Mexicana y su importancia",
    icon: "👋",
    order: 1,
    totalDuration: 300, // 5 minutes
    exercises: [
      {
        id: "intro-video-1",
        type: "video" as IntroductionExerciseType,
        title: "¿Qué es LSM?",
        content: "/assets/intro/que_es_lsm.mp4",
        duration: 180,
        description: "Video explicativo sobre la Lengua de Señas Mexicana"
      },
      {
        id: "intro-text-1",
        type: "text" as IntroductionExerciseType,
        title: "Historia de LSM",
        content: "La Lengua de Señas Mexicana (LSM) es el idioma visual utilizado por la comunidad sorda en México. Tiene su propia gramática, sintaxis y estructura lingüística únicas.",
        duration: 120,
        description: "Aprende sobre los orígenes de LSM"
      }
    ]
  },
  {
    id: "basic-etiquette",
    title: "Etiqueta Básica",
    description: "Normas y buenas prácticas al comunicarte en LSM",
    icon: "🤝",
    order: 2,
    totalDuration: 240, // 4 minutes
    exercises: [
      {
        id: "etiquette-video-1",
        type: "video" as IntroductionExerciseType,
        title: "Cómo llamar la atención",
        content: "/assets/intro/como_llamar_atencion.mp4",
        duration: 120,
        description: "Formas apropiadas de llamar la atención en LSM"
      },
      {
        id: "etiquette-interactive-1",
        type: "interactive" as IntroductionExerciseType,
        title: "Práctica de Etiqueta",
        content: "Arrastra las imágenes en el orden correcto para mostrar una conversación apropiada en LSM",
        duration: 120,
        description: "Ejercicio interactivo de etiqueta"
      }
    ]
  },
  {
    id: "hand-alphabet",
    title: "Alfabeto Manual",
    description: "Aprende las señas del alfabeto para deletrear palabras",
    icon: "🔤",
    order: 3,
    totalDuration: 420, // 7 minutes
    exercises: [
      {
        id: "alphabet-video-1",
        type: "video" as IntroductionExerciseType,
        title: "A - H",
        content: "/assets/intro/alfabeto_a_h.mp4",
        duration: 180,
        description: "Primeras 8 letras del alfabeto manual"
      },
      {
        id: "alphabet-video-2",
        type: "video" as IntroductionExerciseType,
        title: "I - P",
        content: "/assets/intro/alfabeto_i_p.mp4",
        duration: 180,
        description: "Siguientes 8 letras del alfabeto manual"
      },
      {
        id: "alphabet-quiz-1",
        type: "quiz" as IntroductionExerciseType,
        title: "Prueba de Alfabeto",
        content: "Selecciona la letra correcta para cada imagen",
        duration: 60,
        description: "Evaluación del aprendizaje del alfabeto"
      }
    ]
  },
  {
    id: "numbers-1-10",
    title: "Números 1-10",
    description: "Aprende a contar del 1 al 10 en LSM",
    icon: "🔢",
    order: 4,
    totalDuration: 300, // 5 minutes
    exercises: [
      {
        id: "numbers-video-1",
        type: "video" as IntroductionExerciseType,
        title: "Números 1-5",
        content: "/assets/intro/numeros_1_5.mp4",
        duration: 150,
        description: "Aprende a mostrar los números del 1 al 5"
      },
      {
        id: "numbers-video-2",
        type: "video" as IntroductionExerciseType,
        title: "Números 6-10",
        content: "/assets/intro/numeros_6_10.mp4",
        duration: 150,
        description: "Aprende a mostrar los números del 6 al 10"
      }
    ]
  }
]

// Topic-specific introduction lessons
export const topicIntroductionLessons: Record<string, IntroductionLesson> = {
  "intro-greetings": {
    id: "intro-greetings",
    title: "Introducción a Saludos",
    description: "Aprende los conceptos básicos de los saludos en LSM",
    icon: "👋",
    order: 1,
    totalDuration: 240,
    exercises: [
      {
        id: "greetings-intro-1",
        type: "video" as IntroductionExerciseType,
        title: "Importancia de los Saludos",
        content: "/assets/intro/saludos_importancia.mp4",
        duration: 120,
        description: "Por qué los saludos son fundamentales en LSM"
      },
      {
        id: "greetings-intro-2",
        type: "text" as IntroductionExerciseType,
        title: "Contexto Cultural",
        content: "Los saludos en la cultura sorda mexicana tienen un significado especial y muestran respeto hacia la comunidad.",
        duration: 120,
        description: "Entendiendo el contexto cultural de los saludos"
      }
    ]
  },
  "intro-family": {
    id: "intro-family",
    title: "Introducción a Familia",
    description: "Descubre cómo referirse a miembros de la familia en LSM",
    icon: "👨‍👩‍👧‍👦",
    order: 2,
    totalDuration: 240,
    exercises: [
      {
        id: "family-intro-1",
        type: "video" as IntroductionExerciseType,
        title: "Estructura Familiar en LSM",
        content: "/assets/intro/familia_estructura.mp4",
        duration: 120,
        description: "Cómo se estructuran las señas familiares"
      },
      {
        id: "family-intro-2",
        type: "text" as IntroductionExerciseType,
        title: "Respeto Familiar",
        content: "En la cultura sorda, las señas familiares son especialmente respetuosas y detalladas.",
        duration: 120,
        description: "Importancia del respeto en señas familiares"
      }
    ]
  },
  "intro-numbers": {
    id: "intro-numbers",
    title: "Introducción a Números",
    description: "Aprende el sistema numérico en LSM",
    icon: "🔢",
    order: 3,
    totalDuration: 240,
    exercises: [
      {
        id: "numbers-intro-1",
        type: "video" as IntroductionExerciseType,
        title: "Sistema Numérico LSM",
        content: "/assets/intro/numeros_sistema.mp4",
        duration: 120,
        description: "Cómo funciona el sistema numérico en LSM"
      },
      {
        id: "numbers-intro-2",
        type: "text" as IntroductionExerciseType,
        title: "Aplicaciones Prácticas",
        content: "Los números en LSM se usan en fechas, edades, precios y muchas situaciones cotidianas.",
        duration: 120,
        description: "Dónde usarás los números en LSM"
      }
    ]
  },
  "intro-colors": {
    id: "intro-colors",
    title: "Introducción a Colores",
    description: "Explora cómo se expresan los colores en LSM",
    icon: "🎨",
    order: 4,
    totalDuration: 240,
    exercises: [
      {
        id: "colors-intro-1",
        type: "video" as IntroductionExerciseType,
        title: "Percepción del Color",
        content: "/assets/intro/colores_percepcion.mp4",
        duration: 120,
        description: "Cómo se perciben los colores en la comunidad sorda"
      },
      {
        id: "colors-intro-2",
        type: "text" as IntroductionExerciseType,
        title: "Expresividad Visual",
        content: "Los colores en LSM son altamente expresivos y visuales, reflejando la naturaleza visual de la lengua.",
        duration: 120,
        description: "La importancia visual de los colores"
      }
    ]
  },
  "intro-food": {
    id: "intro-food",
    title: "Introducción a Comida",
    description: "Conoce las señas básicas relacionadas con la comida",
    icon: "🍽️",
    order: 5,
    totalDuration: 240,
    exercises: [
      {
        id: "food-intro-1",
        type: "video" as IntroductionExerciseType,
        title: "Cultura Gastronómica",
        content: "/assets/intro/comida_cultura.mp4",
        duration: 120,
        description: "Importancia de la comida en la cultura sorda mexicana"
      },
      {
        id: "food-intro-2",
        type: "text" as IntroductionExerciseType,
        title: "Contexto Social",
        content: "Compartir comida es una forma importante de socializar en la comunidad sorda.",
        duration: 120,
        description: "Comida como forma de conexión social"
      }
    ]
  },
  "intro-animals": {
    id: "intro-animals",
    title: "Introducción a Animales",
    description: "Aprende sobre las señas para animales en LSM",
    icon: "🐕",
    order: 6,
    totalDuration: 240,
    exercises: [
      {
        id: "animals-intro-1",
        type: "video" as IntroductionExerciseType,
        title: "Imitación Natural",
        content: "/assets/intro/animales_imitacion.mp4",
        duration: 120,
        description: "Cómo las señas de animales imitan sus características"
      },
      {
        id: "animals-intro-2",
        type: "text" as IntroductionExerciseType,
        title: "Conexión con la Naturaleza",
        content: "La comunidad sorda tiene una conexión especial con la naturaleza y los animales.",
        duration: 120,
        description: "Relación con el mundo natural"
      }
    ]
  },
  "intro-emotions": {
    id: "intro-emotions",
    title: "Introducción a Emociones",
    description: "Descubre cómo se expresan las emociones en LSM",
    icon: "😊",
    order: 7,
    totalDuration: 240,
    exercises: [
      {
        id: "emotions-intro-1",
        type: "video" as IntroductionExerciseType,
        title: "Expresión Facial",
        content: "/assets/intro/emociones_facial.mp4",
        duration: 120,
        description: "La importancia de la expresión facial en LSM"
      },
      {
        id: "emotions-intro-2",
        type: "text" as IntroductionExerciseType,
        title: "Comunicación Emocional",
        content: "En LSM, las emociones se comunican de manera directa y visual, lo que enriquece la interacción.",
        duration: 120,
        description: "Profundidad en la comunicación emocional"
      }
    ]
  },
  "intro-places": {
    id: "intro-places",
    title: "Introducción a Lugares",
    description: "Aprende sobre las señas para lugares comunes",
    icon: "🏠",
    order: 8,
    totalDuration: 240,
    exercises: [
      {
        id: "places-intro-1",
        type: "video" as IntroductionExerciseType,
        title: "Orientación Espacial",
        content: "/assets/intro/lugares_orientacion.mp4",
        duration: 120,
        description: "Cómo se indica ubicación y dirección en LSM"
      },
      {
        id: "places-intro-2",
        type: "text" as IntroductionExerciseType,
        title: "Mapas Mentales",
        content: "En LSM, los lugares se establecen en el espacio como un mapa mental tridimensional.",
        duration: 120,
        description: "Sistema espacial de lugares"
      }
    ]
  },
  "intro-time": {
    id: "intro-time",
    title: "Introducción a Tiempo",
    description: "Comprende cómo se expresa el tiempo en LSM",
    icon: "⏰",
    order: 9,
    totalDuration: 240,
    exercises: [
      {
        id: "time-intro-1",
        type: "video" as IntroductionExerciseType,
        title: "Línea de Tiempo",
        content: "/assets/intro/tiempo_linea.mp4",
        duration: 120,
        description: "Cómo se representa el tiempo en el espacio"
      },
      {
        id: "time-intro-2",
        type: "text" as IntroductionExerciseType,
        title: "Concepto Temporal",
        content: "El tiempo en LSM se concibe de manera espacial y visual, no lineal como en el lenguaje oral.",
        duration: 120,
        description: "Percepción visual del tiempo"
      }
    ]
  },
  "intro-questions": {
    id: "intro-questions",
    title: "Introducción a Preguntas",
    description: "Aprende el arte de hacer preguntas en LSM",
    icon: "❓",
    order: 10,
    totalDuration: 240,
    exercises: [
      {
        id: "questions-intro-1",
        type: "video" as IntroductionExerciseType,
        title: "Gramática Interrogativa",
        content: "/assets/intro/preguntas_gramatica.mp4",
        duration: 120,
        description: "Cómo funciona la gramática para preguntas en LSM"
      },
      {
        id: "questions-intro-2",
        type: "text" as IntroductionExerciseType,
        title: "Curiosidad Cultural",
        content: "Hacer preguntas es esencial en la cultura sorda para mantener la comunicación visual activa.",
        duration: 120,
        description: "Importancia de la curiosidad en LSM"
      }
    ]
  }
}