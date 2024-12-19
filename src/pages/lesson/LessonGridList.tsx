import { useState } from "react";
import { Link } from "react-router-dom";
import { lessonsData } from "@/constants/LessonsData";
import { Lesson as LessonInterface } from "@/constants/interfaces";
import SearchBar from "@/components/Shared/SearchBar";

const LessonGridList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLessons, setFilteredLessons] = useState(lessonsData);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredLessons(lessonsData);
    } else {
      const filtered = lessonsData.filter((lesson) => {
        const titleMatch = lesson.title.toLowerCase().includes(query);
        const keywordMatch = lesson.keywords.some((keyword) =>
          keyword.toLowerCase().includes(query)
        );
        return titleMatch || keywordMatch;
      });

      setFilteredLessons(filtered);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 bg-[var(--bg-primary)] text-[var(--text-primary)]">

      {/* Componente de Pesquisa */}
      <div className="mb-8 max-w-3xl mx-auto">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          placeholder="Buscar aulas por título ou palavra-chave..."
        />
      </div>

      {/* Grid de Aulas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredLessons.length === 0 ? (
          <p className="text-center text-[var(--text-secondary)]">
            Nenhuma aula encontrada.
          </p>
        ) : (
          filteredLessons.map((lesson: LessonInterface, index) => (
            <div
              key={index}
              className="p-5 bg-[var(--bg-secondary)] rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 border border-[var(--hover-primary)] flex flex-col"
            >
              {/* Imagem */}
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={lesson.imageUrl}
                  alt={lesson.title}
                  className="w-full h-40 object-cover transition-transform duration-300 hover:scale-110 rounded-lg"
                />
              </div>

              {/* Título */}
              <h3 className="text-xl font-semibold text-[var(--hover-primary)] mb-3 hover:underline">
                {lesson.title}
              </h3>

              {/* Descrição */}
              <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-3">
                {lesson.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {lesson.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs font-semibold rounded-full border border-[var(--hover-primary)] text-[var(--hover-primary)] hover:bg-[var(--hover-primary)] hover:text-white transition-all"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              {/* Data e Link */}
              <div className="flex justify-between items-center mt-auto text-sm text-[var(--text-secondary)]">
                <span>{lesson.date}</span>
                <Link
                  to={`/lesson/${lesson.slug}`}
                  className="text-[var(--hover-primary)] font-semibold hover:underline transition-all"
                >
                  Ver detalhes
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LessonGridList;
