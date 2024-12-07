import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { projectsData } from "@/constants/ProjectData";
import ProjectNavigation from "@/components/_navigation/ProjectNavigation";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>(); // "id" será o slug
  const [project, setProject] = useState<any>(null);
  const [projectContent, setProjectContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const selectedProject = projectsData.find((p) => p.slug === id);
    if (!selectedProject) {
      setError("Projeto não encontrado.");
      return;
    }

    setProject(selectedProject);

    fetch(selectedProject.link)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar o projeto.");
        }
        return response.text();
      })
      .then((data) => setProjectContent(data))
      .catch((error) => {
        console.error("Erro ao carregar o projeto:", error.message);
        setError("Erro ao carregar o conteúdo.");
      });
  }, [id]);

  return (
    <div className="container mx-auto py-8 px-5">
      {error ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-red-500 text-xl font-semibold">{error}</p>
        </div>
      ) : project && projectContent ? (
        <>
          {/* Atualiza o título da guia */}
          <Helmet>
            <title>{project.title} | Projetos</title>
          </Helmet>

          {/* Renderiza o conteúdo HTML do projeto */}
          <div
            className="prose max-w-none mb-10"
            dangerouslySetInnerHTML={{ __html: projectContent }}
          />

          {/* Navegação entre projetos */}
          <ProjectNavigation currentSlug={id || ""} />
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl font-semibold text-blue-500 animate-bounce">Carregando projeto...</p>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
