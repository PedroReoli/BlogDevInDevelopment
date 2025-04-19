"use client"

import { useState, useEffect } from "react"
import { FiSun, FiMoon, FiArrowUp } from "react-icons/fi"
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
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!mounted) return null

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-40">
      <button
        onClick={scrollToTop}
        className={`p-3 rounded-full shadow-lg
                   transition-all duration-300 transform
                   ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}
                   focus:outline-none
                   ${theme === "dark" ? "bg-slate-800 text-slate-200" : "bg-white text-slate-800"}`}
        aria-label="Voltar ao topo"
        title="Voltar ao topo"
      >
        <FiArrowUp size={20} />
      </button>

      <button
        onClick={toggleTheme}
        className={`p-3 rounded-full shadow-lg
                   transition-all duration-300 transform
                   focus:outline-none
                   ${
                     theme === "dark"
                       ? "bg-slate-800 text-yellow-300 hover:bg-slate-700"
                       : "bg-white text-slate-800 hover:bg-slate-100"
                   }`}
        aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
        title={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
      >
        {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
      </button>
    </div>
  )
}

export default FloatingThemeToggle
