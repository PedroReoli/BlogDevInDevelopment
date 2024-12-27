import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaCogs, FaSignOutAlt, FaGithub, FaTimes } from "react-icons/fa";

interface Section {
  name: string;
  items: { title: string; link: string }[];
}

interface HamburguerMenuProps {
  sections: Section[];
  onClose: () => void;
}

const HamburguerMenu: React.FC<HamburguerMenuProps> = ({
  sections,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.focus();
    }
  }, []);

  return (
    <div 
      ref={menuRef}
      className="bg-[var(--bg-primary)] w-full h-full flex flex-col overflow-y-auto"
      tabIndex={-1}
    >
      <nav className="flex-grow py-4 px-4 sm:py-6 sm:px-6 text-[var(--text-primary)]">
        {/* Header do Menu */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">Menu</h2>
          <button
            onClick={onClose}
            className="text-xl sm:text-2xl text-[var(--text-secondary)] hover:text-[var(--hover-primary)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--hover-primary)] rounded"
            aria-label="Fechar menu"
          >
            <FaTimes />
          </button>
        </div>

        {/* Itens do Menu */}
        <ul className="space-y-6">
          {sections.map((section) => (
            <li key={section.name} className="border-b border-[var(--border-primary)] pb-4">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 capitalize">{section.name}</h3>
              <ul className="space-y-2 pl-2">
                {section.items.map((item) => (
                  <li key={item.link}>
                    <Link
                      to={item.link}
                      className="block py-2 hover:text-[var(--hover-primary)] transition-all focus:outline-none focus:text-[var(--hover-primary)]"
                      onClick={onClose}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Opções Adicionais */}
        <ul className="mt-6 space-y-4">
          <li>
            <Link
              to="/profile"
              className="flex items-center space-x-3 py-2 hover:text-[var(--hover-primary)] transition-all focus:outline-none focus:text-[var(--hover-primary)]"
              onClick={onClose}
            >
              <FaUser className="text-xl" />
              <span>Perfil</span>
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center space-x-3 py-2 hover:text-[var(--hover-primary)] transition-all focus:outline-none focus:text-[var(--hover-primary)]"
              onClick={onClose}
            >
              <FaCogs className="text-xl" />
              <span>Configurações</span>
            </Link>
          </li>
          <li>
            <button
              className="flex items-center space-x-3 py-2 text-red-500 hover:text-red-700 transition-all w-full text-left focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
              onClick={() => {
                alert("Logout realizado!");
                onClose();
              }}
            >
              <FaSignOutAlt className="text-xl" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Avaliação no GitHub */}
      <div className="mt-auto border-t border-[var(--border-primary)] p-4 sm:p-6">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-[var(--bg-secondary)] hover:bg-[var(--hover-primary)] rounded-lg px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--hover-primary)]"
        >
          <div className="flex items-center space-x-3">
            <FaGithub className="text-xl sm:text-2xl text-[var(--hover-primary)]" />
            <span className="text-sm sm:text-base">Avalie no GitHub</span>
          </div>
          <span className="bg-blue-500 text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded-full">
            45.1K
          </span>
        </a>
      </div>
    </div>
  );
};

export default HamburguerMenu;

