"use client"

import { useState, useEffect } from "react"
import { FiSun, FiMoon } from "react-icons/fi"
import { useTheme } from "@/contexts/theme-context"

const FloatingThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Evitar problemas de hidratação
  useEffect(() => {
    setMounted(true)

    // Mostrar o botão após um scroll
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={toggleTheme}
      className={`fixed bottom-6 right-6 p-3 rounded-full bg-card shadow-lg z-40
                 transition-all duration-300 transform
                 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}
                 hover:bg-foreground`}
      aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
      title={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
    >
      {theme === "light" ? (
        <FiMoon size={24} className="text-text-primary" />
      ) : (
        <FiSun size={24} className="text-text-primary" />
      )}
    </button>
  )
}

export default FloatingThemeToggle
