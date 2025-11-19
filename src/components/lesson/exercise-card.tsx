"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import type { Exercise } from "@/lib/data/lesson-data"

interface ExerciseCardProps {
  exercise: Exercise
  onAnswer: (isCorrect: boolean, selectedAnswer: string) => void
}

// --- HELPER FUNCTIONS ---
const isYouTubeUrl = (url: string): boolean => /\b(youtube\.com|youtu\.be)\b/.test(url);
const isVideoFile = (url: string): boolean => /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(url);
const convertToEmbedUrl = (url: string): string => {
  if (url.includes('youtube.com/embed/')) return url;
  if (url.includes('youtu.be/')) return `https://www.youtube.com/embed/${url.split('youtu.be/')[1].split(/[?&]/)[0]}`;
  if (url.includes('youtube.com/watch')) return `https://www.youtube.com/embed/${url.split('v=')[1].split(/[&?]/)[0]}`;
  return url;
};

export function ExerciseCard({ exercise, onAnswer }: ExerciseCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    setSelectedAnswer(null)
    setHasAnswered(false)
    setIsCorrect(false)
  }, [exercise])

  const handleSelectAnswer = (answer: string) => {
    if (hasAnswered) return
    setSelectedAnswer(answer)
  }

  const handleCheckAnswer = () => {
    if (!selectedAnswer || hasAnswered) return
    const correct = selectedAnswer === exercise.correctAnswer
    setIsCorrect(correct)
    setHasAnswered(true)
    onAnswer(correct, selectedAnswer)
  }

  // --- STYLING LOGIC (Duolingo 3D Style) ---
  const getButtonStyles = (option: string) => {
    const baseStyles = "w-full h-auto py-4 px-4 text-lg font-bold rounded-2xl border-2 border-b-4 active:border-b-2 active:translate-y-[2px] transition-all duration-100 outline-none focus:ring-2 focus:ring-offset-2";
    
    // 1. Default State (Unselected)
    if (!hasAnswered && selectedAnswer !== option) {
      return cn(baseStyles, "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-200");
    }

    // 2. Selected State (Before checking)
    if (!hasAnswered && selectedAnswer === option) {
      return cn(baseStyles, "bg-blue-100 border-blue-400 text-blue-600 focus:ring-blue-300");
    }

    // 3. Correct Answer (After checking)
    if (hasAnswered && option === exercise.correctAnswer) {
      return cn(baseStyles, "bg-green-100 border-green-500 text-green-600");
    }

    // 4. Wrong Answer (User selected this, but it's wrong)
    if (hasAnswered && option === selectedAnswer && !isCorrect) {
      return cn(baseStyles, "bg-red-100 border-red-500 text-red-600");
    }

    // 5. Other options (When user answered)
    return cn(baseStyles, "bg-slate-50 border-slate-100 text-slate-300 opacity-50 cursor-not-allowed");
  }

  return (
    /* ROOT CONTAINER: 
       h-full: Takes up all space given by page.tsx
       flex-col: Stacks content vertically
    */
    <div className="w-full h-full flex flex-col justify-between pb-2 md:pb-6">
      
      {/* 1. QUESTION TITLE */}
      <div className="flex-none pt-2 pb-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
          {exercise.question}
        </h2>
      </div>

      {/* 2. MEDIA CONTAINER (The Magic Fix) 
         flex-1: Grows to fill space.
         min-h-0: Allows the container to shrink below its content size (prevents overflow).
      */}
      <div className="flex-1 min-h-0 w-full relative flex items-center justify-center mb-4 md:mb-8">
        {exercise.videoUrl && (
          <div className="relative w-full h-full flex items-center justify-center rounded-xl overflow-hidden bg-slate-50 border-2 border-slate-100">
            {isYouTubeUrl(exercise.videoUrl) ? (
              /* YouTube Frame */
              <div className="w-full h-full max-h-[50vh] aspect-video">
                  <iframe
                    src={convertToEmbedUrl(exercise.videoUrl)}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
              </div>
            ) : isVideoFile(exercise.videoUrl) ? (
              /* Native Video */
              <video 
                src={exercise.videoUrl} 
                controls 
                className="w-full h-full max-h-[50vh] object-contain" 
              />
            ) : (
              /* Image - Uses object-contain to never clip */
              <div className="relative w-full h-full">
                <Image
                  src={exercise.videoUrl || "/placeholder.svg"}
                  alt="Exercise content"
                  fill
                  className="object-contain p-2"
                  priority
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. OPTIONS GRID & CONTROLS */}
      <div className="flex-none flex flex-col gap-4 w-full">
        
        {/* Answer Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
          {exercise.options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelectAnswer(option)}
              disabled={hasAnswered}
              className={getButtonStyles(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Feedback / Verify Button Area */}
        <div className="h-20 flex items-end justify-center">
            {/* Feedback Message */}
            {hasAnswered ? (
                <div className={cn(
                    "w-full p-4 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-bottom-4",
                    isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                )}>
                    <div className="flex items-center gap-3">
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold", isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white")}>
                            {isCorrect ? "✓" : "✕"}
                        </div>
                        <div className="flex flex-col">
                             <span className="font-bold text-lg">{isCorrect ? "¡Excelente!" : "Incorrecto"}</span>
                             {!isCorrect && <span className="text-sm">Respuesta: {exercise.correctAnswer}</span>}
                        </div>
                    </div>
                </div>
            ) : (
                /* Verify Button */
                <button 
                    onClick={handleCheckAnswer} 
                    disabled={!selectedAnswer} 
                    className={cn(
                        "w-full py-4 text-xl font-bold uppercase tracking-wide rounded-xl border-b-4 transition-all active:border-b-0 active:translate-y-1",
                        !selectedAnswer 
                            ? "bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed" 
                            : "bg-green-500 border-green-600 text-white hover:bg-green-400"
                    )}
                >
                    Comprobar
                </button>
            )}
        </div>
      </div>
    </div>
  )
}