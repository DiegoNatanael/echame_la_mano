// Achievement detection logic
import type { UserProgress } from "@/lib/types/user";

// Define achievement types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji
  unlocked: boolean;
  xpBonus?: number;
}

// Function to check achievements after lesson completion
export function checkAchievements(progress: UserProgress, previousProgress: UserProgress): Achievement[] {
  const newAchievements: Achievement[] = [];
  
  // Check for first lesson completion
  if (progress.completedLessons.length === 1 && previousProgress.completedLessons.length === 0) {
    newAchievements.push({
      id: "first-lesson",
      title: "¡Primer Paso!",
      description: "Completaste tu primera lección",
      icon: "🎯",
      unlocked: true,
      xpBonus: 50
    });
  }
  
  // Check for 5 lessons completed
  if (progress.completedLessons.length >= 5 && previousProgress.completedLessons.length < 5) {
    newAchievements.push({
      id: "five-lessons",
      title: "¡Aprendiz Dedicado!",
      description: "Completaste 5 lecciones",
      icon: "📚",
      unlocked: true,
      xpBonus: 100
    });
  }
  
  // Check for 3-day streak
  if (progress.currentStreak >= 3 && previousProgress.currentStreak < 3) {
    newAchievements.push({
      id: "three-day-streak",
      title: "¡Racha de 3 Días!",
      description: "Mantuviste una racha de 3 días",
      icon: "🔥",
      unlocked: true,
      xpBonus: 150
    });
  }
  
  // Check for 100 XP
  if (progress.totalXp >= 100 && previousProgress.totalXp < 100) {
    newAchievements.push({
      id: "hundred-xp",
      title: "¡100 XP!",
      description: "Alcanzaste 100 puntos de experiencia",
      icon: "⭐",
      unlocked: true,
      xpBonus: 50
    });
  }
  
  // Check for 500 XP
  if (progress.totalXp >= 500 && previousProgress.totalXp < 500) {
    newAchievements.push({
      id: "five-hundred-xp",
      title: "¡500 XP!",
      description: "Alcanzaste 500 puntos de experiencia",
      icon: "🌟",
      unlocked: true,
      xpBonus: 100
    });
  }
  
  // Check for completing first topic
  const firstTopicIds = ['greetings'];
  const completedFirstTopic = firstTopicIds.some(topicId => 
    progress.topicProgress[topicId]?.completedLessons === 1 && 
    (previousProgress.topicProgress[topicId]?.completedLessons || 0) < 1
  );
  
  if (completedFirstTopic) {
    newAchievements.push({
      id: "first-topic",
      title: "¡Primer Tema Completado!",
      description: "Completaste tu primer tema de lecciones",
      icon: "🎓",
      unlocked: true,
      xpBonus: 200
    });
  }
  
  return newAchievements;
}

// Function to award XP bonus from achievements
export function awardAchievementXp(achievements: Achievement[]): number {
  return achievements.reduce((total, achievement) => {
    return total + (achievement.xpBonus || 0);
  }, 0);
}