// Introduction content structure for LSM learning app
export type IntroductionExerciseType = "video" | "text" | "image" | "interactive" | "quiz"

export interface IntroductionExercise {
  id: string
  type: IntroductionExerciseType
  title: string
  content: string // URL for video, text content, etc.
  duration?: number // optional
  description?: string
}

export interface IntroductionLesson {
  id: string
  title: string
  description: string
  icon: string
  order: number
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
    exercises: [
      {
        id: "intro-video-1",
        type: "video" as IntroductionExerciseType,
        title: "¿Qué es LSM?",
        content: "https://www.youtube.com/embed/PZ6XVO2X1K4",
        description: "Video explicativo sobre la Lengua de Señas Mexicana"
      },
      {
        id: "intro-video-2",
        type: "video" as IntroductionExerciseType,
        title: "Básicos de LSM",
        content: "https://www.youtube.com/embed/MZOUTIjz4ac",
        description: "Primeros pasos con las señas básicas"
      }
    ]
  },
  {
    id: "basic-etiquette",
    title: "Etiqueta Básica",
    description: "Normas y buenas prácticas al comunicarte en LSM",
    icon: "🤝",
    order: 2,
    exercises: [
      {
        id: "etiquette-video-1",
        type: "video" as IntroductionExerciseType,
        title: "Cómo llamar la atención",
        content: "https://www.youtube.com/embed/ycER7RT3WU0",
        description: "Formas apropiadas de llamar la atención en LSM"
      },
      {
        id: "etiquette-video-2",
        type: "video" as IntroductionExerciseType,
        title: "Saludos y Despedidas",
        content: "https://www.youtube.com/embed/9kt4R2wCrv4",
        description: "Formas apropiadas de saludar y despedirse en LSM"
      }
    ]
  },
  {
    id: "hand-alphabet",
    title: "Alfabeto Manual",
    description: "Aprende las señas del alfabeto para deletrear palabras",
    icon: "🔤",
    order: 3,
    exercises: [
      {
        id: "alphabet-video-1",
        type: "video" as IntroductionExerciseType,
        title: "ABC de LSM",
        content: "https://www.youtube.com/embed/PZ6XVO2X1K4",
        description: "Primeras letras del alfabeto manual"
      },
      {
        id: "alphabet-video-2",
        type: "video" as IntroductionExerciseType,
        title: "Dactilología",
        content: "https://www.youtube.com/embed/PZ6XVO2X1K4",
        description: "Ejercicios de fonología (Dactilología)"
      },
      {
        id: "alphabet-video-3",
        type: "video" as IntroductionExerciseType,
        title: "Práctica del Abecedario",
        content: "https://www.youtube.com/embed/9CmVcoaOu6A",
        description: "Practica las letras del abecedario en LSM"
      }
    ]
  },
  {
    id: "numbers-1-10",
    title: "Números 1-10",
    description: "Aprende a contar del 1 al 10 en LSM",
    icon: "🔢",
    order: 4,
    exercises: [
      {
        id: "numbers-video-1",
        type: "video" as IntroductionExerciseType,
        title: "Números 1-5",
        content: "https://www.youtube.com/playlist?list=PLi8XpZVEKlLqqqR2-J4gxqxyP0KtahNPw",
        description: "Aprende a mostrar los números del 1 al 5"
      },
      {
        id: "numbers-video-2",
        type: "video" as IntroductionExerciseType,
        title: "Números 6-10",
        content: "https://www.youtube.com/playlist?list=PLi8XpZVEKlLqqqR2-J4gxqxyP0KtahNPw",
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
    description:
      "Aprende los conceptos básicos de los saludos en LSM y su importancia cultural dentro de la comunidad sorda mexicana.",
    icon: "👋",
    order: 1,
    exercises: [
      {
        id: "greetings-intro-1",
        type: "video",
        title: "Importancia de los Saludos en LSM",
        content: "https://www.youtube.com/embed/ycER7RT3WU0",
        description:
          "Descubre por qué los saludos son una parte esencial de la comunicación en LSM. Aprende cómo un buen saludo establece respeto y conexión visual con la otra persona.",
      },
      {
        id: "greetings-intro-2",
        type: "video",
        title: "Saludos Básicos",
        content: "https://www.youtube.com/embed/9kt4R2wCrv4",
        description:
          "Aprende las señas básicas de saludo como 'Hola', 'Buenos días', 'Buenas tardes', 'Adiós', etc.",
      },
      {
        id: "greetings-intro-3",
        type: "text",
        title: "Contexto Cultural",
        content:
          "En la comunidad sorda mexicana, los saludos no solo son una cortesía: son una muestra de respeto, reconocimiento y disposición a comunicarse. Al saludar, es fundamental mantener contacto visual y acompañar la seña con una expresión facial cordial. Los saludos pueden variar según la formalidad del entorno o la cercanía entre las personas.",
        description:
          "Comprende la importancia cultural de los saludos y su papel dentro de la comunidad sorda.",
      },
    ],
  },

  "intro-family": {
    id: "intro-family",
    title: "Introducción a Familia",
    description: "Descubre cómo referirse a miembros de la familia en LSM.",
    icon: "👨‍👩‍👧‍👦",
    order: 2,
    exercises: [
      {
        id: "family-intro-1",
        type: "video",
        title: "Estructura Familiar en LSM",
        content: "https://www.youtube.com/embed/ycER7RT3WU0",
        description:
          "Conoce cómo se estructuran las señas para 'madre', 'padre', 'hermano', 'hermana' y otros miembros de la familia.",
      },
      {
        id: "family-intro-2",
        type: "video",
        title: "Señas de Familia",
        content: "https://www.youtube.com/embed/0XPEfoqRnXo",
        description: "Aprende las señas específicas para diferentes miembros de la familia.",
      },
      {
        id: "family-intro-3",
        type: "text",
        title: "Respeto Familiar",
        content:
          "En la cultura sorda, las señas familiares son especialmente respetuosas y reflejan la importancia de los vínculos cercanos. Es común adaptar las señas dependiendo del afecto o relación con la persona.",
        description: "Importancia del respeto en las señas familiares.",
      },
    ],
  },

  "intro-numbers": {
    id: "intro-numbers",
    title: "Introducción a Números",
    description: "Aprende el sistema numérico en LSM y su uso cotidiano.",
    icon: "🔢",
    order: 3,
    exercises: [
      {
        id: "numbers-intro-1",
        type: "video",
        title: "Sistema Numérico en LSM",
        content: "https://www.youtube.com/playlist?list=PLi8XpZVEKlLqqqR2-J4gxqxyP0KtahNPw",
        description:
          "Descubre cómo se representan los números en LSM, desde el 1 al 10, y cómo su movimiento indica cantidad o contexto.",
      },
      {
        id: "numbers-intro-2",
        type: "video",
        title: "Números 1-20",
        content: "https://www.youtube.com/playlist?list=PLi8XpZVEKlLqqqR2-J4gxqxyP0KtahNPw",
        description: "Aprende los números del 1 al 20 en LSM.",
      },
      {
        id: "numbers-intro-3",
        type: "text",
        title: "Aplicaciones Prácticas",
        content:
          "Los números se usan en fechas, edades, precios y muchas situaciones cotidianas. La posición y orientación de la mano pueden variar según el número.",
        description: "Dónde usarás los números en LSM.",
      },
    ],
  },

  "intro-colors": {
    id: "intro-colors",
    title: "Introducción a Colores",
    description: "Explora cómo se expresan los colores en LSM.",
    icon: "🎨",
    order: 4,
    exercises: [
      {
        id: "colors-intro-1",
        type: "video",
        title: "Percepción del Color",
        content: "https://www.youtube.com/embed/U7m4daxkSBQ",
        description:
          "Aprende las señas básicas para los colores primarios y secundarios, y cómo se relacionan con emociones y objetos.",
      },
      {
        id: "colors-intro-2",
        type: "video",
        title: "Colores con Animales",
        content: "https://www.youtube.com/embed/PdPK_wJixFU",
        description: "Aprende los colores combinados con animales para mejor memorización.",
      },
      {
        id: "colors-intro-3",
        type: "text",
        title: "Expresividad Visual",
        content:
          "Los colores en LSM son altamente expresivos, reforzando la naturaleza visual del lenguaje. Las señas suelen inspirarse en objetos o situaciones asociadas con el color.",
        description: "La importancia visual de los colores.",
      },
    ],
  },

  "intro-food": {
    id: "intro-food",
    title: "Introducción a Comida",
    description: "Conoce las señas básicas relacionadas con la comida.",
    icon: "🍽️",
    order: 5,
    exercises: [
      {
        id: "food-intro-1",
        type: "video",
        title: "Cultura Gastronómica",
        content: "https://www.youtube.com/embed/oW-fK5Ejn1w",
        description:
          "Aprende cómo se representan los alimentos comunes y cómo la comida se convierte en un punto de encuentro social en la comunidad sorda.",
      },
      {
        id: "food-intro-2",
        type: "video",
        title: "Alimentos y Comida",
        content: "https://www.youtube.com/embed/oW-fK5Ejn1w",
        description: "Aprende las señas básicas para alimentos y bebidas comunes.",
      },
      {
        id: "food-intro-3",
        type: "text",
        title: "Contexto Social",
        content:
          "Compartir comida es una forma importante de socializar en la comunidad sorda. Las señas de alimentos suelen estar ligadas a su forma o manera de comerlos.",
        description: "Comida como forma de conexión social.",
      },
    ],
  },

  "intro-animals": {
    id: "intro-animals",
    title: "Introducción a Animales",
    description: "Aprende sobre las señas para animales en LSM.",
    icon: "🐕",
    order: 6,
    exercises: [
      {
        id: "animals-intro-1",
        type: "video",
        title: "Imitación Natural",
        content: "https://www.youtube.com/embed/0XPEfoqRnXo",
        description:
          "Las señas para animales suelen basarse en la imitación de sus características físicas o sonidos.",
      },
      {
        id: "animals-intro-2",
        type: "video",
        title: "Animales y Sonidos",
        content: "https://www.youtube.com/embed/0XPEfoqRnXo",
        description: "Aprende cómo se representan diferentes animales y sus sonidos en LSM.",
      },
      {
        id: "animals-intro-3",
        type: "text",
        title: "Conexión con la Naturaleza",
        content:
          "El aprendizaje de las señas de animales refuerza la conexión entre la naturaleza y la expresión visual del lenguaje.",
        description: "Relación con el mundo natural.",
      },
    ],
  },

  "intro-emotions": {
    id: "intro-emotions",
    title: "Introducción a Emociones",
    description: "Descubre cómo se expresan las emociones en LSM.",
    icon: "😊",
    order: 7,
    exercises: [
      {
        id: "emotions-intro-1",
        type: "video",
        title: "Expresión Facial",
        content: "https://www.youtube.com/embed/nKGH3mJxRcs",
        description:
          "La expresión facial es clave para comunicar emociones en LSM. Sin ella, las señas pierden gran parte de su significado.",
      },
      {
        id: "emotions-intro-2",
        type: "video",
        title: "Emociones y Sentimientos",
        content: "https://www.tiktok.com/@habraamhn/video/7458413859347434757",
        description: "Aprende las señas para diferentes emociones y sentimientos comunes.",
      },
      {
        id: "emotions-intro-3",
        type: "text",
        title: "Comunicación Emocional",
        content:
          "En LSM, las emociones se comunican de forma visual y directa, fortaleciendo la empatía y comprensión entre personas.",
        description: "Profundidad en la comunicación emocional.",
      },
    ],
  },

  "intro-places": {
    id: "intro-places",
    title: "Introducción a Lugares",
    description: "Aprende sobre las señas para lugares comunes.",
    icon: "🏠",
    order: 8,
    exercises: [
      {
        id: "places-intro-1",
        type: "video",
        title: "Orientación Espacial",
        content: "https://www.youtube.com/embed/9CmVcoaOu6A",
        description:
          "En LSM, los lugares se señalan con base en la ubicación espacial, similar a un mapa mental tridimensional.",
      },
      {
        id: "places-intro-2",
        type: "video",
        title: "Días de la Semana en LSM",
        content: "https://www.youtube.com/embed/Qt7dGwpRPgo",
        description: "Aprende cómo se representan los días de la semana en LSM.",
      },
      {
        id: "places-intro-3",
        type: "text",
        title: "Mapas Mentales",
        content:
          "La estructura espacial en LSM permite representar lugares en el aire, facilitando la comprensión de direcciones y ubicaciones.",
        description: "Sistema espacial de lugares.",
      },
    ],
  },

  "intro-time": {
    id: "intro-time",
    title: "Introducción a Tiempo",
    description: "Comprende cómo se expresa el tiempo en LSM.",
    icon: "⏰",
    order: 9,
    exercises: [
      {
        id: "time-intro-1",
        type: "video",
        title: "Línea de Tiempo",
        content: "https://www.youtube.com/embed/Qt7dGwpRPgo",
        description:
          "El tiempo se representa espacialmente, con el pasado detrás, el presente frente y el futuro hacia adelante.",
      },
      {
        id: "time-intro-2",
        type: "video",
        title: "Meses del Año",
        content: "https://www.youtube.com/embed/zSnR3HGYth8",
        description: "Aprende cómo se representan los meses del año en LSM.",
      },
      {
        id: "time-intro-3",
        type: "text",
        title: "Concepto Temporal",
        content:
          "La percepción del tiempo en LSM es visual y espacial, permitiendo describir acciones pasadas y futuras con fluidez.",
        description: "Percepción visual del tiempo.",
      },
    ],
  },

  "intro-questions": {
    id: "intro-questions",
    title: "Introducción a Preguntas",
    description: "Aprende el arte de hacer preguntas en LSM.",
    icon: "❓",
    order: 10,
    exercises: [
      {
        id: "questions-intro-1",
        type: "video",
        title: "Gramática Interrogativa",
        content: "https://www.youtube.com/embed/9kt4R2wCrv4",
        description:
          "Las preguntas en LSM usan movimientos de cejas y expresiones faciales específicas para indicar si son abiertas o cerradas.",
      },
      {
        id: "questions-intro-2",
        type: "video",
        title: "Tipos de Preguntas",
        content: "https://www.youtube.com/embed/9kt4R2wCrv4",
        description: "Aprende cómo formular diferentes tipos de preguntas en LSM.",
      },
      {
        id: "questions-intro-3",
        type: "text",
        title: "Curiosidad Cultural",
        content:
          "Hacer preguntas es esencial para mantener la comunicación visual activa y demostrar interés en la conversación.",
        description: "Importancia de la curiosidad en LSM.",
      },
    ],
  },
}
