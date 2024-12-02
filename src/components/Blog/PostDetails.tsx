import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [postContent, setPostContent] = useState<string>("");

  useEffect(() => {
    const loadPost = async () => {
      try {
        // Carrega o arquivo HTML da pasta public/content
        const response = await fetch(`/content/${id}.html`);
        const text = await response.text();
        setPostContent(text);
      } catch (error) {
        console.error("Erro ao carregar o post:", error);
        setPostContent("<p>Erro ao carregar o conteúdo</p>");
      }
    };

    loadPost();
  }, [id]);

  return (
    <div className="container mx-auto py-8 px-5">
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: postContent }} />
    </div>
  );
};

export default PostDetails;