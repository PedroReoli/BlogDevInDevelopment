import React, { useState } from "react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
}

const JobPortalPage: React.FC = () => {
  const [jobs] = useState<Job[]>([
    { id: 1, title: "Desenvolvedor Full Stack", company: "Tech Corp", location: "São Paulo" },
    { id: 2, title: "Analista de Dados", company: "Data Inc.", location: "Rio de Janeiro" },
    { id: 3, title: "Designer UX/UI", company: "Creative Studio", location: "Belo Horizonte" },
  ]);

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <h1 className="text-2xl font-bold mb-6">Portal de Vagas</h1>
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job.id} className="p-4 bg-[var(--bg-secondary)] rounded-lg shadow hover:shadow-lg">
            <h2 className="text-lg font-bold">{job.title}</h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Empresa: {job.company} • Local: {job.location}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobPortalPage;