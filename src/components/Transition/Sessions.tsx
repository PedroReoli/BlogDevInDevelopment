import { useState } from "react";
import BlogGridList from "@/components/Blog/BlogGridList";
import LessonGridList from "@/components/Lesson/LessonGridList";
import ProjectGridList from "@/components/Projects/ProjectGridList";
import { motion } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Sessions = () => {
  const [currentSection, setCurrentSection] = useState("blog");

  const renderSection = () => {
    switch (currentSection) {
      case "blog":
        return <BlogGridList />;
      case "lessons":
        return <LessonGridList />;
      case "projects":
        return <ProjectGridList />;
      default:
        return null;
    }
  };

  return (
    <div className="relative container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        {/* Seta para seção anterior */}
        {currentSection !== "blog" && (
          <motion.div
            className="cursor-pointer text-blue-500 hover:text-blue-400"
            whileHover={{ scale: 1.2, rotate: -15, color: "#00A1FF" }}
            whileTap={{ scale: 1 }}
            onClick={() => {
              if (currentSection === "lessons") setCurrentSection("blog");
              if (currentSection === "projects") setCurrentSection("lessons");
            }}
          >
            <FaArrowLeft className="text-3xl" />
          </motion.div>
        )}

        {/* Título da Seção */}
        <h2 className="text-3xl font-bold text-white text-center">
          {currentSection === "blog" && "Blog Posts"}
          {currentSection === "lessons" && "Aulas"}
          {currentSection === "projects" && "Projetos"}
        </h2>

        {/* Seta para próxima seção */}
        {currentSection !== "projects" && (
          <motion.div
            className="cursor-pointer text-blue-500 hover:text-blue-400"
            whileHover={{ scale: 1.2, rotate: 15, color: "#00A1FF" }}
            whileTap={{ scale: 1 }}
            onClick={() => {
              if (currentSection === "blog") setCurrentSection("lessons");
              if (currentSection === "lessons") setCurrentSection("projects");
            }}
          >
            <FaArrowRight className="text-3xl" />
          </motion.div>
        )}
      </div>

      {/* Renderiza a seção atual */}
      {renderSection()}
    </div>
  );
};

export default Sessions;
