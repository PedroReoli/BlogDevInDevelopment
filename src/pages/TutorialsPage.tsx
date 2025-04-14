import React, { useEffect, useState } from "react";
import SearchBarTutorials from "@/components/Shared/SearchBarTutorials";

interface Tutorial {
  id: number;
  título: string;
  descrição: string;
  criador: string;
  categoria: string;
  urlDoVídeo: string;
}

const TutorialsPage: React.FC = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [filteredTutorials, setFilteredTutorials] = useState<Tutorial[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("Todos");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "https://api.sheety.co/f07cf17198b5bb94b23fee472faecc25/apiDev/videos";

  const fetchTutorials = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Erro ao carregar os tutoriais.");
      }
      const data = await response.json();
      setTutorials(data.videos);
      setFilteredTutorials(data.videos);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutorials();
  }, []);

  useEffect(() => {
    const filtered = tutorials.filter((tutorial) => {
      const matchesCategory =
        filterCategory === "Todos" || tutorial.categoria === filterCategory;
      const matchesSearch =
        tutorial.título.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutorial.criador.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutorial.descrição.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    setFilteredTutorials(filtered);
  }, [filterCategory, searchTerm, tutorials]);

  const categories = ["Todos", ...new Set(tutorials.map((tutorial) => tutorial.categoria))];

  // Componente de Botão Personalizado
  const SmallButton: React.FC<{
    children: React.ReactNode;
    onClick?: () => void;
    isActive?: boolean;
  }> = ({ children, onClick, isActive }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
        isActive
          ? "bg-[var(--hover-primary)] text-white border-[var(--hover-primary)]"
          : "bg-transparent text-[var(--text-primary)] border-[var(--hover-primary)] hover:bg-[var(--hover-primary)] hover:text-white"
      }`}
    >
      {children}
    </button>
  );

  if (loading) {
    return <p className="text-center mt-10 text-[var(--text-secondary)]">Carregando tutoriais...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Tutoriais Recomendados</h1>
      <p className="text-lg text-[var(--text-secondary)] text-center mb-8">
        Explore tutoriais e vídeos recomendados para aprender mais sobre programação e melhorar suas habilidades.
      </p>

      {/* Barra de Busca Exclusiva */}
      <div className="mb-6">
        <SearchBarTutorials
          searchQuery={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filtros de Categoria */}
      <div className="flex justify-center space-x-4 mb-8">
        {categories.map((category) => (
          <SmallButton
            key={category}
            onClick={() => setFilterCategory(category)}
            isActive={filterCategory === category}
          >
            {category}
          </SmallButton>
        ))}
      </div>

      {/* Lista de Tutoriais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map((tutorial) => (
          <div
            key={tutorial.id}
            className="p-4 bg-[var(--bg-secondary)] rounded-lg shadow-lg flex flex-col items-center"
          >
            <img
              src={`https://img.youtube.com/vi/${new URL(tutorial.urlDoVídeo).searchParams.get(
                "v"
              )}/hqdefault.jpg`}
              alt={tutorial.título}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold mb-2 text-center">{tutorial.título}</h2>
            <p className="text-[var(--text-secondary)] mb-2">
              Criador: <span className="font-semibold">{tutorial.criador}</span>
            </p>
            <p className="text-[var(--text-secondary)] text-sm mb-4 text-center">
              {tutorial.descrição}
            </p>
            <a
              href={tutorial.urlDoVídeo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex justify-center"
            >
              <SmallButton>Assistir</SmallButton>
            </a>
          </div>
        ))}
      </div>

      {/* Nenhum Resultado Encontrado */}
      {filteredTutorials.length === 0 && (
        <div className="flex justify-center items-center mt-16">
          <p className="text-center text-[var(--text-secondary)]">
            Nenhum tutorial encontrado para os critérios selecionados. Tente ajustar os filtros ou pesquisar novamente.
          </p>
        </div>
      )}
    </div>
  );
};

export default TutorialsPage;
