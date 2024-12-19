import React, { useState } from "react";
import { FaCommentAlt, FaPlus, FaSearch } from "react-icons/fa";

interface Discussion {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  comments: number;
}

const DiscussionsPage: React.FC = () => {
  const [discussions] = useState<Discussion[]>([
    { id: 1, title: "React vs Vue: Qual o melhor?", author: "João", createdAt: "2024-12-15", comments: 10 },
    { id: 2, title: "Dicas para melhorar no CSS", author: "Ana", createdAt: "2024-12-14", comments: 5 },
    { id: 3, title: "Qual banco de dados usar?", author: "Pedro", createdAt: "2024-12-13", comments: 8 },
  ]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredDiscussions = discussions.filter((discussion) =>
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Discussões</h1>
        <button
          className="flex items-center space-x-2 border-2 border-[var(--hover-primary)] text-[var(--hover-primary)] 
          bg-transparent px-4 py-2 rounded-full hover:bg-[var(--hover-primary)] hover:text-white transition-all"
        >
          <FaPlus />
          <span>Criar Discussão</span>
        </button>
      </div>

      {/* Barra de Busca */}
      <div className="relative w-full max-w-3xl mx-auto mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar discussões..."
          className="w-full py-3 px-12 rounded-full border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--hover-primary)] transition-all"
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)]" />
      </div>

      {/* Lista de Discussões */}
      {filteredDiscussions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiscussions.map((discussion) => (
            <div
              key={discussion.id}
              className="p-4 bg-[var(--bg-secondary)] rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold mb-2">{discussion.title}</h2>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Por <span className="font-semibold">{discussion.author}</span> •{" "}
                  <span>{discussion.createdAt}</span>
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-[var(--text-secondary)]">
                  <FaCommentAlt />
                  <span>{discussion.comments} comentários</span>
                </div>
                <button
                  className="border-2 border-[var(--hover-primary)] text-[var(--hover-primary)] 
                  bg-transparent px-4 py-2 rounded-full hover:bg-[var(--hover-primary)] hover:text-white transition-all"
                >
                  Participar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center mt-12">
          <p className="text-center text-[var(--text-secondary)]">
            Nenhuma discussão encontrada. Seja o primeiro a criar uma!
          </p>
        </div>
      )}
    </div>
  );
};

export default DiscussionsPage;
