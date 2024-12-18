import React from "react";

const ResumePage: React.FC = () => {
  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <h1 className="text-2xl font-bold mb-6">Meu Currículo</h1>
      <p className="text-lg text-[var(--text-secondary)]">
        Aqui você pode enviar e gerenciar seu currículo.
      </p>
      <button className="mt-4 bg-[var(--hover-primary)] text-white py-2 px-4 rounded-md hover:bg-blue-600">
        Enviar Currículo
      </button>
    </div>
  );
};

export default ResumePage;