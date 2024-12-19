import React, { useEffect, useState } from "react";
import { FaDiscord, FaTelegram, FaSlack, FaWhatsapp, FaUsers } from "react-icons/fa";

interface NetworkingItem {
  id: number;
  tipo: string;
  plataforma: string;
  nome: string;
  descrição: string;
  link: string;
}

const NetworkingPage: React.FC = () => {
  const [networkingData, setNetworkingData] = useState<NetworkingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "https://api.sheety.co/f07cf17198b5bb94b23fee472faecc25/apiDev/networking";

  useEffect(() => {
    const fetchNetworkingData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Erro ao carregar os dados de networking.");
        }
        const data = await response.json();
        setNetworkingData(data.networking);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Erro desconhecido.");
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkingData();
  }, []);

  const getChatIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "telegram":
        return <FaTelegram className="text-[var(--hover-primary)]" />;
      case "slack":
        return <FaSlack className="text-[var(--hover-primary)]" />;
      case "whatsapp":
        return <FaWhatsapp className="text-[var(--hover-primary)]" />;
      case "discord":
        return <FaDiscord className="text-[var(--hover-primary)]" />;
      default:
        return <FaUsers className="text-[var(--hover-primary)]" />;
    }
  };

  const categorizedData = networkingData.reduce(
    (acc: Record<string, NetworkingItem[]>, item) => {
      if (!acc[item.plataforma]) acc[item.plataforma] = [];
      acc[item.plataforma].push(item);
      return acc;
    },
    {}
  );

  if (loading) {
    return <p className="text-center mt-10 text-[var(--text-secondary)]">Carregando dados...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Networking Profissional</h1>
      <p className="text-lg text-[var(--text-secondary)] text-center mb-10">
        Descubra comunidades, servidores e grupos para expandir sua rede profissional.
      </p>

      {Object.keys(categorizedData).map((platform) => (
        <section key={platform} className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            {getChatIcon(platform)} {platform}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorizedData[platform].map((item) => (
              <li
                key={item.id}
                className="p-4 bg-[var(--bg-secondary)] rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2"
              >
                <h3 className="text-lg font-bold mb-2">{item.nome}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  {item.descrição}
                </p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-2 px-4 text-[var(--hover-primary)] border border-[var(--hover-primary)] rounded-full font-semibold hover:bg-[var(--hover-primary)] hover:text-white transition-all"
                >
                  Acessar
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default NetworkingPage;
