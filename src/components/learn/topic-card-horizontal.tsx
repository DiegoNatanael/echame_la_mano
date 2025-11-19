'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Play, CheckCircle, BookOpen } from 'lucide-react';
import type { Topic } from '@/lib/data/lesson-data';

interface TopicCardHorizontalProps {
  topic: Topic;
  isUnlocked: boolean;
  completedLessons: number;
  totalLessons: number;
  onSelectLesson: (lessonId: string) => void;
}

export function TopicCardHorizontal({
  topic,
  isUnlocked,
  completedLessons,
  totalLessons,
  onSelectLesson
}: TopicCardHorizontalProps) {
  const router = useRouter();
  const progress = Math.round((completedLessons / totalLessons) * 100);
  const allLessonsCompleted = completedLessons === totalLessons;

  const handleStart = () => {
    if (!isUnlocked) return;

    // If topic is unlocked but not started, go to the first lesson
    if (completedLessons === 0) {
      onSelectLesson(topic.lessons[0].id);
    } else {
      // If some lessons are completed, go to the next incomplete one
      const nextLessonIndex = completedLessons < totalLessons ? completedLessons : 0;
      onSelectLesson(topic.lessons[nextLessonIndex].id);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <Card className="h-full bg-card border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        
        {/* HEADER AREA */}
        <div
          className={`h-48 relative flex flex-col items-center justify-center transition-colors duration-300 ${
            isUnlocked 
              ? "bg-gradient-to-b from-primary/5 to-primary/20" // Unlocked: Fresh Pink Gradient
              : "bg-slate-100/80 dark:bg-slate-800/50"          // Locked: Neutral Grey
          }`}
        >
          {isUnlocked ? (
            <div className="text-foreground text-center p-4">
              {/* Increased text size slightly for better impact */}
              <div className="text-6xl mb-3 drop-shadow-sm transform transition-transform hover:scale-110 duration-300 cursor-default">
                {topic.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground">{topic.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 font-medium">{topic.description}</p>
            </div>
          ) : (
            /* Locked State Design */
            <div className="text-muted-foreground text-center p-4 flex flex-col items-center opacity-80">
              <div className="bg-slate-200/50 dark:bg-slate-700/50 p-4 rounded-full mb-3">
                <Lock className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-500">{topic.title}</h3>
              <p className="text-xs uppercase tracking-widest font-bold mt-2 text-slate-400">Bloqueado</p>
            </div>
          )}

          {/* Completion Badge */}
          {allLessonsCompleted && (
            <div className="absolute top-3 right-3 bg-accent text-accent-foreground rounded-full p-1.5 shadow-md border-2 border-white dark:border-slate-900">
              <CheckCircle className="h-5 w-5" />
            </div>
          )}
        </div>

        {/* CONTENT AREA */}
        <CardContent className="p-6">
          {/* Progress Bar Section */}
          <div className="mb-5">
            <div className="flex justify-between text-sm mb-2 font-medium text-muted-foreground">
              <span>Tu progreso</span>
              <span>{completedLessons} / {totalLessons}</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-100 dark:border-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${
                    isUnlocked ? "bg-accent" : "bg-slate-300"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-3">
            
            {/* Primary Button (Empezar/Continuar) */}
            <Button
              onClick={handleStart}
              disabled={!isUnlocked}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-sm"
              size="lg"
            >
              {isUnlocked ? (
                <span className="flex items-center gap-2">
                  <Play className="h-5 w-5 fill-current" />
                  {completedLessons === 0 ? 'Empezar' : 'Continuar'}
                </span>
              ) : (
                <span className="flex items-center gap-2 opacity-70">
                  <Lock className="h-4 w-4" />
                  Bloqueado
                </span>
              )}
            </Button>

            {/* Secondary Button (Introducción) - FIXED CONTRAST */}
            <Button
              variant="ghost"
              onClick={() => router.push(`/introduction/${topic.id}`)}
              disabled={!isUnlocked}
              size="lg"
              // FIXED: Using text-accent (dark green) on light background
              className="bg-accent/15 text-accent hover:bg-accent/25 border-2 border-accent/20 flex-1 font-bold transition-all"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Introducción
              </span>
            </Button>
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
}