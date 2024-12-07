import { blogsData } from "@/constants";
import { Link } from "react-router-dom";

const BlogGridList = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogsData.map((post, index) => (
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
            <div className="flex justify-center">
              <Link
                to={`/post/${post.slug}`} // Use o slug aqui
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
