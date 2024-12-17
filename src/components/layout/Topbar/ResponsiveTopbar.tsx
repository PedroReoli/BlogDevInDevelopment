import React, { useState } from "react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import NotificationBell from "@/components/Shared/NotificationBell";
import ThemeSwitch from "@/components/Shared/ThemeSwitch";
import { FaBars, FaTimes } from "react-icons/fa";
import HamburguerMenu from "@/components/Shared/HamburguerMenu";

const sections = ["blogs", "aulas", "projetos", "perfil"];

const ResponsiveTopbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] py-4 px-6 shadow-md sticky top-0 z-50 border-b border-[var(--border-color)]">
      {/* Topbar Container */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/images/logo.svg" alt="Logo" className="h-10 w-10" />
          <span className="text-xl font-bold">
            {!animationComplete ? (
              <Typewriter
                options={{ autoStart: true, delay: 50 }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString("DevEmDesenvolvimento")
                    .callFunction(() => setAnimationComplete(true))
                    .start();
                }}
              />
            ) : (
              "DevEmDesenvolvimento"
            )}
          </span>
        </Link>

        {/* Ícones Fixos */}
        <div className="flex items-center space-x-4">
          <ThemeSwitch />
          <NotificationBell />

          {/* Menu Toggle (Hamburguer) */}
          <button
            onClick={toggleMenu}
            className="text-[var(--text-primary)] text-2xl md:hidden focus:outline-none"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Menu Responsivo */}
      {menuOpen && (
        <div className="mt-4 md:hidden">
          <HamburguerMenu sections={sections} onClose={() => setMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default ResponsiveTopbar;
