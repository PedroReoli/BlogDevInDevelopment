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
    <div className="container mx-auto py-8 px-4">
      {/* Componente de Pesquisa */}
      <div className="mb-6">
        <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />
      </div>

      {/* Grid de Projetos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length === 0 ? (
          <p className="text-center text-gray-400">Nenhum projeto encontrado.</p>
        ) : (
          filteredProjects.map((project: ProjectInterface, index) => (
            <div
              key={index}
              className="bg-[#2a2a3d] text-white p-5 rounded-lg shadow-md hover:shadow-lg border border-gray-600 transition-transform transform hover:scale-105"
            >
              {/* Imagem */}
              <div className="relative overflow-hidden rounded mb-4">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-40 object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Título */}
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-yellow-500 hover:text-yellow-400 transition-colors">
                  {project.title}
                </h3>
              </div>

              {/* Descrição */}
              <div className="mb-3">
                <p className="text-gray-300 text-sm line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold text-yellow-500 bg-yellow-900 px-2 py-1 rounded-md shadow-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Link "Ver Projeto" */}
              <div className="text-center">
                <Link
                  to={`/project/${project.slug}`}
                  className="text-blue-400 hover:text-blue-300 underline"
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
