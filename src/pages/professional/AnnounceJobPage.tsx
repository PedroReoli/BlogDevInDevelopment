import React from "react";
import { FaCalendarAlt, FaLaptopCode, FaChalkboardTeacher } from "react-icons/fa";

const events = {
  destaque: [
    {
      title: "Hackathon Global",
      description: "Participe de um dos maiores hackathons do mundo e mostre suas habilidades.",
      date: "20 de Janeiro de 2024",
      location: "Online",
      link: "https://example.com/hackathon-global",
    },
  ],
  hackathons: [
    {
      title: "Hackathon DevBrasil",
      description: "Resolva desafios incríveis e concorra a prêmios.",
      date: "15 de Fevereiro de 2024",
      location: "São Paulo, SP",
      link: "https://example.com/hackathon-devbrasil",
    },
    {
      title: "Startup Challenge",
      description: "Colabore com equipes e crie ideias inovadoras.",
      date: "10 de Março de 2024",
      location: "Rio de Janeiro, RJ",
      link: "https://example.com/startup-challenge",
    },
  ],
  lives: [
    {
      title: "Live: Introdução ao ChatGPT",
      description: "Aprenda como integrar IA nos seus projetos.",
      date: "22 de Janeiro de 2024",
      location: "YouTube",
      link: "https://example.com/live-chatgpt",
    },
  ],
  workshops: [
    {
      title: "Workshop: React Avançado",
      description: "Aprofunde seus conhecimentos em React e Next.js.",
      date: "5 de Fevereiro de 2024",
      location: "Online",
      link: "https://example.com/workshop-react",
    },
  ],
};

const AnnounceEventsPage: React.FC = () => {
  const categories = [
    { name: "Hackathons", icon: <FaLaptopCode className="text-[var(--hover-primary)]" />, data: events.hackathons },
    { name: "Lives e Webinars", icon: <FaChalkboardTeacher className="text-[var(--hover-primary)]" />, data: events.lives },
    { name: "Workshops", icon: <FaCalendarAlt className="text-[var(--hover-primary)]" />, data: events.workshops },
  ];

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Eventos e Oportunidades</h1>
      <p className="text-lg text-[var(--text-secondary)] text-center mb-10">
        Descubra eventos imperdíveis para networking, aprendizado e desafios!
      </p>

      {/* Destaque */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-[var(--hover-primary)]">Destaque</h2>
        {events.destaque.map((event, index) => (
          <div
            key={index}
            className="p-6 bg-[var(--bg-secondary)] rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2 flex flex-col sm:flex-row items-center gap-4"
          >
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
              <p className="text-[var(--text-secondary)] mb-2">{event.description}</p>
              <p className="text-sm text-[var(--text-secondary)] mb-2">
                Data: <span className="font-semibold">{event.date}</span>
              </p>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Local: <span className="font-semibold">{event.location}</span>
              </p>
            </div>
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-6 text-[var(--hover-primary)] border border-[var(--hover-primary)] rounded-full font-semibold hover:bg-[var(--hover-primary)] hover:text-white transition-all"
            >
              Saiba Mais
            </a>
          </div>
        ))}
      </section>

      {/* Categorias */}
      {categories.map((category, index) => (
        <section key={index} className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            {category.icon} {category.name}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.data.map((event, eventIndex) => (
              <li
                key={eventIndex}
                className="p-4 bg-[var(--bg-secondary)] rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2"
              >
                <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Data: <span className="font-semibold">{event.date}</span>
                </p>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Local: <span className="font-semibold">{event.location}</span>
                </p>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  {event.description}
                </p>
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-2 px-4 text-[var(--hover-primary)] border border-[var(--hover-primary)] rounded-full font-semibold hover:bg-[var(--hover-primary)] hover:text-white transition-all"
                >
                  Saiba Mais
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default AnnounceEventsPage;
