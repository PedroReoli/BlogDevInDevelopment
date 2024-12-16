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
    <div className="container mx-auto py-6 px-4">
      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredPosts.map((post: BlogPostInterface, index) => (
          <div
            key={index}
            className="bg-secondary text-primary p-4 rounded-lg shadow-lg border border-border-primary hover:scale-105 transform transition-transform"
          >
            <div className="relative overflow-hidden rounded mb-4">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover hover:scale-110 transition-transform"
              />
            </div>
            <h3 className="text-lg font-bold mb-2 text-hover-primary">
              {post.title}
            </h3>
            <p className="text-secondary text-sm mb-4 line-clamp-2">
              {post.description}
            </p>
            <div className="text-center">
              <Link to={`/post/${post.slug}`} className="underline">
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
