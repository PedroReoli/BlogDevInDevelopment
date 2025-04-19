"use client"

import { FiSun, FiMoon } from "react-icons/fi"
import { useTheme } from "@/contexts/theme-context"
import { useEffect, useState } from "react"

interface ThemeToggleProps {
  className?: string
}

const ThemeToggle = ({ className = "" }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evitar problemas de hidratação
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={`w-9 h-9 ${className}`} />
  }

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full hover:bg-foreground transition-colors duration-200 ${className}`}
      aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
      title={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
    >
      {theme === "light" ? (
        <FiMoon size={20} className="text-text-primary" />
      ) : (
        <FiSun size={20} className="text-text-primary" />
      )}
    </button>
  )
}

export default ThemeToggle
