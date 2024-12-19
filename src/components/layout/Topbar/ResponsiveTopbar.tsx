import React, { useState } from "react";
import { Link } from "react-router-dom";
import HamburguerMenu from "@/components/Shared/HamburguerMenu";
import ThemeSwitch from "@/components/Shared/ThemeSwitch";
import NotificationBell from "@/components/Shared/NotificationBell";
import { FaBars } from "react-icons/fa";

const ResponsiveTopbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="w-full py-3 px-4 shadow-md sticky top-0 z-50 transition-all duration-300 bg-[var(--bg-secondary)] text-[var(--text-primary)] border-b border-[var(--border-primary)]">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo e Nome */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/images/logo.svg"
            alt="Logo"
            className="h-12 w-12"
          />
          <span className="text-2xl font-bold text-[var(--hover-primary)] hover:text-blue-400 transition-all">
            DevEmDesenvolvimento
          </span>
        </Link>

        {/* Tema, Notificações e Hamburguer */}
        <div className="flex items-center space-x-4">
          <ThemeSwitch />
          <NotificationBell />
          <button
            onClick={toggleMenu}
            className="text-[var(--text-primary)] text-3xl focus:outline-none lg:hidden"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Sidebar Responsiva */}
      <div
        className={`fixed top-0 right-0 h-full w-80 shadow-2xl transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-50 bg-[var(--bg-primary)] text-[var(--text-primary)]`}
      >
        <HamburguerMenu
          sections={["aprendizado", "comunidade", "profissional", "blog"]}
          onClose={() => setMenuOpen(false)}
        />
      </div>
    </header>
  );
};

export default ResponsiveTopbar;
