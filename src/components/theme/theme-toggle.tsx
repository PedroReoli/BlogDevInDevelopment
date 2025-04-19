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
      className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none ${className}`}
      style={{
        backgroundColor: theme === "light" ? "" : "",
        boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.2)",
      }}
      aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
      title={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
    >
      {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
    </button>
  )
}

export default ThemeToggle
