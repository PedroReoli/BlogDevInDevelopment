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

    const filtered = query
      ? blogsData.filter(
          (post) =>
            post.title.toLowerCase().includes(query) ||
            post.keywords.some((keyword) =>
              keyword.toLowerCase().includes(query)
            )
        )
      : blogsData;

    setFilteredPosts(filtered);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {filteredPosts.map((post: BlogPostInterface, index) => (
          <div
            key={index}
            className="group bg-[var(--bg-secondary)] dark:bg-[var(--bg-primary)] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden"
          >
            {/* Imagem com Data */}
            <div className="relative h-48">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-2 right-2 bg-[var(--hover-primary)] text-white text-xs font-bold px-2 py-1 rounded-md">
                {post.date}
              </span>
            </div>

            {/* Conteúdo */}
            <div className="p-5 flex flex-col flex-grow">
              {/* Título */}
              <h3 className="text-lg md:text-base font-bold text-[var(--hover-primary)] mb-2 line-clamp-2">
                {post.title}
              </h3>

              {/* Descrição */}
              <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-3 leading-relaxed">
                {post.description}
              </p>

              {/* Tags Organizáveis */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.keywords
                  .sort((a, b) => a.localeCompare(b)) // Ordena as tags em ordem alfabética
                  .slice(0, 4) // Limita a 4 tags visíveis
                  .map((keyword, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-[var(--hover-primary)] text-white px-2 py-1 rounded-full font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
              </div>

              {/* Link */}
              <div className="mt-auto text-right">
                <Link
                  to={`/post/${post.slug}`}
                  className="text-[var(--hover-primary)] font-semibold hover:underline transition-all duration-300"
                >
                  Continuar lendo →
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
