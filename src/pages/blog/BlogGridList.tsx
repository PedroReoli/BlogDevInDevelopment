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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredPosts.map((post: BlogPostInterface, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden border border-[var(--border-primary)] hover:shadow-lg transition-shadow duration-300 bg-[var(--bg-secondary)]"
          >
            {/* Imagem com Data */}
            <div className="relative overflow-hidden h-48">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <span className="absolute top-2 right-2 bg-[var(--hover-primary)] text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
                {post.date}
              </span>
            </div>

            {/* Conteúdo */}
            <div className="p-5">
              {/* Título */}
              <h3 className="text-lg font-semibold mb-3 text-[var(--hover-primary)] line-clamp-2">
                {post.title}
              </h3>

              {/* Descrição */}
              <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-3 leading-relaxed">
                {post.description}
              </p>

              {/* Palavras-chave */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="bg-[var(--hover-primary)] text-white text-xs font-medium px-2 py-1 rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              {/* Link */}
              <div className="text-right">
                <Link
                  to={`/post/${post.slug}`}
                  className="text-[var(--hover-primary)] font-semibold hover:underline transition-colors duration-300"
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
