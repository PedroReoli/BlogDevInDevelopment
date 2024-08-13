import { motion } from "framer-motion";

interface PopupProps {
  isOpen: boolean;
  content: string;
  onClose: () => void;
}

const Popup = ({ isOpen, content, onClose }: PopupProps) => {
  const getContent = () => {
    if (content === "Termos de Serviço") {
      return (
        <>
          <p>
            Estes termos de serviço governam o uso deste site. Ao acessá-lo, você concorda com os termos descritos aqui. Se você não concorda com qualquer parte destes termos, não deve utilizar este site.
          </p>
          <p>
            Reservamo-nos o direito de modificar estes termos a qualquer momento, portanto, revisite esta página periodicamente.
          </p>
        </>
      );
    } else if (content === "Privacidade") {
      return (
        <>
          <p>
            Este blog não solicita, armazena ou processa quaisquer dados pessoais para o seu acesso ou uso. O propósito deste site é exclusivamente informativo, sem oferecer interações com usuários ou a necessidade de inserção de dados pessoais.
          </p>
          <p>
            Por conseguinte, asseguramos que não há qualquer possibilidade de comprometimento de seus dados pessoais através deste blog.
          </p>
        </>
      );
    } else if (content === "Chave Pix copiada com sucesso") {
      return (
        <>
          <p>
           VALEU !!!!
          </p>
        </>
      );
    }
    return null;
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white p-6 md:p-8 rounded-2xl shadow-lg max-w-xs sm:max-w-sm mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-4">{content}</h2>
            <div className="text-white text-center">
              {getContent()}
            </div>
            {content !== "Chave Pix copiada com sucesso" && (
              <div className="flex justify-center mt-4">
                <button 
                  onClick={onClose}
                  className="bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors shadow-md"
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
