import React, { useState } from "react";
import { FaBook, FaVideo, FaProjectDiagram, FaTrash, FaEye, FaHome, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion"; // Para animações
import { Link } from "react-router-dom";

interface Content {
  id: number;
  title: string;
  type: "Post" | "Aula" | "Projeto";
  isNew?: boolean;
}

const SavedContentPage: React.FC = () => {
  const [savedContent, setSavedContent] = useState<Content[]>([
    { id: 1, title: "Como criar componentes reutilizáveis", type: "Post", isNew: true },
    { id: 2, title: "Introdução ao TypeScript", type: "Aula" },
    { id: 3, title: "Projeto de Dashboard com React", type: "Projeto" },
    { id: 4, title: "Hooks Avançados no React", type: "Aula", isNew: true },
    { id: 5, title: "CRUD com Node.js e MongoDB", type: "Projeto" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"Todos" | "Post" | "Aula" | "Projeto">("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleRemove = (id: number) => {
    if (window.confirm("Tem certeza que deseja remover este conteúdo salvo?")) {
      setSavedContent(savedContent.filter((content) => content.id !== id));
    }
  };

  const filteredContent = savedContent.filter((content) => {
    return (
      (filterType === "Todos" || content.type === filterType) &&
      content.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Paginação
  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);
  const paginatedContent = filteredContent.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      {/* Título */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Conteúdo Salvo</h1>

        {/* SearchBar */}
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full text-[var(--text-primary)] bg-[var(--bg-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--hover-primary)] transition-all"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--hover-primary)]" />
        </div>
      </div>

      {/* Filtros */}
      <div className="flex space-x-4 mb-6">
        {["Todos", "Post", "Aula", "Projeto"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type as typeof filterType)}
            className={`px-4 py-2 rounded-lg border ${
              filterType === type ? "bg-[var(--hover-primary)] text-white" : "text-[var(--text-primary)]"
            } hover:bg-[var(--hover-primary)] hover:text-white transition`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Lista de Conteúdo */}
      {paginatedContent.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedContent.map((content) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-[var(--bg-secondary)] rounded-lg shadow-lg relative"
            >
              {content.isNew && (
                <span className="absolute top-2 right-2 bg-[var(--hover-primary)] text-white px-2 py-1 text-xs rounded-full">
                  Novo
                </span>
              )}

              <div className="text-4xl mb-4">
                {content.type === "Post" && <FaBook />}
                {content.type === "Aula" && <FaVideo />}
                {content.type === "Projeto" && <FaProjectDiagram />}
              </div>

              <h2 className="text-lg font-bold mb-2">{content.title}</h2>
              <p className="text-sm text-[var(--text-secondary)]">Tipo: {content.type}</p>

              <div className="flex justify-between mt-4">
                <Link
                  to={`/${content.type.toLowerCase()}/${content.id}`}
                  className="flex items-center space-x-1 text-[var(--hover-primary)] hover:underline"
                >
                  <FaEye />
                  <span>Ver Detalhes</span>
                </Link>
                <button
                  onClick={() => handleRemove(content.id)}
                  className="flex items-center space-x-1 text-red-500 hover:underline"
                >
                  <FaTrash />
                  <span>Remover</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-[var(--text-secondary)] text-center mt-12">
          Você ainda não salvou nenhum conteúdo.
        </p>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page ? "bg-[var(--hover-primary)] text-white" : "text-[var(--text-primary)]"
              } hover:bg-[var(--hover-primary)] hover:text-white transition`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {/* Redirecionar à Página Inicial */}
      <div className="flex justify-center mt-12">
        <Link
          to="/"
          className="flex items-center space-x-2 bg-[var(--hover-primary)] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          <FaHome />
          <span>Conhecer Mais Conteúdos</span>
        </Link>
      </div>
    </div>
  );
};

export default SavedContentPage;
