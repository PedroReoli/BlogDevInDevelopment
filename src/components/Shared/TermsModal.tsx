import React from "react";
import Button from "@/components/Shared/Button";

interface TermsModalProps {
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-lg shadow-md p-4 sm:p-6 w-full max-w-[90%] sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Termos de Serviço</h2>
        <div className="text-left text-xs sm:text-sm text-[var(--text-secondary)] space-y-3 sm:space-y-4 leading-relaxed">
          <p>Ao utilizar nosso site, você concorda com os seguintes termos:</p>
          <ul className="list-disc list-inside space-y-1 sm:space-y-2">
            <li>Utilize este site de forma responsável e ética.</li>
            <li>
              Reservamo-nos o direito de alterar os termos a qualquer momento.
              Recomendamos revisitar esta página regularmente.
            </li>
            <li>Se não concordar com os termos, interrompa o uso do site.</li>
          </ul>
          <p className="text-[var(--text-secondary)] italic text-xs">Última atualização: Dezembro de 2024</p>
        </div>
        <Button
          onClick={onClose}
          variant="primary"
          className="w-full mt-4 sm:mt-6 text-sm sm:text-base py-2 px-4"
        >
          Fechar
        </Button>
      </div>
    </div>
  );
};

export default TermsModal;

