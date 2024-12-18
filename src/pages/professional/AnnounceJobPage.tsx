import React, { useState } from "react";

const AnnounceJobPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Anúncio enviado:", { title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <h1 className="text-2xl font-bold mb-6">Anunciar Vaga</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Título da Vaga</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md bg-[var(--input-bg)]"
            placeholder="Digite o título da vaga"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md bg-[var(--input-bg)]"
            placeholder="Descreva a vaga"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[var(--hover-primary)] text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default AnnounceJobPage;