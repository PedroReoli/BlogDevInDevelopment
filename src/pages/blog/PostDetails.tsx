import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet"; // Importa o Helmet
import { blogsData } from "@/constants/BlogsData";
import Loader from "@/components/Shared/Loader"; // Importa o Loader
import NotFoundPage from "@/pages/not-found/NotFoundPage"; // Importa a página 404
import PostNavigation from "@/components/_navigation/PostNavigation"; // Importa a navegação entre posts

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
        <NotFoundPage /> // Exibe a página 404 em caso de erro
      ) : post && postContent ? (
        <>
          {/* Atualiza o título da aba com Helmet */}
          <Helmet>
            <title>{post.title} | Meu Blog</title>
          </Helmet>

          <div
              className="post-table-container"
              dangerouslySetInnerHTML={{ __html: postContent }}
            />


          {/* Navegação entre posts */}
          <PostNavigation currentSlug={id || ""} />
        </>
      ) : (
        <Loader /> // Exibe o Loader enquanto os dados estão sendo carregados
      )}
    </div>
  );
};

export default PostDetails;
