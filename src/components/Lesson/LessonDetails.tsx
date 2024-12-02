import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const LessonDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [lessonContent, setLessonContent] = useState<string>("");

  useEffect(() => {
    const loadLesson = async () => {
      try {
        const response = await fetch(`/content/lesson/${id}.html`);
        if (!response.ok) {
          throw new Error("Erro ao carregar a aula");
        }
        const text = await response.text();
        setLessonContent(text);
      } catch (error) {
        console.error("Erro ao carregar a aula:", error);
        setLessonContent("<p>Erro ao carregar o conteúdo</p>");
      }
    };

    loadLesson();
  }, [id]);

  return (
    <div className="container mx-auto py-8 px-5">
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lessonContent }} />
    </div>
  );
};

export default LessonDetails;
