import React, { useEffect, useState } from "react";
import SearchBarTutorials from "@/components/Shared/SearchBarTutorials";

interface Course {
  id: number;
  título: string;
  descrição: string;
  plataforma: string;
  instrutor: string;
  horas: number;
  nível: string;
  categoria: string;
  url: string;
}

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("Todos");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [, setLoading] = useState<boolean>(true);
  const [, setError] = useState<string | null>(null);

  const API_URL = "https://api.sheety.co/f07cf17198b5bb94b23fee472faecc25/apiDev/cursos";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Erro ao carregar os cursos.");
        }
        const data = await response.json();
        setCourses(data.cursos);
        setFilteredCourses(data.cursos);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Erro desconhecido.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter((course) => {
      const matchesCategory =
        filterCategory === "Todos" || course.categoria === filterCategory;
      const matchesSearch =
        course.título.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instrutor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.descrição.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    setFilteredCourses(filtered);
  }, [filterCategory, searchTerm, courses]);

  const categories = ["Todos", ...new Set(courses.map((course) => course.categoria))];

  const buttonStyles = `
    py-3 px-6 rounded-full text-sm font-medium border-2 transition-all duration-300 transform hover:scale-105 focus:outline-none 
    focus:ring-2 focus:ring-offset-2 
    border-[var(--hover-primary)] bg-transparent text-[var(--hover-primary)] 
    hover:bg-[var(--hover-primary)] hover:text-white
  `;

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Cursos Recomendados</h1>
      <p className="text-lg text-[var(--text-secondary)] text-center mb-8">
        Descubra cursos cuidadosamente selecionados para aprimorar suas habilidades em programação.
      </p>

      {/* Barra de Busca */}
      <div className="mb-8">
        <SearchBarTutorials
          searchQuery={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filtros de Categoria */}
      <div className="flex justify-center space-x-4 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            className={`${buttonStyles} ${
              filterCategory === category
                ? "bg-[var(--hover-primary)] text-white"
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
            className="relative p-6 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--hover-primary-light)] rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 flex flex-col justify-between"
          >
            {/* Nível (Estilo atualizado) */}
            <div className="absolute -top-3 -right-3 bg-[var(--hover-primary)] text-white text-xs font-bold py-1 px-4 rounded-full shadow-md">
              {course.nível}
            </div>

            {/* Título */}
            <h2 className="text-xl font-bold text-[var(--hover-primary)] mb-4">
              {course.título}
            </h2>

            {/* Descrição */}
            <p className="text-[var(--text-secondary)] text-sm mb-4">{course.descrição}</p>

            {/* Detalhes do Curso */}
            <ul className="text-sm text-[var(--text-secondary)] space-y-1 mb-6">
              <li>
                <strong>Plataforma:</strong> {course.plataforma}
              </li>
              <li>
                <strong>Instrutor:</strong> {course.instrutor}
              </li>
              <li>
                <strong>Duração:</strong> {course.horas} horas
              </li>
            </ul>

            {/* Botão de Acesso */}
            <a
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center"
            >
              <button
                className={`w-full py-3 px-4 border-2 border-[var(--hover-primary)] text-[var(--hover-primary)] rounded-full font-semibold transition-all duration-300 hover:bg-[var(--hover-primary)] hover:text-white`}
              >
                Acessar Curso
              </button>
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
