import { lessonsData } from "@/constants/LessonsData";
import { Link } from "react-router-dom";

interface LessonNavigationProps {
  currentSlug: string;
}

const LessonNavigation: React.FC<LessonNavigationProps> = ({ currentSlug }) => {
  const currentIndex = lessonsData.findIndex((lesson) => lesson.slug === currentSlug);
  const previousLesson = lessonsData[currentIndex - 1];
  const nextLesson = lessonsData[currentIndex + 1];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-600 pt-5">
      {/* Botão para a aula anterior */}
      {previousLesson ? (
        <Link
          to={`/lesson/${previousLesson.slug}`}
          className="btn-modern-alt transition hover:bg-gray-700 hover:text-blue-400"
          onClick={scrollToTop}
        >
          ← {previousLesson.title}
        </Link>
      ) : (
        <span className="text-gray-500 text-sm">Não há aula anterior</span>
      )}

      {/* Botão para a página inicial */}
      <Link
        to="/"
        className="btn-modern-alt mx-5 transition hover:bg-blue-500 hover:text-white"
        onClick={scrollToTop}
      >
        Página Inicial
      </Link>

      {/* Botão para a próxima aula */}
      {nextLesson ? (
        <Link
          to={`/lesson/${nextLesson.slug}`}
          className="btn-modern-alt transition hover:bg-gray-700 hover:text-blue-400"
          onClick={scrollToTop}
        >
          {nextLesson.title} →
        </Link>
      ) : (
        <span className="text-gray-500 text-sm">Não há próxima aula</span>
      )}
    </div>
  );
};

export default LessonNavigation;
