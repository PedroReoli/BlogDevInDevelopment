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
    <div className="container mx-auto py-6 px-4">
      {/* Componente de Pesquisa */}
      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />

      {/* Grid de Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredPosts.map((post: BlogPostInterface, index) => (
          <div
            key={index}
            className="bg-[#1b1b1b] text-white p-4 rounded-lg shadow-lg border border-gray-700 transition-transform transform hover:scale-105 animate-fade-in"
          >
            {/* Imagem */}
            <div className="relative overflow-hidden rounded mb-4">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>

            {/* Título */}
            <h3 className="text-lg font-bold mb-2 text-blue-400 hover:text-blue-300 transition-colors">
              {post.title}
            </h3>

            {/* Descrição */}
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {post.description}
            </p>

            {/* Keywords */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.keywords.map((keyword, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium text-blue-500 bg-gray-800 px-3 py-1 rounded-full shadow-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>

            {/* Link "Continuar lendo" */}
            <div className="text-center">
              <Link
                to={`/post/${post.slug}`}
                className="text-blue-400 hover:text-blue-300 underline text-sm"
              >
                Continuar lendo
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogGridList;