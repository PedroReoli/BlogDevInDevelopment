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
    <div className="container mx-auto py-8">
      {/* Componente de Pesquisa */}
      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />

      {/* Grid de Aulas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredLessons.length === 0 ? (
          <p className="text-center text-gray-400">Nenhuma aula encontrada.</p>
        ) : (
          filteredLessons.map((lesson: LessonInterface, index) => (
            <div
              key={index}
              className="bg-[#1e1e2d] text-white p-5 rounded-xl shadow-md hover:shadow-lg border border-gray-600 transition-transform transform hover:scale-105"
            >
              {/* Imagem */}
              <img
                src={lesson.imageUrl}
                alt={lesson.title}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />

              {/* Título */}
              <h3 className="text-lg font-bold mb-2 text-blue-400">
                {lesson.title}
              </h3>

              {/* Descrição */}
              <p className="text-gray-300 text-sm mb-4">{lesson.description}</p>

              {/* Tags (Keywords) */}
              <div className="flex flex-wrap gap-2 mb-4">
                {lesson.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold text-green-500 bg-green-900 px-2 py-1 rounded"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              {/* Data e Link */}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{lesson.date}</span>
                <Link
                  to={`/lesson/${lesson.slug}`}
                  className="text-blue-400 hover:text-blue-300"
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
