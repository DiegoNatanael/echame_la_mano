// User and progress tracking types
export interface UserProgress {
  userId: string
  completedLessons: string[] // lesson IDs
  currentStreak: number
  longestStreak: number
  totalXp: number
  hearts: number
  lastActiveDate: string
  topicProgress: {
    [topicId: string]: {
      completedLessons: number
      totalLessons: number
      isUnlocked: boolean
    }
  }
}

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
  progress: UserProgress
}

export interface LessonAttempt {
  lessonId: string
  userId: string
  score: number
  xpEarned: number
  heartsLost: number
  completedAt: string
  mistakes: number
}
