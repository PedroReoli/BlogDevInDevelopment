import React, { useState } from "react";
import { Link } from "react-router-dom";
import HamburguerMenu from "@/components/Shared/HamburguerMenu";
import ThemeSwitch from "@/components/Shared/ThemeSwitch";
import NotificationBell from "@/components/Shared/NotificationBell";
import { FaBars, FaTimes } from "react-icons/fa";

const ResponsiveTopbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="w-full py-2 px-2 xs:px-3 sm:py-3 sm:px-4 shadow-md sticky top-0 z-50 transition-all duration-300 bg-[var(--bg-secondary)] text-[var(--text-primary)] border-b border-[var(--border-primary)]">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo e Nome */}
        <Link to="/" className="flex items-center space-x-1 xs:space-x-2 sm:space-x-3">
          <img
            src="/images/logo.svg"
            alt="Logo"
            className="h-6 w-6 xs:h-8 xs:w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"
          />
          <span className="text-sm xs:text-base sm:text-xl md:text-2xl font-bold text-[var(--hover-primary)] hover:text-blue-400 transition-all truncate max-w-[150px] xs:max-w-none">
            <span className="hidden xs:inline">DevEm</span>
            <span className="xs:hidden">Dev</span>
            Desenvolvimento
          </span>
        </Link>

        {/* Tema, Notificações e Hamburguer */}
        <div className="flex items-center space-x-1 xs:space-x-2 sm:space-x-4">
          <ThemeSwitch />
          <NotificationBell />
          <button
            onClick={toggleMenu}
            className="text-[var(--text-primary)] text-xl xs:text-2xl sm:text-3xl focus:outline-none lg:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Sidebar Responsiva */}
      <div
        className={`fixed top-0 right-0 h-full w-full xs:w-4/5 sm:w-80 shadow-2xl transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-50 bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-y-auto`}
      >
        <div className="flex justify-end p-2 xs:p-4">
          <button
            onClick={toggleMenu}
            className="text-[var(--text-primary)] text-xl xs:text-2xl sm:text-3xl focus:outline-none"
            aria-label="Fechar menu"
          >
            <FaTimes />
          </button>
        </div>
        <HamburguerMenu
          sections={["aprendizado", "comunidade", "profissional", "blog"]}
          onClose={() => setMenuOpen(false)}
        />
      </div>

      {/* Overlay para fechar o menu ao clicar fora */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
};

export default ResponsiveTopbar;

