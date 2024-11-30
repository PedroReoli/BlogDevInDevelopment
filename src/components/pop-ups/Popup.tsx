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
<<<<<<< HEAD
          <div className="text-center">
            <p className="text-sm text-gray-300 mb-4">
              Estes termos de serviço governam o uso deste site. Ao acessá-lo, você concorda com os termos descritos aqui. Se não concordar com qualquer parte, não deve utilizar o site.
            </p>
            <p className="text-sm text-gray-300 mb-6">
              Reservamo-nos o direito de modificar estes termos a qualquer momento. Recomendamos revisar esta página periodicamente.
            </p>
          </div>
=======
          <>
            <p>
              Estes termos de serviço governam o uso deste site. Ao acessá-lo, você concorda com os termos descritos aqui. Se você não concorda com qualquer parte destes termos, não deve utilizar este site.
            </p>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer momento, portanto, revisite esta página periodicamente.
            </p>
          </>
>>>>>>> 26135da4fd2509448af34e722b1ce37d69edd630
        );

      case "Privacidade":
        return (
<<<<<<< HEAD
          <div className="text-center">
            <p className="text-sm text-gray-300 mb-4">
              Este blog não solicita, armazena ou processa dados pessoais para seu acesso ou uso. O propósito do site é apenas informativo, sem a necessidade de inserção de dados pessoais.
            </p>
            <p className="text-sm text-gray-300 mb-6">
              Garantimos que não há risco de comprometimento dos dados pessoais através deste blog.
            </p>
          </div>
=======
          <>
            <p>
              Este blog não solicita, armazena ou processa quaisquer dados pessoais para o seu acesso ou uso. O propósito deste site é exclusivamente informativo, sem oferecer interações com usuários ou a necessidade de inserção de dados pessoais.
            </p>
            <p>
              Por conseguinte, asseguramos que não há qualquer possibilidade de comprometimento de seus dados pessoais através deste blog.
            </p>
          </>
>>>>>>> 26135da4fd2509448af34e722b1ce37d69edd630
        );

      case "Chave Pix copiada com sucesso":
        return (
<<<<<<< HEAD
          <div className="text-center">
            <p className="text-lg text-gray-300">Chave Pix copiada com sucesso!</p>
          </div>
=======
          <>
            <p>VALEU !!!!</p>
          </>
        );

      case "Contribua":
        return (
          <>
            <ul className="text-center text-lg space-y-4">
              <li><a href="mailto:pedrosousa2160@gmail.com" className="text-neon-blue hover:text-neon-blue-hover">Reportar um bug</a></li>
              <li><a href="https://github.com/PedroReoli" className="text-neon-blue hover:text-neon-blue-hover">Github</a></li>
              <li><a href="#" onClick={() => navigator.clipboard.writeText('87ed50aa-9526-46a2-8aec-e1a1cce4a9e4')} className="text-neon-blue hover:text-neon-blue-hover">Copiar chave Pix</a></li>
              <li><a href="#" className="text-neon-blue hover:text-neon-blue-hover">Patreon</a></li>
            </ul>
          </>
        );

      case "Contato":
        return (
          <>
            <ul className="text-center text-lg space-y-4">
              <li><a href="https://x.com/opedroreoli" className="text-neon-blue hover:text-neon-blue-hover">Twitter</a></li>
              <li><a href="https://www.youtube.com/@DevDesenvolvimento" className="text-neon-blue hover:text-neon-blue-hover">YouTube</a></li>
              <li><a href="https://www.instagram.com/01_dev_em_desenvolvimento" className="text-neon-blue hover:text-neon-blue-hover">Instagram</a></li>
              <li><a href="mailto:pedrosousa2160@gmail.com" className="text-neon-blue hover:text-neon-blue-hover">Email</a></li>
            </ul>
          </>
>>>>>>> 26135da4fd2509448af34e722b1ce37d69edd630
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 26135da4fd2509448af34e722b1ce37d69edd630
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Popup;
