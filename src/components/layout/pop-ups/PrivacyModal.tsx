"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaTimes, FaLock } from "react-icons/fa"

interface PrivacyModalProps {
  onClose: () => void
  isOpen: boolean
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ onClose, isOpen }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  // Fechar o modal ao pressionar ESC
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [onClose])

  // Fechar o modal ao clicar fora dele
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={modalRef}
            className="bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-2xl shadow-xl border border-[var(--border-primary)] w-full max-w-[90%] sm:max-w-2xl max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[var(--border-primary)]">
              <div className="flex items-center gap-3">
                <div className="bg-[var(--bg-primary)] p-2 rounded-full">
                  <FaLock className="text-[var(--hover-primary)] text-xl" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">Política de Privacidade</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[var(--bg-primary)] transition-colors"
                aria-label="Fechar"
              >
                <FaTimes className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 overflow-y-auto max-h-[60vh]">
              <div className="prose prose-sm sm:prose dark:prose-invert max-w-none">
                <p className="text-[var(--text-secondary)] mb-4">
                  Sua privacidade é importante para nós. Esta política descreve como coletamos, usamos e protegemos suas
                  informações:
                </p>

                <div className="space-y-6">
                  <div className="bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border-primary)]">
                    <h3 className="text-lg font-semibold mb-2 text-[var(--hover-primary)]">1. Informações Coletadas</h3>
                    <p className="text-[var(--text-secondary)]">
                      Coletamos informações que você nos fornece diretamente, como nome, email e dados de perfil. Também
                      coletamos dados de uso e cookies para melhorar sua experiência.
                    </p>
                  </div>

                  <div className="bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border-primary)]">
                    <h3 className="text-lg font-semibold mb-2 text-[var(--hover-primary)]">2. Uso das Informações</h3>
                    <p className="text-[var(--text-secondary)]">
                      Utilizamos suas informações para fornecer e melhorar nossos serviços, personalizar sua
                      experiência, comunicar-nos com você e garantir a segurança da plataforma.
                    </p>
                  </div>

                  <div className="bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border-primary)]">
                    <h3 className="text-lg font-semibold mb-2 text-[var(--hover-primary)]">
                      3. Compartilhamento de Dados
                    </h3>
                    <p className="text-[var(--text-secondary)]">
                      Não vendemos suas informações pessoais. Compartilhamos dados apenas com prestadores de serviços
                      que nos ajudam a operar o site e com seu consentimento explícito.
                    </p>
                  </div>

                  <div className="bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border-primary)]">
                    <h3 className="text-lg font-semibold mb-2 text-[var(--hover-primary)]">4. Seus Direitos</h3>
                    <p className="text-[var(--text-secondary)]">
                      Você tem o direito de acessar, corrigir, excluir e exportar seus dados pessoais. Para exercer
                      esses direitos, entre em contato conosco através dos canais disponíveis.
                    </p>
                  </div>
                </div>

                <p className="text-[var(--text-secondary)] italic text-xs mt-6">Última atualização: Dezembro de 2024</p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 sm:p-6 border-t border-[var(--border-primary)] bg-[var(--bg-primary)]">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[var(--hover-primary)] text-white rounded-xl hover:bg-opacity-90 transition-all shadow-sm hover:shadow-md"
                >
                  Entendi
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PrivacyModal

