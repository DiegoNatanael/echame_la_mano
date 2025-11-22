"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { LessonHeader } from "@/components/lesson/lesson-header"
import { ExerciseCard } from "@/components/lesson/exercise-card"
import { LessonComplete } from "@/components/lesson/lesson-complete"
import { AchievementToast } from "@/components/gamification/achievement-toast"
import { BubblesBackground } from "@/components/ui/bubbles-background"
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

      // If user is already dead (0 hearts), boot them to learn page to restart
      if (progress.hearts === 0) {
        router.push('/learn');
        return;
      }

      // Security check: is the lesson actually unlocked?
      const topicId = foundLesson.topicId;
      if (progress.topicProgress[topicId] && !progress.topicProgress[topicId].isUnlocked) {
        router.push('/learn');
        return;
      }
    }
  }, [lessonId, router])

  const handleAnswer = (isCorrect: boolean, selectedAnswer: string) => {
    if (!lesson) return

    // Prevent answering if already dead
    if (hearts === 0) return;

    let newHearts = hearts;
    
    if (isCorrect) {
      const exercise = lesson.exercises[currentExerciseIndex]
      setXpEarned((prev) => prev + exercise.xpReward)
    } else {
      newHearts = Math.max(0, hearts - 1);
      setHearts(newHearts);
      setMistakes((prev) => prev + 1)
    }

    // --- HARDCORE MODE TRIGGER ---
    if (newHearts === 0) {
      const heartsLost = mistakes + 1;
      
      // 1. Update Progress with FAIL status (passed = false)
      // The localStorage logic will see hearts=0 and trigger the FULL RESET to 10 hearts.
      updateProgressAfterLesson(lesson.id, lesson.topicId, xpEarned, heartsLost, false);

      // 2. Save the attempt record
      if (user) {
        const totalExercisesSoFar = currentExerciseIndex + 1;
        const accuracy = Math.round(((totalExercisesSoFar - (mistakes + 1)) / totalExercisesSoFar) * 100);
        
        saveLessonAttempt({
          lessonId: lesson.id,
          userId: user.id,
          score: accuracy, 
          xpEarned,
          heartsLost,
          completedAt: new Date().toISOString(),
          mistakes: mistakes + 1,
          passed: false
        })
      }

      // 3. Kick to Main Menu immediately
      router.push('/learn');
      return;
    }

    // Normal Flow: Move to next exercise
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

    const accuracy = Math.round(((lesson.exercises.length - mistakes) / lesson.exercises.length) * 100)
    
    // Strict 70% requirement
    const passedLesson = accuracy >= 70;

    setTimeout(() => {
      const previousProgress = getProgress();
      const heartsLost = mistakes
      
      const updatedProgress = updateProgressAfterLesson(lesson.id, lesson.topicId, xpEarned, heartsLost, passedLesson)

      if (updatedProgress) {
        setHearts(updatedProgress.hearts)
        
        // If hearts hit 0 during completion calculation (unlikely due to handleAnswer check, but safe to keep)
        // Redirect if the storage reset logic happened
        if (updatedProgress.hearts === 10 && heartsLost > 0 && !passedLesson) {
             router.push('/learn');
             return;
        }

        if (previousProgress && passedLesson) {
          const newAchievements = checkAchievements(updatedProgress, previousProgress);

          if (newAchievements.length > 0) {
            const achievement = newAchievements[0];
            setAchievementData({
              title: achievement.title,
              description: achievement.description,
              icon: null 
            });
            setShowAchievement(true);
            if (achievement.xpBonus) setXpEarned(prev => prev + achievement.xpBonus!);
          }
        }
      }

      saveLessonAttempt({
        lessonId: lesson.id,
        userId: user.id,
        score: accuracy,
        xpEarned,
        heartsLost,
        completedAt: new Date().toISOString(),
        mistakes,
        passed: passedLesson
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
    const passed = accuracy >= 70; 
    
    return (
      <div className="relative min-h-screen bg-transparent">
        <BubblesBackground bubbleCount={50} speed={2} />
        <div className="relative z-10">
            <LessonComplete xpEarned={xpEarned} heartsRemaining={hearts} accuracy={accuracy} passed={passed} onContinue={handleContinue} />
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
    <div className="relative h-screen w-screen flex flex-col overflow-hidden bg-transparent">
      <BubblesBackground bubbleCount={40} speed={1} />
      
      <AchievementToast
        title={achievementData.title}
        description={achievementData.description}
        isVisible={showAchievement}
        onClose={() => setShowAchievement(false)}
      />

      <div className="flex-none relative z-10">
        <LessonHeader
          currentExercise={currentExerciseIndex + 1}
          totalExercises={lesson.exercises.length}
          hearts={hearts}
          onExit={handleExit}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 relative w-full z-10">
        <div className="w-full max-w-xl h-full flex flex-col justify-center">
           <ExerciseCard exercise={currentExercise} onAnswer={handleAnswer} />
        </div>
      </div>
    </div>
  )
}