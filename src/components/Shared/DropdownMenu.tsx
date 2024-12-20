import React from "react";
import { Link } from "react-router-dom";

interface DropdownMenuProps {
  isOpen: boolean;
  items: {
    title: string;
    description: string;
    icon: React.ReactNode;
    link: string;
  }[];
  onClose: () => void;
  extraContent: {
    title: string;
    description: string;
    link: string;
  };
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isOpen,
  items,
  onClose,
  extraContent,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay escuro */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Menu Dropdown */}
      <div className="absolute left-0 top-full mt-2 w-[700px] bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-lg shadow-lg p-6 flex gap-6 border border-[var(--border-primary)] z-50 transition-all duration-300">
        {/* Primeira Coluna: Itens */}
        <div className="flex-1 grid grid-cols-1 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 hover:bg-[var(--hover-primary)] hover:text-white p-3 rounded-md transition-all"
            >
              {/* Ícone */}
              <div className="text-[var(--hover-primary)] text-xl flex-shrink-0">
                {item.icon}
              </div>
              {/* Texto */}
              <div>
                <Link
                  to={item.link}
                  className="font-semibold text-[var(--text-primary)] hover:underline"
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

        {/* Divisória vertical */}
        <div className="w-[1px] bg-[var(--border-primary)]"></div>

        {/* Segunda Coluna: Extra Content */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-bold text-[var(--hover-primary)] mb-3">
            {extraContent.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
            {extraContent.description}
          </p>
          <Link
            to={extraContent.link}
            className="text-[var(--hover-primary)] font-semibold text-sm hover:underline"
          >
            Leia Mais &rarr;
          </Link>
        </div>
      </div>
    </>
  );
};

export default DropdownMenu;
