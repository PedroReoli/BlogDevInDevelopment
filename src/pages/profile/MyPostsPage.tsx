import React, { useState } from "react";

interface Post {
  id: number;
  title: string;
  date: string;
  status: "Publicado" | "Rascunho";
}

const MyPostsPage: React.FC = () => {
  const [posts] = useState<Post[]>([
    { id: 1, title: "Como começar em React", date: "2024-12-01", status: "Publicado" },
    { id: 2, title: "Guia básico de TypeScript", date: "2024-12-05", status: "Rascunho" },
  ]);

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <h1 className="text-2xl font-bold mb-6">Meus Posts</h1>
      {posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="p-4 bg-[var(--bg-secondary)] rounded-lg shadow">
              <h2 className="text-lg font-bold">{post.title}</h2>
              <p className="text-sm text-[var(--text-secondary)]">Data: {post.date}</p>
              <p className={`text-sm font-semibold ${post.status === "Publicado" ? "text-green-500" : "text-yellow-500"}`}>
                Status: {post.status}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[var(--text-secondary)]">Você ainda não criou nenhum post.</p>
      )}
    </div>
  );
};

export default MyPostsPage;
