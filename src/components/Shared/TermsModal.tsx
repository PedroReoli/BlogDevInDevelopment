import React from "react";
import Button from "@/components/Shared/Button";

interface TermsModalProps {
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#1b1b1b] text-white rounded-lg shadow-md p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Termos de Serviço</h2>
        <div className="text-left text-sm text-gray-300 space-y-4 leading-relaxed">
          <p>Ao utilizar nosso site, você concorda com os seguintes termos:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Utilize este site de forma responsável e ética.</li>
            <li>
              Reservamo-nos o direito de alterar os termos a qualquer momento.
              Recomendamos revisitar esta página regularmente.
            </li>
            <li>Se não concordar com os termos, interrompa o uso do site.</li>
          </ul>
          <p className="text-gray-400 italic">Última atualização: Dezembro de 2024</p>
        </div>
        <Button onClick={onClose} className="w-full mt-6">
          Fechar
        </Button>
      </div>
    </div>
  );
};

export default TermsModal;
