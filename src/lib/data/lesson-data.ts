// Lesson content structure for LSM learning app
export type ExerciseType = "multiple-choice" | "video-match" | "sign-recognition"

export interface Exercise {
  id: string
  type: ExerciseType
  question: string
  videoUrl?: string // Enlace a la imagen que representa la seña
  options: string[]
  correctAnswer: string
  xpReward: number
}

export interface Lesson {
  id: string
  topicId: string
  lessonNumber: number
  title: string
  description: string
  exercises: Exercise[]
  totalXp: number
}

export interface Topic {
  id: string
  title: string
  description: string
  icon: string
  order: number
  lessons: Lesson[]
}

// Sample lesson data for MVP (10 topics with 10 lessons each)
export const topics: Topic[] = [
  {
    id: "greetings",
    title: "Saludos",
    description: "Aprende a saludar en LSM",
    icon: "👋",
    order: 1,
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `greetings-${i + 1}`,
      topicId: "greetings",
      lessonNumber: i + 1,
      title: `Lección ${i + 1}: Saludos básicos`,
      description: "Aprende señas básicas de saludo",
      totalXp: 50,
      exercises: [
        {
          id: `greetings-${i + 1}-ex1`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué palabra representa la siguiente seña?',
          // Enlace de imagen para "Hola" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+hello+image`,
          options: ["Hola", "Adiós", "Gracias", "Por favor"],
          correctAnswer: "Hola",
          xpReward: 10,
        },
        {
          id: `greetings-${i + 1}-ex2`,
          type: "video-match" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué palabra representa la siguiente seña?',
          // Enlace de imagen para "Buenos días" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+good+morning+image`,
          options: ["Buenos días", "Buenas tardes", "Buenas noches", "Hasta luego"],
          correctAnswer: "Buenos días",
          xpReward: 10,
        },
        {
          id: `greetings-${i + 1}-ex3`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué palabra representa la siguiente seña?',
          // Enlace de imagen para "Adiós" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+goodbye+image`,
          options: ["Adiós", "Hola", "Hasta pronto", "Nos vemos"],
          correctAnswer: "Adiós",
          xpReward: 10,
        },
        {
          id: `greetings-${i + 1}-ex4`,
          type: "video-match" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué frase representa la siguiente seña?',
          // Enlace de imagen para "¿Cómo estás?" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+how+are+you+image`,
          options: ["¿Cómo estás?", "¿Qué tal?", "Bien", "Mal"],
          correctAnswer: "¿Cómo estás?",
          xpReward: 10,
        },
        {
          id: `greetings-${i + 1}-ex5`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué palabra representa la siguiente seña?',
          // Enlace de imagen para "Gracias" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+thank+you+image`,
          options: ["Gracias", "De nada", "Por favor", "Perdón"],
          correctAnswer: "Gracias",
          xpReward: 10,
        },
      ],
    })),
  },
  {
    id: "family",
    title: "Familia",
    description: "Señas para miembros de la familia",
    icon: "👨‍👩‍👧‍👦",
    order: 2,
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `family-${i + 1}`,
      topicId: "family",
      lessonNumber: i + 1,
      title: `Lección ${i + 1}: Familia`,
      description: "Aprende señas de familia",
      totalXp: 50,
      exercises: [
        {
          id: `family-${i + 1}-ex1`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué miembro de la familia representa la seña?',
          // Enlace de imagen para "Mamá" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+mother+image`,
          options: ["Mamá", "Papá", "Hermano", "Hermana"],
          correctAnswer: "Mamá",
          xpReward: 10,
        },
        {
          id: `family-${i + 1}-ex2`,
          type: "video-match" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué miembro de la familia representa la seña?',
          // Enlace de imagen para "Papá" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+father+image`,
          options: ["Papá", "Mamá", "Abuelo", "Tío"],
          correctAnswer: "Papá",
          xpReward: 10,
        },
        {
          id: `family-${i + 1}-ex3`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué miembro de la familia representa la seña?',
          // Enlace de imagen para "Hermano" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+brother+image`,
          options: ["Hermano", "Hermana", "Primo", "Sobrino"],
          correctAnswer: "Hermano",
          xpReward: 10,
        },
        {
          id: `family-${i + 1}-ex4`,
          type: "video-match" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué miembro de la familia representa la seña?',
          // Enlace de imagen para "Abuela" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+grandmother+image`,
          options: ["Abuela", "Abuelo", "Mamá", "Tía"],
          correctAnswer: "Abuela",
          xpReward: 10,
        },
        {
          id: `family-${i + 1}-ex5`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué miembro de la familia representa la seña?',
          // Enlace de imagen para "Hijo" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+son+image`,
          options: ["Hijo", "Hija", "Nieto", "Sobrino"],
          correctAnswer: "Hijo",
          xpReward: 10,
        },
      ],
    })),
  },
  {
    id: "numbers",
    title: "Números",
    description: "Aprende a contar en LSM",
    icon: "🔢",
    order: 3,
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `numbers-${i + 1}`,
      topicId: "numbers",
      lessonNumber: i + 1,
      title: `Lección ${i + 1}: Números`,
      description: "Aprende números en LSM",
      totalXp: 50,
      exercises: [
        {
          id: `numbers-${i + 1}-ex1`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué número representa la siguiente seña?',
          // Enlace de imagen para "1" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+number+1+image`,
          options: ["1", "2", "3", "4"],
          correctAnswer: "1",
          xpReward: 10,
        },
        {
          id: `numbers-${i + 1}-ex2`,
          type: "video-match" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué número representa la siguiente seña?',
          // Enlace de imagen para "5" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+number+5+image`,
          options: ["5", "6", "7", "8"],
          correctAnswer: "5",
          xpReward: 10,
        },
        {
          id: `numbers-${i + 1}-ex3`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué número representa la siguiente seña?',
          // Enlace de imagen para "10" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+number+10+image`,
          options: ["10", "20", "30", "40"],
          correctAnswer: "10",
          xpReward: 10,
        },
        {
          id: `numbers-${i + 1}-ex4`,
          type: "video-match" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué número representa la siguiente seña?',
          // Enlace de imagen para "15" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+number+15+image`,
          options: ["15", "25", "35", "45"],
          correctAnswer: "15",
          xpReward: 10,
        },
        {
          id: `numbers-${i + 1}-ex5`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué número representa la siguiente seña?',
          // Enlace de imagen para "100" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+number+100+image`,
          options: ["100", "200", "300", "400"],
          correctAnswer: "100",
          xpReward: 10,
        },
      ],
    })),
  },
  {
    id: "colors",
    title: "Colores",
    description: "Señas para colores básicos",
    icon: "🎨",
    order: 4,
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `colors-${i + 1}`,
      topicId: "colors",
      lessonNumber: i + 1,
      title: `Lección ${i + 1}: Colores`,
      description: "Aprende colores en LSM",
      totalXp: 50,
      exercises: [
        {
          id: `colors-${i + 1}-ex1`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué color representa la siguiente seña?',
          // Enlace de imagen para "Rojo" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+red+color+image`,
          options: ["Rojo", "Azul", "Verde", "Amarillo"],
          correctAnswer: "Rojo",
          xpReward: 10,
        },
        {
          id: `colors-${i + 1}-ex2`,
          type: "video-match" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué color representa la siguiente seña?',
          // Enlace de imagen para "Azul" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+blue+color+image`,
          options: ["Azul", "Verde", "Morado", "Rosa"],
          correctAnswer: "Azul",
          xpReward: 10,
        },
        {
          id: `colors-${i + 1}-ex3`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué color representa la siguiente seña?',
          // Enlace de imagen para "Verde" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+green+color+image`,
          options: ["Verde", "Amarillo", "Naranja", "Café"],
          correctAnswer: "Verde",
          xpReward: 10,
        },
        {
          id: `colors-${i + 1}-ex4`,
          type: "video-match" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué color representa la siguiente seña?',
          // Enlace de imagen para "Amarillo" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+yellow+color+image`,
          options: ["Amarillo", "Blanco", "Negro", "Gris"],
          correctAnswer: "Amarillo",
          xpReward: 10,
        },
        {
          id: `colors-${i + 1}-ex5`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué color representa la siguiente seña?',
          // Enlace de imagen para "Negro" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+black+color+image`,
          options: ["Negro", "Blanco", "Gris", "Café"],
          correctAnswer: "Negro",
          xpReward: 10,
        },
      ],
    })),
  },
  {
    id: "food",
    title: "Comida",
    description: "Señas para alimentos comunes",
    icon: "🍽️",
    order: 5,
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `food-${i + 1}`,
      topicId: "food",
      lessonNumber: i + 1,
      title: `Lección ${i + 1}: Comida`,
      description: "Aprende señas de comida",
      totalXp: 50,
      exercises: [
        {
          id: `food-${i + 1}-ex1`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué alimento/bebida representa la siguiente seña?',
          // Enlace de imagen para "Agua" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+water+image`,
          options: ["Agua", "Leche", "Jugo", "Refresco"],
          correctAnswer: "Agua",
          xpReward: 10,
        },
        {
          id: `food-${i + 1}-ex2`,
          type: "video-match" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué alimento representa la siguiente seña?',
          // Enlace de imagen para "Pan" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+bread+image`,
          options: ["Pan", "Tortilla", "Arroz", "Pasta"],
          correctAnswer: "Pan",
          xpReward: 10,
        },
        {
          id: `food-${i + 1}-ex3`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué fruta representa la siguiente seña?',
          // Enlace de imagen para "Manzana" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+apple+image`,
          options: ["Manzana", "Naranja", "Plátano", "Uva"],
          correctAnswer: "Manzana",
          xpReward: 10,
        },
        {
          id: `food-${i + 1}-ex4`,
          type: "video-match" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué tipo de carne representa la siguiente seña?',
          // Enlace de imagen para "Pollo" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+chicken+image`,
          options: ["Pollo", "Carne", "Pescado", "Huevo"],
          correctAnswer: "Pollo",
          xpReward: 10,
        },
        {
          id: `food-${i + 1}-ex5`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué bebida representa la siguiente seña?',
          // Enlace de imagen para "Café" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+coffee+image`,
          options: ["Café", "Té", "Chocolate", "Atole"],
          correctAnswer: "Café",
          xpReward: 10,
        },
      ],
    })),
  },
  {
    id: "animals",
    title: "Animales",
    description: "Señas para animales comunes",
    icon: "🐕",
    order: 6,
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `animals-${i + 1}`,
      topicId: "animals",
      lessonNumber: i + 1,
      title: `Lección ${i + 1}: Animales`,
      description: "Aprende señas de animales",
      totalXp: 50,
      exercises: [
        {
          id: `animals-${i + 1}-ex1`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué animal representa la siguiente seña?',
          // Enlace de imagen para "Perro" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+dog+image`,
          options: ["Perro", "Gato", "Pájaro", "Pez"],
          correctAnswer: "Perro",
          xpReward: 10,
        },
        {
          id: `animals-${i + 1}-ex2`,
          type: "video-match" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué animal representa la siguiente seña?',
          // Enlace de imagen para "Gato" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+cat+image`,
          options: ["Gato", "Perro", "Conejo", "Ratón"],
          correctAnswer: "Gato",
          xpReward: 10,
        },
        {
          id: `animals-${i + 1}-ex3`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué animal representa la siguiente seña?',
          // Enlace de imagen para "Caballo" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+horse+image`,
          options: ["Caballo", "Vaca", "Cerdo", "Oveja"],
          correctAnswer: "Caballo",
          xpReward: 10,
        },
        {
          id: `animals-${i + 1}-ex4`,
          type: "video-match" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué animal representa la siguiente seña?',
          // Enlace de imagen para "Pájaro" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+bird+image`,
          options: ["Pájaro", "Mariposa", "Abeja", "Mosca"],
          correctAnswer: "Pájaro",
          xpReward: 10,
        },
        {
          id: `animals-${i + 1}-ex5`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué animal representa la siguiente seña?',
          // Enlace de imagen para "Elefante" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+elephant+image`,
          options: ["Elefante", "León", "Tigre", "Oso"],
          correctAnswer: "Elefante",
          xpReward: 10,
        },
      ],
    })),
  },
  {
    id: "emotions",
    title: "Emociones",
    description: "Expresa cómo te sientes",
    icon: "😊",
    order: 7,
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `emotions-${i + 1}`,
      topicId: "emotions",
      lessonNumber: i + 1,
      title: `Lección ${i + 1}: Emociones`,
      description: "Aprende señas de emociones",
      totalXp: 50,
      exercises: [
        {
          id: `emotions-${i + 1}-ex1`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué emoción representa la siguiente seña?',
          // Enlace de imagen para "Feliz" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+happy+image`,
          options: ["Feliz", "Triste", "Enojado", "Asustado"],
          correctAnswer: "Feliz",
          xpReward: 10,
        },
        {
          id: `emotions-${i + 1}-ex2`,
          type: "video-match" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué emoción representa la siguiente seña?',
          // Enlace de imagen para "Triste" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+sad+image`,
          options: ["Triste", "Feliz", "Cansado", "Aburrido"],
          correctAnswer: "Triste",
          xpReward: 10,
        },
        {
          id: `emotions-${i + 1}-ex3`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué emoción representa la siguiente seña?',
          // Enlace de imagen para "Enojado" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+angry+image`,
          options: ["Enojado", "Frustrado", "Molesto", "Irritado"],
          correctAnswer: "Enojado",
          xpReward: 10,
        },
        {
          id: `emotions-${i + 1}-ex4`,
          type: "video-match" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué emoción representa la siguiente seña?',
          // Enlace de imagen para "Sorprendido" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+surprised+image`,
          options: ["Sorprendido", "Confundido", "Preocupado", "Nervioso"],
          correctAnswer: "Sorprendido",
          xpReward: 10,
        },
        {
          id: `emotions-${i + 1}-ex5`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué concepto representa la siguiente seña?',
          // Enlace de imagen para "Amor" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+love+image`,
          options: ["Amor", "Cariño", "Amistad", "Respeto"],
          correctAnswer: "Amor",
          xpReward: 10,
        },
      ],
    })),
  },
  {
    id: "places",
    title: "Lugares",
    description: "Señas para lugares comunes",
    icon: "🏠",
    order: 8,
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `places-${i + 1}`,
      topicId: "places",
      lessonNumber: i + 1,
      title: `Lección ${i + 1}: Lugares`,
      description: "Aprende señas de lugares",
      totalXp: 50,
      exercises: [
        {
          id: `places-${i + 1}-ex1`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué lugar representa la siguiente seña?',
          // Enlace de imagen para "Casa" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+house+image`,
          options: ["Casa", "Escuela", "Trabajo", "Hospital"],
          correctAnswer: "Casa",
          xpReward: 10,
        },
        {
          id: `places-${i + 1}-ex2`,
          type: "video-match" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué lugar representa la siguiente seña?',
          // Enlace de imagen para "Escuela" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+school+image`,
          options: ["Escuela", "Universidad", "Biblioteca", "Museo"],
          correctAnswer: "Escuela",
          xpReward: 10,
        },
        {
          id: `places-${i + 1}-ex3`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué lugar representa la siguiente seña?',
          // Enlace de imagen para "Hospital" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+hospital+image`,
          options: ["Hospital", "Clínica", "Farmacia", "Doctor"],
          correctAnswer: "Hospital",
          xpReward: 10,
        },
        {
          id: `places-${i + 1}-ex4`,
          type: "video-match" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué lugar representa la siguiente seña?',
          // Enlace de imagen para "Tienda" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+store+image`,
          options: ["Tienda", "Mercado", "Centro comercial", "Supermercado"],
          correctAnswer: "Tienda",
          xpReward: 10,
        },
        {
          id: `places-${i + 1}-ex5`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué lugar representa la siguiente seña?',
          // Enlace de imagen para "Parque" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+park+image`,
          options: ["Parque", "Jardín", "Plaza", "Bosque"],
          correctAnswer: "Parque",
          xpReward: 10,
        },
      ],
    })),
  },
  {
    id: "time",
    title: "Tiempo",
    description: "Días, meses y horas",
    icon: "⏰",
    order: 9,
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `time-${i + 1}`,
      topicId: "time",
      lessonNumber: i + 1,
      title: `Lección ${i + 1}: Tiempo`,
      description: "Aprende señas de tiempo",
      totalXp: 50,
      exercises: [
        {
          id: `time-${i + 1}-ex1`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué día de la semana representa la siguiente seña?',
          // Enlace de imagen para "Lunes" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+monday+image`,
          options: ["Lunes", "Martes", "Miércoles", "Jueves"],
          correctAnswer: "Lunes",
          xpReward: 10,
        },
        {
          id: `time-${i + 1}-ex2`,
          type: "video-match" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué concepto de tiempo representa la siguiente seña?',
          // Enlace de imagen para "Hoy" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+today+image`,
          options: ["Hoy", "Ayer", "Mañana", "Ahora"],
          correctAnswer: "Hoy",
          xpReward: 10,
        },
        {
          id: `time-${i + 1}-ex3`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué mes representa la siguiente seña?',
          // Enlace de imagen para "Enero" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+january+image`,
          options: ["Enero", "Febrero", "Marzo", "Abril"],
          correctAnswer: "Enero",
          xpReward: 10,
        },
        {
          id: `time-${i + 1}-ex4`,
          type: "video-match" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué momento del día representa la siguiente seña?',
          // Enlace de imagen para "Mañana" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+morning+image`,
          options: ["Mañana", "Tarde", "Noche", "Mediodía"],
          correctAnswer: "Mañana",
          xpReward: 10,
        },
        {
          id: `time-${i + 1}-ex5`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué periodo de tiempo representa la siguiente seña?',
          // Enlace de imagen para "Semana" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+week+image`,
          options: ["Semana", "Mes", "Año", "Día"],
          correctAnswer: "Semana",
          xpReward: 10,
        },
      ],
    })),
  },
  {
    id: "questions",
    title: "Preguntas",
    description: "Aprende a hacer preguntas",
    icon: "❓",
    order: 10,
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `questions-${i + 1}`,
      topicId: "questions",
      lessonNumber: i + 1,
      title: `Lección ${i + 1}: Preguntas`,
      description: "Aprende a preguntar en LSM",
      totalXp: 50,
      exercises: [
        {
          id: `questions-${i + 1}-ex1`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué pregunta representa la siguiente seña?',
          // Enlace de imagen para "¿Qué?" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+what+image`,
          options: ["¿Qué?", "¿Quién?", "¿Dónde?", "¿Cuándo?"],
          correctAnswer: "¿Qué?",
          xpReward: 10,
        },
        {
          id: `questions-${i + 1}-ex2`,
          type: "video-match" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué pregunta representa la siguiente seña?',
          // Enlace de imagen para "¿Dónde?" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+where+image`,
          options: ["¿Dónde?", "¿Cuándo?", "¿Cómo?", "¿Por qué?"],
          correctAnswer: "¿Dónde?",
          xpReward: 10,
        },
        {
          id: `questions-${i + 1}-ex3`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué pregunta representa la siguiente seña?',
          // Enlace de imagen para "¿Quién?" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+who+image`,
          options: ["¿Quién?", "¿Qué?", "¿Cuál?", "¿Cuánto?"],
          correctAnswer: "¿Quién?",
          xpReward: 10,
        },
        {
          id: `questions-${i + 1}-ex4`,
          type: "video-match" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué pregunta representa la siguiente seña?',
          // Enlace de imagen para "¿Por qué?" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+why+image`,
          options: ["¿Por qué?", "¿Para qué?", "¿Cómo?", "¿Cuándo?"],
          correctAnswer: "¿Por qué?",
          xpReward: 10,
        },
        {
          id: `questions-${i + 1}-ex5`,
          type: "multiple-choice" as ExerciseType,
          // Pregunta corregida para identificar la seña
          question: '¿Qué pregunta representa la siguiente seña?',
          // Enlace de imagen para "¿Cuánto?" en LSM
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+how+much+image`,
          options: ["¿Cuánto?", "¿Cuántos?", "¿Cuál?", "¿Qué?"],
          correctAnswer: "¿Cuánto?",
          xpReward: 10,
        },
      ],
    })),
  },
]
