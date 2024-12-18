import React, { useState } from "react";

interface Discussion {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  comments: number;
}

const DiscussionsPage: React.FC = () => {
  const [discussions] = useState<Discussion[]>([
    { id: 1, title: "React vs Vue: Qual o melhor?", author: "João", createdAt: "2024-12-15", comments: 10 },
    { id: 2, title: "Dicas para melhorar no CSS", author: "Ana", createdAt: "2024-12-14", comments: 5 },
    { id: 3, title: "Qual banco de dados usar?", author: "Pedro", createdAt: "2024-12-13", comments: 8 },
  ]);

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <h1 className="text-2xl font-bold mb-6">Discussões</h1>
      <ul className="space-y-4">
        {discussions.map((discussion) => (
          <li key={discussion.id} className="p-4 bg-[var(--bg-secondary)] rounded-lg shadow hover:shadow-lg">
            <h2 className="text-lg font-bold">{discussion.title}</h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Por {discussion.author} em {discussion.createdAt} • {discussion.comments} comentários
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiscussionsPage;
