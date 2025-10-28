"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth/auth-context"
import { getUser, saveUser } from "@/lib/storage/local-storage"

interface SimpleLoginFormProps {
  onSwitchToSignup: () => void
}

export function SimpleLoginForm({ onSwitchToSignup }: SimpleLoginFormProps) {
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login, user: currentUser, signup } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Generate a temporary email for the user based on their name
    const tempEmail = `${name.toLowerCase().replace(/\s+/g, '')}@echamela-mano.local`
    const tempPassword = "temp123456" // Using a default password for local auth

    // First, try to get any existing user
    const existingUser = getUser();
    
    if (!existingUser) {
      // If no user exists, create a new one
      const signupResult = await signup(tempEmail, tempPassword, name);
      if (!signupResult.success) {
        setError(signupResult.error || "Error al crear cuenta");
      }
    } else {
      // If a user already exists, just update the name
      const updatedUser = { ...existingUser, name };
      saveUser(updatedUser);
      // Since we can't directly access setUser, we'll trigger a re-render by logging in again
      await login(tempEmail, tempPassword);
    }

    setIsLoading(false)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Comienza a Aprender</CardTitle>
        <CardDescription>Ingresa tu nombre para comenzar tu viaje con LSM</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Comenzar a Aprender"}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            ¿Ya tienes una cuenta?{" "}
            <button type="button" onClick={onSwitchToSignup} className="text-primary hover:underline">
              Inicia sesión
            </button>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
