import { useState } from "react";
import { Link } from "react-router-dom";
import { projectsData } from "@/constants/ProjectData";
import { Project as ProjectInterface } from "@/constants/interfaces";
import SearchBar from "@/components/Shared/SearchBar";

const ProjectGridList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredProjects(projectsData);
    } else {
      const filtered = projectsData.filter((project) => {
        const titleMatch = project.title.toLowerCase().includes(query);
        const keywordMatch = project.keywords.some((keyword) =>
          keyword.toLowerCase().includes(query)
        );
        return titleMatch || keywordMatch;
      });

      setFilteredProjects(filtered);
    }
  };

  return (
    <div className="container mx-auto py-10 px-6 bg-[var(--bg-primary)] text-[var(--text-primary)]">

      {/* Barra de Pesquisa */}
      <div className="mb-10 max-w-lg mx-auto">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          placeholder="Busque por projetos ou palavras-chave..."
        />
      </div>

      {/* Grid de Projetos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.length === 0 ? (
          <p className="text-center text-[var(--text-secondary)]">
            Nenhum projeto encontrado.
          </p>
        ) : (
          filteredProjects.map((project: ProjectInterface, index) => (
            <div
              key={index}
              className="group bg-[var(--bg-secondary)] p-5 rounded-lg shadow-lg hover:shadow-xl border border-[var(--hover-primary)] transition-all transform hover:scale-105"
            >
              {/* Imagem do Projeto */}
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110 rounded-lg"
                />
                <span className="absolute bottom-2 right-2 px-3 py-1 text-xs font-bold text-white bg-[var(--hover-primary)] rounded-full shadow-lg">
                  {project.date}
                </span>
              </div>

              {/* Título */}
              <h3 className="text-xl font-bold text-[var(--hover-primary)] mb-3 group-hover:underline">
                {project.title}
              </h3>

              {/* Descrição */}
              <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs font-bold border border-[var(--hover-primary)] text-[var(--hover-primary)] rounded-full bg-transparent hover:bg-[var(--hover-primary)] hover:text-white transition-all"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              {/* Link "Ver Projeto" */}
              <div className="text-center">
                <Link
                  to={`/project/${project.slug}`}
                  className="inline-block px-4 py-2 text-sm font-semibold text-white bg-[var(--hover-primary)] rounded-full shadow-md hover:bg-[var(--border-primary)] transition-all"
                >
                  Ver Projeto
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectGridList;
