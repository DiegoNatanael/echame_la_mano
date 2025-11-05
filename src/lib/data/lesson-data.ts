// Lesson content structure for LSM learning app
export type ExerciseType = "multiple-choice" | "video-match" | "sign-recognition"

export interface Exercise {
  id: string
  type: ExerciseType
  question: string
  videoUrl?: string
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
          // PREGUNTA CORREGIDA
          question: '¿Qué palabra representa la siguiente seña?',
          // Seña LSM "Hola" (YouTube)
          videoUrl: `https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHb614k6L-CH76jzrsO-__h9SYJbqTZCdwcEdpJB-kOYZHPXRNWUXpzQ_oHAY459SYSv7JjBtpH8p9na73j23UnVzsLSVOraY2ZxMaiMqA3p5bd7Ub7eU8ajhp74c7meCf_YisVtB0=`,
          options: ["Hola", "Adiós", "Gracias", "Por favor"],
          correctAnswer: "Hola",
          xpReward: 10,
        },
        {
          id: `greetings-${i + 1}-ex2`,
          type: "video-match" as ExerciseType,
          question: 'Selecciona la seña correcta para "Buenos días"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+good+morning`,
          options: ["Buenos días", "Buenas tardes", "Buenas noches", "Hasta luego"],
          correctAnswer: "Buenos días",
          xpReward: 10,
        },
        {
          id: `greetings-${i + 1}-ex3`,
          type: "multiple-choice" as ExerciseType,
          question: '¿Cómo se dice "Adiós" en LSM?',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+goodbye`,
          options: ["Adiós", "Hola", "Hasta pronto", "Nos vemos"],
          correctAnswer: "Adiós",
          xpReward: 10,
        },
        {
          id: `greetings-${i + 1}-ex4`,
          type: "video-match" as ExerciseType,
          question: 'Identifica la seña para "¿Cómo estás?"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+how+are+you`,
          options: ["¿Cómo estás?", "¿Qué tal?", "Bien", "Mal"],
          correctAnswer: "¿Cómo estás?",
          xpReward: 10,
        },
        {
          id: `greetings-${i + 1}-ex5`,
          type: "multiple-choice" as ExerciseType,
          question: 'Selecciona "Gracias"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+thank+you`,
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
          // PREGUNTA CORREGIDA
          question: '¿Qué palabra representa la siguiente seña?',
          // Seña LSM "Mamá" (YouTube)
          videoUrl: `https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF_5af-4JIFjZnNXlaGWly96jCDC8Wo7HZn68NMysRn6JmHlE2BDEoVuYwjzmg6GhaIWs5i2dkmfRfIOsRx76P6hMenOiSl94MxeYZKrbH80JXW4vbnvo7Bx7fTxIj_hGjhf6zdpSY=`,
          options: ["Mamá", "Papá", "Hermano", "Hermana"],
          correctAnswer: "Mamá",
          xpReward: 10,
        },
        {
          id: `family-${i + 1}-ex2`,
          type: "video-match" as ExerciseType,
          question: 'Selecciona "Papá"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+father`,
          options: ["Papá", "Mamá", "Abuelo", "Tío"],
          correctAnswer: "Papá",
          xpReward: 10,
        },
        {
          id: `family-${i + 1}-ex3`,
          type: "multiple-choice" as ExerciseType,
          question: 'Identifica "Hermano"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+brother`,
          options: ["Hermano", "Hermana", "Primo", "Sobrino"],
          correctAnswer: "Hermano",
          xpReward: 10,
        },
        {
          id: `family-${i + 1}-ex4`,
          type: "video-match" as ExerciseType,
          question: '¿Cómo se dice "Abuela"?',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+grandmother`,
          options: ["Abuela", "Abuelo", "Mamá", "Tía"],
          correctAnswer: "Abuela",
          xpReward: 10,
        },
        {
          id: `family-${i + 1}-ex5`,
          type: "multiple-choice" as ExerciseType,
          question: 'Selecciona "Hijo"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+son`,
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
          // PREGUNTA CORREGIDA
          question: '¿Qué número representa la siguiente seña?',
          // Seña LSM "1" (Scribd - Láminas Números)
          videoUrl: `https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGhFTOEbmYfonwyaeOMJGONlGB66V-riulyqWBP6pO-AKbvCn_EVIEo-MV2mYow6a_G4jUIytQaslVMivJxHAGaGPo9LjvXbThqtDw2tfwtlFmmd56Eo20_B8Ou-cM5Ud5kc2GafBNchliOLWk6DdpeWtnT9KJXxX0rI6zBAXMQjS9AS3b2W6A=`,
          options: ["1", "2", "3", "4"],
          correctAnswer: "1",
          xpReward: 10,
        },
        {
          id: `numbers-${i + 1}-ex2`,
          type: "video-match" as ExerciseType,
          question: "Selecciona el número 5",
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+number+5`,
          options: ["5", "6", "7", "8"],
          correctAnswer: "5",
          xpReward: 10,
        },
        {
          id: `numbers-${i + 1}-ex3`,
          type: "multiple-choice" as ExerciseType,
          question: "Identifica el número 10",
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+number+10`,
          options: ["10", "20", "30", "40"],
          correctAnswer: "10",
          xpReward: 10,
        },
        {
          id: `numbers-${i + 1}-ex4`,
          type: "video-match" as ExerciseType,
          question: "¿Qué número es?",
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+number+15`,
          options: ["15", "25", "35", "45"],
          correctAnswer: "15",
          xpReward: 10,
        },
        {
          id: `numbers-${i + 1}-ex5`,
          type: "multiple-choice" as ExerciseType,
          question: "Selecciona 100",
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+number+100`,
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
          // PREGUNTA CORREGIDA
          question: '¿Qué color representa la siguiente seña?',
          // Seña LSM "Rojo" (YouTube)
          videoUrl: `https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEp9NXsKTmpuTRnbPBNAh8aGqygGAX4Fxv8717BNvSaL8vF3Ed5vsr0a7pP3VkTBpuSFkME4Ckgl48ag5ePfVWb862ajIRfU7FLhynGiX0FSfQ6qvYKUVVfx0pZhGA3EEqNUooXnA==`,
          options: ["Rojo", "Azul", "Verde", "Amarillo"],
          correctAnswer: "Rojo",
          xpReward: 10,
        },
        {
          id: `colors-${i + 1}-ex2`,
          type: "video-match" as ExerciseType,
          question: 'Selecciona "Azul"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+blue+color`,
          options: ["Azul", "Verde", "Morado", "Rosa"],
          correctAnswer: "Azul",
          xpReward: 10,
        },
        {
          id: `colors-${i + 1}-ex3`,
          type: "multiple-choice" as ExerciseType,
          question: 'Identifica "Verde"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+green+color`,
          options: ["Verde", "Amarillo", "Naranja", "Café"],
          correctAnswer: "Verde",
          xpReward: 10,
        },
        {
          id: `colors-${i + 1}-ex4`,
          type: "video-match" as ExerciseType,
          question: "¿Qué color es?",
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+yellow+color`,
          options: ["Amarillo", "Blanco", "Negro", "Gris"],
          correctAnswer: "Amarillo",
          xpReward: 10,
        },
        {
          id: `colors-${i + 1}-ex5`,
          type: "multiple-choice" as ExerciseType,
          question: 'Selecciona "Negro"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+black+color`,
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
          // PREGUNTA CORREGIDA
          question: '¿Qué alimento representa la siguiente seña?',
          // Seña LSM "Agua" (YouTube)
          videoUrl: `https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHmBVtSvQgnBTlfTUWBL-qqjDUPnzbheBovYZ-KzvovvuEBCuY7psyIn_ohYzLi6rJhz3wRm-zaxv7Z7U7DkW-qxJ4xZZEvMrmI7xYHQ4XkVW5eqPiVmjmwO98l-caMXMX5BaeeWg==`,
          options: ["Agua", "Leche", "Jugo", "Refresco"],
          correctAnswer: "Agua",
          xpReward: 10,
        },
        {
          id: `food-${i + 1}-ex2`,
          type: "video-match" as ExerciseType,
          question: 'Selecciona "Pan"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+bread`,
          options: ["Pan", "Tortilla", "Arroz", "Pasta"],
          correctAnswer: "Pan",
          xpReward: 10,
        },
        {
          id: `food-${i + 1}-ex3`,
          type: "multiple-choice" as ExerciseType,
          question: 'Identifica "Manzana"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+apple`,
          options: ["Manzana", "Naranja", "Plátano", "Uva"],
          correctAnswer: "Manzana",
          xpReward: 10,
        },
        {
          id: `food-${i + 1}-ex4`,
          type: "video-match" as ExerciseType,
          question: "¿Qué es esto?",
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+chicken`,
          options: ["Pollo", "Carne", "Pescado", "Huevo"],
          correctAnswer: "Pollo",
          xpReward: 10,
        },
        {
          id: `food-${i + 1}-ex5`,
          type: "multiple-choice" as ExerciseType,
          question: 'Selecciona "Café"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+coffee`,
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
          // PREGUNTA CORREGIDA
          question: '¿Qué animal representa la siguiente seña?',
          // Seña LSM "Perro" (YouTube)
          videoUrl: `https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHWSrgGWpuJOZbjmPqMYLhmOP-69YTyCfxFaDYLDdYeCm0zCsduvZuiDgTnHl-CeM6QxTVHUl7TIKJAFwxdlH1ZzOHn0w1FhYWSy6vLDj0Eu9eR7W9gH1FydFq_08Gbch35JpWcrA=`,
          options: ["Perro", "Gato", "Pájaro", "Pez"],
          correctAnswer: "Perro",
          xpReward: 10,
        },
        {
          id: `animals-${i + 1}-ex2`,
          type: "video-match" as ExerciseType,
          question: 'Selecciona "Gato"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+cat`,
          options: ["Gato", "Perro", "Conejo", "Ratón"],
          correctAnswer: "Gato",
          xpReward: 10,
        },
        {
          id: `animals-${i + 1}-ex3`,
          type: "multiple-choice" as ExerciseType,
          question: 'Identifica "Caballo"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+horse`,
          options: ["Caballo", "Vaca", "Cerdo", "Oveja"],
          correctAnswer: "Caballo",
          xpReward: 10,
        },
        {
          id: `animals-${i + 1}-ex4`,
          type: "video-match" as ExerciseType,
          question: "¿Qué animal es?",
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+bird`,
          options: ["Pájaro", "Mariposa", "Abeja", "Mosca"],
          correctAnswer: "Pájaro",
          xpReward: 10,
        },
        {
          id: `animals-${i + 1}-ex5`,
          type: "multiple-choice" as ExerciseType,
          question: 'Selecciona "Elefante"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+elephant`,
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
          // PREGUNTA CORREGIDA
          question: '¿Qué emoción representa la siguiente seña?',
          // Seña LSM "Feliz" (YouTube)
          videoUrl: `https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFHb7mRk56PsrUmt5_jpmFtItdP4uU46Vc8eb255tBUGHFL7AnxLZDxC0ggLxKVKy49qMXM4wttjuNfxVU8TOaNENLc_syn9-HBtz2awI4RUs6kWEUritbAqBHmpJBSxEPoidOhc8E=`,
          options: ["Feliz", "Triste", "Enojado", "Asustado"],
          correctAnswer: "Feliz",
          xpReward: 10,
        },
        {
          id: `emotions-${i + 1}-ex2`,
          type: "video-match" as ExerciseType,
          question: 'Selecciona "Triste"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+sad`,
          options: ["Triste", "Feliz", "Cansado", "Aburrido"],
          correctAnswer: "Triste",
          xpReward: 10,
        },
        {
          id: `emotions-${i + 1}-ex3`,
          type: "multiple-choice" as ExerciseType,
          question: 'Identifica "Enojado"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+angry`,
          options: ["Enojado", "Frustrado", "Molesto", "Irritado"],
          correctAnswer: "Enojado",
          xpReward: 10,
        },
        {
          id: `emotions-${i + 1}-ex4`,
          type: "video-match" as ExerciseType,
          question: "¿Qué emoción es?",
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+surprised`,
          options: ["Sorprendido", "Confundido", "Preocupado", "Nervioso"],
          correctAnswer: "Sorprendido",
          xpReward: 10,
        },
        {
          id: `emotions-${i + 1}-ex5`,
          type: "multiple-choice" as ExerciseType,
          question: 'Selecciona "Amor"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+love`,
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
          // PREGUNTA CORREGIDA
          question: '¿Qué lugar representa la siguiente seña?',
          // Seña LSM "Casa" (Wikisigns)
          videoUrl: `https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHD8xGx8SEuy24YGy8xjEDJ7HMHnNXfKYexP_k_tr95VEpKAS-ROCgoiC67HHVLlpQM3ROvmNJSv285tnUJPefrc_6BGhQoHGib8-0s2icdTKz5ZAqr6TGmyaz0r14-BnM=`,
          options: ["Casa", "Escuela", "Trabajo", "Hospital"],
          correctAnswer: "Casa",
          xpReward: 10,
        },
        {
          id: `places-${i + 1}-ex2`,
          type: "video-match" as ExerciseType,
          question: 'Selecciona "Escuela"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+school`,
          options: ["Escuela", "Universidad", "Biblioteca", "Museo"],
          correctAnswer: "Escuela",
          xpReward: 10,
        },
        {
          id: `places-${i + 1}-ex3`,
          type: "multiple-choice" as ExerciseType,
          question: 'Identifica "Hospital"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+hospital`,
          options: ["Hospital", "Clínica", "Farmacia", "Doctor"],
          correctAnswer: "Hospital",
          xpReward: 10,
        },
        {
          id: `places-${i + 1}-ex4`,
          type: "video-match" as ExerciseType,
          question: "¿Qué lugar es?",
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+store`,
          options: ["Tienda", "Mercado", "Centro comercial", "Supermercado"],
          correctAnswer: "Tienda",
          xpReward: 10,
        },
        {
          id: `places-${i + 1}-ex5`,
          type: "multiple-choice" as ExerciseType,
          question: 'Selecciona "Parque"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+park`,
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
          // PREGUNTA CORREGIDA
          question: '¿Qué día representa la siguiente seña?',
          // Seña LSM "Lunes" (YouTube)
          videoUrl: `https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG7H0-_V-D4Xgp9ZkmihrBkQN5sW9qZLi1N9hhWzuhRpghbYxKMGaSzaCDhWcNbBMhqRYFVl6EODDRilVOLWDY9NJDFDZbCeKmgg-CZcEvK-oixEnlExDNI4RgqUryg0kgewaswpt8=`,
          options: ["Lunes", "Martes", "Miércoles", "Jueves"],
          correctAnswer: "Lunes",
          xpReward: 10,
        },
        {
          id: `time-${i + 1}-ex2`,
          type: "video-match" as ExerciseType,
          question: 'Selecciona "Hoy"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+today`,
          options: ["Hoy", "Ayer", "Mañana", "Ahora"],
          correctAnswer: "Hoy",
          xpReward: 10,
        },
        {
          id: `time-${i + 1}-ex3`,
          type: "multiple-choice" as ExerciseType,
          question: 'Identifica "Enero"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+january`,
          options: ["Enero", "Febrero", "Marzo", "Abril"],
          correctAnswer: "Enero",
          xpReward: 10,
        },
        {
          id: `time-${i + 1}-ex4`,
          type: "video-match" as ExerciseType,
          question: "¿Qué hora es?",
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+morning`,
          options: ["Mañana", "Tarde", "Noche", "Mediodía"],
          correctAnswer: "Mañana",
          xpReward: 10,
        },
        {
          id: `time-${i + 1}-ex5`,
          type: "multiple-choice" as ExerciseType,
          question: 'Selecciona "Semana"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+week`,
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
          // PREGUNTA CORREGIDA
          question: '¿Qué pregunta representa la siguiente seña?',
          // Seña LSM "¿Qué?" (YouTube)
          videoUrl: `https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFQ6rjl3RKzz8uVGCgFhSl6gUVxamyalY2U14paehYx1PNODCnuOUi1F0rgxHX1Qb12IJ5fbLL7norRZlKB-dzmK_pTh6gG3YxAm1WWxJREb_WoQItYZTj9qPN54nU0NXNlzefRLI8=`,
          options: ["¿Qué?", "¿Quién?", "¿Dónde?", "¿Cuándo?"],
          correctAnswer: "¿Qué?",
          xpReward: 10,
        },
        {
          id: `questions-${i + 1}-ex2`,
          type: "video-match" as ExerciseType,
          question: 'Selecciona "¿Dónde?"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+where`,
          options: ["¿Dónde?", "¿Cuándo?", "¿Cómo?", "¿Por qué?"],
          correctAnswer: "¿Dónde?",
          xpReward: 10,
        },
        {
          id: `questions-${i + 1}-ex3`,
          type: "multiple-choice" as ExerciseType,
          question: 'Identifica "¿Quién?"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+who`,
          options: ["¿Quién?", "¿Qué?", "¿Cuál?", "¿Cuánto?"],
          correctAnswer: "¿Quién?",
          xpReward: 10,
        },
        {
          id: `questions-${i + 1}-ex4`,
          type: "video-match" as ExerciseType,
          question: "¿Qué pregunta es?",
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+why`,
          options: ["¿Por qué?", "¿Para qué?", "¿Cómo?", "¿Cuándo?"],
          correctAnswer: "¿Por qué?",
          xpReward: 10,
        },
        {
          id: `questions-${i + 1}-ex5`,
          type: "multiple-choice" as ExerciseType,
          question: 'Selecciona "¿Cuánto?"',
          videoUrl: `/placeholder.svg?height=300&width=400&query=LSM+sign+for+how+much`,
          options: ["¿Cuánto?", "¿Cuántos?", "¿Cuál?", "¿Qué?"],
          correctAnswer: "¿Cuánto?",
          xpReward: 10,
        },
      ],
    })),
  },
]
