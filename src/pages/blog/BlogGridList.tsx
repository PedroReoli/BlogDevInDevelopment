import { useState } from "react";
import { Link } from "react-router-dom";
import { blogsData } from "@/constants";
import { BlogPost as BlogPostInterface } from "@/constants/interfaces";
import SearchBar from "@/components/Shared/SearchBar";

const BlogGridList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(blogsData);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredPosts(blogsData);
    } else {
      const filtered = blogsData.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(query);
        const keywordMatch = post.keywords.some((keyword) =>
          keyword.toLowerCase().includes(query)
        );
        return titleMatch || keywordMatch;
      });

      setFilteredPosts(filtered);
    }
  };

  return (
    <div className="container mx-auto py-4 sm:py-6 md:py-8 px-2 sm:px-4 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Barra de Pesquisa */}
      <div className="mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          placeholder="Buscar blogs por título ou palavra-chave..."
        />
      </div>

      {/* Grid de Blogs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {filteredPosts.length === 0 ? (
          <p className="text-center text-[var(--text-secondary)] col-span-full">
            Nenhum blog encontrado.
          </p>
        ) : (
          filteredPosts.map((post: BlogPostInterface, index) => (
            <div
              key={index}
              className="p-3 sm:p-4 md:p-5 bg-[var(--bg-secondary)] rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 border border-[var(--hover-primary)] flex flex-col"
            >
              {/* Imagem */}
              <div className="relative overflow-hidden rounded-lg mb-3 sm:mb-4">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-32 sm:h-36 md:h-40 object-cover transition-transform duration-300 hover:scale-110 rounded-lg"
                />
              </div>

              {/* Título */}
              <h3 className="text-lg sm:text-xl font-semibold text-[var(--hover-primary)] mb-2 sm:mb-3 hover:underline line-clamp-2">
                {post.title}
              </h3>

              {/* Descrição */}
              <p className="text-[var(--text-secondary)] text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                {post.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                {post.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs font-semibold rounded-full border border-[var(--hover-primary)] text-[var(--hover-primary)] hover:bg-[var(--hover-primary)] hover:text-white transition-all"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              {/* Data e Link */}
              <div className="flex justify-between items-center mt-auto text-xs sm:text-sm text-[var(--text-secondary)]">
                <span>{post.date}</span>
                <Link
                  to={`/post/${post.slug}`}
                  className="text-[var(--hover-primary)] font-semibold hover:underline transition-all"
                >
                  Continuar lendo
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogGridList;

