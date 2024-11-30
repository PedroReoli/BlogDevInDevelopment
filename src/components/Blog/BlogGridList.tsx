<<<<<<< HEAD
import { Link } from "react-router-dom";
import { blogsData } from "@/constants/BlogsData";
import { BlogPost as BlogPostInterface } from "@/constants/interfaces";

const BlogGridList = () => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-10">Blog Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogsData.map((post: BlogPostInterface, index) => (
          <div
            key={index}
            className="bg-[#1b1b1b] text-white p-6 rounded-lg shadow-lg border border-white transition-transform transform hover:scale-105"
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-72 object-cover mb-6 rounded"
            />
            <h3 className="text-xl font-bold mb-3">{post.title}</h3>
            <p className="text-gray-400 text-sm mb-5">{post.description}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {post.keywords.map((keyword, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold text-blue-500 bg-blue-900 px-2 py-1 rounded"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <hr className="border-gray-600 mb-5" />
            <div className="flex justify-between items-center text-sm text-gray-500 mb-5">
              <span>{post.date}</span>
            </div>
            <div className="flex justify-center">
              <Link
                to={`/post/${post.filename}`}
                className="bg-transparent text-blue-500 hover:text-blue-400 underline"
              >
                Continuar lendo
              </Link>
            </div>
          </div>
        ))}
=======
import { useState } from "react";
import { Link } from "react-router-dom";
import { blogsData } from "@/constants/BlogsData";
import { BlogPost as BlogPostInterface } from "@/constants/interfaces";
import { FaSearch } from "react-icons/fa";

const BlogGridList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(blogsData);

  // Função de pesquisa
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filtra os posts com base no título ou nas palavras-chave (tags)
    if (query === "") {
      setFilteredPosts(blogsData); // Se a pesquisa estiver vazia, mostra todos os posts
    } else {
      const filtered = blogsData.filter((post) => {
        // Verifica se o título ou alguma palavra-chave corresponde à pesquisa
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
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-10">Blog Posts</h2>

      {/* Barra de Pesquisa */}
      <div className="mb-6 flex justify-center">
        <div className="relative w-full lg:w-1/3 mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Pesquisar por título ou tag..."
            className="w-full p-3 pl-10 rounded-md border-2 border-gray-700 text-white bg-[#222222] focus:outline-none"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
            <FaSearch />
          </span>
        </div>
      </div>

      {/* Grid de Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length === 0 ? (
          <p className="text-center text-white">Nenhum resultado encontrado.</p>
        ) : (
          filteredPosts.map((post: BlogPostInterface, index) => (
            <div
              key={index}
              className="bg-[#1b1b1b] text-white p-6 rounded-lg shadow-lg border border-white transition-transform transform hover:scale-105"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-72 object-cover mb-6 rounded"
              />
              <h3 className="text-xl font-bold mb-3">{post.title}</h3>
              <p className="text-gray-400 text-sm mb-5">{post.description}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {post.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold text-blue-500 bg-blue-900 px-2 py-1 rounded"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <hr className="border-gray-600 mb-5" />
              <div className="flex justify-between items-center text-sm text-gray-500 mb-5">
                <span>{post.date}</span>
              </div>
              <div className="flex justify-center">
                <Link
                  to={`/post/${post.filename}`}
                  className="bg-transparent text-blue-500 hover:text-blue-400 underline"
                >
                  Continuar lendo
                </Link>
              </div>
            </div>
          ))
        )}
>>>>>>> 26135da4fd2509448af34e722b1ce37d69edd630
      </div>
    </div>
  );
};

export default BlogGridList;
