"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { LessonHeader } from "@/components/lesson/lesson-header"
import { ExerciseCard } from "@/components/lesson/exercise-card"
import { LessonComplete } from "@/components/lesson/lesson-complete"
import { AchievementToast } from "@/components/gamification/achievement-toast"
import { BubblesBackground } from "@/components/ui/bubbles-background" // <--- IMPORTED
import { topics } from "@/lib/data/lesson-data"
import type { Lesson } from "@/lib/data/lesson-data"
import { getProgress, updateProgressAfterLesson, saveLessonAttempt } from "@/lib/storage/local-storage"
import { useAuth } from "@/lib/auth/auth-context"
import { checkAchievements } from "@/lib/achievements/achievement-checker"

export default function LessonPage() {
  const router = useRouter()
  const params = useParams()
  const { user } = useAuth()
  const lessonId = params.lessonId as string

  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [hearts, setHearts] = useState(5)
  const [xpEarned, setXpEarned] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showAchievement, setShowAchievement] = useState(false)
  const [achievementData, setAchievementData] = useState({ title: '', description: '', icon: null as React.ReactNode | null });

  useEffect(() => {
    // Find the lesson
    let foundLesson: Lesson | null = null
    for (const topic of topics) {
      const lessonInTopic = topic.lessons.find((l) => l.id === lessonId)
      if (lessonInTopic) {
        foundLesson = lessonInTopic
        break
      }
    }

    if (!foundLesson) {
      router.push("/learn")
      return
    }

    setLesson(foundLesson)

    // Load user progress
    const progress = getProgress()
    if (progress) {
      setHearts(progress.hearts)
      
      // If user has 0 hearts, redirect to learn page
      if (progress.hearts === 0) {
        router.push('/learn');
        return;
      }
    }
  }, [lessonId, router])

  const handleAnswer = (isCorrect: boolean, selectedAnswer: string) => {
    if (!lesson) return

    let newHearts = hearts;
    if (isCorrect) {
      const exercise = lesson.exercises[currentExerciseIndex]
      setXpEarned((prev) => prev + exercise.xpReward)
    } else {
      newHearts = Math.max(0, hearts - 1);
      setHearts(newHearts);
      setMistakes((prev) => prev + 1)
    }

    // Check if hearts reached 0
    if (newHearts === 0) {
      const heartsLost = 1; 
      const updatedProgress = updateProgressAfterLesson(lesson.id, lesson.topicId, xpEarned, heartsLost);
      
      if (updatedProgress && updatedProgress.hearts === 5) {
        router.push('/learn');
        return;
      }
    }

    // Move to next exercise after a delay
    setTimeout(() => {
      if (currentExerciseIndex < lesson.exercises.length - 1) {
        setCurrentExerciseIndex((prev) => prev + 1)
      } else {
        completeLesson()
      }
    }, 1500) 
  }

  const completeLesson = () => {
    if (!lesson || !user) return

    setTimeout(() => {
      // Get progress before updating to compare for achievements
      const previousProgress = getProgress();
      const heartsLost = mistakes
      const updatedProgress = updateProgressAfterLesson(lesson.id, lesson.topicId, xpEarned, heartsLost)

      if (updatedProgress) {
        setHearts(updatedProgress.hearts)
        if (updatedProgress.hearts === 5 && updatedProgress.completedLessons.length === 0) {
          router.push('/learn');
          return;
        }

        // Check for achievements if we have both old and new progress
        if (previousProgress) {
          const newAchievements = checkAchievements(updatedProgress, previousProgress);

          if (newAchievements.length > 0) {
            // Show achievement toast for the first achievement
            const achievement = newAchievements[0];
            setAchievementData({
              title: achievement.title,
              description: achievement.description,
              icon: null // We'll let the AchievementToast handle the icon based on title
            });
            setShowAchievement(true);

            // Add any XP bonus from achievements
            const bonusXp = achievement.xpBonus || 0;
            if (bonusXp > 0) {
              setXpEarned(prev => prev + bonusXp);
            }
          }
        }
      }

      saveLessonAttempt({
        lessonId: lesson.id,
        userId: user.id,
        score: Math.round((xpEarned / lesson.totalXp) * 100),
        xpEarned,
        heartsLost,
        completedAt: new Date().toISOString(),
        mistakes,
      })

      setIsComplete(true)
    }, 1500)
  }

  const handleExit = () => {
    router.push("/learn")
  }

  const handleContinue = () => {
    router.push("/learn")
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <BubblesBackground bubbleCount={30} speed={1} />
        <p className="relative z-10">Cargando lección...</p>
      </div>
    )
  }

  if (isComplete) {
    const accuracy = Math.round(((lesson.exercises.length - mistakes) / lesson.exercises.length) * 100)
    return (
      <div className="relative min-h-screen bg-transparent">
        {/* Bubbles for the celebration screen */}
        <BubblesBackground bubbleCount={50} speed={2} />
        
        <div className="relative z-10">
            <LessonComplete xpEarned={xpEarned} heartsRemaining={hearts} accuracy={accuracy} onContinue={handleContinue} />
        </div>
        
        <AchievementToast
          title={achievementData.title}
          description={achievementData.description}
          isVisible={showAchievement}
          onClose={() => setShowAchievement(false)}
        />
      </div>
    )
  }

  const currentExercise = lesson.exercises[currentExerciseIndex]

  return (
    // FIX: Changed bg-background to bg-transparent so bubbles show
    <div className="relative h-screen w-screen flex flex-col overflow-hidden bg-transparent">
      
      {/* Bubbles Background Layer */}
      <BubblesBackground bubbleCount={40} speed={1} />

      {/* Achievement Toast - appears at bottom right */}
      <AchievementToast
        title={achievementData.title}
        description={achievementData.description}
        isVisible={showAchievement}
        onClose={() => setShowAchievement(false)}
      />

      {/* Header stays fixed at top - Added z-10 to sit above bubbles */}
      <div className="flex-none relative z-10">
        <LessonHeader
          currentExercise={currentExerciseIndex + 1}
          totalExercises={lesson.exercises.length}
          hearts={hearts}
          onExit={handleExit}
        />
      </div>

      {/* Main content area - Added z-10 */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative w-full z-10">

        <div className="w-full max-w-xl h-full flex flex-col justify-center">
           <ExerciseCard exercise={currentExercise} onAnswer={handleAnswer} />
        </div>

      </div>
    </div>
  )
}