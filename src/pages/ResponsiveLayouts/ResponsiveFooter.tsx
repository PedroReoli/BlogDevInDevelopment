import React, { useState } from "react";
import Button from "@/components/Shared/Button";
import ContactModal from "@/components/Shared/ContactModal";
import TermsModal from "@/components/Shared/TermsModal";

const ResponsiveFooter: React.FC = () => {
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);

  return (
    <footer className="bg-[#111111] text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Direitos Reservados */}
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-gray-400">
            © 2024 Todos os direitos reservados.
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="flex space-x-4">
          <Button
            onClick={() => setContactModalOpen(true)}
            className="text-sm"
          >
            Entre em Contato
          </Button>
          <Button
            onClick={() => setTermsModalOpen(true)}
            className="text-sm"
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
