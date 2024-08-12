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
      </div>
    </div>
  );
};

export default BlogGridList;
