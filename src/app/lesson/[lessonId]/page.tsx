"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { LessonHeader } from "@/components/lesson/lesson-header"
import { ExerciseCard } from "@/components/lesson/exercise-card"
import { LessonComplete } from "@/components/lesson/lesson-complete"
import { topics } from "@/lib/data/lesson-data"
import type { Lesson } from "@/lib/data/lesson-data"
import { getProgress, updateProgressAfterLesson, saveLessonAttempt } from "@/lib/storage/local-storage"
import { useAuth } from "@/lib/auth/auth-context"

export default function LessonPage() {
  const router = useRouter()
  const params = useParams()
  const { user } = useAuth()
  const lessonId = params.lessonId as string

  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [hearts, setHearts] = useState(5)
  const [xpEarned, setXpEarned] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Find the lesson
    let foundLesson: Lesson | null = null
    for (const topic of topics) {
      const lessonInTopic = topic.lessons.find((l) => l.id === lessonId)
      if (lessonInTopic) {
        foundLesson = lessonInTopic
        break
      }
    }

    if (!foundLesson) {
      router.push("/learn")
      return
    }

    setLesson(foundLesson)

    // Load user progress
    const progress = getProgress()
    if (progress) {
      setHearts(progress.hearts)
    }
  }, [lessonId, router])

  const handleAnswer = (isCorrect: boolean, selectedAnswer: string) => {
    if (!lesson) return

    if (isCorrect) {
      const exercise = lesson.exercises[currentExerciseIndex]
      setXpEarned((prev) => prev + exercise.xpReward)
    } else {
      setHearts((prev) => Math.max(0, prev - 1))
      setMistakes((prev) => prev + 1)
    }

    // Move to next exercise after a delay
    setTimeout(() => {
      if (currentExerciseIndex < lesson.exercises.length - 1) {
        setCurrentExerciseIndex((prev) => prev + 1)
      } else {
        completeLesson()
      }
    }, 2000)
  }

  const completeLesson = () => {
    if (!lesson || !user) return

    const heartsLost = mistakes
    const updatedProgress = updateProgressAfterLesson(lesson.id, lesson.topicId, xpEarned, heartsLost)

    if (updatedProgress) {
      setHearts(updatedProgress.hearts)
    }

    // Save lesson attempt
    saveLessonAttempt({
      lessonId: lesson.id,
      userId: user.id,
      score: Math.round((xpEarned / lesson.totalXp) * 100),
      xpEarned,
      heartsLost,
      completedAt: new Date().toISOString(),
      mistakes,
    })

    setIsComplete(true)
  }

  const handleExit = () => {
    router.push("/learn")
  }

  const handleContinue = () => {
    router.push("/learn")
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando lección...</p>
      </div>
    )
  }

  if (isComplete) {
    const accuracy = Math.round(((lesson.exercises.length - mistakes) / lesson.exercises.length) * 100)
    return (
      <LessonComplete xpEarned={xpEarned} heartsRemaining={hearts} accuracy={accuracy} onContinue={handleContinue} />
    )
  }

  const currentExercise = lesson.exercises[currentExerciseIndex]

  return (
    <div className="min-h-screen flex flex-col">
      <LessonHeader
        currentExercise={currentExerciseIndex + 1}
        totalExercises={lesson.exercises.length}
        hearts={hearts}
        onExit={handleExit}
      />
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <ExerciseCard exercise={currentExercise} onAnswer={handleAnswer} />
      </div>
    </div>
  )
}
