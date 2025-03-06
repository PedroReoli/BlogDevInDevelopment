"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
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
  FaChevronUp,
  FaDiscord,
  FaEnvelope,
  FaHeart,
  FaArrowRight,
  FaChevronRight,
} from "react-icons/fa"
import Popup from "@/components/layout/pop-ups/Popup"

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState("")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [email, setEmail] = useState("")
  const currentYear = new Date().getFullYear()

  // Detectar quando o usuário rolou para baixo o suficiente para mostrar o botão de voltar ao topo
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleOpen = (event: React.MouseEvent<HTMLAnchorElement>, contentType: string) => {
    event.preventDefault()
    setContent(contentType)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setContent("")
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica para inscrição na newsletter
    alert(`Email ${email} inscrito com sucesso!`)
    setEmail("")
  }

  return (
    <>
      <footer className="bg-[var(--bg-secondary)] text-[var(--text-primary)] pt-16 pb-8 border-t border-[var(--border-primary)]">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Seção superior com logo e redes sociais */}
          <div className="flex flex-col items-center mb-16">
            <Link to="/" className="flex items-center mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md group-hover:bg-blue-500/30 transition-all duration-300"></div>
                <img src="/images/logo.svg" alt="Logo" className="h-12 w-12 relative z-10" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent ml-2">
                DevEmDesenvolvimento
              </span>
            </Link>

            <div className="flex space-x-5 mb-8">
              <motion.a
                href="https://www.youtube.com/@DevDesenvolvimento"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-primary)] hover:text-white transition-all duration-300 relative overflow-hidden group"
                whileHover={{ y: -3 }}
                aria-label="YouTube"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FaYoutube size={20} className="relative z-10" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/01_dev_em_desenvolvimento"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-primary)] hover:text-white transition-all duration-300 relative overflow-hidden group"
                whileHover={{ y: -3 }}
                aria-label="Instagram"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FaInstagram size={20} className="relative z-10" />
              </motion.a>
              <motion.a
                href="https://x.com/opedroreoli"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-primary)] hover:text-white transition-all duration-300 relative overflow-hidden group"
                whileHover={{ y: -3 }}
                aria-label="Twitter"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FaTwitter size={20} className="relative z-10" />
              </motion.a>
              <motion.a
                href="https://github.com/PedroReoli"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-primary)] hover:text-white transition-all duration-300 relative overflow-hidden group"
                whileHover={{ y: -3 }}
                aria-label="GitHub"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FaGithub size={20} className="relative z-10" />
              </motion.a>
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-primary)] hover:text-white transition-all duration-300 relative overflow-hidden group"
                whileHover={{ y: -3 }}
                aria-label="Discord"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FaDiscord size={20} className="relative z-10" />
              </motion.a>
            </div>

            {/* Newsletter */}
            <div className="w-full max-w-2xl">
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Inscreva-se na nossa newsletter"
                  className="w-full px-6 py-4 pr-36 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--hover-primary)] text-[var(--text-primary)]"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 px-6 py-2 bg-[var(--hover-primary)] text-white rounded-full hover:bg-opacity-90 transition-all flex items-center overflow-hidden group"
                >
                  <span className="mr-2 hidden sm:inline">Inscrever-se</span>
                  <FaArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>
              </form>
            </div>
          </div>

          {/* Links em grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            {/* Coluna 1: Navegação */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-[var(--hover-primary)]">Navegação</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    className="text-[var(--text-secondary)] hover:text-[var(--hover-primary)] transition-colors flex items-center group"
                  >
                    <FaChevronRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    <span>Início</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-[var(--text-secondary)] hover:text-[var(--hover-primary)] transition-colors flex items-center group"
                  >
                    <FaChevronRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    <span>Blog</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/lessons"
                    className="text-[var(--text-secondary)] hover:text-[var(--hover-primary)] transition-colors flex items-center group"
                  >
                    <FaChevronRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    <span>Aulas</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects"
                    className="text-[var(--text-secondary)] hover:text-[var(--hover-primary)] transition-colors flex items-center group"
                  >
                    <FaChevronRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    <span>Projetos</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/docs"
                    className="text-[var(--text-secondary)] hover:text-[var(--hover-primary)] transition-colors flex items-center group"
                  >
                    <FaChevronRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    <span>Documentação</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Coluna 2: Contribua */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-[var(--hover-primary)]">Contribua</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="/report-bug"
                    className="text-[var(--text-secondary)] hover:text-[var(--hover-primary)] transition-colors flex items-center group"
                  >
                    <FaBug size={16} className="mr-3 text-[var(--hover-primary)] opacity-80" />
                    <span>Reportar Bug</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/patreon"
                    className="text-[var(--text-secondary)] hover:text-[var(--hover-primary)] transition-colors flex items-center group"
                  >
                    <FaPatreon size={16} className="mr-3 text-[var(--hover-primary)] opacity-80" />
                    <span>Patreon</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => handleOpen(e, "Pix Copiado")}
                    className="text-[var(--text-secondary)] hover:text-[var(--hover-primary)] transition-colors flex items-center group"
                  >
                    <FaClipboard size={16} className="mr-3 text-[var(--hover-primary)] opacity-80" />
                    <span>Chave Pix</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[var(--text-secondary)] hover:text-[var(--hover-primary)] transition-colors flex items-center group"
                  >
                    <FaHeart size={16} className="mr-3 text-[var(--hover-primary)] opacity-80" />
                    <span>Apoiar</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Coluna 3: Moderação */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-[var(--hover-primary)]">Moderação</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="/moderators"
                    className="text-[var(--text-secondary)] hover:text-[var(--hover-primary)] transition-colors flex items-center group"
                  >
                    <FaUserShield size={16} className="mr-3 text-[var(--hover-primary)] opacity-80" />
                    <span>Moderadores</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/join-us"
                    className="text-[var(--text-secondary)] hover:text-[var(--hover-primary)] transition-colors flex items-center group"
                  >
                    <FaUsers size={16} className="mr-3 text-[var(--hover-primary)] opacity-80" />
                    <span>Junte-se a Nós</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/report"
                    className="text-[var(--text-secondary)] hover:text-[var(--hover-primary)] transition-colors flex items-center group"
                  >
                    <FaFlag size={16} className="mr-3 text-[var(--hover-primary)] opacity-80" />
                    <span>Reportar</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contato@devemdesenvolvimento.com"
                    className="text-[var(--text-secondary)] hover:text-[var(--hover-primary)] transition-colors flex items-center group"
                  >
                    <FaEnvelope size={16} className="mr-3 text-[var(--hover-primary)] opacity-80" />
                    <span>Contato</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Coluna 4: Autor */}
            <div className="flex flex-col items-center lg:items-start">
              <h4 className="text-lg font-bold mb-6 text-[var(--hover-primary)] w-full text-center lg:text-left">
                Autor
              </h4>
              <div className="flex flex-col items-center lg:items-start">
                <div className="relative mb-4 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src="/images/EuPIxar.png"
                      alt="Pedro Lucas"
                      className="w-28 h-28 object-cover rounded-full relative z-10 p-[2px] bg-[var(--bg-secondary)]"
                    />
                  </div>
                </div>
                <h5 className="text-lg font-bold text-[var(--text-primary)] mb-1">Pedro Lucas</h5>
                <p className="text-sm text-[var(--text-secondary)]">CEO & Desenvolvedor</p>
              </div>
            </div>
          </div>

          {/* Rodapé com copyright e links legais */}
          <div className="pt-8 border-t border-[var(--border-primary)]">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-[var(--text-secondary)] text-sm mb-4 md:mb-0">
                &copy; {currentYear} DevEmDesenvolvimento. Todos os direitos reservados.
              </p>

              <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                <a
                  href="#"
                  onClick={(e) => handleOpen(e, "Termos de Serviço")}
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--hover-primary)] transition-colors relative group"
                >
                  <span>Termos de Serviço</span>
                  <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[var(--hover-primary)] group-hover:w-full transition-all duration-300"></span>
                </a>
                <a
                  href="#"
                  onClick={(e) => handleOpen(e, "Privacidade")}
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--hover-primary)] transition-colors relative group"
                >
                  <span>Política de Privacidade</span>
                  <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[var(--hover-primary)] group-hover:w-full transition-all duration-300"></span>
                </a>
                <a
                  href="#"
                  onClick={(e) => handleOpen(e, "Cookies")}
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--hover-primary)] transition-colors relative group"
                >
                  <span>Cookies</span>
                  <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[var(--hover-primary)] group-hover:w-full transition-all duration-300"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Botão de voltar ao topo */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 text-white flex items-center justify-center shadow-lg hover:shadow-blue-500/20 z-50"
            aria-label="Voltar ao topo"
          >
            <FaChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Popup Component */}
      <Popup isOpen={isOpen} content={content} onClose={handleClose} />
    </>
  )
}

export default Footer

