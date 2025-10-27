"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeartsDisplayProps {
  hearts: number
  maxHearts?: number
}

export function HeartsDisplay({ hearts, maxHearts = 5 }: HeartsDisplayProps) {
  const canRefill = hearts < maxHearts

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
          Corazones
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: maxHearts }).map((_, i) => (
            <Heart
              key={i}
              className={`h-8 w-8 ${i < hearts ? "text-red-500 fill-red-500" : "text-muted-foreground/30"}`}
            />
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground">
          {hearts === maxHearts ? "¡Tienes todos tus corazones!" : `Te quedan ${hearts} de ${maxHearts} corazones`}
        </p>
        {canRefill && (
          <Button variant="outline" className="w-full bg-transparent" disabled>
            Recargar corazones
            <span className="ml-2 text-xs text-muted-foreground">(Próximamente)</span>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
