import React, { useState } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("Desenvolvedor apaixonado por inovação e tecnologia.");
  const [profession, setProfession] = useState("Desenvolvedor Fullstack");
  const [connectedSince] = useState("03/01/2022");

  return (
    <div className="p-6 bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      {/* Título */}
      <h1 className="text-3xl font-bold mb-6">Meu Perfil</h1>

      {/* Container Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card da Foto */}
        <div className="bg-[var(--bg-secondary)] p-6 rounded-lg shadow-md flex flex-col items-center">
          <div className="w-32 h-32 rounded-full border-4 border-[var(--hover-primary)] flex items-center justify-center overflow-hidden mb-4">
            <img
              src="/images/profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Pedro Sousa</h2>
          <p className="text-sm text-[var(--text-secondary)]">Pronomes: Ele/Dele</p>
        </div>

        {/* Informações Pessoais */}
        <div className="bg-[var(--bg-secondary)] p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-[var(--hover-primary)] mb-4">
            Informações Pessoais
          </h2>
          <div className="space-y-4">
            {/* Bio */}
            <div>
              <p className="text-[var(--hover-primary)] font-bold">Bio:</p>
              {isEditing ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full border-2 border-[var(--hover-primary)] rounded-lg p-2 mt-1"
                  rows={3}
                />
              ) : (
                <div className="border-2 border-[var(--hover-primary)] p-3 rounded-lg bg-transparent text-[var(--text-secondary)]">
                  {bio}
                </div>
              )}
            </div>

            {/* Profissão */}
            <div>
              <p className="text-[var(--hover-primary)] font-bold">Profissão:</p>
              {isEditing ? (
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full border-2 border-[var(--hover-primary)] rounded-lg p-2 mt-1"
                />
              ) : (
                <p className="text-[var(--text-secondary)]">{profession}</p>
              )}
            </div>

            {/* Conectado Desde */}
            <div>
              <p className="text-[var(--hover-primary)] font-bold">Conectado Desde:</p>
              <p className="text-[var(--text-secondary)]">{connectedSince}</p>
            </div>
          </div>
        </div>

        {/* Pontuações e Jogos */}
        <div className="bg-[var(--bg-secondary)] p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-[var(--hover-primary)] mb-4">
            Pontuações e Jogos
          </h2>
          <div className="space-y-2">
            <p className="text-[var(--text-secondary)]">
              <strong>Pontuação Geral:</strong> 15230
            </p>
            <p className="text-[var(--text-secondary)]">
              <strong>Pontuação da Temporada:</strong> 870
            </p>
            <p className="text-[var(--text-secondary)]">
              <strong>Sequência de Dias Conectado:</strong> 42
            </p>
            <p className="text-[var(--text-secondary)]">
              <strong>Jogos Jogados:</strong> 185
            </p>
            <p className="text-[var(--text-secondary)]">
              <strong>Melhor Pontuação:</strong> 3120
            </p>
          </div>
        </div>

        {/* Tecnologias Favoritas */}
        <div className="bg-[var(--bg-secondary)] p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-[var(--hover-primary)] mb-4">
            Tecnologias Favoritas
          </h2>
          <div className="flex flex-wrap gap-2">
            {["React", "Node.js", "TypeScript", "C#", "TailwindCSS", "Docker"].map(
              (tech, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-3 py-1 rounded-full border-2 border-[var(--hover-primary)] 
                    bg-transparent text-[var(--text-primary)] hover:bg-[var(--hover-primary)] 
                    hover:text-white transition-all duration-300"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>

        {/* Conquistas + Botão Editar Perfil */}
        <div className="bg-[var(--bg-secondary)] p-6 rounded-lg shadow-md flex justify-between items-start">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-[var(--hover-primary)]">Conquistas</h2>
            {/* Pins Placeholder */}
            <div className="flex flex-wrap gap-3">
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Botão Editar Perfil */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 border-2 border-[var(--hover-primary)] 
              text-[var(--hover-primary)] bg-transparent px-4 py-2 rounded-full 
              hover:bg-[var(--hover-primary)] hover:text-white transition-all duration-300"
          >
            {isEditing ? (
              <FaLockOpen className="text-[var(--hover-primary)]" />
            ) : (
              <FaLock className="text-[var(--hover-primary)]" />
            )}
            <span>{isEditing ? "Salvar Alterações" : "Editar Perfil"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
