'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Play, CheckCircle, BookOpen, Clock, BarChart, Book } from 'lucide-react'; // Added icons
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
    if (completedLessons === 0) {
      onSelectLesson(topic.lessons[0].id);
    } else {
      const nextLessonIndex = completedLessons < totalLessons ? completedLessons : 0;
      onSelectLesson(topic.lessons[nextLessonIndex].id);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 h-full flex items-center">
      {/* FIX 1: Added p-0 to remove default padding, and flex-col to manage height */}
      <Card className="w-full bg-card border-2 border-border overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col p-0 relative group">

        {/* HEADER AREA - Made slightly taller to balance the look */}
        <div
          className={`h-56 relative flex flex-col items-center justify-center transition-colors duration-300 shrink-0 ${isUnlocked
              ? "bg-gradient-to-b from-pink-100 to-white dark:from-pink-900/20 dark:to-background"
              : "bg-slate-100 dark:bg-slate-800/50"
            }`}
        >
          {isUnlocked ? (
            <div className="text-foreground text-center p-4 z-10">
              <div className="text-7xl mb-4 drop-shadow-sm transform transition-transform group-hover:scale-110 duration-300 cursor-default">
                {topic.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{topic.title}</h3>
              <p className="text-base text-slate-500 font-medium mt-1">{topic.description}</p>
            </div>
          ) : (
            <div className="text-muted-foreground text-center p-4 flex flex-col items-center opacity-80">
              <div className="bg-slate-200 dark:bg-slate-700 p-5 rounded-full mb-4">
                <Lock className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-500">{topic.title}</h3>
              <p className="text-xs uppercase tracking-widest font-bold mt-2 text-slate-400">Bloqueado</p>
            </div>
          )}

          {/* Completion Badge */}
          {allLessonsCompleted && (
            <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full p-2 shadow-lg animate-in zoom-in duration-300">
              <CheckCircle className="h-6 w-6" />
            </div>
          )}
        </div>

        {/* CONTENT AREA - Used flex-1 to fill space properly */}
        <CardContent className="p-6 pt-2 flex flex-col justify-between flex-1 gap-6">

          {/* FIX 2: INFO STRIP (Fills the empty space) */}
          {isUnlocked && (
            <div className="grid grid-cols-3 gap-2 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex flex-col items-center text-center">
                <Clock className="h-5 w-5 text-slate-400 mb-1" />
                <span className="text-xs font-bold text-slate-500 uppercase">Tiempo</span>
                <span className="text-sm font-semibold text-slate-700">15 min</span>
              </div>
              <div className="flex flex-col items-center text-center border-x border-slate-100 dark:border-slate-800">
                <BarChart className="h-5 w-5 text-slate-400 mb-1" />
                <span className="text-xs font-bold text-slate-500 uppercase">Nivel</span>
                <span className="text-sm font-semibold text-slate-700">Básico</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Book className="h-5 w-5 text-slate-400 mb-1" />
                <span className="text-xs font-bold text-slate-500 uppercase">Lecciones</span>
                <span className="text-sm font-semibold text-slate-700">{totalLessons}</span>
              </div>
            </div>
          )}

          {/* Progress Bar Section */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-bold text-slate-500">
              <span>Tu progreso</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-4 overflow-hidden border border-slate-100">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${isUnlocked ? "bg-green-500" : "bg-slate-300"
                  }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Buttons Section - Pushed to bottom */}
          <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-2">
            <Button
              onClick={handleStart}
              disabled={!isUnlocked}
              className={`flex-1 font-bold text-lg h-14 shadow-md transition-transform active:scale-95 ${isUnlocked
                  ? "bg-pink-500 hover:bg-pink-600 text-white border-b-4 border-pink-700 active:border-b-0 active:translate-y-1"
                  : "bg-slate-200 text-slate-400"
                }`}
            >
              {isUnlocked ? (
                <span className="flex items-center gap-2">
                  {completedLessons === 0 ? 'EMPEZAR' : 'CONTINUAR'} <Play className="h-5 w-5 fill-current" />
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock className="h-4 w-4" /> BLOQUEADO
                </span>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => router.push(`/introduction/intro-${topic.id}`)}
              disabled={!isUnlocked}
              className="flex-1 h-14 font-bold text-slate-600 border-2 border-slate-200 hover:bg-slate-100 hover:text-slate-800 hover:border-slate-300 text-lg transition-colors"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              GUÍA
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}