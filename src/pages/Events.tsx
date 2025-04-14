import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaLaptopCode,
  FaChalkboardTeacher,
} from "react-icons/fa";

interface Event {
  id: number;
  título: string;
  descrição: string;
  data: string;
  local: string;
  categoria: string;
  link: string;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Record<string, Event[]>>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredEvents, setFilteredEvents] = useState<Record<string, Event[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "https://api.sheety.co/f07cf17198b5bb94b23fee472faecc25/apiDev/eventos";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erro ao carregar os eventos.");
        const data = await response.json();
        const categorizedEvents = categorizeEvents(data.eventos);
        setEvents(categorizedEvents);
        setFilteredEvents(categorizedEvents);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const categorizeEvents = (data: Event[]): Record<string, Event[]> => {
    return data.reduce((acc: Record<string, Event[]>, event: Event) => {
      const category = event.categoria || "Outros";
      if (!acc[category]) acc[category] = [];
      acc[category].push(event);
      return acc;
    }, {});
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);

    if (query === "") {
      setFilteredEvents(events);
    } else {
      const filtered = Object.keys(events).reduce((acc: Record<string, Event[]>, category) => {
        const filteredCategory = events[category].filter(
          (e) =>
            e.título.toLowerCase().includes(query) ||
            e.descrição.toLowerCase().includes(query) ||
            e.categoria.toLowerCase().includes(query) ||
            e.local.toLowerCase().includes(query)
        );
        if (filteredCategory.length) acc[category] = filteredCategory;
        return acc;
      }, {});
      setFilteredEvents(filtered);
    }
  };

  const categoryIcons: Record<string, JSX.Element> = {
    Hackathon: <FaLaptopCode className="text-[var(--hover-primary)] text-xl" />,
    Live: <FaChalkboardTeacher className="text-[var(--hover-primary)] text-xl" />,
    Workshop: <FaCalendarAlt className="text-[var(--hover-primary)] text-xl" />,
    Outros: <FaCalendarAlt className="text-[var(--hover-primary)] text-xl" />,
  };

  if (loading) {
    return <p className="text-center mt-10 text-[var(--text-secondary)]">Carregando eventos...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Eventos e Oportunidades</h1>
      <p className="text-lg text-[var(--text-secondary)] text-center mb-8">
        Explore eventos importantes para networking, aprendizado e desafios.
      </p>

      {/* Barra de Busca */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Buscar por título, descrição ou categoria..."
            className="w-full py-3 px-14 rounded-full border border-[var(--hover-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--hover-primary)] transition-all duration-300"
          />
          <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)]">
            <FaSearch className="text-lg hover:text-[var(--hover-primary)] transition-colors" />
          </span>
        </div>
      </div>

      {/* Eventos por Categoria */}
      {Object.keys(filteredEvents).length === 0 ? (
        <p className="text-center text-[var(--text-secondary)]">Nenhum evento encontrado.</p>
      ) : (
        Object.keys(filteredEvents).map((category) => (
          <section key={category} className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              {categoryIcons[category] || categoryIcons["Outros"]}
              <h2 className="text-2xl font-bold text-[var(--hover-primary)]">{category}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents[category].map((event) => (
                <div
                  key={event.id}
                  className="p-5 bg-[var(--bg-secondary)] rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2"
                >
                  <h3 className="text-xl font-bold mb-2 text-center text-[var(--hover-primary)]">
                    {event.título}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    Data: <span className="font-semibold">{event.data}</span>
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    Local: <span className="font-semibold">{event.local}</span>
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">{event.descrição}</p>
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2 px-4 text-[var(--hover-primary)] border border-[var(--hover-primary)] rounded-full font-semibold hover:bg-[var(--hover-primary)] hover:text-white transition-all"
                  >
                    Saiba Mais
                  </a>
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default Events;
