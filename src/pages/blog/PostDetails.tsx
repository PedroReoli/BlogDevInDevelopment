import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet"; // Importa o Helmet
import { blogsData } from "@/constants/BlogsData";

const PostDetails = () => {
  const { id } = useParams<{ id: string }>(); // "id" será o slug
  const [post, setPost] = useState<any>(null);
  const [postContent, setPostContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const selectedPost = blogsData.find((p) => p.slug === id);
    if (!selectedPost) {
      setError("Post não encontrado.");
      return;
    }

    setPost(selectedPost);

    fetch(selectedPost.link)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar o conteúdo.");
        }
        return response.text();
      })
      .then((data) => setPostContent(data))
      .catch((err) => {
        console.error(err);
        setError("Erro ao carregar o conteúdo do post.");
      });
  }, [id]);

  return (
    <div className="container mx-auto py-8 px-5">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : post && postContent ? (
        <>
          {/* Atualiza o título da aba com Helmet */}
          <Helmet>
            <title>{post.title} | Meu Blog</title>
          </Helmet>

          {/* Renderiza o conteúdo do post */}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: postContent }}
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl font-semibold text-blue-500 animate-bounce">Carregando página...</p>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
