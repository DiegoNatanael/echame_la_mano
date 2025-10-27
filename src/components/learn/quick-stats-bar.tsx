"use client"

import { Heart, Star, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface QuickStatsBarProps {
  hearts: number
  xp: number
  streak: number
}

export function QuickStatsBar({ hearts, xp, streak }: QuickStatsBarProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-card rounded-lg border">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
          <span className="font-bold">{hearts}</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
          <span className="font-bold">{xp} XP</span>
        </div>
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <span className="font-bold">{streak} días</span>
        </div>
      </div>
      <Button variant="outline" size="sm" asChild>
        <Link href="/profile">Ver Perfil</Link>
      </Button>
    </div>
  )
}
