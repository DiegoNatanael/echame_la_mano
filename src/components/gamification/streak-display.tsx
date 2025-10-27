"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame } from "lucide-react"

interface StreakDisplayProps {
  currentStreak: number
  longestStreak: number
}

export function StreakDisplay({ currentStreak, longestStreak }: StreakDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Racha de Días
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="text-4xl font-bold text-orange-500">{currentStreak}</p>
            <p className="text-sm text-muted-foreground">Racha Actual</p>
          </div>
          <div className="h-16 w-px bg-border" />
          <div className="text-center">
            <p className="text-4xl font-bold">{longestStreak}</p>
            <p className="text-sm text-muted-foreground">Mejor Racha</p>
          </div>
        </div>
        <p className="text-xs text-center text-muted-foreground">Completa lecciones cada día para mantener tu racha</p>
      </CardContent>
    </Card>
  )
}
