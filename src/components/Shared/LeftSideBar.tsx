import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaQuestionCircle,
  FaUsers,
  FaHandsHelping,
  FaBriefcase,
  FaComments,
  FaBug,
  FaGithub,
  FaDonate,
  FaCompass,
  FaFlask,
  FaHandsHelping as FaContribute,
} from "react-icons/fa";

const LeftSideBar: React.FC = () => {
  const copyPix = () => {
    navigator.clipboard.writeText("87ed50aa-9526-46a2-8aec-e1a1cce4a9e4");
    alert("Chave Pix copiada com sucesso!");
  };

  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-lg custom-scrollbar">
      <nav className="p-4">
        {/* Navegação */}
        <div className="flex items-center mb-2 space-x-2">
          <h3 className="text-lg font-semibold">Navegação</h3>
          <FaCompass className="text-[var(--hover-primary)]" />
        </div>
        <hr className="border-[var(--border-primary)] mb-4" />
        <ul className="space-y-4">
          <li>
            <Link to="/" className="flex items-center space-x-2 hover:text-[var(--hover-primary)]">
              <FaHome />
              <span>Início</span>
            </Link>
          </li>
          <li>
            <Link
              to="/questoes"
              className="flex items-center space-x-2 hover:text-[var(--hover-primary)]"
            >
              <FaQuestionCircle />
              <span>Questões</span>
            </Link>
          </li>
          <li>
            <Link
              to="/usuarios"
              className="flex items-center space-x-2 hover:text-[var(--hover-primary)]"
            >
              <FaUsers />
              <span>Usuários</span>
            </Link>
          </li>
          <li>
            <Link
              to="/apoiadores"
              className="flex items-center space-x-2 hover:text-[var(--hover-primary)]"
            >
              <FaHandsHelping />
              <span>Apoiadores</span>
            </Link>
          </li>
        </ul>

        {/* Laboratório */}
        <div className="flex items-center mt-6 mb-2 space-x-2">
          <h4 className="text-lg font-semibold">Laboratório</h4>
          <FaFlask className="text-[var(--hover-primary)]" />
        </div>
        <hr className="border-[var(--border-primary)] mb-4" />
        <ul className="space-y-4">
          <li>
            <Link
              to="/vagas"
              className="flex items-center space-x-2 hover:text-[var(--hover-primary)]"
            >
              <FaBriefcase />
              <span>Vagas</span>
            </Link>
          </li>
          <li>
            <Link
              to="/discussoes"
              className="flex items-center space-x-2 hover:text-[var(--hover-primary)]"
            >
              <FaComments />
              <span>Discussões</span>
            </Link>
          </li>
        </ul>

        {/* Contribua */}
        <div className="flex items-center mt-6 mb-2 space-x-2">
          <h4 className="text-lg font-semibold">Contribua</h4>
          <FaContribute className="text-[var(--hover-primary)]" />
        </div>
        <hr className="border-[var(--border-primary)] mb-4" />
        <ul className="space-y-4">
          <li>
            <a
              href="mailto:pedrosousa2160@gmail.com"
              className="flex items-center space-x-2 hover:text-[var(--hover-primary)]"
            >
              <FaBug />
              <span>Reportar um bug</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/PedroReoli"
              target="_blank"
              className="flex items-center space-x-2 hover:text-[var(--hover-primary)]"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span>Github</span>
            </a>
          </li>
          <li>
            <button
              onClick={copyPix}
              className="flex items-center space-x-2 hover:text-[var(--hover-primary)]"
            >
              <FaDonate />
              <span>Copiar chave Pix</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default LeftSideBar;
