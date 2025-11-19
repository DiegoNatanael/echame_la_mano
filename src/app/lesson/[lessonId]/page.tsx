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
      
      // If user has 0 hearts, redirect to learn page
      if (progress.hearts === 0) {
        router.push('/learn');
        return;
      }
    }
  }, [lessonId, router])

  const handleAnswer = (isCorrect: boolean, selectedAnswer: string) => {
    if (!lesson) return

    let newHearts = hearts;
    if (isCorrect) {
      const exercise = lesson.exercises[currentExerciseIndex]
      setXpEarned((prev) => prev + exercise.xpReward)
    } else {
      newHearts = Math.max(0, hearts - 1);
      setHearts(newHearts);
      setMistakes((prev) => prev + 1)
    }

    // Check if hearts reached 0
    if (newHearts === 0) {
      const heartsLost = 1; 
      const updatedProgress = updateProgressAfterLesson(lesson.id, lesson.topicId, xpEarned, heartsLost);
      
      if (updatedProgress && updatedProgress.hearts === 5) {
        router.push('/learn');
        return;
      }
    }

    // Move to next exercise after a delay
    setTimeout(() => {
      if (currentExerciseIndex < lesson.exercises.length - 1) {
        setCurrentExerciseIndex((prev) => prev + 1)
      } else {
        completeLesson()
      }
    }, 1500) 
  }

  const completeLesson = () => {
    if (!lesson || !user) return

    setTimeout(() => {
      const heartsLost = mistakes
      const updatedProgress = updateProgressAfterLesson(lesson.id, lesson.topicId, xpEarned, heartsLost)

      if (updatedProgress) {
        setHearts(updatedProgress.hearts)
        if (updatedProgress.hearts === 5 && updatedProgress.completedLessons.length === 0) {
          router.push('/learn');
          return;
        }
      }

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
    }, 1500) 
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
    // FIX 1: Use h-screen and overflow-hidden to prevent body scroll
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      
      {/* Header stays fixed at top */}
      <div className="flex-none">
        <LessonHeader
          currentExercise={currentExerciseIndex + 1}
          totalExercises={lesson.exercises.length}
          hearts={hearts}
          onExit={handleExit}
        />
      </div>

      {/* FIX 2: Main content area that grows to fill space but doesn't overflow */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative w-full">
        
        {/* FIX 3: Constrain width so it doesn't look huge on desktop */}
        <div className="w-full max-w-xl h-full flex flex-col justify-center">
           <ExerciseCard exercise={currentExercise} onAnswer={handleAnswer} />
        </div>

      </div>
    </div>
  )
}