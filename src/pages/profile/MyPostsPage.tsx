import React, { useState } from "react";
import { FaEdit, FaTrash, FaSearch, FaFileAlt } from "react-icons/fa";
import { motion } from "framer-motion";

interface Post {
  id: number;
  title: string;
  date: string;
  status: "Publicado" | "Rascunho";
}

const MyPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, title: "Como começar em React", date: "2024-12-01", status: "Publicado" },
    { id: 2, title: "Guia básico de TypeScript", date: "2024-12-05", status: "Rascunho" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"Todos" | "Publicado" | "Rascunho">("Todos");

  const handleDelete = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este post?")) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "Todos" || post.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen relative">
      {/* Título */}
      <h1 className="text-3xl font-bold mb-6">Meus Posts</h1>

      {/* SearchBar */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Buscar posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full text-[var(--text-primary)] bg-[var(--bg-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--hover-primary)] transition-all"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--hover-primary)]" />
        </div>

        {/* Filtros */}
        <div className="flex space-x-4">
          {["Todos", "Publicado", "Rascunho"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as typeof filterStatus)}
              className={`px-4 py-2 rounded-lg border ${
                filterStatus === status ? "bg-[var(--hover-primary)] text-white" : "text-[var(--text-primary)]"
              } hover:bg-[var(--hover-primary)] hover:text-white transition`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Posts */}
      {filteredPosts.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              className="p-4 bg-[var(--bg-secondary)] rounded-lg shadow-lg flex flex-col"
              whileHover={{ scale: 1.03 }}
            >
              {/* Header do Post */}
              <div className="flex items-center mb-4">
                <FaFileAlt className="text-3xl text-[var(--hover-primary)] mr-3" />
                <div>
                  <h2 className="text-lg font-bold">{post.title}</h2>
                  <p className="text-sm text-[var(--text-secondary)]">Data: {post.date}</p>
                </div>
              </div>

              {/* Status */}
              <p
                className={`text-sm font-semibold mb-4 ${
                  post.status === "Publicado" ? "text-green-500" : "text-yellow-500"
                }`}
              >
                Status: {post.status}
              </p>

              {/* Ações */}
              <div className="flex justify-end space-x-4 mt-auto">
                <button
                  className="flex items-center space-x-1 text-[var(--hover-primary)] hover:underline"
                >
                  <FaEdit />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="flex items-center space-x-1 text-red-500 hover:underline"
                >
                  <FaTrash />
                  <span>Excluir</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        // Mensagem quando não há posts
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[var(--bg-secondary)] p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-[var(--hover-primary)]">Nenhum Post Criado</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              Crie seu primeiro post para compartilhar com a comunidade!
            </p>
            <button
              className="px-4 py-2 rounded-lg bg-[var(--hover-primary)] text-white hover:bg-blue-600 transition"
            >
              Criar Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPostsPage;
