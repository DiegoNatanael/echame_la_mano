"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Exercise } from "@/lib/data/lesson-data"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ExerciseCardProps {
  exercise: Exercise
  onAnswer: (isCorrect: boolean, selectedAnswer: string) => void
}

// Helper function to determine if a URL is a YouTube URL
const isYouTubeUrl = (url: string): boolean => {
  return /\b(youtube\.com|youtu\.be)\b/.test(url);
};

// Helper function to determine if a URL is a video file
const isVideoFile = (url: string): boolean => {
  return /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(url);
};

// Helper function to convert YouTube URL to embed URL
const convertToEmbedUrl = (url: string): string => {
  if (url.includes('youtube.com/embed/')) {
    return url; // Already an embed URL
  }
  
  if (url.includes('youtu.be/')) {
    // Convert youtu.be URLs to embed format
    const videoId = url.split('youtu.be/')[1].split(/[?&]/)[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  if (url.includes('youtube.com/watch')) {
    // Convert youtube.com/watch URLs to embed format
    const videoId = url.split('v=')[1].split(/[&?]/)[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  return url; // Return as is if not a YouTube URL
};

export function ExerciseCard({ exercise, onAnswer }: ExerciseCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  // Reset state when exercise prop changes
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

  const getButtonVariant = (option: string) => {
    if (!hasAnswered) {
      return selectedAnswer === option ? "default" : "outline"
    }

    if (option === exercise.correctAnswer) {
      return "default"
    }

    if (option === selectedAnswer && !isCorrect) {
      return "destructive"
    }

    return "outline"
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl">
      <div className="space-y-6">
        {/* Question Header */}
        <div className="text-center p-4 bg-white rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800">{exercise.question}</h2>
        </div>

        {/* Video/Image Container */}
        {exercise.videoUrl && (
          <Card className="overflow-hidden shadow-lg border-0">
            <div className="relative aspect-video w-full bg-white">
              {isYouTubeUrl(exercise.videoUrl) ? (
                // Render YouTube embed with overlay to hide answer text
                <div className="relative w-full h-full">
                  <iframe
                    src={convertToEmbedUrl(exercise.videoUrl)}
                    title="Demostración de seña LSM"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  {/* Overlay to hide answer text at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/90 to-transparent z-10" />
                </div>
              ) : isVideoFile(exercise.videoUrl) ? (
                // Render local video file
                <video
                  src={exercise.videoUrl}
                  controls
                  className="w-full h-full object-contain"
                  aria-label="Demostración de seña LSM"
                />
              ) : (
                // Render image for non-YouTube URLs
                <div className="w-full h-full flex items-center justify-center p-4 bg-white">
                  <div className="relative w-full h-full">
                    <Image
                      src={exercise.videoUrl || "/placeholder.svg"}
                      alt="Demostración de seña LSM"
                      className="object-contain"
                      layout="fill"
                      priority
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-4">
          {exercise.options.map((option) => (
            <Button
              key={option}
              variant={getButtonVariant(option)}
              size="lg"
              onClick={() => handleSelectAnswer(option)}
              disabled={hasAnswered}
              className={cn(
                "h-auto py-6 px-4 text-lg font-medium transition-all duration-300 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1",
                selectedAnswer === option && !hasAnswered && "bg-indigo-500 hover:bg-indigo-600 text-white ring-2 ring-indigo-300 ring-offset-2",
                hasAnswered && option === exercise.correctAnswer && "bg-green-500 hover:bg-green-600 text-white",
                hasAnswered && option === selectedAnswer && !isCorrect && "bg-red-500 hover:bg-red-600 text-white",
              )}
            >
              {option}
            </Button>
          ))}
        </div>

        {/* Feedback Card */}
        {hasAnswered && (
          <Card className={cn(
            "p-6 rounded-xl shadow-md transform transition-all duration-500",
            isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
          )}>
            <div className="flex items-center justify-center space-x-2">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                isCorrect ? "bg-green-500" : "bg-red-500"
              )}>
                <span className="text-white text-xl">
                  {isCorrect ? "✓" : "✗"}
                </span>
              </div>
              <p className={cn(
                "text-center font-semibold text-lg",
                isCorrect ? "text-green-700" : "text-red-700"
              )}>
                {isCorrect
                  ? "¡Correcto! +" + exercise.xpReward + " XP"
                  : "Incorrecto. La respuesta correcta es: " + exercise.correctAnswer}
              </p>
            </div>
          </Card>
        )}

        {/* Verify Button */}
        {!hasAnswered && (
          <Button 
            onClick={handleCheckAnswer} 
            disabled={!selectedAnswer} 
            size="lg" 
            className="w-full py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            Verificar
          </Button>
        )}
      </div>
    </div>
  )
}