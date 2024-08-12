// src/components/BlogGridList.tsx
import { useState } from "react";
import BlogPost from "./BlogPost";
import { blogsData } from "@/constants/BlogsData";
import { BlogPost as BlogPostInterface } from "@/constants/interfaces";

const BlogList = () => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-10">Blog Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogsData.map((post: BlogPostInterface, index) => (
          <div
            key={index}
            className="bg-[#1b1b1b] text-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">{post.title}</h3>
              <p className="text-sm mb-5">{post.description}</p>
              <div className="flex justify-between items-center text-sm mb-4">
                <span className="text-gray-400">{post.author}</span>
                <span className="text-gray-400">{post.date}</span>
              </div>
              <button
                onClick={() => setSelectedPost(post.filename)}
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Ler mais
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedPost && <BlogPost filename={selectedPost} />}
    </div>
  );
};

export default BlogList;
