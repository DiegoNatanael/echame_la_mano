"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth/auth-context"
import { getProgress, initializeProgress } from "@/lib/storage/local-storage"
import type { UserProgress } from "@/lib/types/user"
import { topics } from "@/lib/data/lesson-data"
import { AppHeader } from "@/components/layout/app-header"
import { TopicCard } from "@/components/learn/topic-card"
import { QuickStatsBar } from "@/components/learn/quick-stats-bar"

export default function LearnPage() {
  // const { user, isLoading } = useAuth()
  const router = useRouter()
  const [progress, setProgress] = useState<UserProgress | null>(null)

  useEffect(() => {
    // if (!isLoading && !user) {
    //   router.push("/auth")
    //   return
    // }

    // if (user) {
    const userProgress = getProgress()
    if (!userProgress) {
      // If there's no stored progress (fresh install / guest), initialize a default progress
      const guestProgress = initializeProgress("guest")
      setProgress(guestProgress)
      return
    }

    setProgress(userProgress)
    // }
  }, [router])

  const handleSelectLesson = (lessonId: string) => {
    router.push(`/lesson/${lessonId}`)
  }

  // if (isLoading || !user || !progress) {
  if (!progress) {
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
                  totalLessons={topicProgress?.totalLessons || 10}
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
