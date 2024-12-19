import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";

const ThemeSwitch: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--hover-primary)] transition-all duration-300 flex items-center justify-center"
      aria-label="Alternar tema"
    >
      <div
        className={`transition-transform duration-300 ${
          theme === "light" ? "rotate-0 opacity-100" : "rotate-180 opacity-0"
        }`}
      >
        <FiSun size={20} className="text-[var(--text-primary)]" />
      </div>
      <div
        className={`absolute transition-transform duration-300 ${
          theme === "dark" ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"
        }`}
      >
        <FiMoon size={20} className="text-[var(--text-primary)]" />
      </div>
    </button>
  );
};

export default ThemeSwitch;
