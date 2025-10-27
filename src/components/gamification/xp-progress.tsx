"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star } from "lucide-react"

interface XpProgressProps {
  currentXp: number
  level?: number
}

export function XpProgress({ currentXp, level = 1 }: XpProgressProps) {
  // Calculate level based on XP (every 500 XP = 1 level)
  const calculatedLevel = Math.floor(currentXp / 500) + 1
  const xpForCurrentLevel = (calculatedLevel - 1) * 500
  const xpForNextLevel = calculatedLevel * 500
  const xpProgress = currentXp - xpForCurrentLevel
  const xpNeeded = xpForNextLevel - xpForCurrentLevel
  const progressPercentage = (xpProgress / xpNeeded) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
          Experiencia
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">{currentXp} XP</p>
            <p className="text-sm text-muted-foreground">Nivel {calculatedLevel}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{xpNeeded - xpProgress} XP</p>
            <p className="text-xs text-muted-foreground">para nivel {calculatedLevel + 1}</p>
          </div>
        </div>
        <Progress value={progressPercentage} className="h-3" />
      </CardContent>
    </Card>
  )
}
