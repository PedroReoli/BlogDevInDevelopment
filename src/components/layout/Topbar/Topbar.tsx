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
    <header className="w-full py-3 px-4 shadow-md sticky top-0 z-50 transition-all duration-300 bg-[var(--bg-secondary)] text-[var(--text-primary)] border-b border-[var(--border-primary)]">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo e Nome */}
        <Link to="/" className="flex items-center space-x-3">
          <img src="/images/logo.svg" alt="Logo" className="h-10 w-10" />
          <span className="text-xl font-bold text-[var(--hover-primary)] hover:text-blue-400 transition-all">
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
            className="bg-[var(--bg-primary)] text-[var(--text-primary)]"
            items={[
              {
                title: "Tutoriais",
                description: "Explore guias e exemplos.",
                icon: <FaBook />,
                link: "/aprendizado/tutoriais",
              },
              {
                title: "Cursos",
                description: "Aprimore-se com cursos.",
                icon: <FaVideo />,
                link: "/aprendizado/cursos",
              },
              {
                title: "Materiais",
                description: "Recursos para aprender.",
                icon: <FaFileCode />,
                link: "/aprendizado/materiais",
              },
            ]}
          />

          <Link
            to="/comunidade"
            className="hover:text-[var(--hover-primary)] transition-all"
          >
            Comunidade
          </Link>

          <Link
            to="/blog"
            className="hover:text-[var(--hover-primary)] transition-all"
          >
            Blog
          </Link>

          {/* Dropdown Profissional */}
          <DropdownMenu
            title="Profissional"
            isOpen={dropdown === "profissional"}
            onToggle={() => toggleDropdown("profissional")}
            className="bg-[var(--bg-primary)] text-[var(--text-primary)]"
            items={[
              {
                title: "Portal de Vagas",
                description: "Encontre oportunidades.",
                icon: <FaBriefcase />,
                link: "/vagas",
              },
              {
                title: "Networking",
                description: "Conecte-se com outros.",
                icon: <FaNetworkWired />,
                link: "/networking",
              },
              {
                title: "Eventos",
                description: "Participe de eventos.",
                icon: <FaCalendarAlt />,
                link: "/eventos",
              },
            ]}
          />
        </nav>

        {/* Ações à Direita */}
        <div className="flex items-center space-x-4">
          {/* Avalie no GitHub */}
          <div className="hidden xl:flex items-center space-x-2 hover:text-[var(--hover-primary)] transition-all">
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
              className="flex items-center space-x-2 hover:text-[var(--hover-primary)] transition-all"
            >
              <div className="h-8 w-8 bg-[var(--bg-primary)] rounded-full overflow-hidden">
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
