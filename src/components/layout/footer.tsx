"use client"

import { Link } from "react-router-dom"
import { FiGithub, FiTwitter, FiArrowUp, FiMail } from "react-icons/fi"
import { FaDiscord, FaTwitch, FaSteam, FaYoutube, FaCoffee } from "react-icons/fa"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-[#0f172a] relative mt-16">
      {/* Botão para voltar ao topo */}
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
        <button
          onClick={scrollToTop}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Voltar ao topo"
        >
          <FiArrowUp size={20} />
        </button>
      </div>

      <div className="container py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Coluna 1 - Sobre */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">
              <span className="text-blue-500">DevEmDesenvolvimento</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Um espaço dedicado a compartilhar conhecimento sobre desenvolvimento, games e tecnologia com uma abordagem
              única e pessoal.
            </p>
            <div className="flex items-center gap-3">
              <img src="/images/Eu.png" alt="Pedro - CEO" className="w-10 h-10 rounded-full border-2 border-blue-500" />
              <div>
                <p className="font-medium text-white">Pedro</p>
                <p className="text-sm text-gray-400">CEO & Redator</p>
              </div>
            </div>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-blue-500 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-300 hover:text-blue-500 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="text-gray-300 hover:text-blue-500 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-gray-300 hover:text-blue-500 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Discord */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Conecte-se</h3>
            <div className="bg-gray-800 rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-500/20 p-2 rounded-full">
                  <FaDiscord size={24} className="text-blue-500" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Discord</h4>
                  <p className="text-sm text-blue-400">Vamos jogar juntos!</p>
                </div>
              </div>

              <a
                href="https://discord.gg/seudiscord"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium text-center transition-colors"
              >
                <span className="flex items-center justify-center gap-2">
                  <FaDiscord size={16} />
                  pedrosousa#1234
                </span>
              </a>
            </div>

            <div className="mt-4">
              <a
                href="mailto:pedrosousa2160@gmail.com"
                className="flex items-center gap-2 text-gray-300 hover:text-blue-500 transition-colors"
              >
                <FiMail size={16} />
                pedrosousa2160@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-4">
            {[
              { icon: <FaYoutube size={18} />, href: "https://youtube.com" },
              { icon: <FaTwitch size={18} />, href: "https://twitch.tv" },
              { icon: <FaDiscord size={18} />, href: "https://discord.gg" },
              { icon: <FiTwitter size={18} />, href: "https://twitter.com" },
              { icon: <FiGithub size={18} />, href: "https://github.com" },
              { icon: <FaSteam size={18} />, href: "https://steamcommunity.com" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-500 text-white p-2.5 rounded-full transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-800 mb-8"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Dev Em Desenvolvimento. Todos os direitos reservados.
          </p>
          <p className="text-gray-600 text-xs mt-2 flex items-center justify-center gap-1">
            Feito com muito café <FaCoffee className="text-amber-700" />
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
