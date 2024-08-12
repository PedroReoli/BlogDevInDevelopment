
import React, { useEffect, useState } from "react";

interface BlogPostProps {
  filename: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ filename }) => {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/src/content/posts/${filename}`)
      .then((response) => response.text())
      .then((data) => setContent(data))
      .catch((error) => console.error("Error loading HTML file:", error));
  }, [filename]);

  return (
    <div className="experience-details">
      {content ? (
        <div
          className="html-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <p className="text-gray-400">Loading...</p>
      )}
    </div>
  );
};

export default BlogPost;
