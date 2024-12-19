import React, { useState } from "react";
import { FaLock, FaLockOpen, FaPlus, FaTrash } from "react-icons/fa";

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Campos editáveis
  const [bio, setBio] = useState("Desenvolvedor apaixonado por inovação e tecnologia.");
  const [profession, setProfession] = useState("Desenvolvedor Fullstack");
  const [location, setLocation] = useState("Rio de Janeiro, Brasil");
  const [age, setAge] = useState("22");
  const [educations, setEducations] = useState<string[]>(["Bacharel em Ciência da Computação"]);
  const [newEducation, setNewEducation] = useState("");
  const [socialLinks, setSocialLinks] = useState<{ platform: string; link: string }[]>([]);
  const [newSocial, setNewSocial] = useState({ platform: "", link: "" });

  // Funções para adicionar/remover formações
  const handleAddEducation = () => {
    if (newEducation.trim()) {
      setEducations([...educations, newEducation]);
      setNewEducation("");
    }
  };

  const handleRemoveEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  // Funções para adicionar/remover redes sociais
  const handleAddSocial = () => {
    if (newSocial.platform && newSocial.link) {
      setSocialLinks([...socialLinks, newSocial]);
      setNewSocial({ platform: "", link: "" });
    }
  };

  const handleRemoveSocial = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      {/* Botão Editar Perfil */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 border-2 border-[var(--hover-primary)] 
            text-[var(--hover-primary)] bg-transparent px-4 py-2 rounded-full 
            hover:bg-[var(--hover-primary)] hover:text-white transition-all duration-300"
        >
          {isEditing ? <FaLockOpen /> : <FaLock />}
          <span>{isEditing ? "Salvar Alterações" : "Editar Perfil"}</span>
        </button>
      </div>

      {/* Card Principal */}
      <div className="bg-[var(--bg-secondary)] p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        {/* Header do Card */}
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 rounded-full border-4 border-[var(--hover-primary)] flex items-center justify-center overflow-hidden">
            <img
              src="/images/profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-6">
            <h2 className="text-3xl font-bold">Pedro Sousa</h2>
            <p className="text-sm text-[var(--text-secondary)]">Pronomes: Ele/Dele</p>
          </div>
        </div>

        {/* Informações Editáveis */}
        <div className="space-y-6">
          {/* Bio */}
          <div>
            <p className="text-[var(--hover-primary)] font-bold">Bio:</p>
            {isEditing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full border-2 border-[var(--hover-primary)] rounded-lg p-2 mt-1 bg-[var(--bg-primary)] text-[var(--text-primary)]"
                rows={4}
              />
            ) : (
              <p className="text-[var(--text-secondary)]">{bio}</p>
            )}
          </div>

          {/* Outras Informações */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Profissão */}
            <div>
              <p className="text-[var(--hover-primary)] font-bold">Profissão:</p>
              {isEditing ? (
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full border-2 border-[var(--hover-primary)] rounded-lg p-2 mt-1 bg-[var(--bg-primary)] text-[var(--text-primary)]"
                />
              ) : (
                <p className="text-[var(--text-secondary)]">{profession}</p>
              )}
            </div>

            {/* Localização */}
            <div>
              <p className="text-[var(--hover-primary)] font-bold">Mora em:</p>
              {isEditing ? (
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border-2 border-[var(--hover-primary)] rounded-lg p-2 mt-1 bg-[var(--bg-primary)] text-[var(--text-primary)]"
                />
              ) : (
                <p className="text-[var(--text-secondary)]">{location}</p>
              )}
            </div>

            {/* Idade */}
            <div>
              <p className="text-[var(--hover-primary)] font-bold">Idade:</p>
              {isEditing ? (
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full border-2 border-[var(--hover-primary)] rounded-lg p-2 mt-1 bg-[var(--bg-primary)] text-[var(--text-primary)]"
                />
              ) : (
                <p className="text-[var(--text-secondary)]">{age}</p>
              )}
            </div>

            {/* Formações */}
            <div>
              <p className="text-[var(--hover-primary)] font-bold">Formações:</p>
              <div className="space-y-2">
                {educations.map((edu, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border border-[var(--hover-primary)] rounded-lg p-2"
                  >
                    <span className="text-[var(--text-secondary)]">{edu}</span>
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveEducation(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Nova Formação"
                      value={newEducation}
                      onChange={(e) => setNewEducation(e.target.value)}
                      className="flex-1 border-2 border-[var(--hover-primary)] rounded-lg p-2 bg-[var(--bg-primary)] text-[var(--text-primary)]"
                    />
                    <button
                      onClick={handleAddEducation}
                      className="text-[var(--hover-primary)] hover:text-white hover:bg-[var(--hover-primary)] p-2 rounded-lg border-2 border-[var(--hover-primary)]"
                    >
                      <FaPlus />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Redes Sociais */}
          <div>
            <p className="text-[var(--hover-primary)] font-bold">Meus Sites e Redes Sociais:</p>
            <div className="space-y-4">
              {socialLinks.map((social, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border border-[var(--hover-primary)] rounded-lg p-2"
                >
                  <span className="text-[var(--text-secondary)]">{social.platform}</span>
                  <a
                      href={social.link.startsWith("http://") || social.link.startsWith("https://") ? social.link : `https://${social.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--hover-primary)] underline"
                    >
                      Acessar
                    </a>
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveSocial(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Plataforma"
                    value={newSocial.platform}
                    onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })}
                    className="flex-1 border-2 border-[var(--hover-primary)] rounded-lg p-2 bg-[var(--bg-primary)] text-[var(--text-primary)]"
                  />
                  <input
                    type="url"
                    placeholder="Link"
                    value={newSocial.link}
                    onChange={(e) => setNewSocial({ ...newSocial, link: e.target.value })}
                    className="flex-1 border-2 border-[var(--hover-primary)] rounded-lg p-2 bg-[var(--bg-primary)] text-[var(--text-primary)]"
                  />
                  <button
                    onClick={handleAddSocial}
                    className="text-[var(--hover-primary)] hover:text-white hover:bg-[var(--hover-primary)] p-2 rounded-lg border-2 border-[var(--hover-primary)]"
                  >
                    <FaPlus />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
