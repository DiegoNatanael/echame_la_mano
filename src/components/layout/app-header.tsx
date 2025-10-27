"use client"
import Link from "next/link"

export function AppHeader() {
  // const { user, logout } = useAuth()

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/learn" className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary">Échame la Mano</h1>
          </Link>

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
