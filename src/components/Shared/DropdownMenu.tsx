import React from "react";
import { Link } from "react-router-dom";

interface DropdownMenuProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  className?: string; // Suporte para classes personalizadas
  items: {
    title: string;
    description: string;
    icon: React.ReactNode;
    link: string;
  }[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  title,
  isOpen,
  onToggle,
  className,
  items,
}) => {
  return (
    <div className="relative group">
      {/* Botão que controla o Dropdown */}
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 text-[var(--text-primary)] hover:text-[var(--hover-primary)] transition-all"
      >
        <span>{title}</span>
        <span className="text-sm">▼</span>
      </button>

      {/* Menu Dropdown */}
      {isOpen && (
        <div
          className={`absolute left-0 mt-2 w-[300px] bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-lg shadow-lg p-4 grid grid-cols-1 gap-4 border border-[var(--border-primary)] transition-all duration-300 ${
            className || ""
          }`}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 hover:bg-[var(--hover-primary)] hover:text-white p-2 rounded-md transition-all"
            >
              <div className="text-[var(--hover-primary)]">{item.icon}</div>
              <div>
                <Link
                  to={item.link}
                  className="font-semibold hover:underline"
                >
                  {item.title}
                </Link>
                <p className="text-sm text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
