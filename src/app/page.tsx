"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth/auth-context"

export default function HomePage() {
  // const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    router.push("/learn")

    // if (!isLoading) {
    //   if (user) {
    //     router.push("/learn")
    //   } else {
    //     router.push("/auth")
    //   }
    // }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Cargando...</p>
    </div>
  )
}
