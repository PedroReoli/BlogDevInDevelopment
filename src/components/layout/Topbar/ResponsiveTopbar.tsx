import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaUsers,
  FaBriefcase,
  FaBook,
} from "react-icons/fa";
import NotificationBell from "@/components/Shared/NotificationBell";
import ThemeSwitch from "@/components/Shared/ThemeSwitch";

const ResponsiveTopbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] py-4 px-6 shadow-md sticky top-0 z-50 border-b border-[var(--border-color)]">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/images/logo.svg" alt="Logo" className="h-10 w-10" />
          <span className="text-xl font-bold">DevEmDesenvolvimento</span>
        </Link>

        <div className="flex items-center space-x-4">
          {/* Tema e Notificações */}
          <ThemeSwitch />
          <NotificationBell />

          {/* Perfil do Usuário */}
          <Link
            to="/profile"
            className="w-10 h-10 bg-[var(--hover-primary)] rounded-full flex items-center justify-center text-white text-lg hover:opacity-90 transition-all"
          >
            <FaUser />
          </Link>

          {/* Botão Menu (Hambúrguer) */}
          <button
            onClick={toggleMenu}
            className="text-[var(--text-primary)] text-2xl md:hidden focus:outline-none"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Sidebar Responsiva */}
      <div
        className={`fixed top-0 right-0 h-full max-w-[280px] bg-[var(--bg-secondary)] shadow-xl transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Botão de Fechar */}
          <button
            onClick={toggleMenu}
            className="self-end text-2xl mb-4 text-[var(--text-primary)] focus:outline-none"
          >
            <FaTimes />
          </button>

          {/* Tema e Notificações */}
          <div className="flex items-center justify-between mb-6">
            <ThemeSwitch />
            <NotificationBell />
          </div>

          {/* Navegação */}
          <nav className="flex-1">
            <ul className="space-y-6 text-lg">
              <li>
                <Link
                  to="/comunidade"
                  className="flex items-center space-x-4 text-[var(--text-primary)] hover:text-[var(--hover-primary)] transition-all"
                >
                  <FaUsers className="text-xl" />
                  <span>Comunidade</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profissional"
                  className="flex items-center space-x-4 text-[var(--text-primary)] hover:text-[var(--hover-primary)] transition-all"
                >
                  <FaBriefcase className="text-xl" />
                  <span>Profissional</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/aprendizado"
                  className="flex items-center space-x-4 text-[var(--text-primary)] hover:text-[var(--hover-primary)] transition-all"
                >
                  <FaBook className="text-xl" />
                  <span>Aprendizado</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Rodapé (Login/Logout) */}
          <div className="mt-auto">
            <Link
              to="/login"
              className="flex items-center justify-center space-x-4 bg-[var(--hover-primary)] text-white py-2 rounded-md hover:bg-blue-600 transition-all"
            >
              <FaUser className="text-lg" />
              <span>Fazer Login</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ResponsiveTopbar;
