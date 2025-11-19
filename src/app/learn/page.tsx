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
      // FIX: Changed bg-background to bg-transparent
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <p className="text-muted-foreground animate-pulse">Cargando...</p>
      </div>
    )
  }

  return (
    // FIX: Changed 'bg-background' to 'bg-transparent' 
    // This allows the BubblesBackground from layout.tsx to be visible!
    <div className="min-h-screen bg-transparent text-foreground">
      
      <AppHeader
        hearts={progress.hearts}
        maxHearts={10}
        streak={progress.currentStreak}
        xp={progress.totalXp}
      />

      <HorizontalScrollCarousel 
        title="Aprende Lengua de Señas MX"
        subtitle="Desliza hacia abajo para explorar los temas"
      >
        {topics.map((topic) => {
          const topicProgress = progress.topicProgress[topic.id]
          
          return (
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
      
      {/* Added a backdrop-blur to the footer so it's readable over bubbles */}
      <div className="h-20 flex items-center justify-center text-slate-600 text-sm font-medium backdrop-blur-sm">
        Sigue aprendiendo para desbloquear más temas
      </div>
    </div>
  )
}