import React, { useState } from "react";
import Button from "@/components/Shared/Button";
import ContactModal from "@/components/Shared/ContactModal";
import TermsModal from "@/components/Shared/TermsModal";

const ResponsiveFooter: React.FC = () => {
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);

  return (
    <footer className="bg-[var(--bg-primary)] text-[var(--text-primary)] py-6 transition-all duration-300">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Direitos Reservados */}
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-[var(--text-secondary)]">
            © 2024 Todos os direitos reservados.
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="flex space-x-4">
          <Button
            onClick={() => setContactModalOpen(true)}
            className="text-sm bg-[var(--text-secondary)] hover:bg-[var(--border-color)] text-[var(--bg-primary)] transition"
          >
            Entre em Contato
          </Button>
          <Button
            onClick={() => setTermsModalOpen(true)}
            className="text-sm bg-[var(--text-secondary)] hover:bg-[var(--border-color)] text-[var(--bg-primary)] transition"
          >
            Termos de Serviço
          </Button>
        </div>
      </div>

      {/* Modais */}
      {isContactModalOpen && (
        <ContactModal onClose={() => setContactModalOpen(false)} />
      )}
      {isTermsModalOpen && (
        <TermsModal onClose={() => setTermsModalOpen(false)} />
      )}
    </footer>
  );
};

export default ResponsiveFooter;
