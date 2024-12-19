import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaLock,
  FaUser,
  FaUsers,
  FaComments,
  FaBriefcase,
  FaSignOutAlt,
  FaSignInAlt,
  FaBullhorn,
  FaBook,
  FaVideo,
  FaFileCode,
  FaDiscord,
  FaNetworkWired,
} from "react-icons/fa";
import Profile from "./Profile";

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
        <Profile name={user.name} role={user.role} imageUrl="/images/profile.jpg" />

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

        {/* Aprendizado */}
        <div>
          <h4 className="text-sm font-bold uppercase mb-2">Aprendizado</h4>
          <hr className="border-[var(--border-primary)] mb-3" />
          <ul className="space-y-3">
            <li>
              <Link
                to="/aprendizado/tutoriais"
                className="flex items-center space-x-2 hover:text-[var(--hover-primary)] transition-all"
              >
                <FaBook />
                <span>Tutoriais</span>
              </Link>
            </li>
            <li>
              <Link
                to="/aprendizado/cursos"
                className="flex items-center space-x-2 hover:text-[var(--hover-primary)] transition-all"
              >
                <FaVideo />
                <span>Cursos</span>
              </Link>
            </li>
            <li>
              <Link
                to="/aprendizado/documentacao"
                className="flex items-center space-x-2 hover:text-[var(--hover-primary)] transition-all"
              >
                <FaFileCode />
                <span>Documentação</span>
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
            <li>
              <Link
                to="/discord"
                className="flex items-center space-x-2 hover:text-[var(--hover-primary)] transition-all"
              >
                <FaDiscord />
                <span>Discord</span>
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
                to="/networking"
                className="flex items-center space-x-2 hover:text-[var(--hover-primary)] transition-all"
              >
                <FaNetworkWired  />
                <span>Networking</span>
              </Link>
            </li>
            <li>
              <Link
                to="/anuncios"
                className="flex items-center space-x-2 hover:text-[var(--hover-primary)] transition-all"
              >
                <FaBullhorn />
                <span>Anúncios</span>
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
