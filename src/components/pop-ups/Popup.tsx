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
          <>
            <p>
              Estes termos de serviço governam o uso deste site. Ao acessá-lo, você concorda com os termos descritos aqui. Se você não concorda com qualquer parte destes termos, não deve utilizar este site.
            </p>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer momento, portanto, revisite esta página periodicamente.
            </p>
          </>
        );

      case "Privacidade":
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

      case "Chave Pix copiada com sucesso":
        return (
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
