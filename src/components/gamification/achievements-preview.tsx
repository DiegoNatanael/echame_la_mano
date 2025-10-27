"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Achievement {
  id: string
  title: string
  description: string
  unlocked: boolean
  icon: string
}

interface AchievementsPreviewProps {
  totalXp: number
  completedLessons: number
  currentStreak: number
}

export function AchievementsPreview({ totalXp, completedLessons, currentStreak }: AchievementsPreviewProps) {
  const achievements: Achievement[] = [
    {
      id: "first-lesson",
      title: "Primer Paso",
      description: "Completa tu primera lección",
      unlocked: completedLessons >= 1,
      icon: "🎯",
    },
    {
      id: "ten-lessons",
      title: "Dedicado",
      description: "Completa 10 lecciones",
      unlocked: completedLessons >= 10,
      icon: "📚",
    },
    {
      id: "week-streak",
      title: "Constante",
      description: "Mantén una racha de 7 días",
      unlocked: currentStreak >= 7,
      icon: "🔥",
    },
    {
      id: "xp-master",
      title: "Maestro XP",
      description: "Alcanza 1000 XP",
      unlocked: totalXp >= 1000,
      icon: "⭐",
    },
  ]

  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Logros
          </span>
          <Badge variant="secondary">
            {unlockedCount}/{achievements.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border ${
                achievement.unlocked ? "bg-yellow-50 border-yellow-200" : "bg-muted/50"
              }`}
            >
              <div className="text-3xl relative">
                {achievement.icon}
                {!achievement.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
              <p className="text-xs font-medium text-center">{achievement.title}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
