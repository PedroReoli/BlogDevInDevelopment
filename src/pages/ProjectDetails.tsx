import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { projectsData } from "@/constants/ProjectData";
import ProjectNavigation from "@/components/ui/ProjectNavigation";
import Loader from "@/components/Shared/Loader"; // Importa o Loader
import NotFoundPage from "@/pages/NotFoundPage"; // Importa o NotFoundPage

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>(); // "id" será o slug
  const [project, setProject] = useState<any>(null);
  const [projectContent, setProjectContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const selectedProject = projectsData.find((p) => p.slug === id);
    if (!selectedProject) {
      setError("Projeto não encontrado."); // Define o erro caso o projeto não seja encontrado
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
        setError("Erro ao carregar o conteúdo."); // Define o erro em caso de falha na requisição
      });
  }, [id]);

  return (
    <div className="container mx-auto py-8 px-5">
      {error ? (
        <NotFoundPage /> // Renderiza a página de erro 404 em caso de erro
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
        <Loader /> // Renderiza o Loader enquanto os dados estão sendo carregados
      )}
    </div>
  );
};

export default ProjectDetails;
