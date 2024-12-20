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
} from "react-icons/fa";
import ThemeSwitch from "@/components/Shared/ThemeSwitch";
import NotificationBell from "@/components/Shared/NotificationBell";
import DropdownMenu from "@/components/Shared/DropdownMenu";
import AvalieNoGitHub from "@/components/Shared/AvalieNoGithub";
import LoginOuPerfil from "@/components/Shared/LoginOuPerfil";

const Topbar: React.FC = () => {
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [isLoggedIn] = useState(false); // Simulando controle de login

  const toggleDropdown = (menu: string) => {
    setDropdown((prev) => (prev === menu ? null : menu));
  };

  const closeDropdown = () => {
    setDropdown(null);
  };

  return (
    <header className="w-full py-3 px-6 shadow-md sticky top-0 z-50 transition-all duration-300 bg-[var(--bg-secondary)] text-[var(--text-primary)] border-b border-[var(--border-primary)]">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo e Nome */}
        <Link to="/" className="flex items-center space-x-3">
          <img src="/images/logo.svg" alt="Logo" className="h-10 w-10" />
          <span className="text-xl font-bold text-[var(--hover-primary)] hover:text-blue-400 transition-all">
            DevEmDesenvolvimento
          </span>
        </Link>

        {/* Menu Principal */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm xl:text-base">
          {/* Dropdown Aprendizado */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("aprendizado")}
              className="flex items-center space-x-2 text-[var(--text-primary)] hover:text-[var(--hover-primary)] transition-all"
            >
              <span>Aprendizado</span>
              <span
                className={`transform transition-transform ${
                  dropdown === "aprendizado" ? "rotate-180" : "rotate-0"
                }`}
              >
                <FaChevronDown />
              </span>
            </button>
            <DropdownMenu
              isOpen={dropdown === "aprendizado"}
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
              onClose={closeDropdown}
              extraContent={{
                title: "Dicas de como estudar com mais eficiência",
                description:
                  "Aprenda métodos para otimizar seu aprendizado e melhorar sua retenção de conteúdo.",
                link: "/posts/dicas-estudo-eficiencia",
              }}
            />
          </div>

          {/* Dropdown Comunidade */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("comunidade")}
              className="flex items-center space-x-2 text-[var(--text-primary)] hover:text-[var(--hover-primary)] transition-all"
            >
              <span>Comunidade</span>
              <span
                className={`transform transition-transform ${
                  dropdown === "comunidade" ? "rotate-180" : "rotate-0"
                }`}
              >
                <FaChevronDown />
              </span>
            </button>
            <DropdownMenu
              isOpen={dropdown === "comunidade"}
              items={[
                {
                  title: "Usuários",
                  description: "Explore os perfis de usuários.",
                  icon: <FaUsers />,
                  link: "/usuarios",
                },
                {
                  title: "Discussões",
                  description: "Participe de debates e tópicos.",
                  icon: <FaComments />,
                  link: "/discussoes",
                },
              ]}
              onClose={closeDropdown}
              extraContent={{
                title: "Participe da Comunidade",
                description:
                  "Conecte-se com outros membros e troque experiências.",
                link: "/posts/participe-comunidade",
              }}
            />
          </div>

          {/* Dropdown Blog */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("blog")}
              className="flex items-center space-x-2 text-[var(--text-primary)] hover:text-[var(--hover-primary)] transition-all"
            >
              <span>Blog</span>
              <span
                className={`transform transition-transform ${
                  dropdown === "blog" ? "rotate-180" : "rotate-0"
                }`}
              >
                <FaChevronDown />
              </span>
            </button>
            <DropdownMenu
              isOpen={dropdown === "blog"}
              items={[
                {
                  title: "Post 1",
                  description: "Descrição do post 1.",
                  icon: <FaBook />,
                  link: "/blog/post-1",
                },
                {
                  title: "Post 2",
                  description: "Descrição do post 2.",
                  icon: <FaVideo />,
                  link: "/blog/post-2",
                },
                {
                  title: "Post 3",
                  description: "Descrição do post 3.",
                  icon: <FaFileCode />,
                  link: "/blog/post-3",
                },
              ]}
              onClose={closeDropdown}
              extraContent={{
                title: "Explore nossos artigos",
                description: "Fique por dentro das últimas novidades e dicas.",
                link: "/posts/explore-artigos",
              }}
            />
          </div>

          {/* Dropdown Projetos */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("projetos")}
              className="flex items-center space-x-2 text-[var(--text-primary)] hover:text-[var(--hover-primary)] transition-all"
            >
              <span>Projetos</span>
              <span
                className={`transform transition-transform ${
                  dropdown === "projetos" ? "rotate-180" : "rotate-0"
                }`}
              >
                <FaChevronDown />
              </span>
            </button>
            <DropdownMenu
              isOpen={dropdown === "projetos"}
              items={[
                {
                  title: "Projeto 1",
                  description: "Descrição do projeto 1.",
                  icon: <FaBriefcase />,
                  link: "/projetos/projeto-1",
                },
                {
                  title: "Projeto 2",
                  description: "Descrição do projeto 2.",
                  icon: <FaNetworkWired />,
                  link: "/projetos/projeto-2",
                },
                {
                  title: "Projeto 3",
                  description: "Descrição do projeto 3.",
                  icon: <FaCalendarAlt />,
                  link: "/projetos/projeto-3",
                },
              ]}
              onClose={closeDropdown}
              extraContent={{
                title: "Conheça nossos projetos",
                description: "Veja os trabalhos desenvolvidos pela comunidade.",
                link: "/posts/conheca-projetos",
              }}
            />
          </div>

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
        <div className="flex items-center space-x-6">
          <AvalieNoGitHub />
          <NotificationBell />
          <ThemeSwitch />
          <LoginOuPerfil isLoggedIn={isLoggedIn} profileImage="/images/profile.jpg" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
