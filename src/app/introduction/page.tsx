"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-context"
import { generalIntroductionLessons } from "@/lib/data/introduction-data"
import { AppHeader } from "@/components/layout/app-header"

export default function IntroductionPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth")
      return
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <AppHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-balance">Introducción a LSM</h1>
            <p className="text-muted-foreground">Aprende los conceptos básicos antes de comenzar</p>
          </div>

          <div className="space-y-4">
            {generalIntroductionLessons.map((lesson) => (
              <div 
                key={lesson.id}
                className="p-6 bg-white rounded-xl shadow-md border cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => router.push(`/introduction/${lesson.id}`)}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{lesson.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{lesson.title}</h3>
                    <p className="text-muted-foreground mb-2">{lesson.description}</p>
                    {(() => {
                      const totalDurationSeconds = lesson.exercises.reduce((sum, ex) => sum + (ex.duration ?? 0), 0)
                      const minutes = totalDurationSeconds > 0 ? Math.ceil(totalDurationSeconds / 60) : null

                      return (
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {minutes && <span>{minutes} min</span>}
                          {minutes && <span>•</span>}
                          <span>{lesson.exercises.length} lecciones</span>
                        </div>
                      )
                    })()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
