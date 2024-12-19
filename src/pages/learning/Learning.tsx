import React from "react";
import { Link } from "react-router-dom";
import { FaBook, FaVideo, FaFileCode } from "react-icons/fa";

const Learning: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Aprendizado</h1>
      <ul className="space-y-4">
        <li>
          <Link
            to="/aprendizado/tutoriais"
            className="flex items-center space-x-2 text-[var(--text-primary)] hover:text-[var(--hover-primary)] transition-all"
          >
            <FaBook />
            <span>Tutoriais</span>
          </Link>
        </li>
        <li>
          <Link
            to="/aprendizado/cursos"
            className="flex items-center space-x-2 text-[var(--text-primary)] hover:text-[var(--hover-primary)] transition-all"
          >
            <FaVideo />
            <span>Cursos</span>
          </Link>
        </li>
        <li>
          <Link
            to="/aprendizado/materiais"
            className="flex items-center space-x-2 text-[var(--text-primary)] hover:text-[var(--hover-primary)] transition-all"
          >
            <FaFileCode />
            <span>Materiais</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Learning;
