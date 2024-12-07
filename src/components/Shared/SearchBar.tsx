import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="flex justify-center w-full my-8">
      <div className="relative w-full max-w-4xl mx-4 sm:mx-8 lg:mx-16">
        {/* Barra de pesquisa */}
        <input
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Digite palavras-chave ou títulos..."
          className="w-full py-4 px-14 rounded-full border border-gray-700 bg-[#1b1b1b] text-gray-300 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all duration-300"
        />
        {/* Ícone de busca */}
        <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg hover:text-[#3b82f6] transition-colors duration-300">
          <FaSearch />
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
