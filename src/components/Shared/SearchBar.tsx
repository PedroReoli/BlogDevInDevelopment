import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  placeholder = "Buscar...",
}) => {
  return (
    <div className="relative max-w-3xl mx-auto">
      <input
        type="text"
        value={searchQuery}
        onChange={onSearchChange}
        placeholder={placeholder}
        className="w-full py-4 px-16 rounded-full border border-[var(--hover-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] shadow-md focus:outline-none focus:ring-4 focus:ring-[var(--hover-primary)] transition-all duration-300"
      />
      <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] text-xl hover:text-[var(--hover-primary)] transition-colors duration-300">
        <FaSearch />
      </span>
    </div>
  );
};

export default SearchBar;
