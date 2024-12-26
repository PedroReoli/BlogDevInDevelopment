import React from "react";
import { FaInstagram, FaTwitter, FaGithub, FaEnvelope } from "react-icons/fa";
import Button from "@/components/Shared/Button";

interface ContactModalProps {
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-lg shadow-md p-4 sm:p-6 w-full max-w-[90%] sm:max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Entre em Contato</h2>
        <div className="space-y-4">
          <a
            href="https://www.instagram.com/01_dev_em_desenvolvimento"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 transition hover:text-pink-500"
          >
            <FaInstagram className="text-lg sm:text-xl text-pink-500" />
            <span className="text-sm sm:text-base">Instagram</span>
          </a>
          <a
            href="https://x.com/opedroreoli"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 transition hover:text-blue-400"
          >
            <FaTwitter className="text-lg sm:text-xl text-blue-400" />
            <span className="text-sm sm:text-base">X</span>
          </a>
          <a
            href="https://github.com/PedroReoli"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 transition hover:text-gray-300"
          >
            <FaGithub className="text-lg sm:text-xl" />
            <span className="text-sm sm:text-base">Github</span>
          </a>
          <a
            href="mailto:pedrosousa2160@gmail.com"
            className="flex items-center space-x-2 transition hover:text-red-500"
          >
            <FaEnvelope className="text-lg sm:text-xl text-red-500" />
            <span className="text-sm sm:text-base break-all">pedrosousa2160@gmail.com</span>
          </a>
        </div>
        <Button
          onClick={onClose}
          variant="primary"
          className="w-full mt-6 text-sm sm:text-base py-2 px-4"
        >
          Fechar
        </Button>
      </div>
    </div>
  );
};

export default ContactModal;

