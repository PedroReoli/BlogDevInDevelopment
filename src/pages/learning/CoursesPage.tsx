import React, { useState } from "react";
import courses from "@/constants/courses";
import SearchBarTutorials from "@/components/Shared/SearchBarTutorials";

const CoursesPage: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>("Todos");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      filterCategory === "Todos" || course.category === filterCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const categories = ["Todos", "JavaScript", "React", "CSS"];

  const buttonStyles = `
    py-3 px-6 rounded-full text-sm font-semibold border-2 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 
    border-[var(--hover-primary)] bg-transparent text-[var(--hover-primary)] 
    hover:bg-[var(--hover-primary)] hover:text-[var(--header-text)]
  `;

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Cursos Recomendados</h1>
      <p className="text-lg text-[var(--text-secondary)] text-center mb-8">
        Descubra cursos cuidadosamente selecionados para aprimorar suas habilidades em programação.
      </p>

      {/* Barra de Busca */}
      <div className="mb-6">
        <SearchBarTutorials
          searchQuery={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filtros de Categoria */}
      <div className="flex justify-center space-x-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            className={`${buttonStyles} ${
              filterCategory === category
                ? "bg-[var(--hover-primary)] text-[var(--header-text)]"
                : ""
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Lista de Cursos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="p-6 bg-[var(--bg-secondary)] rounded-lg shadow-lg hover:shadow-xl flex flex-col justify-between transition-all"
          >
            <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
            <p className="text-[var(--text-secondary)] text-sm mb-4">{course.description}</p>
            <ul className="text-sm text-[var(--text-secondary)] space-y-1 mb-6">
              <li>
                <strong>Plataforma:</strong> {course.platform}
              </li>
              <li>
                <strong>Instrutor:</strong> {course.instructor}
              </li>
              <li>
                <strong>Duração:</strong> {course.hours}h
              </li>
              <li>
                <strong>Nível:</strong> {course.level}
              </li>
            </ul>
            <a
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center"
            >
              <button className={buttonStyles}>Acessar Curso</button>
            </a>
          </div>
        ))}
      </div>

      {/* Nenhum Resultado Encontrado */}
      {filteredCourses.length === 0 && (
        <div className="flex justify-center items-center mt-16">
          <p className="text-center text-[var(--text-secondary)]">
            Nenhum curso encontrado para os critérios selecionados. Tente ajustar os filtros ou pesquisar novamente.
          </p>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
