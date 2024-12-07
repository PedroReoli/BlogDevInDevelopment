import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { lessonsData } from "@/constants/LessonsData";
import LessonNavigation from "@/components/_navigation/LessonNavigation";

const LessonDetails = () => {
  const { id } = useParams<{ id: string }>(); // "id" será o slug
  const [lesson, setLesson] = useState<any>(null);
  const [lessonContent, setLessonContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const selectedLesson = lessonsData.find((l) => l.slug === id);
    if (!selectedLesson) {
      setError("Aula não encontrada.");
      return;
    }

    setLesson(selectedLesson);

    fetch(selectedLesson.link) // Carrega o conteúdo da aula do Appwrite
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar a aula.");
        }
        return response.text();
      })
      .then((data) => setLessonContent(data))
      .catch((error) => {
        console.error("Erro ao carregar a aula:", error);
        setError("Erro ao carregar o conteúdo.");
      });
  }, [id]);

  return (
    <div className="container mx-auto py-8 px-5">
      {error ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-red-500 text-xl font-semibold">{error}</p>
        </div>
      ) : lesson && lessonContent ? (
        <>
          {/* Atualiza o título da aba */}
          <Helmet>
            <title>{lesson.title} | Aulas</title>
          </Helmet>

          {/* Renderiza o conteúdo HTML da aula */}
          <div
            className="prose max-w-none mb-10"
            dangerouslySetInnerHTML={{ __html: lessonContent }}
          />

          {/* Navegação entre aulas */}
          <LessonNavigation currentSlug={id || ""} />
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl font-semibold text-blue-500 animate-bounce">Carregando aula...</p>
        </div>
      )}
    </div>
  );
};

export default LessonDetails;
