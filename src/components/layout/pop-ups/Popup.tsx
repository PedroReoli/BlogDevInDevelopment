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
          <div className="text-left text-sm text-gray-300 space-y-4 leading-relaxed">
            <p>Ao utilizar nosso site, você concorda com os seguintes termos:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Utilize este site de forma responsável e ética.</li>
              <li>
                Reservamo-nos o direito de alterar os termos a qualquer momento. Recomendamos revisitar esta página regularmente.
              </li>
              <li>Se não concordar com os termos, interrompa o uso do site.</li>
            </ul>
            <p className="text-gray-400 italic">Última atualização: Dezembro de 2024</p>
          </div>
        );

      case "Privacidade":
        return (
          <div className="text-left text-sm text-gray-300 space-y-4 leading-relaxed">
            <p>
              Este site valoriza sua privacidade. Não coletamos, armazenamos ou processamos dados pessoais para acessar ou utilizar o conteúdo.
            </p>
            <p>
              Nosso objetivo é exclusivamente informativo e não exige interações que envolvam dados dos usuários.
            </p>
            <p>
              Caso tenha dúvidas,{" "}
              <a
                href="mailto:pedrosousa2160@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline hover:text-blue-500"
              >
                fale conosco
              </a>
              .
            </p>
          </div>
        );

      case "Chave Pix copiada com sucesso":
        return (
          <div className="text-center text-lg text-gray-300 font-medium space-y-4">
            <div className="flex justify-center items-center gap-2">
              <span className="text-green-500 text-2xl">✅</span>
              <p>Chave Pix copiada com sucesso!</p>
            </div>
            <p className="text-sm text-gray-400">
              Obrigado por apoiar nosso projeto! Sua contribuição é muito importante.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gradient-to-b from-gray-800 to-gray-900 text-white p-8 md:p-10 rounded-xl shadow-xl max-w-lg sm:max-w-xl mx-auto border border-gray-600"
            style={{ boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-400 mb-6">
              {content}
            </h2>
            <div className="text-gray-300">{getContent()}</div>

            {/* Botão de Fechar no rodapé */}
            <div className="flex justify-center mt-6">
              <button
                onClick={onClose}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md"
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
