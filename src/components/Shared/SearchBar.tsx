import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface Job {
  id: number;
  título: string;
  empresa: string;
  cidade: string;
  estado: string;
  nível: string;
  dataDePublicação: string;
  linkDaVaga: string;
  regimeDeTrabalho: string;
}

const JobPortalPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState({
    cidade: "Todos",
    estado: "Todos",
    nível: "Todos",
    regimeDeTrabalho: "Todos",
  });

  const fetchJobs = async () => {
    try {
      const response = await fetch(
        "https://api.sheety.co/f07cf17198b5bb94b23fee472faecc25/apiDev/página1"
      );
      if (!response.ok) {
        throw new Error("Erro ao carregar as vagas.");
      }
      const data = await response.json();
      setJobs(data.página1);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const validateUrl = (url: string) => {
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.título.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.estado.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCidade =
      filters.cidade === "Todos" || job.cidade === filters.cidade;

    const matchesEstado =
      filters.estado === "Todos" || job.estado === filters.estado;

    const matchesNível =
      filters.nível === "Todos" || job.nível === filters.nível;

    const matchesRegime =
      filters.regimeDeTrabalho === "Todos" ||
      job.regimeDeTrabalho === filters.regimeDeTrabalho;

    return matchesSearch && matchesCidade && matchesEstado && matchesNível && matchesRegime;
  });

  const uniqueValues = (field: keyof Job) =>
    ["Todos", ...Array.from(new Set(jobs.map((job) => job[field])))];

  if (loading) {
    return (
      <p className="text-center mt-10 text-[var(--text-secondary)]">
        Carregando vagas...
      </p>
    );
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Portal de Vagas</h1>
      <p className="text-lg text-[var(--text-secondary)] text-center mb-10">
        Filtre e encontre a vaga ideal para sua carreira.
      </p>

      {/* SearchBar */}
      <div className="flex justify-center w-full mb-8">
        <div className="relative w-full max-w-4xl mx-4 sm:mx-8 lg:mx-16">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por título, empresa, cidade..."
            className="w-full py-4 px-14 rounded-full border border-[var(--hover-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--hover-primary)] transition-all duration-300"
          />
          <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] text-lg hover:text-[var(--hover-primary)] transition-colors duration-300">
            <FaSearch />
          </span>
        </div>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Object.keys(filters).map((key) => (
          <select
            key={key}
            className="py-3 px-4 rounded-lg border border-[var(--hover-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--hover-primary)] transition-all"
            value={filters[key as keyof typeof filters]}
            onChange={(e) =>
              handleFilterChange(key as keyof typeof filters, e.target.value)
            }
          >
            {uniqueValues(key as keyof Job).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        ))}
      </div>

      {/* Lista de Vagas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="p-5 bg-[var(--bg-secondary)] rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2"
          >
            <h2 className="text-xl font-bold mb-2 text-center text-[var(--hover-primary)]">
              {job.título}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-2">
              Empresa: <span className="font-semibold">{job.empresa}</span>
            </p>
            <p className="text-sm text-[var(--text-secondary)] mb-2">
              Local: {job.cidade}, {job.estado}
            </p>
            <p className="text-sm text-[var(--text-secondary)] mb-2">
              Nível: <span className="font-semibold">{job.nível}</span>
            </p>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Regime: <span className="font-semibold">{job.regimeDeTrabalho}</span>
            </p>
            <button
              onClick={() => window.open(validateUrl(job.linkDaVaga), "_blank")}
              className="w-full py-2 px-4 text-[var(--hover-primary)] border border-[var(--hover-primary)] rounded-full font-semibold hover:bg-[var(--hover-primary)] hover:text-white transition-all"
            >
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>

      {/* Nenhum Resultado Encontrado */}
      {filteredJobs.length === 0 && (
        <p className="text-center text-[var(--text-secondary)] mt-12">
          Nenhuma vaga encontrada para os critérios selecionados.
        </p>
      )}
    </div>
  );
};

export default JobPortalPage;
