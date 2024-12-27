import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FocusScope } from "@react-aria/focus";
import { useOverlay, usePreventScroll, useModal } from "@react-aria/overlays";

interface DropdownMenuItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

interface ExtraContent {
  title: string;
  description: string;
  link: string;
}

interface DropdownMenuProps {
  isOpen: boolean;
  items: DropdownMenuItem[];
  onClose: () => void;
  extraContent: ExtraContent;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isOpen,
  items,
  onClose,
  extraContent,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { overlayProps } = useOverlay(
    { isOpen, onClose, isDismissable: true },
    ref
  );
  const { modalProps } = useModal();
  usePreventScroll({ isDisabled: !isOpen });

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <FocusScope contain restoreFocus autoFocus>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={ref}
        {...overlayProps}
        {...modalProps}
        className="absolute left-0 right-0 top-full mt-2 mx-auto w-full max-w-7xl bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-lg shadow-lg border border-[var(--border-primary)] z-50 transition-all duration-300 overflow-hidden"
      >
        <div className="p-6 flex flex-col lg:flex-row gap-6">
          {/* Primeira Coluna: Itens */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="group flex items-start space-x-3 p-3 rounded-md transition-all hover:bg-[var(--bg-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--hover-primary)]"
                onClick={onClose}
              >
                {/* Ícone */}
                <div className="text-[var(--hover-primary)] text-xl flex-shrink-0 mt-1 group-hover:text-[var(--text-primary)] group-focus:text-[var(--text-primary)]">
                  {item.icon}
                </div>
                {/* Texto */}
                <div>
                  <span className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--hover-primary)] group-focus:text-[var(--hover-primary)]">
                    {item.title}
                  </span>
                  <p className="text-sm text-[var(--text-secondary)] mt-1 group-hover:text-[var(--text-primary)] group-focus:text-[var(--text-primary)]">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Divisória */}
          <div className="w-full lg:w-[1px] h-[1px] lg:h-auto bg-[var(--border-primary)]" />

          {/* Segunda Coluna: Extra Content */}
          <div className="flex-1 flex flex-col justify-center lg:max-w-xs">
            <h3 className="text-lg font-bold text-[var(--hover-primary)] mb-3">
              {extraContent.title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
              {extraContent.description}
            </p>
            <Link
              to={extraContent.link}
              className="text-[var(--hover-primary)] font-semibold text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--hover-primary)] rounded px-2 py-1 inline-block"
              onClick={onClose}
            >
              Leia Mais &rarr;
            </Link>
          </div>
        </div>
      </div>
    </FocusScope>
  );
};

export default DropdownMenu;

