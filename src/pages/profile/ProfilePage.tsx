import React, { useState } from "react";
import { FaLock, FaLockOpen, FaCamera } from "react-icons/fa";

const ProfilePage: React.FC = () => {
  // Estado de edição
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: "Pedro Sousa",
    socialName: "Pedro",
    pronouns: "Ele/Dele",
    email: "pedro@example.com",
    bio: "Desenvolvedor apaixonado por tecnologia e inovação. Atualmente focado em tecnologias Fullstack, gamificação e sistemas inteligentes.",
    connectedSince: "03/01/2022",
    profession: "Desenvolvedor Fullstack",
    totalPoints: 15230,
    seasonPoints: 870,
    interests: ["Tecnologia", "Inovação", "Gamificação", "Inteligência Artificial"],
    technologies: ["React", "Node.js", "TypeScript", "C#", "TailwindCSS", "Docker"],
    achievements: [
      "Contribuidor Destacado",
      "500 Posts Comentados",
      "Melhor da Temporada (2023)",
    ],
  });

  // Alterna modo de edição
  const toggleEditing = () => setIsEditing(!isEditing);

  // Atualiza valores do usuário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold">Meu Perfil</h1>
        <button
          onClick={toggleEditing}
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${
            isEditing
              ? "bg-[var(--hover-primary)] text-white hover:bg-blue-600"
              : "bg-transparent border-2 border-[var(--hover-primary)] text-[var(--hover-primary)] hover:bg-[var(--hover-primary)] hover:text-white"
          } transition-all`}
        >
          {isEditing ? <FaLockOpen /> : <FaLock />}
          <span>{isEditing ? "Fechar Edição" : "Editar Perfil"}</span>
        </button>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Card: Foto e Informações Básicas */}
        <div className="bg-[var(--bg-secondary)] p-6 rounded-lg shadow-lg flex flex-col items-center">
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-[var(--hover-primary)] mb-4">
            <img
              src="/images/profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {isEditing && (
              <label className="absolute bottom-2 right-2 bg-[var(--hover-primary)] text-white p-2 rounded-full cursor-pointer">
                <FaCamera />
                <input type="file" className="hidden" />
              </label>
            )}
          </div>
          <div className="text-center">
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`text-xl font-bold bg-transparent text-center border-b-2 ${
                isEditing ? "border-blue-500" : "border-transparent"
              }`}
            />
            <p className="text-sm text-[var(--text-secondary)]">
              Social:{" "}
              <input
                type="text"
                name="socialName"
                value={user.socialName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`bg-transparent border-b-2 ${
                  isEditing ? "border-blue-500" : "border-transparent"
                }`}
              />
            </p>
            <p className="text-sm text-[var(--text-secondary)]">Pronomes: {user.pronouns}</p>
          </div>
        </div>

        {/* Card: Informações Pessoais */}
        <div className="bg-[var(--bg-secondary)] p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-4">Informações Pessoais</h2>
          <div className="space-y-2">
            <div>
              <label className="font-semibold">Bio:</label>
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleInputChange}
                rows={4}
                disabled={!isEditing}
                className={`w-full mt-1 p-2 border rounded-md bg-transparent ${
                  isEditing ? "focus:border-blue-500" : "border-transparent"
                }`}
              ></textarea>
            </div>
            <p>
              <span className="font-semibold">Conectado Desde:</span>{" "}
              {user.connectedSince}
            </p>
            <p>
              <span className="font-semibold">Profissão:</span>{" "}
              <input
                type="text"
                name="profession"
                value={user.profession}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`bg-transparent border-b-2 ${
                  isEditing ? "border-blue-500" : "border-transparent"
                }`}
              />
            </p>
          </div>
        </div>

        {/* Card: Pontuações */}
        <div className="bg-[var(--bg-secondary)] p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-4">Pontuações e Jogos</h2>
          <p>
            <span className="font-semibold">Pontuação Geral:</span> {user.totalPoints}
          </p>
          <p>
            <span className="font-semibold">Pontuação da Temporada:</span>{" "}
            {user.seasonPoints}
          </p>
        </div>

        {/* Card: Tecnologias Favoritas */}
        <div className="lg:col-span-2 bg-[var(--bg-secondary)] p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-4">Tecnologias Favoritas</h2>
          <div className="flex flex-wrap gap-2">
            {user.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 border border-[var(--hover-primary)] rounded-full text-sm font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Card: Conquistas */}
        <div className="bg-[var(--bg-secondary)] p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-4">Conquistas</h2>
          <ul className="list-disc pl-6 space-y-2">
            {user.achievements.map((achievement, idx) => (
              <li key={idx}>{achievement}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
