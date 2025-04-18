"use client"

import { createContext, useContext, type ReactNode } from "react"

// Definindo o tipo para o contexto
interface ThemeContextType {
  theme: string
  toggleTheme: () => void
}

// Criando o contexto com um valor padrão
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Hook personalizado para usar o contexto
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

// Componente provedor
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Sempre retorna "dark" como tema fixo
  const theme = "dark"

  // Função vazia para manter compatibilidade
  const toggleTheme = () => {
    // Não faz nada, já que o tema é fixo
    console.log("Theme toggle attempted, but theme is fixed to dark")
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
