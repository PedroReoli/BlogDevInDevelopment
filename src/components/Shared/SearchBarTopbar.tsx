import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  sections: string[];
}

const SearchBarTopbar: React.FC<SearchBarProps> = ({ sections }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setSuggestions(query ? sections.filter((s) => s.includes(query)) : []);
  };

  return (
    <div className="relative flex-1 mx-8 max-w-lg">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Buscar em blogs, aulas, projetos, perfil..."
        className="w-full py-2 px-14 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--hover-primary)] transition-all duration-300"
      />
       <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] text-lg hover:text-[var(--hover-primary)] transition-colors duration-300" />
      {suggestions.length > 0 && (
        <ul className="absolute top-10 left-0 w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-lg shadow-lg overflow-hidden">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="p-2 hover:bg-[var(--border-color)] cursor-pointer"
              onClick={() => setSearchQuery(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBarTopbar;
