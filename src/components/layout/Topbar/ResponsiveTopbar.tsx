import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HamburguerMenu from "@/components/Shared/HamburguerMenu";
import ThemeSwitch from "@/components/Shared/ThemeSwitch";
import NotificationBell from "@/components/Shared/NotificationBell";
import { FaBars, FaTimes } from "react-icons/fa";

interface Section {
  name: string;
  items: { title: string; link: string }[];
}

const ResponsiveTopbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isExtraSmallScreen, setIsExtraSmallScreen] = useState<boolean>(false);

  // Função para atualizar o estado com base no tamanho da tela
  const handleResize = () => {
    setIsExtraSmallScreen(window.innerWidth <= 520); // "xs" no Tailwind é <= 640px
  };

  useEffect(() => {
    handleResize(); // Checa inicialmente
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Limpa o evento ao desmontar
  }, []);

  const toggleMenu = (): void => setMenuOpen((prev) => !prev);

  const sections: Section[] = [
    {
      name: "aprendizado",
      items: [
        { title: "Tutoriais", link: "/aprendizado/tutoriais" },
        { title: "Cursos", link: "/aprendizado/cursos" },
      ],
    },
    {
      name: "comunidade",
      items: [
        { title: "Fórum", link: "/comunidade/forum" },
        { title: "Eventos", link: "/comunidade/eventos" },
      ],
    },
    {
      name: "profissional",
      items: [
        { title: "Vagas", link: "/profissional/vagas" },
        { title: "Networking", link: "/profissional/networking" },
      ],
    },
    {
      name: "blog",
      items: [
        { title: "Artigos", link: "/blog/artigos" },
        { title: "Notícias", link: "/blog/noticias" },
      ],
    },
  ];

  return (
    <header className="w-full py-2 px-3 shadow-md sticky top-0 z-50 transition-all duration-300 bg-[var(--bg-secondary)] text-[var(--text-primary)] border-b border-[var(--border-primary)]">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo e Nome */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/images/logo.svg"
            alt="Logo"
            className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10"
          />
          <span className="text-sm sm:text-base md:text-xl font-bold text-[var(--hover-primary)] hover:text-blue-400 transition-all">
            {isExtraSmallScreen ? "Dev" : "DevEmDesenvolvimento"}
          </span>
        </Link>

        {/* Tema, Notificações e Hamburguer */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <ThemeSwitch />
          <NotificationBell />
          <button
            onClick={toggleMenu}
            className="text-[var(--text-primary)] text-xl sm:text-2xl focus:outline-none lg:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Sidebar Responsiva */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-4/5 md:w-80 shadow-2xl transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-50 bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-y-auto`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={toggleMenu}
            className="text-[var(--text-primary)] text-2xl focus:outline-none"
            aria-label="Fechar menu"
          >
            <FaTimes />
          </button>
        </div>
        <HamburguerMenu
          sections={sections}
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
