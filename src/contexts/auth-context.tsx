"use client"

import type React from "react"

import { createContext, useContext } from "react"
import { useCustomAuth } from "./custom-auth-context"
import { UserSettingsService } from "@/services/user-settings-service"

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

  // Criar configurações iniciais quando o usuário faz login
  const signIn = async (email: string, password: string) => {
    const result = await customAuth.signIn(email, password)

    if (!result.error && customAuth.user) {
      // Criar configurações iniciais para o usuário
      await UserSettingsService.createInitialSettings(customAuth.user.id, email)
    }

    return result
  }

  // Mapeando para a interface antiga
  const compatValue = {
    user: customAuth.user,
    isLoading: customAuth.isLoading,
    signIn,
    signOut: customAuth.signOut,
  }

  return <AuthContext.Provider value={compatValue}>{children}</AuthContext.Provider>
}
