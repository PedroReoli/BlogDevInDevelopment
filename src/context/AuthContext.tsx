"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { supabase } from "../services/supabase"
import { getCurrentUser, getUserProfile } from "../services/auth"
import type { UserProfile } from "../services/supabase"

interface AuthUser {
  id: string
  email: string
}

interface AuthContextType {
  user: AuthUser | null
  profile: UserProfile | null
  isAuthenticated: boolean
  isLoading: boolean
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,
  refreshUser: async () => {},
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = async () => {
    try {
      const currentUser = await getCurrentUser()

      if (currentUser) {
        setUser({
          id: currentUser.id,
          email: currentUser.email || "",
        })

        // Buscar perfil do usuário
        const userProfile = await getUserProfile(currentUser.id)
        setProfile(userProfile)
      } else {
        setUser(null)
        setProfile(null)
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error)
      setUser(null)
      setProfile(null)
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true)
      await refreshUser()
      setIsLoading(false)
    }

    initAuth()

    // Configurar listener para mudanças de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        await refreshUser()
      } else if (event === "SIGNED_OUT") {
        setUser(null)
        setProfile(null)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const value = {
    user,
    profile,
    isAuthenticated: !!user,
    isLoading,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
