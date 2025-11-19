import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth/auth-context"
import { Suspense } from "react"
import { BubblesBackground } from "@/components/ui/bubbles-background"
import "./globals.css"

export const metadata: Metadata = {
  title: "Aprende Lenguaje de señas mexicanas | Échame la mano",
  description: "Aprende Lengua de Señas Mexicana de forma interactiva",
  generator: "v0.app",
  icons: {
    icon: "/assets/echame-la-mano-LOGO.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} min-h-screen`}>
        
        {/* 2. The Axolotl Habitat 🌊 (Background Layer) */}
        {/* Using speed=2 for a nice flow, and scramble=true so they run from the mouse */}
        <BubblesBackground bubbleCount={50} speed={2} scramble={true} />

        {/* Wrapped app with AuthProvider and Suspense boundary */}
        {/* Added relative z-10 to ensure content sits ON TOP of the water */}
        <div className="relative z-10">
          <Suspense fallback={<div>Loading...</div>}>
            <AuthProvider>{children}</AuthProvider>
          </Suspense>
        </div>
        
        <Analytics />
      </body>
    </html>
  )
}