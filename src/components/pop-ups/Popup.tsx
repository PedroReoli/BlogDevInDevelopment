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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-dark-gradient text-white p-10 md:p-12 rounded-2xl shadow-lg max-w-lg sm:max-w-xl mx-auto border border-neon-blue neon-border"
            style={{ boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)" }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-neon-blue mb-8">{content}</h2>
            <div className="text-gray-300 text-center">
              {getContent()}
            </div>
            {content !== "Chave Pix copiada com sucesso" && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={onClose}
                  className="btn-modern-close"
                >
                  Fechar
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Popup;
