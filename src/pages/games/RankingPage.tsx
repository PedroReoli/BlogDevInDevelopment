import React, { useState } from "react";

interface Player {
  id: number;
  name: string;
  score: number;
}

const RankingPage: React.FC = () => {
  const [players] = useState<Player[]>([
    { id: 1, name: "Pedro", score: 1200 },
    { id: 2, name: "Ana", score: 1150 },
    { id: 3, name: "João", score: 1100 },
    { id: 4, name: "Maria", score: 1050 },
  ]);

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <h1 className="text-2xl font-bold mb-6">Ranking</h1>
      <ul className="space-y-4">
        {players.map((player, index) => (
          <li
            key={player.id}
            className="p-4 bg-[var(--bg-secondary)] rounded-lg shadow hover:shadow-lg flex justify-between"
          >
            <span>
              {index + 1}. {player.name}
            </span>
            <span>{player.score} pontos</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingPage;