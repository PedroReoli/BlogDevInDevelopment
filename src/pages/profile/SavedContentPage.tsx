import React, { useState } from "react";

interface Content {
  id: number;
  title: string;
  type: "Post" | "Aula" | "Projeto";
}

const SavedContentPage: React.FC = () => {
  const [savedContent] = useState<Content[]>([
    { id: 1, title: "Como criar componentes reutilizáveis", type: "Post" },
    { id: 2, title: "Introdução ao TypeScript", type: "Aula" },
    { id: 3, title: "Projeto de Dashboard com React", type: "Projeto" },
  ]);

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <h1 className="text-2xl font-bold mb-6">Conteúdo Salvo</h1>
      {savedContent.length > 0 ? (
        <ul className="space-y-4">
          {savedContent.map((content) => (
            <li key={content.id} className="p-4 bg-[var(--bg-secondary)] rounded-lg shadow">
              <h2 className="text-lg font-bold">{content.title}</h2>
              <p className="text-sm text-[var(--text-secondary)]">Tipo: {content.type}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[var(--text-secondary)]">Você ainda não salvou nenhum conteúdo.</p>
      )}
    </div>
  );
};

export default SavedContentPage;
