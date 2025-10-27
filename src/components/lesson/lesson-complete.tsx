"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Star, Heart } from "lucide-react"

interface LessonCompleteProps {
  xpEarned: number
  heartsRemaining: number
  accuracy: number
  onContinue: () => void
}

export function LessonComplete({ xpEarned, heartsRemaining, accuracy, onContinue }: LessonCompleteProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-yellow-50 to-orange-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-yellow-100 p-6">
              <Trophy className="h-16 w-16 text-yellow-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">¡Lección Completada!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="flex justify-center">
                <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-2xl font-bold">{xpEarned}</p>
              <p className="text-sm text-muted-foreground">XP Ganados</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Heart className="h-8 w-8 text-red-500 fill-red-500" />
              </div>
              <p className="text-2xl font-bold">{heartsRemaining}</p>
              <p className="text-sm text-muted-foreground">Corazones</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Trophy className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-2xl font-bold">{accuracy}%</p>
              <p className="text-sm text-muted-foreground">Precisión</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onContinue} size="lg" className="w-full">
            Continuar
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
