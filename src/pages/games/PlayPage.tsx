import React from "react";

const PlayPage: React.FC = () => {
  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <h1 className="text-2xl font-bold mb-6">Jogar</h1>
      <p className="text-lg text-[var(--text-secondary)]">
        Bem-vindo à seção de jogos! Aqui você pode participar de desafios interativos, testar suas habilidades e se divertir enquanto aprende.
      </p>
      <button className="mt-4 bg-[var(--hover-primary)] text-white py-2 px-4 rounded-md hover:bg-blue-600">
        Iniciar Jogo
      </button>
    </div>
  );
};

export default PlayPage;