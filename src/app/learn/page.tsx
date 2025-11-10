"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-context"
import { getProgress, initializeProgress } from "@/lib/storage/local-storage"
import type { UserProgress } from "@/lib/types/user"
import { topics } from "@/lib/data/lesson-data"
// import { generalIntroductionLessons } from "@/lib/data/introduction-data"
import { AppHeader } from "@/components/layout/app-header"
import { TopicCard } from "@/components/learn/topic-card"
import { QuickStatsBar } from "@/components/learn/quick-stats-bar"

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
        // If there's no stored progress (fresh install), initialize progress
        const initialProgress = initializeProgress(user.id)
        setProgress(initialProgress)
        return
      }

      setProgress(userProgress)
    }
  }, [user, isLoading, router])

  const handleSelectLesson = (lessonId: string) => {
    if (lessonId.startsWith('intro-')) {
      // Handle topic-specific introductions
      router.push(`/introduction/${lessonId}`)
    } else {
      // Handle main lessons
      router.push(`/lesson/${lessonId}`)
    }
  }

  const handleSelectIntroduction = (lessonId: string) => {
    router.push(`/introduction/${lessonId}`)
  }

  if (isLoading || !user || !progress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <AppHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-balance">Aprende Lengua de Señas MX</h1>
            <p className="text-muted-foreground">Selecciona un tema para comenzar tu lección</p>
          </div>

          <QuickStatsBar hearts={progress.hearts} xp={progress.totalXp} streak={progress.currentStreak} />

          <div className="space-y-4">
            {topics.map((topic) => {
              const topicProgress = progress.topicProgress[topic.id]
              return (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  isUnlocked={topicProgress?.isUnlocked || false}
                  completedLessons={topicProgress?.completedLessons || 0}
                  totalLessons={topicProgress?.totalLessons || 1}
                  onSelectLesson={handleSelectLesson}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
