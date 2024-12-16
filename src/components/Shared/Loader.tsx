import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#111111]">
      {/* Loader com Logo no Centro */}
      <div className="relative flex items-center justify-center mb-6">
        {/* Logo Estática no Centro */}
        <img
          src="/images/logo.svg" // Caminho direto para a logo no diretório public/assets
          alt="Logo"
          className="w-16 h-16 object-contain"
        />

        {/* Loader Animado Rodando ao Redor da Logo */}
        <div className="absolute w-24 h-24 animate-spin">
          <div className="w-full h-full border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      </div>

      {/* Texto de Carregamento */}
      <p className="text-2xl font-semibold text-blue-500">Carregando...</p>
    </div>
  );
};

export default Loader;
