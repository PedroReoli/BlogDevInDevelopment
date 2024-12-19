// src/components/Shared/SearchBarTutorials.tsx
import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarTutorialsProps {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBarTutorials: React.FC<SearchBarTutorialsProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="flex justify-center w-full my-8">
      <div className="relative w-full max-w-4xl mx-4 sm:mx-8 lg:mx-16">
        {/* Barra de pesquisa */}
        <input
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Pesquise por tutoriais ou vídeos..."
          className="w-full py-4 px-14 rounded-full border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--hover-primary)] transition-all duration-300"
        />
        {/* Ícone de busca */}
        <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] text-lg hover:text-[var(--hover-primary)] transition-colors duration-300">
          <FaSearch />
        </span>
      </div>
    </div>
  );
};

export default SearchBarTutorials;
