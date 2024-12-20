import React from "react";
import { FaGithub } from "react-icons/fa";

const AvalieNoGitHub: React.FC = () => {
  return (
    <a
      href="https://github.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 text-[var(--text-primary)] hover:text-[var(--hover-primary)] transition-all"
    >
      <FaGithub className="text-xl" />
      <span className="text-sm font-semibold">Avalie no GitHub</span>
    </a>
  );
};

export default AvalieNoGitHub;
