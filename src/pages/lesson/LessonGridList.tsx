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
    <div className="container mx-auto py-8 px-4">
      {/* Componente de Pesquisa */}
      <div className="mb-6">
        <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />
      </div>

      {/* Grid de Aulas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredLessons.length === 0 ? (
          <p className="text-center text-gray-400">Nenhuma aula encontrada.</p>
        ) : (
          filteredLessons.map((lesson: LessonInterface, index) => (
            <div
              key={index}
              className="bg-[#1f1f2e] text-white p-6 rounded-md shadow-lg hover:shadow-xl border border-gray-600 transition-transform transform hover:scale-105"
            >
              {/* Imagem */}
              <div className="relative overflow-hidden rounded mb-4">
                <img
                  src={lesson.imageUrl}
                  alt={lesson.title}
                  className="w-full h-36 object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Título */}
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-green-400 hover:text-green-300 transition-colors">
                  {lesson.title}
                </h3>
              </div>

              {/* Descrição */}
              <div className="mb-3">
                <p className="text-gray-300 text-sm">
                  {lesson.description}
                </p>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {lesson.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold text-green-500 bg-green-900 px-3 py-1 rounded-md shadow-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Data e Link */}
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>{lesson.date}</span>
                <Link
                  to={`/lesson/${lesson.slug}`}
                  className="text-green-400 hover:text-green-300 underline"
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
