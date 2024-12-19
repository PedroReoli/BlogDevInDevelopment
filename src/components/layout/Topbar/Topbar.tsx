import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaBook,
  FaVideo,
  FaFileCode,
  FaBriefcase,
  FaNetworkWired,
  FaCalendarAlt,
} from "react-icons/fa";
import ThemeSwitch from "@/components/Shared/ThemeSwitch";
import NotificationBell from "@/components/Shared/NotificationBell";
import DropdownMenu from "@/components/Shared/DropdownMenu";

const Topbar: React.FC = () => {
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [isLoggedIn] = useState(false); // Simulando controle de login

  const toggleDropdown = (menu: string) => {
    setDropdown((prev) => (prev === menu ? null : menu));
  };

  return (
    <header className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-3 px-4 lg:px-6 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo e Nome */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/images/logo.svg" alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-blue-500 hover:text-blue-400 transition-all">
            DevEmDesenvolvimento
          </span>
        </Link>

        {/* Menu Principal */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm xl:text-base">
          {/* Dropdown Aprendizado */}
          <DropdownMenu
            title="Aprendizado"
            isOpen={dropdown === "aprendizado"}
            onToggle={() => toggleDropdown("aprendizado")}
            items={[
              { title: "Tutoriais", description: "Explore guias e exemplos.", icon: <FaBook />, link: "/aprendizado/tutoriais" },
              { title: "Cursos", description: "Aprimore-se com cursos.", icon: <FaVideo />, link: "/aprendizado/cursos" },
              { title: "Materiais", description: "Recursos para aprender.", icon: <FaFileCode />, link: "/aprendizado/materiais" },
            ]}
          />

          <Link to="/comunidade" className="hover:text-blue-400 transition-all">
            Comunidade
          </Link>

          <Link to="/blog" className="hover:text-blue-400 transition-all">
            Blog
          </Link>

          {/* Dropdown Profissional */}
          <DropdownMenu
            title="Profissional"
            isOpen={dropdown === "profissional"}
            onToggle={() => toggleDropdown("profissional")}
            position="right"
            items={[
              { title: "Portal de Vagas", description: "Encontre oportunidades.", icon: <FaBriefcase />, link: "/vagas" },
              { title: "Networking", description: "Conecte-se com outros.", icon: <FaNetworkWired />, link: "/networking" },
              { title: "Eventos", description: "Participe de eventos.", icon: <FaCalendarAlt />, link: "/eventos" },
            ]}
          />
        </nav>

        {/* Ações à Direita */}
        <div className="flex items-center space-x-4">
          {/* Avalie no GitHub */}
          <div className="hidden xl:flex items-center space-x-2 hover:text-gray-300 transition-all">
            <FaGithub />
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm"
            >
              Avalie no GitHub
            </a>
            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
              45.1K
            </span>
          </div>

          {/* Notificações */}
          <NotificationBell />

          {/* Tema */}
          <ThemeSwitch />

          {/* Login ou Perfil */}
          {isLoggedIn ? (
            <Link
              to="/profile"
              className="flex items-center space-x-2 hover:text-gray-300 transition-all"
            >
              <div className="h-8 w-8 bg-gray-600 rounded-full overflow-hidden">
                <img
                  src="/images/profile.jpg"
                  alt="Perfil"
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-all"
            >
              Fazer Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
