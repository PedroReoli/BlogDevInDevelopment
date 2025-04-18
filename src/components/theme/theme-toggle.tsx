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
      className={`p-2 rounded-full transition-all duration-300 focus:outline-none ${className} ${
        theme === "dark"
          ? "bg-slate-800 hover:bg-slate-700 text-yellow-300"
          : "bg-slate-100 hover:bg-slate-200 text-slate-800"
      }`}
      aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
      title={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
    >
      <div className="relative w-5 h-5">
        {theme === "light" ? (
          <FiMoon size={20} className="absolute inset-0 transition-opacity duration-300 opacity-100" />
        ) : (
          <FiSun size={20} className="absolute inset-0 transition-opacity duration-300 opacity-100" />
        )}
      </div>
    </button>
  )
}

export default ThemeToggle
