import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [projectContent, setProjectContent] = useState<string>("");

  useEffect(() => {
    const loadProject = async () => {
      try {
        // Carrega o arquivo HTML da pasta public/content/project
        const response = await fetch(`/content/project/${id}.html`);
        const text = await response.text();
        setProjectContent(text);
      } catch (error) {
        console.error("Erro ao carregar o projeto:", error);
        setProjectContent("<p>Erro ao carregar o conteúdo</p>");
      }
    };

    loadProject();
  }, [id]);

  return (
    <div className="container mx-auto py-8 px-5">
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: projectContent }} />
    </div>
  );
};

export default ProjectDetails;
