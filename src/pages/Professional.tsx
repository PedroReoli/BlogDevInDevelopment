import React from "react";
import { Link } from "react-router-dom";
import { FaBriefcase, FaNetworkWired, FaCalendarAlt } from "react-icons/fa";

const Professional: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profissional</h1>
      <ul className="space-y-4">
        <li>
          <Link
            to="/vagas"
            className="flex items-center space-x-2 text-[var(--text-primary)] hover:text-[var(--hover-primary)] transition-all"
          >
            <FaBriefcase />
            <span>Portal de Vagas</span>
          </Link>
        </li>
        <li>
          <Link
            to="/networking"
            className="flex items-center space-x-2 text-[var(--text-primary)] hover:text-[var(--hover-primary)] transition-all"
          >
            <FaNetworkWired />
            <span>Networking</span>
          </Link>
        </li>
        <li>
          <Link
            to="/eventos"
            className="flex items-center space-x-2 text-[var(--text-primary)] hover:text-[var(--hover-primary)] transition-all"
          >
            <FaCalendarAlt />
            <span>Eventos</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Professional;
