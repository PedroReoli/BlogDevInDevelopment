import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronDown,
  FaBook,
  FaVideo,
  FaFileCode,
  FaBriefcase,
  FaNetworkWired,
  FaCalendarAlt,
  FaUsers,
  FaComments,
  FaDiscord,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import ThemeSwitch from "@/components/Shared/ThemeSwitch";
import NotificationBell from "@/components/Shared/NotificationBell";
import DropdownMenu from "@/components/Shared/DropdownMenu";
import AvalieNoGitHub from "@/components/Shared/AvalieNoGithub";
import LoginOuPerfil from "@/components/Shared/LoginOuPerfil";

const Topbar: React.FC = () => {
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [isLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = (menu: string) => {
    setDropdown((prev) => (prev === menu ? null : menu));
  };

  const closeDropdown = () => {
    setDropdown(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const menuItems = [
    {
      name: "Aprendizado",
      items: [
        { title: "Tutoriais", description: "Explore guias e exemplos.", icon: <FaBook />, link: "/aprendizado/tutoriais" },
        { title: "Cursos", description: "Aprimore-se com cursos.", icon: <FaVideo />, link: "/aprendizado/cursos" },
        { title: "Materiais", description: "Recursos para aprender.", icon: <FaFileCode />, link: "/aprendizado/materiais" },
      ],
      extraContent: {
        title: "Dicas de como estudar com mais eficiência",
        description: "Aprenda métodos para otimizar seu aprendizado e melhorar sua retenção de conteúdo.",
        link: "/posts/dicas-estudo-eficiencia",
      },
    },
    {
      name: "Comunidade",
      items: [
        { title: "Usuários", description: "Explore os perfis de usuários.", icon: <FaUsers />, link: "/usuarios" },
        { title: "Discussões", description: "Participe de debates e tópicos.", icon: <FaComments />, link: "/discussoes" },
      ],
      extraContent: {
        title: "Participe da Comunidade",
        description: "Conecte-se com outros membros e troque experiências.",
        link: "/posts/participe-comunidade",
      },
    },
    {
      name: "Blog",
      items: [
        { title: "Post 1", description: "Descrição do post 1.", icon: <FaBook />, link: "/blog/post-1" },
        { title: "Post 2", description: "Descrição do post 2.", icon: <FaVideo />, link: "/blog/post-2" },
        { title: "Post 3", description: "Descrição do post 3.", icon: <FaFileCode />, link: "/blog/post-3" },
      ],
      extraContent: {
        title: "Explore nossos artigos",
        description: "Fique por dentro das últimas novidades e dicas.",
        link: "/posts/explore-artigos",
      },
    },
    {
      name: "Projetos",
      items: [
        { title: "Projeto 1", description: "Descrição do projeto 1.", icon: <FaBriefcase />, link: "/projetos/projeto-1" },
        { title: "Projeto 2", description: "Descrição do projeto 2.", icon: <FaNetworkWired />, link: "/projetos/projeto-2" },
        { title: "Projeto 3", description: "Descrição do projeto 3.", icon: <FaCalendarAlt />, link: "/projetos/projeto-3" },
      ],
      extraContent: {
        title: "Conheça nossos projetos",
        description: "Veja os trabalhos desenvolvidos pela comunidade.",
        link: "/posts/conheca-projetos",
      },
    },
  ];

  return (
    <header className="w-full py-3 px-4 sm:px-6 shadow-md sticky top-0 z-50 transition-all duration-300 bg-[var(--bg-secondary)] text-[var(--text-primary)] border-b border-[var(--border-primary)]">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo e Nome */}
        <Link to="/" className="flex items-center space-x-3">
          <img src="/images/logo.svg" alt="Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
          <span className="text-lg sm:text-xl font-bold text-[var(--hover-primary)] hover:text-blue-400 transition-all">
            DevEmDesenvolvimento
          </span>
        </Link>

        {/* Menu Principal (Desktop) */}
        <nav className="hidden xl:flex items-center space-x-6 text-sm">
          {menuItems.map((item) => (
            <div key={item.name} className="relative">
              <button
                onClick={() => toggleDropdown(item.name)}
                className="flex items-center space-x-2 text-[var(--text-primary)] hover:text-[var(--hover-primary)] transition-all"
              >
                <span>{item.name}</span>
                <span
                  className={`transform transition-transform ${
                    dropdown === item.name ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronDown />
                </span>
              </button>
              <DropdownMenu
                isOpen={dropdown === item.name}
                items={item.items}
                onClose={closeDropdown}
                extraContent={item.extraContent}
              />
            </div>
          ))}
          <Link
            to="https://discord.gg/teDfu39G7r"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-[var(--hover-primary)] transition-all"
          >
            <FaDiscord />
            <span>Discord</span>
          </Link>
        </nav>

        {/* Ações à Direita */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <div className="hidden sm:block">
            <AvalieNoGitHub />
          </div>
          <NotificationBell />
          <ThemeSwitch />
          <div className="hidden sm:block">
            <LoginOuPerfil isLoggedIn={isLoggedIn} profileImage="/images/profile.jpg" />
          </div>
          <button
            onClick={toggleMobileMenu}
            className="text-2xl xl:hidden focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <nav className="xl:hidden mt-4 pb-4">
          {menuItems.map((item) => (
            <div key={item.name} className="py-2">
              <button
                onClick={() => toggleDropdown(item.name)}
                className="flex items-center justify-between w-full text-left px-4 py-2 hover:bg-[var(--bg-hover)] transition-colors"
              >
                <span>{item.name}</span>
                <FaChevronDown
                  className={`transform transition-transform ${
                    dropdown === item.name ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {dropdown === item.name && (
                <div className="pl-8 mt-2 space-y-2">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.title}
                      to={subItem.link}
                      className="block px-4 py-2 hover:bg-[var(--bg-hover)] transition-colors"
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            to="https://discord.gg/teDfu39G7r"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 hover:bg-[var(--bg-hover)] transition-colors"
          >
            <FaDiscord />
            <span>Discord</span>
          </Link>
          <div className="sm:hidden mt-4 px-4">
            <LoginOuPerfil isLoggedIn={isLoggedIn} profileImage="/images/profile.jpg" />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Topbar;

