import React from "react";
import { FaDiscord, FaUsers, FaTelegram, FaSlack, FaWhatsapp } from "react-icons/fa";

const NetworkingPage: React.FC = () => {
  const discordServers = [
    {
      name: "Dev Brasil",
      description: "Comunidade ativa para desenvolvedores brasileiros.",
      link: "https://discord.gg/devbrasil",
    },
    {
      name: "Frontend Masters",
      description: "Discussões sobre frontend e tendências.",
      link: "https://discord.gg/frontendmasters",
    },
  ];

  const chatGroups = [
    {
      platform: "Telegram",
      name: "Tech Updates",
      description: "Novidades e oportunidades na área de tecnologia.",
      link: "https://t.me/techupdates",
    },
    {
      platform: "Slack",
      name: "Remote Work",
      description: "Discussões sobre trabalho remoto e freelancing.",
      link: "https://slack.com/remote-work",
    },
    {
      platform: "WhatsApp",
      name: "Dev Group",
      description: "Grupo de WhatsApp para networking entre desenvolvedores.",
      link: "https://wa.me/123456789",
    },
  ];

  const recommendedCommunities = [
    {
      name: "Women Who Code",
      description: "Comunidade global para mulheres na tecnologia.",
      link: "https://www.womenwhocode.com/",
    },
    {
      name: "GDG (Google Developer Groups)",
      description: "Grupos de desenvolvedores organizados pelo Google.",
      link: "https://developers.google.com/community/gdg",
    },
  ];

  const getChatIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "telegram":
        return <FaTelegram className="text-[var(--hover-primary)]" />;
      case "slack":
        return <FaSlack className="text-[var(--hover-primary)]" />;
      case "whatsapp":
        return <FaWhatsapp className="text-[var(--hover-primary)]" />;
      default:
        return <FaUsers className="text-[var(--hover-primary)]" />;
    }
  };

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Networking Profissional</h1>
      <p className="text-lg text-[var(--text-secondary)] text-center mb-10">
        Descubra comunidades, servidores e grupos para expandir sua rede profissional.
      </p>

      {/* Servidores de Discord */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaDiscord className="text-[var(--hover-primary)]" /> Servidores de Discord
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {discordServers.map((server, index) => (
            <li
              key={index}
              className="p-4 bg-[var(--bg-secondary)] rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2"
            >
              <h3 className="text-lg font-bold mb-2">{server.name}</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {server.description}
              </p>
              <a
                href={server.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2 px-4 text-[var(--hover-primary)] border border-[var(--hover-primary)] rounded-full font-semibold hover:bg-[var(--hover-primary)] hover:text-white transition-all"
              >
                Entrar no Servidor
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Chats e Grupos */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaUsers className="text-[var(--hover-primary)]" /> Chats e Grupos
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chatGroups.map((group, index) => (
            <li
              key={index}
              className="p-4 bg-[var(--bg-secondary)] rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2"
            >
              <div className="flex items-center gap-2 mb-2">
                {getChatIcon(group.platform)}
                <h3 className="text-lg font-bold">{group.name}</h3>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {group.description}
              </p>
              <a
                href={group.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2 px-4 text-[var(--hover-primary)] border border-[var(--hover-primary)] rounded-full font-semibold hover:bg-[var(--hover-primary)] hover:text-white transition-all"
              >
                Entrar no Grupo
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Comunidades Recomendadas */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaUsers className="text-[var(--hover-primary)]" /> Comunidades Recomendadas
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCommunities.map((community, index) => (
            <li
              key={index}
              className="p-4 bg-[var(--bg-secondary)] rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2"
            >
              <h3 className="text-lg font-bold mb-2">{community.name}</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {community.description}
              </p>
              <a
                href={community.link}
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
    </div>
  );
};

export default NetworkingPage;
