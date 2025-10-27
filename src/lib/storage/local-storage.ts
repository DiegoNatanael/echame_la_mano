// Client-side storage utilities using localStorage
import type { User, UserProgress, LessonAttempt } from "@/lib/types/user"

const STORAGE_KEYS = {
  USER: "lsm_user",
  PROGRESS: "lsm_progress",
  ATTEMPTS: "lsm_attempts",
} as const

// User management
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

// Progress management
export function saveProgress(progress: UserProgress): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress))
  }
}

export function getProgress(): UserProgress | null {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS)
    return data ? JSON.parse(data) : null
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
    hearts: 5,
    lastActiveDate: new Date().toISOString(),
    topicProgress: {
      greetings: { completedLessons: 0, totalLessons: 10, isUnlocked: true },
      family: { completedLessons: 0, totalLessons: 10, isUnlocked: false },
      numbers: { completedLessons: 0, totalLessons: 10, isUnlocked: false },
      colors: { completedLessons: 0, totalLessons: 10, isUnlocked: false },
      food: { completedLessons: 0, totalLessons: 10, isUnlocked: false },
      animals: { completedLessons: 0, totalLessons: 10, isUnlocked: false },
      emotions: { completedLessons: 0, totalLessons: 10, isUnlocked: false },
      places: { completedLessons: 0, totalLessons: 10, isUnlocked: false },
      time: { completedLessons: 0, totalLessons: 10, isUnlocked: false },
      questions: { completedLessons: 0, totalLessons: 10, isUnlocked: false },
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
): UserProgress | null {
  const progress = getProgress()
  if (!progress) return null

  // Add lesson to completed if not already there
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId)
  }

  // Update XP
  progress.totalXp += xpEarned

  // Update hearts
  progress.hearts = Math.max(0, progress.hearts - heartsLost)

  // Update topic progress
  if (progress.topicProgress[topicId]) {
    progress.topicProgress[topicId].completedLessons = progress.completedLessons.filter((id) =>
      id.startsWith(topicId),
    ).length

    // Unlock next topic if current topic is completed
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

  // Update streak
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
