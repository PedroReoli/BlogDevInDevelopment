"use client"

import { useTheme } from "@/contexts/theme-context"
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi"

const ThemeSettings = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="bg-card p-6 rounded-lg shadow-md transition-colors duration-300">
      <h3 className="text-xl font-bold mb-4">Configurações de Tema</h3>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => setTheme("light")}
          className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
            theme === "light" ? "bg-primary/10 text-primary" : "hover:bg-foreground"
          }`}
        >
          <FiSun size={20} />
          <span>Tema Claro</span>
        </button>

        <button
          onClick={() => setTheme("dark")}
          className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
            theme === "dark" ? "bg-primary/10 text-primary" : "hover:bg-foreground"
          }`}
        >
          <FiMoon size={20} />
          <span>Tema Escuro</span>
        </button>

        <button
          onClick={() => {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            setTheme(prefersDark ? "dark" : "light")
          }}
          className="flex items-center gap-3 p-3 rounded-md hover:bg-foreground transition-colors"
        >
          <FiMonitor size={20} />
          <span>Usar Preferência do Sistema</span>
        </button>
      </div>
    </div>
  )
}

export default ThemeSettings
