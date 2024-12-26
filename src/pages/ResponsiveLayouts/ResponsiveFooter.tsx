import React, { useState } from "react";
import Button from "@/components/Shared/Button";
import ContactModal from "@/components/Shared/ContactModal";
import TermsModal from "@/components/Shared/TermsModal";

const ResponsiveFooter: React.FC = () => {
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);

  return (
    <footer className="bg-[var(--bg-primary)] text-[var(--text-primary)] py-4 sm:py-6 transition-all duration-300">
      {/* Linha Divisória */}
      <div className="border-t border-[var(--border-primary)] mx-auto w-[90%] sm:w-[80%]"></div>

      {/* Container Principal */}
      <div className="container mx-auto px-2 sm:px-4 flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4">
        {/* Direitos Reservados */}
        <div className="text-center sm:text-left mb-3 sm:mb-0">
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            © 2024 Todos os direitos reservados.
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
          <Button
            onClick={() => setContactModalOpen(true)}
            variant="secondary"
            className="text-xs sm:text-sm py-2 px-4 text-center"
          >
            Entre em Contato
          </Button>
          <Button
            onClick={() => setTermsModalOpen(true)}
            variant="secondary"
            className="text-xs sm:text-sm py-2 px-4 text-center"
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
