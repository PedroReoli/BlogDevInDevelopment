import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaCogs, FaSignOutAlt, FaGithub, FaTimes } from "react-icons/fa";

interface HamburguerMenuProps {
  sections: string[];
  onClose: () => void;
}

const HamburguerMenu: React.FC<HamburguerMenuProps> = ({
  sections,
  onClose,
}) => {
  return (
    <nav className="bg-[var(--bg-primary)] w-full h-full flex flex-col py-6 px-6 text-[var(--text-primary)]">
      {/* Header do Menu */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Menu</h2>
        <button
          onClick={onClose}
          className="text-2xl text-[var(--text-secondary)] hover:text-[var(--hover-primary)] transition-all focus:outline-none"
        >
          <FaTimes />
        </button>
      </div>

      {/* Itens do Menu */}
      <ul className="flex flex-col space-y-4 text-lg font-medium">
        {sections.map((section, idx) => (
          <li key={idx}>
            <Link
              to={`/${section}`}
              className="flex items-center space-x-3 hover:text-[var(--hover-primary)] transition-all"
              onClick={onClose}
            >
              <span>{section.charAt(0).toUpperCase() + section.slice(1)}</span>
            </Link>
          </li>
        ))}

        {/* Opções Adicionais */}
        <li className="border-t border-[var(--border-primary)] pt-4">
          <Link
            to="/profile"
            className="flex items-center space-x-3 hover:text-[var(--hover-primary)] transition-all"
            onClick={onClose}
          >
            <FaUser className="text-xl" />
            <span>Perfil</span>
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className="flex items-center space-x-3 hover:text-[var(--hover-primary)] transition-all"
            onClick={onClose}
          >
            <FaCogs className="text-xl" />
            <span>Configurações</span>
          </Link>
        </li>
        <li>
          <button
            className="flex items-center space-x-3 text-red-500 hover:text-red-700 transition-all w-full text-left"
            onClick={() => alert("Logout realizado!")}
          >
            <FaSignOutAlt className="text-xl" />
            <span>Logout</span>
          </button>
        </li>
      </ul>

      {/* Avaliação no GitHub */}
      <div className="mt-auto border-t border-[var(--border-primary)] pt-4">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-[var(--bg-secondary)] hover:bg-[var(--hover-primary)] rounded-lg px-4 py-3 transition-all"
        >
          <div className="flex items-center space-x-3">
            <FaGithub className="text-2xl text-[var(--hover-primary)]" />
            <span>Avalie no GitHub</span>
          </div>
          <span className="bg-blue-500 text-white text-sm font-semibold px-2 py-1 rounded-full">
            45.1K
          </span>
        </a>
      </div>
    </nav>
  );
};

export default HamburguerMenu;
