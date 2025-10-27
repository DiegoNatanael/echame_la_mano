"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { X, Heart } from "lucide-react"

interface LessonHeaderProps {
  currentExercise: number
  totalExercises: number
  hearts: number
  onExit: () => void
}

export function LessonHeader({ currentExercise, totalExercises, hearts, onExit }: LessonHeaderProps) {
  const progress = (currentExercise / totalExercises) * 100

  return (
    <div className="w-full border-b bg-background">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Button variant="ghost" size="icon" onClick={onExit} className="shrink-0">
            <X className="h-5 w-5" />
            <span className="sr-only">Salir de la lección</span>
          </Button>

          <div className="flex-1 max-w-2xl">
            <Progress value={progress} className="h-3" />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Heart className="h-5 w-5 fill-red-500 text-red-500" />
            <span className="font-bold text-lg">{hearts}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
