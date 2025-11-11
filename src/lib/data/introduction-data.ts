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
        type: "video" as IntroductionExerciseType,
        title: "Importancia de los Saludos en LSM",
        content: "https://www.youtube.com/embed/YNBeHPcxlR0", 
        description:
          "Descubre por qué los saludos son una parte esencial de la comunicación en LSM. Aprende cómo un buen saludo establece respeto y conexión visual con la otra persona.",
      },
      {
        id: "greetings-intro-2",
        type: "text" as IntroductionExerciseType,
        title: "Contexto Cultural",
        content:
          "En la comunidad sorda mexicana, los saludos no solo son una cortesía: son una muestra de respeto, reconocimiento y disposición a comunicarse. Al saludar, es fundamental mantener contacto visual y acompañar la seña con una expresión facial cordial. Los saludos pueden variar según la formalidad del entorno o la cercanía entre las personas.",
        description:
          "Comprende la importancia cultural de los saludos y su papel dentro de la comunidad sorda.",
      },
      {
        id: "greetings-intro-3",
        type: "image" as IntroductionExerciseType,
        title: "Ejemplo Visual del Signo 'Hola'",
        content: "/images/greetings-hello-sign.png",
        description:
          "El signo de 'Hola' en LSM se realiza llevando la mano extendida cerca de la frente y moviéndola ligeramente hacia afuera, acompañado de una expresión facial amistosa.",
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
        type: "video" as IntroductionExerciseType,
        title: "Estructura Familiar en LSM",
        content: "/assets/intro/familia_estructura.mp4",
        description:
          "Conoce cómo se estructuran las señas para 'madre', 'padre', 'hermano', 'hermana' y otros miembros de la familia.",
      },
      {
        id: "family-intro-2",
        type: "text" as IntroductionExerciseType,
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
        type: "video" as IntroductionExerciseType,
        title: "Sistema Numérico en LSM",
        content: "/assets/intro/numeros_sistema.mp4",
        description:
          "Descubre cómo se representan los números en LSM, desde el 1 al 10, y cómo su movimiento indica cantidad o contexto.",
      },
      {
        id: "numbers-intro-2",
        type: "text" as IntroductionExerciseType,
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
        type: "video" as IntroductionExerciseType,
        title: "Percepción del Color",
        content: "/assets/intro/colores_percepcion.mp4",
        description:
          "Aprende las señas básicas para los colores primarios y secundarios, y cómo se relacionan con emociones y objetos.",
      },
      {
        id: "colors-intro-2",
        type: "text" as IntroductionExerciseType,
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
        type: "video" as IntroductionExerciseType,
        title: "Cultura Gastronómica",
        content: "/assets/intro/comida_cultura.mp4",
        description:
          "Aprende cómo se representan los alimentos comunes y cómo la comida se convierte en un punto de encuentro social en la comunidad sorda.",
      },
      {
        id: "food-intro-2",
        type: "text" as IntroductionExerciseType,
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
        type: "video" as IntroductionExerciseType,
        title: "Imitación Natural",
        content: "/assets/intro/animales_imitacion.mp4",
        description:
          "Las señas para animales suelen basarse en la imitación de sus características físicas o sonidos.",
      },
      {
        id: "animals-intro-2",
        type: "text" as IntroductionExerciseType,
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
        type: "video" as IntroductionExerciseType,
        title: "Expresión Facial",
        content: "/assets/intro/emociones_facial.mp4",
        description:
          "La expresión facial es clave para comunicar emociones en LSM. Sin ella, las señas pierden gran parte de su significado.",
      },
      {
        id: "emotions-intro-2",
        type: "text" as IntroductionExerciseType,
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
        type: "video" as IntroductionExerciseType,
        title: "Orientación Espacial",
        content: "/assets/intro/lugares_orientacion.mp4",
        description:
          "En LSM, los lugares se señalan con base en la ubicación espacial, similar a un mapa mental tridimensional.",
      },
      {
        id: "places-intro-2",
        type: "text" as IntroductionExerciseType,
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
        type: "video" as IntroductionExerciseType,
        title: "Línea de Tiempo",
        content: "/assets/intro/tiempo_linea.mp4",
        description:
          "El tiempo se representa espacialmente, con el pasado detrás, el presente frente y el futuro hacia adelante.",
      },
      {
        id: "time-intro-2",
        type: "text" as IntroductionExerciseType,
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
        type: "video" as IntroductionExerciseType,
        title: "Gramática Interrogativa",
        content: "/assets/intro/preguntas_gramatica.mp4",
        description:
          "Las preguntas en LSM usan movimientos de cejas y expresiones faciales específicas para indicar si son abiertas o cerradas.",
      },
      {
        id: "questions-intro-2",
        type: "text" as IntroductionExerciseType,
        title: "Curiosidad Cultural",
        content:
          "Hacer preguntas es esencial para mantener la comunicación visual activa y demostrar interés en la conversación.",
        description: "Importancia de la curiosidad en LSM.",
      },
    ],
  },
}
