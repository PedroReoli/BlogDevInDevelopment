import React, { useEffect, useState } from "react";

interface BlogPostProps {
  link: string; // Link direto para o arquivo no bucket
}

const BlogPost: React.FC<BlogPostProps> = ({ link }) => {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    fetch(link)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar o conteúdo.");
        }
        return response.text();
      })
      .then((data) => setContent(data))
      .catch((error) => {
        console.error("Erro ao carregar o arquivo HTML:", error);
        setContent("<p>Erro ao carregar o conteúdo</p>");
      });
  }, [link]);

  return (
    <div className="experience-details">
      {content ? (
        <div
          className="html-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <p className="text-gray-400">Carregando...</p>
      )}
    </div>
  );
};

export default BlogPost;
