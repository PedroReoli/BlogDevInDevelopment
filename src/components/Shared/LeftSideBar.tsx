import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaLock,
  FaUser,
  FaTrophy,
  FaGamepad,
  FaUsers,
  FaComments,
  FaBriefcase,
  FaSignOutAlt,
  FaSignInAlt,
  FaFileAlt,
  FaBullhorn,
} from "react-icons/fa";

interface LeftSidebarProps {
  user: {
    name: string;
    isLoggedIn: boolean;
    role: "CEO" | "ADM" | "MOD" | "USER";
  };
}

const LeftSideBar: React.FC<LeftSidebarProps> = ({ user }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <aside className="h-screen sticky top-0 bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-lg custom-scrollbar">
      <nav className="p-4 space-y-4">
        {/* Perfil do Usuário */}
        <div className="flex items-center space-x-4 bg-[var(--bg-secondary)] p-3 rounded-md shadow-md">
          {/* Foto do Usuário */}
          <div className="w-12 h-12 rounded-full border-2 border-[var(--hover-primary)] overflow-hidden">
            <img
              src="/images/profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Nome e Cargo */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              {user.name}
            </span>
            <span className="text-xs font-medium text-[var(--hover-primary)]">
              {user.role}
            </span>
          </div>
        </div>

        {/* Pessoal */}
        <div>
          <h4 className="text-sm font-bold uppercase mb-2">Perfil</h4>
          <hr className="border-[var(--border-primary)] mb-3" />
          <ul className="space-y-3">
            <li>
              <Link
                to="/profile"
                className="flex items-center space-x-2 hover:text-[var(--hover-primary)] transition-all"
              >
                <FaUser />
                <span>Meu Perfil</span>
              </Link>
            </li>
            <li>
              <Link
                to="/salvos"
                className={`flex items-center space-x-2 ${
                  !user.isLoggedIn ? "opacity-50" : "hover:text-[var(--hover-primary)]"
                }`}
                onClick={!user.isLoggedIn ? openModal : undefined}
              >
                <FaLock />
                <span>Salvos</span>
              </Link>
            </li>
            <li>
              <button
                onClick={user.role === "MOD" || user.role === "ADM" ? undefined : openModal}
                className={`flex items-center space-x-2 ${
                  user.role === "MOD" || user.role === "ADM"
                    ? "hover:text-[var(--hover-primary)]"
                    : "opacity-50"
                }`}
              >
                <FaLock />
                <span>Meus Posts</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Jogos */}
        <div>
          <h4 className="text-sm font-bold uppercase mb-2">Jogos</h4>
          <hr className="border-[var(--border-primary)] mb-3" />
          <ul className="space-y-3">
            <li>
              <Link
                to="/jogar"
                className="flex items-center space-x-2 hover:text-[var(--hover-primary)] transition-all"
              >
                <FaGamepad />
                <span>Jogar</span>
              </Link>
            </li>
            <li>
              <Link
                to="/ranking"
                className="flex items-center space-x-2 hover:text-[var(--hover-primary)] transition-all"
              >
                <FaTrophy />
                <span>Ranking</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Comunidade */}
        <div>
          <h4 className="text-sm font-bold uppercase mb-2">Comunidade</h4>
          <hr className="border-[var(--border-primary)] mb-3" />
          <ul className="space-y-3">
            <li>
              <Link
                to="/usuarios"
                className="flex items-center space-x-2 hover:text-[var(--hover-primary)] transition-all"
              >
                <FaUsers />
                <span>Usuários</span>
              </Link>
            </li>
            <li>
              <Link
                to="/discussoes"
                className="flex items-center space-x-2 hover:text-[var(--hover-primary)] transition-all"
              >
                <FaComments />
                <span>Discussões</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Profissional */}
        <div>
          <h4 className="text-sm font-bold uppercase mb-2">Profissional</h4>
          <hr className="border-[var(--border-primary)] mb-3" />
          <ul className="space-y-3">
            <li>
              <Link
                to="/vagas"
                className="flex items-center space-x-2 hover:text-[var(--hover-primary)] transition-all"
              >
                <FaBriefcase />
                <span>Portal de Vagas</span>
              </Link>
            </li>
            <li>
              <Link
                to="/curriculo"
                className="flex items-center space-x-2 hover:text-[var(--hover-primary)] transition-all"
              >
                <FaFileAlt />
                <span>Meu Currículo</span>
              </Link>
            </li>
            <li>
              <Link
                to="/anunciar-vaga"
                className="flex items-center space-x-2 hover:text-[var(--hover-primary)] transition-all"
              >
                <FaBullhorn />
                <span>Anunciar Vaga</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Login/Logout */}
        <div className="mt-6">
          <hr className="border-[var(--border-primary)] mb-3" />
          <Link
            to={user.isLoggedIn ? "/logout" : "/login"}
            className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-all"
          >
            {user.isLoggedIn ? <FaSignOutAlt /> : <FaSignInAlt />}
            <span>{user.isLoggedIn ? "Sair" : "Fazer Login"}</span>
          </Link>
        </div>
      </nav>

      {/* Modal para Bloqueio */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[var(--bg-secondary)] p-6 rounded-md shadow-lg text-center">
            <p className="mb-4 text-[var(--text-primary)]">
              Você precisa fazer login ou ser moderador para acessar esta seção.
            </p>
            <button
              onClick={closeModal}
              className="bg-[var(--hover-primary)] text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default LeftSideBar;
