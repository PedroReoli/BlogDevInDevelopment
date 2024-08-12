import  { useState } from "react";
import BlogPost from "./BlogPost";

const BlogList = () => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const posts = ["post1.html", "post2.html"]; // Adicione os nomes dos arquivos aqui

  return (
    <div className="common-container">
      <h2 className="h1-bold">Blog Posts</h2>
      <ul className="list-none p-0 m-0">
        {posts.map((post, index) => (
          <li key={index} className="mb-3">
            <button
              onClick={() => setSelectedPost(post)}
              className="btn-enhanced"
            >
              {post.replace(".html", "")}
            </button>
          </li>
        ))}
      </ul>
      {selectedPost && <BlogPost filename={selectedPost} />}
    </div>
  );
};

export default BlogList;
