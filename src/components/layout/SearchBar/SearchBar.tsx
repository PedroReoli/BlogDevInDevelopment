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
          className="w-full py-4 px-16 rounded-full border border-gray-300 bg-white text-gray-800 placeholder-gray-500 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
        />
        {/* Ícone de busca */}
        <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl transition-colors duration-300 hover:text-blue-500">
          <FaSearch />
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
