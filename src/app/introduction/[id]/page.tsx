"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { generalIntroductionLessons, topicIntroductionLessons } from "@/lib/data/introduction-data"
import { useAuth } from "@/lib/auth/auth-context"
import { getProgress, saveProgress } from "@/lib/storage/local-storage"
import type { UserProgress } from "@/lib/types/user"
import { Play, Pause, RotateCcw, CheckCircle2 } from "lucide-react"

export default function IntroductionLessonPage() {
  const router = useRouter()
  const params = useParams()
  const { user } = useAuth()
  const lessonId = params.id as string

  const [lesson, setLesson] = useState<any>(null)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setLocalProgress] = useState<UserProgress | null>(null)

  useEffect(() => {
    if (!user) {
      router.push("/auth")
      return
    }

    // Find the lesson - check both general and topic-specific introductions
    let foundLesson = generalIntroductionLessons.find((l) => l.id === lessonId);
    
    // If not found in general introductions, check topic-specific
    if (!foundLesson && lessonId in topicIntroductionLessons) {
      foundLesson = topicIntroductionLessons[lessonId];
    }

    if (!foundLesson) {
      router.push("/introduction")
      return
    }

    setLesson(foundLesson)

    // Load user progress
    const userProgress = getProgress()
    setLocalProgress(userProgress)
  }, [lessonId, user, router])

  const handleNext = () => {
    if (lesson && currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
    } else {
      // Lesson completed - redirect appropriately
      if (lessonId.startsWith('intro-')) {
        // Topic-specific introduction - go back to learn page
        router.push("/learn")
      } else {
        // General introduction - go back to introduction list
        router.push("/introduction")
      }
    }
  }

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1)
    }
  }

  const handleComplete = () => {
    // Mark lesson as completed in progress
    if (progress && user) {
      const updatedProgress = { ...progress };
      // Add introduction lesson completion tracking
      if (!updatedProgress.completedLessons.includes(lessonId.startsWith('intro-') ? lessonId : `intro-${lessonId}`)) {
        updatedProgress.completedLessons.push(lessonId.startsWith('intro-') ? lessonId : `intro-${lessonId}`);
      }
      
      saveProgress(updatedProgress);
      setLocalProgress(updatedProgress);
    }
    
    // Navigate appropriately based on introduction type
    if (lessonId.startsWith('intro-')) {
      router.push("/learn");
    } else {
      router.push("/introduction");
    }
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando lección de introducción...</p>
      </div>
    )
  }

  const currentExercise = lesson.exercises[currentExerciseIndex]
  const isLastExercise = currentExerciseIndex === lesson.exercises.length - 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={() => router.push("/learn")}>← Volver</Button>
            <div>
              <h1 className="text-2xl font-bold">{lesson.title}</h1>
              <p className="text-muted-foreground">{lesson.description}</p>
            </div>
          </div>

          <Card className="p-6 mb-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{currentExercise.title}</h2>
              <span className="text-sm text-muted-foreground">
                {currentExerciseIndex + 1} de {lesson.exercises.length}
              </span>
            </div>

            <div className="space-y-4">
              {currentExercise.description && (
                <p className="text-muted-foreground">{currentExercise.description}</p>
              )}

              {/* Render different exercise types */}
              {currentExercise.type === "video" && (
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  {currentExercise.content.includes('youtube.com') || currentExercise.content.includes('youtu.be') ? (
                    <iframe
                      src={currentExercise.content}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={currentExercise.title}
                    />
                  ) : (
                    <video 
                      src={currentExercise.content}
                      controls
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              )}

              {currentExercise.type === "text" && (
                <div className="prose max-w-none p-4 bg-muted rounded-lg">
                  <p>{currentExercise.content}</p>
                </div>
              )}

              {currentExercise.type === "interactive" && (
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p>{currentExercise.content}</p>
                  <div className="mt-4 space-y-2">
                    <Button onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                      {isPlaying ? "Pausar" : "Iniciar"}
                    </Button>
                  </div>
                </div>
              )}

              {currentExercise.type === "quiz" && (
                <div className="p-4 bg-muted rounded-lg">
                  <p>{currentExercise.content}</p>
                  <div className="mt-4 space-y-2">
                    <Button className="w-full">Opción A</Button>
                    <Button className="w-full">Opción B</Button>
                    <Button className="w-full">Opción C</Button>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentExerciseIndex === 0}
            >
              ← Anterior
            </Button>
            
            {isLastExercise ? (
              <Button onClick={handleComplete}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Completar Introducción
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Siguiente →
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
