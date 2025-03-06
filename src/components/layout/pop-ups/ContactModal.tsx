"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaTimes,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaEnvelope,
  FaDiscord,
  FaLinkedin,
  FaPaperPlane,
} from "react-icons/fa"

interface ContactModalProps {
  onClose: () => void
  isOpen: boolean
}

const ContactModal: React.FC<ContactModalProps> = ({ onClose, isOpen }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<"social" | "message">("social")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSending, setIsSending] = useState(false)

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    // Simulação de envio
    setTimeout(() => {
      setIsSending(false)
      alert(`Mensagem enviada!\nNome: ${formData.name}\nEmail: ${formData.email}\nMensagem: ${formData.message}`)
      setFormData({ name: "", email: "", message: "" })
    }, 1500)
  }

  // Variantes de animação para os links sociais
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  const socialLinks = [
    {
      name: "Instagram",
      icon: <FaInstagram className="text-xl" />,
      url: "https://www.instagram.com/01_dev_em_desenvolvimento",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      name: "X / Twitter",
      icon: <FaTwitter className="text-xl" />,
      url: "https://x.com/opedroreoli",
      color: "bg-blue-400",
    },
    {
      name: "GitHub",
      icon: <FaGithub className="text-xl" />,
      url: "https://github.com/PedroReoli",
      color: "bg-gray-700",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="text-xl" />,
      url: "https://linkedin.com/in/pedrosousa",
      color: "bg-blue-600",
    },
    {
      name: "Discord",
      icon: <FaDiscord className="text-xl" />,
      url: "#",
      color: "bg-indigo-500",
    },
    {
      name: "Email",
      icon: <FaEnvelope className="text-xl" />,
      url: "mailto:pedrosousa2160@gmail.com",
      color: "bg-red-500",
    },
  ]

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
            className="bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-2xl shadow-xl border border-[var(--border-primary)] w-full max-w-[90%] sm:max-w-xl max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[var(--border-primary)]">
              <h2 className="text-xl sm:text-2xl font-bold">Entre em Contato</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[var(--bg-primary)] transition-colors"
                aria-label="Fechar"
              >
                <FaTimes className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[var(--border-primary)]">
              <button
                className={`flex-1 py-3 text-center font-medium transition-colors ${
                  activeTab === "social"
                    ? "text-[var(--hover-primary)] border-b-2 border-[var(--hover-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
                onClick={() => setActiveTab("social")}
              >
                Redes Sociais
              </button>
              <button
                className={`flex-1 py-3 text-center font-medium transition-colors ${
                  activeTab === "message"
                    ? "text-[var(--hover-primary)] border-b-2 border-[var(--hover-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
                onClick={() => setActiveTab("message")}
              >
                Enviar Mensagem
              </button>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 overflow-y-auto max-h-[60vh]">
              {activeTab === "social" ? (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-primary)] hover:border-[var(--hover-primary)] transition-all group"
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={`w-10 h-10 rounded-full ${link.color} flex items-center justify-center text-white`}
                      >
                        {link.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium group-hover:text-[var(--hover-primary)] transition-colors">
                          {link.name}
                        </p>
                        {link.name === "Email" && (
                          <p className="text-xs text-[var(--text-secondary)] truncate">pedrosousa2160@gmail.com</p>
                        )}
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--hover-primary)] focus:border-[var(--hover-primary)]"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--hover-primary)] focus:border-[var(--hover-primary)]"
                      placeholder="seu.email@exemplo.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--hover-primary)] focus:border-[var(--hover-primary)] resize-none"
                      placeholder="Digite sua mensagem aqui..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[var(--hover-primary)] text-white rounded-xl hover:bg-opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        <span>Enviar Mensagem</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ContactModal

