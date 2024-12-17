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
    <div className="container mx-auto py-8 px-4">
      {/* Barra de Pesquisa */}
      <div className="mb-6">
        <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredPosts.map((post: BlogPostInterface, index) => (
          <div
            key={index}
            className="bg-[var(--bg-secondary)] rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-[1.02] flex flex-col"
          >
            {/* Imagem no Topo */}
            <div className="relative w-full h-48">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              {/* {/* Data */}
              <span
                className="absolute top-2 right-2 border-2 border-[var(--hover-primary)] 
                bg-transparent text-[var(--text-primary)] 
                px-2 py-1 rounded-full text-xs font-semibold 
                hover:bg-[var(--hover-primary)] hover:text-white transition-all duration-300"
              >
                {post.date}
              </span>

            </div>

            {/* Conteúdo do Card */}
            <div className="p-5 flex flex-col flex-grow">
              {/* Título */}
              <h3 className="text-lg font-bold text-[var(--hover-primary)] mb-3 leading-tight line-clamp-2">
                {post.title}
              </h3>

              {/* Descrição */}
              <p className="text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed mb-4">
                {post.description}
              </p>

              {/* Tags Ajustadas */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-2 py-1 rounded-full border-2 border-[var(--hover-primary)] 
                    bg-transparent text-[var(--text-primary)] 
                    hover:bg-[var(--hover-primary)] hover:text-white 
                    transition-all duration-300"
                  >
                    {keyword}
                  </span>
                ))}
              </div>


              {/* Link Centralizado */}
              <div className="mt-auto text-center">
                <Link
                  to={`/post/${post.slug}`}
                  className="text-[var(--hover-primary)] font-semibold hover:underline transition-all duration-300"
                >
                  Continuar lendo
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogGridList;
