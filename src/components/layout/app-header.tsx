"use client"

import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth/auth-context"
import { Button } from "@/components/ui/button"
import { 
  LogOut, 
  User as UserIcon, 
  Heart, 
  Flame, 
  Star 
} from "lucide-react"

interface AppHeaderProps {
  hearts?: number;
  maxHearts?: number;
  streak?: number;
  xp?: number;
}

export function AppHeader({
  hearts = 5,
  streak = 0,
  xp = 0
}: AppHeaderProps) {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md shadow-sm h-20">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full relative">
          
          {/* LEFT: APP NAME */}
          <div className="flex items-center w-1/3">
            <Link href="/learn" className="hover:opacity-80 transition-opacity">
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-primary">
                Échame la Mano
              </h1>
            </Link>
          </div>

          {/* CENTER: STICKER LOGO */}
          <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 z-50">
             <Link href="/learn">
                <div className="group relative cursor-pointer">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white p-1.5 shadow-xl border-4 border-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <div className="w-full h-full rounded-full overflow-hidden relative bg-pink-50">
                      <Image
                        src="/assets/echame-la-mano-LOGO.jpg"
                        alt="Logo"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>
             </Link>
          </div>

          {/* RIGHT: STATS & PROFILE */}
          <div className="flex items-center justify-end gap-3 md:gap-6 w-1/3">
            
            {/* Stats Group */}
            <div className="hidden md:flex items-center gap-4 mr-2">
              <div className="flex items-center gap-1.5 text-red-500 font-bold bg-red-50 px-2 py-1 rounded-lg border border-red-100">
                <Heart className="fill-current h-5 w-5" />
                <span>{hearts}</span>
              </div>
              <div className="flex items-center gap-1.5 text-orange-500 font-bold bg-orange-50 px-2 py-1 rounded-lg border border-orange-100">
                <Flame className="fill-current h-5 w-5" />
                <span>{streak}</span>
              </div>
              <div className="flex items-center gap-1.5 text-yellow-500 font-bold bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                <Star className="fill-current h-5 w-5" />
                <span>{xp}</span>
              </div>
            </div>

            {/* User Profile Section */}
            {user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                <div className="hidden lg:flex flex-col items-end">
                   <span className="text-sm font-bold text-slate-700 leading-none">{user.name}</span>
                   <span className="text-xs text-slate-400 font-medium">Estudiante</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link href="/profile">
                    <div className="h-10 w-10 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:border-slate-300 transition-all cursor-pointer">
                      <UserIcon className="h-5 w-5" />
                    </div>
                  </Link>

                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={logout} 
                    className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                    title="Cerrar Sesión"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ) : (
               <Button variant="default" size="sm" asChild>
                 <Link href="/auth">Entrar</Link>
               </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}