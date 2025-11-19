"use client"
import Link from "next/link"
import { StatsBar } from "./stats-bar"

interface AppHeaderProps {
  hearts?: number;
  maxHearts?: number;
  streak?: number;
  xp?: number;
}

export function AppHeader({
  hearts = 5,
  maxHearts = 10,
  streak = 0,
  xp = 0
}: AppHeaderProps) {
  // const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b bg-card shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/learn" className="flex items-center gap-2">
            <img
              src="/assets/echame-la-mano-LOGO.jpg"
              alt="Échame la Mano Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <h1 className="text-xl font-bold text-primary">Échame la Mano</h1>
          </Link>

          <StatsBar
            hearts={hearts}
            maxHearts={maxHearts}
            streak={streak}
            xp={xp}
          />

          {/* {user && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </Button>
            </div>
          )} */}
        </div>
      </div>
    </header>
  )
}
