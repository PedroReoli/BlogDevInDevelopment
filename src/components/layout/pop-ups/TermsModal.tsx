"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaTimes, FaShieldAlt } from "react-icons/fa"

interface TermsModalProps {
  onClose: () => void
  isOpen: boolean
}

const TermsModal: React.FC<TermsModalProps> = ({ onClose, isOpen }) => {
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
                  <FaShieldAlt className="text-[var(--hover-primary)] text-xl" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">Termos de Serviço</h2>
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
                  Ao utilizar nosso site, você concorda com os seguintes termos e condições:
                </p>

                <div className="space-y-6">
                  <div className="bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border-primary)]">
                    <h3 className="text-lg font-semibold mb-2 text-[var(--hover-primary)]">1. Uso Responsável</h3>
                    <p className="text-[var(--text-secondary)]">
                      Utilize este site de forma responsável e ética. Não é permitido o uso do conteúdo para fins
                      ilegais ou que violem direitos de terceiros.
                    </p>
                  </div>

                  <div className="bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border-primary)]">
                    <h3 className="text-lg font-semibold mb-2 text-[var(--hover-primary)]">
                      2. Propriedade Intelectual
                    </h3>
                    <p className="text-[var(--text-secondary)]">
                      Todo o conteúdo disponibilizado neste site, incluindo textos, imagens, códigos e vídeos, está
                      protegido por direitos autorais. A reprodução é permitida apenas para uso pessoal e não comercial,
                      com a devida atribuição.
                    </p>
                  </div>

                  <div className="bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border-primary)]">
                    <h3 className="text-lg font-semibold mb-2 text-[var(--hover-primary)]">3. Alterações nos Termos</h3>
                    <p className="text-[var(--text-secondary)]">
                      Reservamo-nos o direito de alterar os termos a qualquer momento. Recomendamos revisitar esta
                      página regularmente para verificar atualizações.
                    </p>
                  </div>

                  <div className="bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border-primary)]">
                    <h3 className="text-lg font-semibold mb-2 text-[var(--hover-primary)]">
                      4. Limitação de Responsabilidade
                    </h3>
                    <p className="text-[var(--text-secondary)]">
                      Não nos responsabilizamos por danos diretos, indiretos, incidentais ou consequenciais resultantes
                      do uso ou incapacidade de usar nossos serviços.
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
                  Aceitar e Fechar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TermsModal

