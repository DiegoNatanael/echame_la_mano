"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, CheckCircle2 } from "lucide-react"
import type { Topic } from "@/lib/data/lesson-data"
import { cn } from "@/lib/utils"

interface TopicCardProps {
  topic: Topic
  isUnlocked: boolean
  completedLessons: number
  totalLessons: number
  onSelectLesson: (lessonId: string) => void
}

export function TopicCard({ topic, isUnlocked, completedLessons, totalLessons, onSelectLesson }: TopicCardProps) {
  const progress = (completedLessons / totalLessons) * 100
  const isComplete = completedLessons === totalLessons

  return (
    <Card className={cn("card-hover relative overflow-hidden", !isUnlocked && "opacity-60")}>
      {!isUnlocked && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-center">
            <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">Bloqueado</p>
          </div>
        </div>
      )}

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{topic.icon}</div>
            <div>
              <h3 className="text-lg font-semibold mb-1">{topic.title}</h3>
              <p className="text-sm text-muted-foreground">{topic.description}</p>
            </div>
          </div>
          {isComplete && <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-medium">Progreso</span>
            <span className="text-sm text-foreground">
              {completedLessons}/{totalLessons} lecciones
            </span>
          </div>

          <div className="progress-indicator">
            <div style={{ width: `${progress}%` }} />
          </div>

          {isUnlocked && (
            <div className="grid grid-cols-5 gap-3 mt-4">
              {topic.lessons.slice(0, 10).map((lesson, index) => {
                const isLessonComplete = completedLessons > index
                const isLessonAvailable = completedLessons >= index

                return (
                  <Button
                    key={lesson.id}
                    variant={isLessonComplete ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "h-12 w-full rounded-xl font-medium text-base",
                      isLessonComplete && "bg-primary hover:bg-primary/90",
                      !isLessonAvailable && "opacity-50 cursor-not-allowed",
                      !isLessonComplete && isLessonAvailable && "border-2 hover:bg-accent"
                    )}
                    onClick={() => isLessonAvailable && onSelectLesson(lesson.id)}
                    disabled={!isLessonAvailable}
                  >
                    {index + 1}
                  </Button>
                )
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
