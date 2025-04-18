"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "../../context/ThemeContext"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-colors"
      style={{ backgroundColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" }}
      aria-label={theme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"}
    >
      {theme === "dark" ? <Sun size={20} className="text-white" /> : <Moon size={20} />}
    </button>
  )
}

export default ThemeToggle
