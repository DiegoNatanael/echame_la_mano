"use client"

import { useState } from "react"
import Image from "next/image" 
import { SignupForm } from "@/components/auth/signup-form"

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent p-4">
      <div className="w-full max-w-md relative z-10">
        
        <div className="text-center mb-8">
          {/* --- LOGO SECTION --- */}
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white hover:scale-105 transition-transform duration-300">
              <Image
                src="/assets/echame-la-mano-LOGO.jpg"
                alt="Échame la Mano Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-slate-800 mb-2 drop-shadow-sm">
            Échame la Mano
          </h1>
          <p className="text-slate-600 font-medium">
            Aprende Lengua de Señas Mexicana
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50">
           <SignupForm />
        </div>

      </div>
    </div>
  )
}