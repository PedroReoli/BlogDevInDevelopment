import { useState, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import BlogGridList from "@/pages/blog/BlogGridList";
import LessonGridList from "@/pages/lesson/LessonGridList";
import ProjectGridList from "@/pages/project/ProjectGridList";
import Button from "@/components/Shared/Button";

const Sessions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sessionsTopRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: "blog", title: "Blog", component: <BlogGridList /> },
    { id: "lessons", title: "Aulas", component: <LessonGridList /> },
    { id: "projects", title: "Projetos", component: <ProjectGridList /> },
  ];

  const springProps = useSpring({
    transform: `translateX(-${currentIndex * 100}%)`,
    config: { tension: 200, friction: 25 },
  });

  const goToNext = () => currentIndex < sections.length - 1 && setCurrentIndex(currentIndex + 1);
  const goToPrev = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);
  const scrollToTop = () => sessionsTopRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div ref={sessionsTopRef} className="relative container mx-auto py-8">
      {/* Título Centralizado */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-extrabold text-[var(--hover-primary)] tracking-tight">
          {sections[currentIndex].title}
        </h2>
      </div>

 
      {/* Controles de Navegação */}
      <div className="flex items-center justify-between mt-8 mb-6">
        {currentIndex > 0 && (
          <FaArrowLeft
            className="text-3xl cursor-pointer text-[var(--hover-primary)] hover:text-[var(--border-primary)] transition-colors duration-300"
            onClick={goToPrev}
          />
        )}
        <div></div> {/* Espaço vazio centralizado */}
        {currentIndex < sections.length - 1 && (
          <FaArrowRight
            className="text-3xl cursor-pointer text-[var(--hover-primary)] hover:text-[var(--border-primary)] transition-colors duration-300"
            onClick={goToNext}
          />
        )}
      </div>

      {/* Carrossel */}
      <div className="relative overflow-hidden">
        <animated.div style={{ display: "flex", ...springProps }}>
          {sections.map((section) => (
            <div key={section.id} className="flex-shrink-0 w-full">
              {section.component}
            </div>
          ))}
        </animated.div>
      </div>

      {/* Botão Voltar */}
      <div className="mt-12 text-center">
        <Button
          onClick={scrollToTop}
          variant="secondary"
          className="border-[var(--hover-primary)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--hover-primary)] hover:text-white"
        >
          Voltar para o Início
        </Button>
      </div>
    </div>
  );
};

export default Sessions;
