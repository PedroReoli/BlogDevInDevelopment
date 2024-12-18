import React, { useState } from "react";
import { FaCrown, FaMedal, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Player {
  id: number;
  name: string;
  score: number;
  avatar: string; // URL para avatar temporário
}

const RankingPage: React.FC = () => {
  const [players] = useState<Player[]>([
    { id: 1, name: "Pedro", score: 1200, avatar: "https://via.placeholder.com/50" },
    { id: 2, name: "Ana", score: 1150, avatar: "https://via.placeholder.com/50" },
    { id: 3, name: "João", score: 1100, avatar: "https://via.placeholder.com/50" },
    { id: 4, name: "Maria", score: 1050, avatar: "https://via.placeholder.com/50" },
    { id: 5, name: "Lucas", score: 1000, avatar: "https://via.placeholder.com/50" },
  ]);

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      {/* Título e descrição */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Ranking Global</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Veja os melhores jogadores da nossa comunidade. Ganhe pontos, conquiste badges e alcance o topo do ranking!
        </p>
      </div>

      {/* Destaques dos Top 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {players.slice(0, 3).map((player, index) => (
          <div
            key={player.id}
            className={`p-6 rounded-lg shadow-lg flex flex-col items-center text-center bg-gradient-to-r from-[var(--hover-primary)] to-[var(--bg-secondary)] text-white ${
              index === 0
                ? "border-4 border-yellow-500"
                : index === 1
                ? "border-4 border-gray-400"
                : "border-4 border-[#cd7f32]"
            }`}
          >
            {index === 0 && <FaCrown className="text-5xl mb-2" />}
            {index === 1 && <FaMedal className="text-5xl mb-2" />}
            {index === 2 && <FaTrophy className="text-5xl mb-2" />}
            <img
              src={player.avatar}
              alt={player.name}
              className="w-20 h-20 rounded-full border-4 border-white mb-4"
            />
            <h2 className="text-2xl font-bold">{player.name}</h2>
            <p className="text-lg font-semibold">{player.score} pontos</p>
          </div>
        ))}
      </div>

      {/* Lista do restante do ranking */}
      <div className="bg-[var(--bg-secondary)] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Jogadores Rankeados</h2>
        {players.length > 3 ? (
          <ul className="space-y-4">
            {players.slice(3).map((player, index) => (
              <li
                key={player.id}
                className="flex items-center justify-between p-4 rounded-lg shadow bg-[var(--bg-primary)] hover:shadow-lg transition-all"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-xl font-bold">{index + 4}.</span>
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-12 h-12 rounded-full border-2 border-[var(--hover-primary)]"
                  />
                  <span className="text-lg font-semibold">{player.name}</span>
                </div>
                <span className="text-lg font-bold text-[var(--hover-primary)]">
                  {player.score} pontos
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-[var(--text-secondary)] py-10">
            As próximas rankeações estão a caminho. Prepare-se para competir e conquistar seu lugar no topo!
          </p>
        )}
      </div>

      {/* Botão para jogos */}
      <div className="text-center mt-10">
        <Link
          to="/play"
          className="bg-[var(--hover-primary)] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all"
        >
          Jogar Agora
        </Link>
      </div>
    </div>
  );
};

export default RankingPage;
