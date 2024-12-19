import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaComments, FaDiscord } from "react-icons/fa";

const Community: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Comunidade</h1>
      <ul className="space-y-4">
        <li>
          <Link
            to="/usuarios"
            className="flex items-center space-x-2 text-[var(--text-primary)] hover:text-[var(--hover-primary)] transition-all"
          >
            <FaUsers />
            <span>Usuários</span>
          </Link>
        </li>
        <li>
          <Link
            to="/discussoes"
            className="flex items-center space-x-2 text-[var(--text-primary)] hover:text-[var(--hover-primary)] transition-all"
          >
            <FaComments />
            <span>Discussões</span>
          </Link>
        </li>
        <li>
          <Link
            to="https://discord.gg/teDfu39G7r"
            className="flex items-center space-x-2 text-[var(--text-primary)] hover:text-[var(--hover-primary)] transition-all"
          >
            <FaDiscord />
            <span>Discord</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Community;
