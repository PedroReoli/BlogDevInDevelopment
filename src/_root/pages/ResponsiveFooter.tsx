import { useState } from "react";
import Popup from "@/components/pop-ups/Popup";

const ResponsiveFooter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");

  const handleOpen = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, contentType: string) => {
    event.preventDefault();
    setContent(contentType);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setContent("");
  };

  return (
    <>
      <footer className="bg-[#111111] text-white py-16 px-5">
        <div className="container mx-auto footer-container">
          <div className="flex flex-col justify-center text-center">
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-4">DevEmDesenvolvimento</h3>
              <p className="text-base leading-7 tracking-wide mx-auto max-w-[90%]">
                O <span className="text-blue-400">DevEmDesenvolvimento</span> é um espaço dedicado ao compartilhamento
                de aprendizados e insights sobre programação, focando em estudantes e desenvolvedores juniores. Vamos evoluir juntos, <span className="text-blue-400">um código de cada vez</span>.
              </p>
            </div>

            {/* Botões ultra modernos */}
            <div className="flex justify-center mt-8">
              <button 
                onClick={(e) => handleOpen(e, 'Contribua')} 
                className="btn-modern mx-2"
              >
                Contribua
              </button>
              <button 
                onClick={(e) => handleOpen(e, 'Contato')} 
                className="btn-modern mx-2"
              >
                Contato
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-base mt-16 border-t border-gray-700 pt-8">
          <div className="flex justify-center space-x-4">
            <a href="#" onClick={(e) => handleOpen(e, 'Termos de Serviço')} className="text-blue-400 hover:underline">Termos de Serviço</a> 
            <span className="text-gray-500">|</span> 
            <a href="#" onClick={(e) => handleOpen(e, 'Privacidade')} className="text-blue-400 hover:underline">Privacidade</a>
          </div>
        </div>
      </footer>

      <Popup isOpen={isOpen} content={content} onClose={handleClose} />
    </>
  );
};

export default ResponsiveFooter;
