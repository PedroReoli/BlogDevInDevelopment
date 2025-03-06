"use client"

import type React from "react"

import { useState, useEffect } from "react"
import TermsModal from "./TermsModal"
import ContactModal from "./ContactModal"
import PrivacyModal from "./PrivacyModal"
import CookiesModal from "./CookiesModal"

interface PopupProps {
  isOpen: boolean
  content: string
  onClose: () => void
}

const Popup: React.FC<PopupProps> = ({ isOpen, content, onClose }) => {
  const [modalType, setModalType] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      setModalType(content)
    } else {
      // Pequeno atraso para a animação de saída
      const timer = setTimeout(() => {
        setModalType(null)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen, content])

  if (!isOpen && !modalType) return null

  switch (modalType) {
    case "Termos de Serviço":
      return <TermsModal isOpen={isOpen} onClose={onClose} />
    case "Privacidade":
      return <PrivacyModal isOpen={isOpen} onClose={onClose} />
    case "Cookies":
      return <CookiesModal isOpen={isOpen} onClose={onClose} />
    case "Contato":
      return <ContactModal isOpen={isOpen} onClose={onClose} />
    case "Pix Copiado":
      return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-xl p-6 max-w-md text-center">
            <div className="mb-4 text-green-500 text-5xl">✓</div>
            <h2 className="text-xl font-bold mb-2">Chave Pix Copiada!</h2>
            <p className="text-[var(--text-secondary)] mb-4">A chave Pix foi copiada para sua área de transferência.</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[var(--hover-primary)] text-white rounded-lg hover:bg-opacity-90 transition-all"
            >
              Fechar
            </button>
          </div>
        </div>
      )
    default:
      return null
  }
}

export default Popup

