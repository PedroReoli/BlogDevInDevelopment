import React from "react";
import { Link } from "react-router-dom";

interface DropdownMenuProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  items: { title: string; description: string; icon: React.ReactNode; link: string }[];
  position?: "left" | "right"; // Define a posição do dropdown
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  title,
  isOpen,
  onToggle,
  items,
  position = "left",
}) => {
  return (
    <div className="relative group">
      {/* Botão para abrir o dropdown */}
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 text-white hover:text-red-500 transition-all"
      >
        <span>{title}</span>
        <span className="text-sm">▼</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`absolute ${
            position === "right" ? "right-0" : "left-0"
          } mt-2 w-[600px] bg-gray-900 text-white shadow-lg rounded-lg p-6 grid grid-cols-2 gap-4 animate-fade`}
        >
          {/* Lista de itens */}
          <ul className="space-y-4 col-span-1">
            {items.map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                {/* Ícone */}
                <div className="text-red-500">{item.icon}</div>
                {/* Conteúdo */}
                <div>
                  <Link
                    to={item.link}
                    className="text-base font-semibold hover:text-red-500 transition-all"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Destaques ou outros conteúdos */}
          <div className="col-span-1 border-l border-gray-700 pl-4">
            <h4 className="text-sm font-bold uppercase text-gray-400 mb-4">Destaques</h4>
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-md">
                <h5 className="text-base font-semibold">Networking</h5>
                <p className="text-sm text-gray-400">Conecte-se com outros profissionais.</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-md">
                <h5 className="text-base font-semibold">Eventos</h5>
                <p className="text-sm text-gray-400">Participe de eventos exclusivos.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
