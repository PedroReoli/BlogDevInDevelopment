import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaCogs, FaSignOutAlt } from "react-icons/fa";

interface HamburguerMenuProps {
  sections: string[];
  onClose: () => void;
}

const HamburguerMenu: React.FC<HamburguerMenuProps> = ({
  sections,
  onClose,
}) => {
  return (
    <nav className="bg-[var(--bg-primary)] rounded-lg shadow-lg py-4 px-6">
      <ul className="flex flex-col space-y-4">
        {sections.map((section, idx) => (
          <li key={idx}>
            <Link
              to={`/${section}`}
              className="block text-[var(--text-primary)] hover:text-[var(--hover-primary)] font-medium transition"
              onClick={onClose}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          </li>
        ))}

        {/* Opções Extras */}
        <li className="border-t border-[var(--border-primary)] pt-4 mt-4">
          <Link
            to="/profile"
            className="flex items-center space-x-2 text-[var(--text-primary)] hover:text-[var(--hover-primary)] transition"
            onClick={onClose}
          >
            <FaUser /> <span>Perfil</span>
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className="flex items-center space-x-2 text-[var(--text-primary)] hover:text-[var(--hover-primary)] transition"
            onClick={onClose}
          >
            <FaCogs /> <span>Configurações</span>
          </Link>
        </li>
        <li>
          <button
            className="flex items-center space-x-2 text-red-500 hover:text-red-700 transition w-full text-left"
            onClick={() => alert("Logout realizado!")}
          >
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default HamburguerMenu;
