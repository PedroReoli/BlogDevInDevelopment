"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { CustomAuthService, type AdminUser } from "@/services/custom-auth-service"

interface CustomAuthContextType {
  user: AdminUser | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const CustomAuthContext = createContext<CustomAuthContextType | undefined>(undefined)

export const useCustomAuth = () => {
  const context = useContext(CustomAuthContext)
  if (!context) {
    throw new Error("useCustomAuth must be used within a CustomAuthProvider")
  }
  return context
}

interface CustomAuthProviderProps {
  children: ReactNode
}

export const CustomAuthProvider = ({ children }: CustomAuthProviderProps) => {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se o usuário está autenticado ao carregar a página
    const currentUser = CustomAuthService.getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { user, error } = await CustomAuthService.signIn(email, password)

      if (user) {
        setUser(user)
      }

      return { error }
    } catch (error) {
      return { error: (error as Error).message }
    }
  }

  const signOut = async () => {
    await CustomAuthService.signOut()
    setUser(null)
  }

  return (
    <CustomAuthContext.Provider value={{ user, isLoading, signIn, signOut }}>{children}</CustomAuthContext.Provider>
  )
}
