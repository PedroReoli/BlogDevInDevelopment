"use client"

import type React from "react"

import { createContext, useContext } from "react"
import { useCustomAuth } from "./custom-auth-context"

// Criando um contexto de compatibilidade que usa o novo sistema
const AuthContext = createContext<any>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Este componente é apenas para compatibilidade com código existente
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Usando o novo sistema de autenticação
  const customAuth = useCustomAuth()

  // Mapeando para a interface antiga
  const compatValue = {
    user: customAuth.user,
    isLoading: customAuth.isLoading,
    signIn: customAuth.signIn,
    signOut: customAuth.signOut,
  }

  return <AuthContext.Provider value={compatValue}>{children}</AuthContext.Provider>
}
