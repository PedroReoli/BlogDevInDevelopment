import { motion } from "framer-motion";

interface PopupProps {
  isOpen: boolean;
  content: string;
  onClose: () => void;
}

const Popup = ({ isOpen, content, onClose }: PopupProps) => {
  const getContent = () => {
    switch (content) {
      case "Termos de Serviço":
        return (
          <div className="text-center">
            <p className="text-sm text-gray-300 mb-4">
              Estes termos de serviço governam o uso deste site. Ao acessá-lo, você concorda com os termos descritos aqui. Se não concordar com qualquer parte, não deve utilizar o site.
            </p>
            <p className="text-sm text-gray-300 mb-6">
              Reservamo-nos o direito de modificar estes termos a qualquer momento. Recomendamos revisar esta página periodicamente.
            </p>
          </div>
        );

      case "Privacidade":
        return (
          <div className="text-center">
            <p className="text-sm text-gray-300 mb-4">
              Este blog não solicita, armazena ou processa dados pessoais para seu acesso ou uso. O propósito do site é apenas informativo, sem a necessidade de inserção de dados pessoais.
            </p>
            <p className="text-sm text-gray-300 mb-6">
              Garantimos que não há risco de comprometimento dos dados pessoais através deste blog.
            </p>
          </div>
        );

      case "Chave Pix copiada com sucesso":
        return (
          <div className="text-center">
            <p className="text-lg text-gray-300">Chave Pix copiada com sucesso!</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gray-900 text-white p-8 sm:p-10 rounded-xl shadow-xl w-full max-w-lg sm:max-w-xl border-2 border-blue-500"
          >
            <h2 className="text-3xl font-semibold text-center text-neon-blue mb-6">{content}</h2>
            <div className="text-center">{getContent()}</div>
            <div className="flex justify-center mt-6">
              <button
                onClick={onClose}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg text-sm hover:bg-blue-500 focus:outline-none transition-colors duration-200"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Popup;
