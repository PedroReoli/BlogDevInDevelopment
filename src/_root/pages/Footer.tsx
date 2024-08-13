import { useState } from "react";
import Popup from "@/components/pop-ups/Popup"; // Importe o componente Popup

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");

  const handleOpen = (event: React.MouseEvent<HTMLAnchorElement>, contentType: string) => {
    event.preventDefault();
    setContent(contentType);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setContent("");
  };

  const handleCopyPix = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();  // Evita que a página suba
    navigator.clipboard.writeText('87ed50aa-9526-46a2-8aec-e1a1cce4a9e4');
    setIsOpen(true);
    setContent("Chave Pix copiada com sucesso");


    // Fechar o popup após 2 segundos
    setTimeout(() => {
      setIsOpen(false);
    }, 800);
  };

  return (
    <>
      <footer className="bg-[#111111] text-white py-16 px-5">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-20">
            {/* Seção DevEmDesenvolvimento */}
            <div className="flex-1 flex flex-col justify-center md:justify-start text-center md:text-left">
              <h3 className="text-3xl font-bold mb-4">DevEmDesenvolvimento</h3>
              <p className="text-base leading-7 tracking-wide">
                O <span className="text-blue-400">DevEmDesenvolvimento</span> é um espaço dedicado ao compartilhamento
                de aprendizados e insights sobre programação, focando em estudantes e desenvolvedores juniores. Vamos evoluir juntos, <span className="text-blue-400">um código de cada vez</span>.
              </p>
            </div>

            {/* Seções Contribua e Contato */}
            <div className="sm:hidden md:block flex-1">
              <div className="flex flex-col md:flex-row justify-between md:space-x-24">
                <div className="flex flex-col text-center md:text-left mb-6 md:mb-0">
                  <h4 className="text-2xl font-semibold mb-5">Contribua</h4>
                  <ul className="text-base space-y-3">
                    <li><a href="mailto:pedrosousa2160@gmail.com" className="text-blue-400 hover:underline">Reportar um bug</a></li>
                    <li><a href="https://github.com/PedroReoli" className="text-blue-400 hover:underline">Github</a></li>
                    <li><a href="#" onClick={handleCopyPix} className="text-blue-400 hover:underline">Copiar chave Pix</a></li>
                    <li><a href="#" className="text-blue-400 hover:underline">Patreon</a></li>
                  </ul>
                </div>
                <div className="flex flex-col text-center md:text-left mb-6 md:mb-0">
                  <h4 className="text-2xl font-semibold mb-5">Contato</h4>
                  <ul className="text-base space-y-3">
                    <li><a href="https://x.com/opedroreoli" className="text-blue-400 hover:underline">Twitter</a></li>
                    <li><a href="https://www.youtube.com/@DevDesenvolvimento"className="text-blue-400 hover:underline">YouTube</a></li>
                    <li><a href="https://www.instagram.com/01_dev_em_desenvolvimento" className="text-blue-400 hover:underline">Instagram</a></li>
                    <li><a href="mailto:pedrosousa2160@gmail.com" className="text-blue-400 hover:underline">Email</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Imagem Condicional - Alinhada à Direita */}
            <div className="flex justify-end flex-1">
              <img
                src="/images/EuPIxar.png" // Substitua pelo caminho real da imagem
                alt="Imagem Descritiva"
                className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full"
              />
            </div>
          </div>
        
          {/* Linha de rodapé */}
          <div className="text-center text-base mt-16 border-t border-gray-700 pt-8">
            <div className="flex justify-center space-x-4">
              <a href="#" onClick={(e) => handleOpen(e, 'Termos de Serviço')} className="text-blue-400 hover:underline">Termos de Serviço</a> 
              <span className="text-gray-500">|</span> 
              <a href="#" onClick={(e) => handleOpen(e, 'Privacidade')} className="text-blue-400 hover:underline">Privacidade</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Use o componente Popup */}
      <Popup isOpen={isOpen} content={content} onClose={handleClose} />
    </>
  );
};

export default Footer;
