"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Exercise } from "@/lib/data/lesson-data"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ExerciseCardProps {
  exercise: Exercise
  onAnswer: (isCorrect: boolean, selectedAnswer: string) => void
}

export function ExerciseCard({ exercise, onAnswer }: ExerciseCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  // Reset state when exercise prop changes
  useEffect(() => {
    setSelectedAnswer(null)
    setHasAnswered(false)
    setIsCorrect(false)
  }, [exercise])

  const handleSelectAnswer = (answer: string) => {
    if (hasAnswered) return
    setSelectedAnswer(answer)
  }

  const handleCheckAnswer = () => {
    if (!selectedAnswer || hasAnswered) return

    const correct = selectedAnswer === exercise.correctAnswer
    setIsCorrect(correct)
    setHasAnswered(true)
    onAnswer(correct, selectedAnswer)
  }

  const getButtonVariant = (option: string) => {
    if (!hasAnswered) {
      return selectedAnswer === option ? "default" : "outline"
    }

    if (option === exercise.correctAnswer) {
      return "default"
    }

    if (option === selectedAnswer && !isCorrect) {
      return "destructive"
    }

    return "outline"
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center text-balance">{exercise.question}</h2>

        {exercise.videoUrl && (
          <Card className="overflow-hidden bg-muted">
            <div className="relative aspect-video w-full">
              <Image
                src={exercise.videoUrl || "/placeholder.svg"}
                alt="Demostración de seña LSM"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {exercise.options.map((option) => (
          <Button
            key={option}
            variant={getButtonVariant(option)}
            size="lg"
            onClick={() => handleSelectAnswer(option)}
            disabled={hasAnswered}
            className={cn(
              "h-auto py-4 text-lg font-medium transition-all",
              selectedAnswer === option && !hasAnswered && "ring-2 ring-primary ring-offset-2",
              hasAnswered && option === exercise.correctAnswer && "bg-green-500 hover:bg-green-600 text-white",
              hasAnswered && option === selectedAnswer && !isCorrect && "bg-red-500 hover:bg-red-600 text-white",
            )}
          >
            {option}
          </Button>
        ))}
      </div>

      {hasAnswered && (
        <Card className={cn("p-4", isCorrect ? "bg-green-50 border-green-200" : "bg-red-500/20 border-red-200")}>
          <p className={cn("text-center font-semibold", isCorrect ? "text-green-700" : "text-red-700")}>
            {isCorrect
              ? "¡Correcto! +" + exercise.xpReward + " XP"
              : "Incorrecto. La respuesta correcta es: " + exercise.correctAnswer}
          </p>
        </Card>
      )}

      {!hasAnswered && (
        <Button onClick={handleCheckAnswer} disabled={!selectedAnswer} size="lg" className="w-full">
          Verificar
        </Button>
      )}
    </div>
  )
}
