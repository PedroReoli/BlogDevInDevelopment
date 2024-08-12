import { useState } from "react";
import Popup from "@/components/pop-ups/Popup";

const Bottombar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");

  const handleOpen = (contentType: string) => {
    setContent(contentType);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setContent("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-black to-[#111111] p-4 md:hidden fixed bottom-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" onClick={() => handleOpen("Contribua")} className="text-white hover:text-blue-500 transition">Contribua</a>
        <a href="#" onClick={scrollToTop} className="text-white hover:text-blue-500 transition">Inicio</a>
        <a href="#" onClick={() => handleOpen("Contato")} className="text-white hover:text-blue-500 transition">Contato</a>
      </div>

      <Popup isOpen={isOpen} content={content} onClose={handleClose} />
    </footer>
  );
};

export default Bottombar;
