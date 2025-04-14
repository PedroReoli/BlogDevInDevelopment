"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { FaChevronDown, FaBook, FaVideo, FaFileCode, FaUsers, FaComments, FaDiscord } from "react-icons/fa"
import ThemeSwitch from "@/components/Shared/ThemeSwitch"
import NotificationBell from "@/components/Shared/NotificationBell"
import DropdownMenu from "@/components/ui/DropdownMenu"
import AvalieNoGitHub from "@/components/ui/AvalieNoGithub"
import LoginOuPerfil from "@/components/ui/LoginOuPerfil"

const Topbar: React.FC = () => {
  const [dropdown, setDropdown] = useState(false)

  const toggleDropdown = () => {
    setDropdown((prev) => !prev)
  }

  const closeDropdown = () => {
    setDropdown(false)
  }
// dps transformar isso em um arquivo so e importar
  const menuItems = {
    aprendizado: [
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
      {
        title: "Documentação",
        description: "Guias técnicos detalhados.",
        icon: <FaBook />,
        link: "/aprendizado/documentacao",
      },
    ],
    social: [
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
      {
        title: "Comunidades",
        description: "Encontre comunidades para trocar ideias.",
        icon: <FaUsers />,
        link: "/comunidades",
      },
      {
        title: "Eventos",
        description: "Participe de eventos e webinars.",
        icon: <FaUsers />,
        link: "/eventos",
      },
    ],
  }

  const lastProject = {
    title: "Gerenciamento de ativos pioneiro",
    description: "Soluções para a economia circular com UNDO",
    link: "/projetos/undo",
    imageUrl: "/images/projeto3.jpg",
  }

  return (
    <header className="w-full py-3 px-4 sm:px-6 shadow-md sticky top-0 z-50 transition-all duration-300 bg-[var(--bg-secondary)] text-[var(--text-primary)] border-b border-[var(--border-primary)]">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left section: Logo and main navigation */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/images/logo.svg" alt="Logo" className="h-8 w-8" />
            <span className="text-lg font-bold text-[var(--hover-primary)] hover:text-blue-400 transition-all">
              DevEmDesenvolvimento
            </span>
          </Link>

          {/* Main navigation items */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-1 text-[var(--text-primary)] hover:text-[var(--hover-primary)] transition-all"
              >
                <span>Recursos</span>
                <FaChevronDown
                  className={`transform transition-transform ${dropdown ? "rotate-180" : "rotate-0"} text-xs`}
                />
              </button>
              {dropdown && (
                <DropdownMenu isOpen={dropdown} items={menuItems} onClose={closeDropdown} projectCard={lastProject} />
              )}
            </div>
            <Link to="/blog" className="hover:text-[var(--hover-primary)] transition-all">
              Blog
            </Link>
            <Link to="/docs" className="hover:text-[var(--hover-primary)] transition-all">
              Docs
            </Link>
            <Link to="/parcerias" className="hover:text-[var(--hover-primary)] transition-all">
              Parcerias
            </Link>
          </div>
        </div>

        {/* Right section*/}
        <div className="flex items-center space-x-4">
          <AvalieNoGitHub />

          <Link to="/discord" className="hover:text-[var(--hover-primary)] transition-all">
            <FaDiscord className="text-xl" />
          </Link>

          <NotificationBell />
          <ThemeSwitch />

          <LoginOuPerfil isLoggedIn={true} profileImage="/images/profile.jpg" />
        </div>
      </div>
    </header>
  )
}

export default Topbar

