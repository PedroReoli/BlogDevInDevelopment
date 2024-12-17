import { useState } from "react";
import {
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaBug,
  FaPatreon,
  FaUserShield,
  FaUsers,
  FaFlag,
  FaClipboard,
} from "react-icons/fa";
import Popup from "@/components/layout/pop-ups/Popup";

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");

  const handleOpen = (
    event: React.MouseEvent<HTMLAnchorElement>,
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

  return (
    <>
      <footer className="bg-[var(--bg-primary)] text-[var(--text-primary)] py-8 px-4">
        {/* Container Principal */}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-center text-center md:text-left">
          {/* Coluna 1: Redes Sociais */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Redes Sociais</h4>
            <div className="space-y-2">
              <a
                href="https://www.youtube.com/@DevDesenvolvimento"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-blue-400 transition"
              >
                <FaYoutube size={20} />
                <span>YouTube</span>
              </a>
              <a
                href="https://www.instagram.com/01_dev_em_desenvolvimento"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-blue-400 transition"
              >
                <FaInstagram size={20} />
                <span>Instagram</span>
              </a>
              <a
                href="https://x.com/opedroreoli"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-blue-400 transition"
              >
                <FaTwitter size={20} />
                <span>Twitter</span>
              </a>
              <a
                href="https://github.com/PedroReoli"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-blue-400 transition"
              >
                <FaGithub size={20} />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Coluna 2: Contribua */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contribua</h4>
            <div className="space-y-2">
              <a
                href="/report-bug"
                className="flex items-center space-x-2 hover:text-blue-400 transition"
              >
                <FaBug size={20} />
                <span>Reportar um Bug</span>
              </a>
              <a
                href="/patreon"
                className="flex items-center space-x-2 hover:text-blue-400 transition"
              >
                <FaPatreon size={20} />
                <span>Patreon</span>
              </a>
              <a
                href="#"
                onClick={(e) => handleOpen(e, "Pix Copiado")}
                className="flex items-center space-x-2 hover:text-blue-400 transition"
              >
                <FaClipboard size={20} />
                <span>Chave Pix</span>
              </a>
            </div>
          </div>

          {/* Coluna 3: Moderação */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Moderação</h4>
            <div className="space-y-2">
              <a
                href="/moderators"
                className="flex items-center space-x-2 hover:text-blue-400 transition"
              >
                <FaUserShield size={20} />
                <span>Moderadores</span>
              </a>
              <a
                href="/join-us"
                className="flex items-center space-x-2 hover:text-blue-400 transition"
              >
                <FaUsers size={20} />
                <span>Junte-se a Nós</span>
              </a>
              <a
                href="/report"
                className="flex items-center space-x-2 hover:text-blue-400 transition"
              >
                <FaFlag size={20} />
                <span>Reportar</span>
              </a>
            </div>
          </div>

          {/* Coluna 4: Foto do Autor */}
          <div className="flex flex-col items-center">
            <img
              src="/images/EuPIxar.png"
              alt="Imagem do Autor"
              className="w-32 h-32 object-cover rounded-full mb-2"
            />
            <p className="text-sm font-semibold text-hover-primary">
              Pedro Lucas: CEO
            </p>
          </div>
        </div>

        {/* Rodapé */}
        <div className="border-t border-[var(--border-primary)] mt-6 pt-4 text-center text-sm">
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              onClick={(e) => handleOpen(e, "Termos de Serviço")}
              className="hover:text-blue-400 transition"
            >
              Termos de Serviço
            </a>
            <span className="text-gray-500">|</span>
            <a
              href="#"
              onClick={(e) => handleOpen(e, "Privacidade")}
              className="hover:text-blue-400 transition"
            >
              Privacidade
            </a>
          </div>
          <p className="mt-2 text-gray-400">2024 DevEmDesenvolvimento</p>
        </div>
      </footer>

      {/* Popup Component */}
      <Popup isOpen={isOpen} content={content} onClose={handleClose} />
    </>
  );
};

export default Footer;
