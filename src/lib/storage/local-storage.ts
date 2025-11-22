// Client-side storage utilities using localStorage
import type { User, UserProgress, LessonAttempt } from "@/lib/types/user"

const STORAGE_KEYS = {
  USER: "lsm_user",
  PROGRESS: "lsm_progress",
  ATTEMPTS: "lsm_attempts",
} as const

// ... (User management functions stay the same: saveUser, getUser, clearUser) ...
export function saveUser(user: User): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
  }
}

export function getUser(): User | null {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(STORAGE_KEYS.USER)
    return data ? JSON.parse(data) : null
  }
  return null
}

export function clearUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEYS.USER)
  }
}

export function getBestLessonScore(lessonId: string): number {
  const attempts = getLessonAttempts();
  
  // Filter attempts for this lesson and passed status
  const lessonAttempts = attempts.filter(
    (a) => a.lessonId === lessonId && a.passed === true
  );

  if (lessonAttempts.length === 0) return 0;

  // Find the highest score
  const maxScore = Math.max(...lessonAttempts.map((a) => a.score));
  
  return maxScore;
}

// Progress management
export function saveProgress(progress: UserProgress): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress))
  }
}

export function getProgress(): UserProgress | null {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS)
    if (data) {
      return JSON.parse(data) as UserProgress
    }
    return null
  }
  return null
}

// Initialize default progress for new users
export function initializeProgress(userId: string): UserProgress {
  const defaultProgress: UserProgress = {
    userId,
    completedLessons: [],
    currentStreak: 0,
    longestStreak: 0,
    totalXp: 0,
    hearts: 10, // Default to 10 hearts
    lastActiveDate: new Date().toISOString(),
    topicProgress: {
      greetings: { completedLessons: 0, totalLessons: 1, isUnlocked: true },
      family: { completedLessons: 0, totalLessons: 1, isUnlocked: false },
      numbers: { completedLessons: 0, totalLessons: 1, isUnlocked: false },
      colors: { completedLessons: 0, totalLessons: 1, isUnlocked: false },
      food: { completedLessons: 0, totalLessons: 1, isUnlocked: false },
      animals: { completedLessons: 0, totalLessons: 1, isUnlocked: false },
      emotions: { completedLessons: 0, totalLessons: 1, isUnlocked: false },
      places: { completedLessons: 0, totalLessons: 1, isUnlocked: false },
      time: { completedLessons: 0, totalLessons: 1, isUnlocked: false },
      questions: { completedLessons: 0, totalLessons: 1, isUnlocked: false },
    },
  }
  
  saveProgress(defaultProgress)
  return defaultProgress
}

// Lesson attempts
export function saveLessonAttempt(attempt: LessonAttempt): void {
  if (typeof window !== "undefined") {
    const attempts = getLessonAttempts()
    attempts.push(attempt)
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts))
  }
}

export function getLessonAttempts(): LessonAttempt[] {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(STORAGE_KEYS.ATTEMPTS)
    return data ? JSON.parse(data) : []
  }
  return []
}

// Update progress after lesson completion
export function updateProgressAfterLesson(
  lessonId: string,
  topicId: string,
  xpEarned: number,
  heartsLost: number,
  passed: boolean = true, 
): UserProgress | null {
  const progress = getProgress()
  if (!progress) return null

  // 1. UPDATE XP (Always keep XP, even if they fail)
  progress.totalXp += xpEarned

  // 2. CALCULATE NEW HEARTS
  const newHearts = Math.max(0, progress.hearts - heartsLost)
  progress.hearts = newHearts

  // 3. HARDCORE MODE CHECK: If hearts hit 0, RESET EVERYTHING
  if (progress.hearts === 0) {
    // Generate a fresh start state
    const resetState = initializeProgress(progress.userId)
    
    // Keep the total XP earned (High Score)
    resetState.totalXp = progress.totalXp
    
    // Force Hearts to 10
    resetState.hearts = 10
    
    // Explicitly wipe completed lessons and lock all topics except Greetings
    // (This is handled by initializeProgress default values)
    
    // Reset Streak
    resetState.currentStreak = 0

    saveProgress(resetState)
    return resetState
  }

  // --- IF WE SURVIVED (Hearts > 0), CONTINUE NORMAL UPDATES ---

  // 4. UPDATE COMPLETED LESSONS
  if (!progress.completedLessons.includes(lessonId) && passed) {
    progress.completedLessons.push(lessonId)
  }

  // 5. UPDATE TOPIC PROGRESS
  if (progress.topicProgress[topicId]) {
    // Count how many lessons in this topic are in the completed list
    progress.topicProgress[topicId].completedLessons = progress.completedLessons.filter((id) =>
      id.startsWith(topicId),
    ).length

    // Cap at total lessons
    progress.topicProgress[topicId].completedLessons = Math.min(
      progress.topicProgress[topicId].completedLessons,
      progress.topicProgress[topicId].totalLessons
    );

    // Unlock next topic if current is finished AND passed
    if (passed) {
      const currentTopicCompleted =
        progress.topicProgress[topicId].completedLessons >= progress.topicProgress[topicId].totalLessons

      if (currentTopicCompleted) {
        const topicOrder = [
          "greetings",
          "family",
          "numbers",
          "colors",
          "food",
          "animals",
          "emotions",
          "places",
          "time",
          "questions",
        ]
        const currentIndex = topicOrder.indexOf(topicId)
        if (currentIndex >= 0 && currentIndex < topicOrder.length - 1) {
          const nextTopic = topicOrder[currentIndex + 1]
          if (progress.topicProgress[nextTopic]) {
            progress.topicProgress[nextTopic].isUnlocked = true
          }
        }
      }
    }
  }

  // 6. UPDATE STREAK
  const today = new Date().toISOString().split("T")[0]
  const lastActive = progress.lastActiveDate.split("T")[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]

  if (lastActive === yesterday) {
    progress.currentStreak += 1
  } else if (lastActive !== today) {
    progress.currentStreak = 1
  }

  progress.longestStreak = Math.max(progress.longestStreak, progress.currentStreak)
  progress.lastActiveDate = new Date().toISOString()

  saveProgress(progress)
  return progress
}