"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-context"
import { getProgress, initializeProgress } from "@/lib/storage/local-storage"
import type { UserProgress } from "@/lib/types/user"
import { topics } from "@/lib/data/lesson-data"
import { AppHeader } from "@/components/layout/app-header"
import { TopicCardHorizontal } from "@/components/learn/topic-card-horizontal"
import { HorizontalScrollCarousel } from "@/components/learn/horizontal-scroll-carousel" 

export default function LearnPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [progress, setProgress] = useState<UserProgress | null>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth")
      return
    }

    if (user) {
      const userProgress = getProgress()
      if (!userProgress) {
        const initialProgress = initializeProgress(user.id)
        setProgress(initialProgress)
        return
      }
      setProgress(userProgress)
    }
  }, [user, isLoading, router])

  const handleSelectLesson = (lessonId: string) => {
    if (lessonId.startsWith('intro-')) {
      router.push(`/introduction/${lessonId}`)
    } else {
      router.push(`/lesson/${lessonId}`)
    }
  }

  if (isLoading || !user || !progress) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground animate-pulse">Cargando...</p>
      </div>
    )
  }

  return (
    // Changed from blue gradient to your theme background
    <div className="min-h-screen bg-background text-foreground">
      
      <AppHeader
        hearts={progress.hearts}
        maxHearts={10}
        streak={progress.currentStreak}
        xp={progress.totalXp}
      />

      {/* The Scroll Carousel handles its own layout/pinning.
         We pass the title and subtitle here so they stick while scrolling.
      */}
      <HorizontalScrollCarousel 
        title="Aprende Lengua de Señas MX"
        subtitle="Desliza hacia abajo para explorar los temas"
      >
        {topics.map((topic) => {
          const topicProgress = progress.topicProgress[topic.id]
          
          return (
            // We wrap the card in a div that ensures full height within the carousel slide
            <div key={topic.id} className="h-full w-full">
               <TopicCardHorizontal
                topic={topic}
                isUnlocked={topicProgress?.isUnlocked || false}
                completedLessons={topicProgress?.completedLessons || 0}
                totalLessons={topicProgress?.totalLessons || 1}
                onSelectLesson={handleSelectLesson}
              />
            </div>
          )
        })}
      </HorizontalScrollCarousel>
      
      {/* Optional: Add a footer or extra space below so scrolling feels natural at the end */}
      <div className="h-20 flex items-center justify-center text-muted-foreground/50 text-sm">
        Sigue aprendiendo para desbloquear más temas
      </div>
    </div>
  )
}