import { useState } from "react";
import { FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa"; // Importação de ícones
import Popup from "@/components/layout/pop-ups/Popup";

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");

  const handleOpen = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    contentType: string
  ) => {
    event.preventDefault();
    setContent(contentType);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setContent("");
  };

  const handleCopyPix = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    event.preventDefault();
    navigator.clipboard.writeText("87ed50aa-9526-46a2-8aec-e1a1cce4a9e4");
    setIsOpen(true);
    setContent("Chave Pix copiada com sucesso");
  };

  return (
    <>
      <footer className="bg-[#111111] text-white py-16 px-5">
        <div className="container mx-auto footer-container">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-20">
            {/* Seção DevEmDesenvolvimento */}
            <div className="flex-1 flex flex-col justify-center md:justify-start text-center md:text-left">
              <h3 className="text-3xl font-bold mb-4">DevEmDesenvolvimento</h3>
              <p className="text-base leading-7 tracking-wide">
                O <span className="text-blue-400">DevEmDesenvolvimento</span> é
                um espaço dedicado ao compartilhamento de aprendizados e
                insights sobre programação, focando em estudantes e
                desenvolvedores juniores. Vamos evoluir juntos,{" "}
                <span className="text-blue-400">um código de cada vez</span>.
              </p>
            </div>

            {/* Links com Ícones */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-2xl font-semibold mb-5">Redes Sociais</h4>
              <nav className="space-y-3">
                <a
                  href="https://www.youtube.com/@DevDesenvolvimento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-white transition hover:text-red"
                >
                  <FaYoutube className="text-xl text-red" />
                  <span>YouTube</span>
                </a>
                <a
                  href="https://www.instagram.com/01_dev_em_desenvolvimento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-white transition hover:text-pink-500"
                >
                  <FaInstagram className="text-xl text-pink-500" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://x.com/opedroreoli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-white transition hover:text-blue-400"
                >
                  <FaTwitter className="text-xl text-blue-400" />
                  <span>X</span>
                </a>
              </nav>
            </div>

            {/* Seções Contribua */}
            <div className="hidden md:flex flex-1">
              <div className="flex flex-col text-center md:text-left">
                <h4 className="text-2xl font-semibold mb-5">Contribua</h4>
                <ul className="text-base space-y-3">
                  <li>
                    <a
                      href="mailto:pedrosousa2160@gmail.com"
                      className="text-blue-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Reportar um bug
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/PedroReoli"
                      className="text-blue-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={handleCopyPix}
                      className="text-blue-400 hover:underline"
                    >
                      Copiar chave Pix
                    </button>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-blue-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Patreon
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Imagem Condicional */}
            <div className="hidden md:flex justify-end flex-1 text-center md:text-right">
              <img
                src="/images/EuPIxar.png"
                alt="Imagem do Autor"
                className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full mx-auto md:mx-0"
              />
            </div>
          </div>

          {/* Botões em resoluções menores */}
          <div className="flex justify-center mt-8 md:hidden">
            <button
              onClick={(e) => handleOpen(e, "Contribua")}
              className="btn-enhanced mx-2"
            >
              Contribua
            </button>
            <button
              onClick={(e) => handleOpen(e, "Contato")}
              className="btn-enhanced mx-2"
            >
              Contato
            </button>
          </div>

          {/* Linha de rodapé */}
          <div className="text-center text-base mt-16 border-t border-gray-700 pt-8">
            <div className="flex justify-center space-x-4">
              <a
                href="#"
                onClick={(e) => handleOpen(e, "Termos de Serviço")}
                className="text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Termos de Serviço
              </a>
              <span className="text-gray-500">|</span>
              <a
                href="#"
                onClick={(e) => handleOpen(e, "Privacidade")}
                className="text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacidade
              </a>
            </div>
          </div>
        </div>
      </footer>

      <Popup isOpen={isOpen} content={content} onClose={handleClose} />
    </>
  );
};

export default Footer;
