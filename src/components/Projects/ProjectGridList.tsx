import { useState } from "react";
import { Link } from "react-router-dom";
import { projectsData } from "@/constants/ProjectData";
import { Project as ProjectInterface } from "@/constants/interfaces";
import SearchBar from "@/components/layout/SearchBar/SearchBar";

const ProjectGridList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  // Função de pesquisa
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
    <div className="container mx-auto py-8">

      {/* Componente de Pesquisa */}
      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />

      {/* Grid de Projetos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.length === 0 ? (
          <p className="text-center text-gray-400">Nenhum projeto encontrado.</p>
        ) : (
          filteredProjects.map((project: ProjectInterface, index) => (
            <div
              key={index}
              className="bg-[#2a2a3d] text-white p-6 rounded-md shadow-md hover:shadow-lg border border-gray-500 transition-transform transform hover:scale-105"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold text-yellow-500 bg-yellow-900 px-2 py-1 rounded"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <Link
                to={`/project/${project.filename}`}
                className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Ver Projeto
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectGridList;
