"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Mail, Github, Linkedin, FileText, Youtube, Instagram, Twitter, ArrowUp, Coffee } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Mostrar botão de voltar ao topo apenas quando rolar para baixo
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Lista de redes sociais
  const socialLinks = [
    { href: "mailto:pedrosousa2160@gmail.com", icon: <Mail size={20} strokeWidth={1.5} />, label: "Email" },
    { href: "https://github.com/PedroReoli", icon: <Github size={20} strokeWidth={1.5} />, label: "GitHub" },
    {
      href: "https://www.linkedin.com/in/pedro-lucas-reis-de-oliveira-sousa-a93945171/",
      icon: <Linkedin size={20} strokeWidth={1.5} />,
      label: "LinkedIn",
    },
    {
      href: "https://devemdesenvolvimento.netlify.app/",
      icon: <FileText size={20} strokeWidth={1.5} />,
      label: "Blog",
    },
    {
      href: "https://www.youtube.com/@DevDesenvolvimento",
      icon: <Youtube size={20} strokeWidth={1.5} />,
      label: "YouTube",
    },
    {
      href: "https://www.instagram.com/01_dev_em_desenvolvimento",
      icon: <Instagram size={20} strokeWidth={1.5} />,
      label: "Instagram",
    },
    { href: "https://x.com/opedroreoli", icon: <Twitter size={20} strokeWidth={1.5} />, label: "Twitter" },
  ]

  return (
    <footer className="bg-[#0f172a] relative mt-16">
      <div className="container py-16 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Coluna 1 - Sobre */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-blue-600 w-10 h-10 rounded flex items-center justify-center">
                <span className="text-white text-xl font-bold">D</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Dev<span className="text-blue-500">EmDesenvolvimento</span>
              </h3>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Um espaço dedicado a compartilhar conhecimento sobre desenvolvimento, games e tecnologia com uma abordagem
              única e pessoal. Aqui você encontra conteúdo de qualidade sobre programação, dicas e tutoriais.
            </p>

            <div className="bg-[#111827] p-4 rounded-xl">
              <div className="flex items-center gap-4">
                <img
                  src="/images/Eu.png"
                  alt="Pedro - CEO"
                  className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="font-medium text-white">Pedro</p>
                  <p className="text-sm text-gray-400">CEO & Redator</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-xs text-green-400">Disponível para projetos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-5 text-white border-l-4 border-blue-500 pl-3">Links Rápidos</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-blue-500 transition-colors flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-300 hover:text-blue-500 transition-colors flex items-center gap-3"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Blog</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="text-gray-300 hover:text-blue-500 transition-colors flex items-center gap-3"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Sobre</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Discord */}
          <div>
            <h3 className="text-xl font-bold mb-5 text-white border-l-4 border-blue-500 pl-3">Conecte-se</h3>

            <div className="bg-[#111827] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 127.14 96.36"
                    className="text-blue-500"
                  >
                    <path
                      fill="#5865F2"
                      d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
                    />
                  </svg>
                  <div>
                    <h4 className="font-bold text-white">Discord</h4>
                    <p className="text-sm text-blue-400">Vamos jogar juntos!</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-xs text-green-400">Online</span>
                </div>
              </div>

              <a
                href="https://discord.gg/teDfu39G7r"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded font-medium text-center transition-colors"
              >
                Entrar no servidor
              </a>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#111827] rounded-xl p-2">
            <div className="flex flex-wrap justify-center gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1e293b] hover:bg-blue-500 text-white p-3 rounded transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-800 mb-8"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <p className="text-gray-500">&copy; {currentYear} Dev Em Desenvolvimento. Todos os direitos reservados.</p>
          <p className="text-gray-500 flex items-center gap-2">
            Feito com muito café <Coffee size={16} className="text-amber-700" />
          </p>
        </div>
      </div>

      {/* Botão para voltar ao topo */}
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
          showScrollTop ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <button
          onClick={scrollToTop}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-colors"
          aria-label="Voltar ao topo"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </footer>
  )
}

export default Footer
