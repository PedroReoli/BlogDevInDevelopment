import { projectsData } from "@/constants/ProjectData";
import { Link } from "react-router-dom";

interface ProjectNavigationProps {
  currentSlug: string;
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({ currentSlug }) => {
  const currentIndex = projectsData.findIndex((project) => project.slug === currentSlug);
  const previousProject = projectsData[currentIndex - 1];
  const nextProject = projectsData[currentIndex + 1];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-600 pt-5">
      {/* Botão para o projeto anterior */}
      {previousProject ? (
        <Link
          to={`/project/${previousProject.slug}`}
          className="btn-modern-alt transition hover:bg-gray-700 hover:text-blue-400"
          onClick={scrollToTop}
        >
          ← {previousProject.title}
        </Link>
      ) : (
        <span className="text-gray-500 text-sm">Não há projeto anterior</span>
      )}

      {/* Botão para a página inicial */}
      <Link
        to="/"
        className="btn-modern-alt mx-5 transition hover:bg-blue-500 hover:text-white"
        onClick={scrollToTop}
      >
        Página Inicial
      </Link>

      {/* Botão para o próximo projeto */}
      {nextProject ? (
        <Link
          to={`/project/${nextProject.slug}`}
          className="btn-modern-alt transition hover:bg-gray-700 hover:text-blue-400"
          onClick={scrollToTop}
        >
          {nextProject.title} →
        </Link>
      ) : (
        <span className="text-gray-500 text-sm">Não há próximo projeto</span>
      )}
    </div>
  );
};

export default ProjectNavigation;
