import React from "react";
import { Link } from "react-router-dom";
import NotificationBell from "@/components/Shared/NotificationBell";
import SearchBarTopbar from "@/components/Shared/SearchBarTopbar";
import ThemeSwitch from "@/components/Shared/ThemeSwitch";

const sections = ["blogs", "aulas", "projetos", "perfil"];

const Topbar: React.FC = () => {
  return (
    <header className="sticky top-0 w-full py-3 px-6 shadow-md bg-[var(--bg-secondary)] text-[var(--text-primary)] flex items-center justify-between z-50">
      <Link to="/" className="flex items-center space-x-2">
        <img src="/images/logo.svg" alt="Logo" className="h-10 w-10" />
        <span className="text-xl font-bold">DevEmDesenvolvimento</span>
      </Link>

      <SearchBarTopbar sections={sections} />

      <div className="flex items-center space-x-4">
        <ThemeSwitch />
        <NotificationBell />
        <div className="h-8 w-8 bg-[var(--border-color)] rounded-full"></div>
      </div>
    </header>
  );
};

export default Topbar;
