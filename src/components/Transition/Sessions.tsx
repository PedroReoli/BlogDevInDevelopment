import { useState, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import BlogGridList from "@/pages/blog/BlogGridList";
import LessonGridList from "@/pages/lesson/LessonGridList";
import ProjectGridList from "@/pages/project/ProjectGridList";
import Button from "@/components/Shared/Button";

const Sessions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Referência ao topo do componente
  const sessionsTopRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: "blog", title: "Blog", component: <BlogGridList /> },
    { id: "lessons", title: "Aulas", component: <LessonGridList /> },
    { id: "projects", title: "Projetos", component: <ProjectGridList /> },
  ];

  // Animação de transição entre as seções
  const springProps = useSpring({
    transform: `translateX(-${currentIndex * 100}%)`,
    config: { tension: 200, friction: 25 },
  });

  const goToNext = () => {
    if (currentIndex < sections.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Função para rolar suavemente para o topo
  const scrollToTop = () => {
    sessionsTopRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={sessionsTopRef} className="relative container mx-auto py-8">
      {/* Controles e título */}
      <div className="flex items-center justify-between mb-8">
        {currentIndex > 0 && (
          <FaArrowLeft
            className="text-3xl cursor-pointer text-blue-500 hover:text-blue-400"
            onClick={goToPrev}
          />
        )}
        <h2 className="text-3xl font-bold text-white text-center flex-1">
          {sections[currentIndex].title}
        </h2>
        {currentIndex < sections.length - 1 && (
          <FaArrowRight
            className="text-3xl cursor-pointer text-blue-500 hover:text-blue-400"
            onClick={goToNext}
          />
        )}
      </div>

      {/* Área do carrossel */}
      <div className="relative overflow-hidden">
        <animated.div
          style={{
            display: "flex",
            ...springProps,
          }}
        >
          {sections.map((section) => (
            <div
              key={section.id}
              className="flex-shrink-0 w-full"
              style={{ width: "100%" }}
            >
              {section.component}
            </div>
          ))}
        </animated.div>
      </div>

      {/* Botão para voltar ao topo */}
      <div className="mt-8 text-center">
        <Button
          onClick={scrollToTop}
          variant="primary"
          className="shadow-md"
        >
          Voltar para o Início
        </Button>
      </div>
    </div>
  );
};

export default Sessions;
