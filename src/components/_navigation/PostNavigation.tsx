import { blogsData } from "@/constants/BlogsData";
import { Link } from "react-router-dom";

interface PostNavigationProps {
  currentSlug: string;
}

const PostNavigation: React.FC<PostNavigationProps> = ({ currentSlug }) => {
  const currentIndex = blogsData.findIndex((post) => post.slug === currentSlug);
  const previousPost = blogsData[currentIndex - 1];
  const nextPost = blogsData[currentIndex + 1];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Move para o topo da página
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-600 pt-5">
      {/* Botão para o post anterior */}
      {previousPost ? (
        <Link
          to={`/post/${previousPost.slug}`}
          className="btn-modern-alt transition hover:bg-gray-700 hover:text-blue-400"
          onClick={scrollToTop}
        >
          ← {previousPost.title}
        </Link>
      ) : (
        <span className="text-gray-500 text-sm">Não há post anterior</span>
      )}

      {/* Botão para a página inicial */}
      <Link
        to="/"
        className="btn-modern-alt mx-5 transition hover:bg-blue-500 hover:text-white"
        onClick={scrollToTop}
      >
        Página Inicial
      </Link>

      {/* Botão para o próximo post */}
      {nextPost ? (
        <Link
          to={`/post/${nextPost.slug}`}
          className="btn-modern-alt transition hover:bg-gray-700 hover:text-blue-400"
          onClick={scrollToTop}
        >
          {nextPost.title} →
        </Link>
      ) : (
        <span className="text-gray-500 text-sm">Não há próximo post</span>
      )}
    </div>
  );
};

export default PostNavigation;
