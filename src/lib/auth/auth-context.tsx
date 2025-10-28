"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/lib/types/user"
import { getUser, saveUser, clearUser, initializeProgress } from "@/lib/storage/local-storage"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing user on mount
    const existingUser = getUser()
    setUser(existingUser)
    setIsLoading(false)
  }, [])

  const signup = async (email: string, password: string, name: string) => {
    // Simple validation
    if (!email || !password || !name) {
      return { success: false, error: "Todos los campos son requeridos" }
    }

    if (password.length < 6) {
      return { success: false, error: "La contraseña debe tener al menos 6 caracteres" }
    }

    // Create or update user (since we're using localStorage, we just override)
    const existingUser = getUser()
    
    const newUser: User = {
      id: existingUser?.id || crypto.randomUUID(),
      email,
      name,
      createdAt: existingUser?.createdAt || new Date().toISOString(),
      progress: existingUser?.progress || initializeProgress(crypto.randomUUID()),
    }

    saveUser(newUser)
    setUser(newUser)
    return { success: true }
  }

  const login = async (email: string, password: string) => {
    // Simple validation
    if (!email || !password) {
      return { success: false, error: "Correo y contraseña son requeridos" }
    }

    // Since we're using localStorage, just return the existing user
    const existingUser = getUser()
    if (existingUser) {
      // Update the user state to trigger re-render
      setUser(existingUser)
      return { success: true }
    } else {
      // If no user exists, return an error
      return { success: false, error: "No se encontró un usuario" }
    }
  }

  const logout = () => {
    clearUser()
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
