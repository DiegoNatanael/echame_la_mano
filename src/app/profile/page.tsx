"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-context"
import { getProgress } from "@/lib/storage/local-storage"
import type { UserProgress } from "@/lib/types/user"
import { AppHeader } from "@/components/layout/app-header"
import { StatsCard } from "@/components/gamification/stats-card"
import { StreakDisplay } from "@/components/gamification/streak-display"
import { XpProgress } from "@/components/gamification/xp-progress"
import { HeartsDisplay } from "@/components/gamification/hearts-display"
import { AchievementsPreview } from "@/components/gamification/achievements-preview"
import { Star, BookOpen, Trophy, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ProfilePage() {
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
      setProgress(userProgress)
    }
  }, [user, isLoading, router])

  if (isLoading || !user || !progress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando perfil...</p>
      </div>
    )
  }

  const totalLessons = Object.values(progress.topicProgress).reduce((sum, topic) => sum + topic.totalLessons, 0)
  const completedLessons = progress.completedLessons.length
  const overallProgress = (completedLessons / totalLessons) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <AppHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* User Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl">{user.name}</CardTitle>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Miembro desde</p>
                  <p className="font-medium">{new Date(user.createdAt).toLocaleDateString("es-MX")}</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard icon={Star} label="XP Total" value={progress.totalXp} iconColor="text-yellow-500" />
            <StatsCard
              icon={BookOpen}
              label="Lecciones Completadas"
              value={completedLessons}
              iconColor="text-blue-500"
            />
            <StatsCard
              icon={Trophy}
              label="Racha Actual"
              value={`${progress.currentStreak} días`}
              iconColor="text-orange-500"
            />
            <StatsCard
              icon={TrendingUp}
              label="Progreso General"
              value={`${Math.round(overallProgress)}%`}
              iconColor="text-green-500"
            />
          </div>

          {/* XP and Hearts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <XpProgress currentXp={progress.totalXp} />
            <HeartsDisplay hearts={progress.hearts} />
          </div>

          {/* Streak */}
          <StreakDisplay currentStreak={progress.currentStreak} longestStreak={progress.longestStreak} />

          {/* Topic Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Progreso por Tema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(progress.topicProgress).map(([topicId, topicProgress]) => {
                const percentage = (topicProgress.completedLessons / topicProgress.totalLessons) * 100
                const topicNames: Record<string, string> = {
                  greetings: "Saludos",
                  family: "Familia",
                  numbers: "Números",
                  colors: "Colores",
                  food: "Comida",
                  animals: "Animales",
                  emotions: "Emociones",
                  places: "Lugares",
                  time: "Tiempo",
                  questions: "Preguntas",
                }

                return (
                  <div key={topicId} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{topicNames[topicId] || topicId}</p>
                      <p className="text-sm text-muted-foreground">
                        {topicProgress.completedLessons}/{topicProgress.totalLessons} lecciones
                      </p>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Achievements */}
          <AchievementsPreview
            totalXp={progress.totalXp}
            completedLessons={completedLessons}
            currentStreak={progress.currentStreak}
          />
        </div>
      </div>
    </div>
  )
}
