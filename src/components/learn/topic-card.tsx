"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
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
    <Card className={cn("relative overflow-hidden", !isUnlocked && "opacity-60")}>
      {!isUnlocked && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-center">
            <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">Bloqueado</p>
          </div>
        </div>
      )}

      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{topic.icon}</div>
            <div>
              <h3 className="text-xl font-bold">{topic.title}</h3>
              <p className="text-sm text-muted-foreground">{topic.description}</p>
            </div>
          </div>
          {isComplete && <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progreso</span>
            <span className="font-medium">
              {completedLessons}/{totalLessons} lecciones
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {isUnlocked && (
          <div className="grid grid-cols-5 gap-2">
            {topic.lessons.slice(0, 10).map((lesson, index) => {
              const isLessonComplete = completedLessons > index
              const isLessonAvailable = completedLessons >= index

              return (
                <Button
                  key={lesson.id}
                  variant={isLessonComplete ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "h-10 w-full",
                    isLessonComplete && "bg-green-500 hover:bg-green-600",
                    !isLessonAvailable && "opacity-50 cursor-not-allowed",
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
      </CardContent>
    </Card>
  )
}
