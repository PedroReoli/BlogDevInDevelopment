import { useState } from "react";
import Popup from "@/components/pop-ups/Popup";

const Bottombar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");


  const handleClose = () => {
    setIsOpen(false);
    setContent("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-black to-[#111111] p-4 md:hidden fixed bottom-0 w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-center items-center">
        <button 
          onClick={scrollToTop} 
          className="btn-modern-alt"
        >
          Início
        </button>
      </div>

      <Popup isOpen={isOpen} content={content} onClose={handleClose} />
    </footer>
  );
};

export default Bottombar;
