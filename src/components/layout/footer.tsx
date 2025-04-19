import { Link } from "react-router-dom"
import { FiGithub, FiTwitter, FiExternalLink, FiMessageCircle, FiMail } from "react-icons/fi"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-800 bg-slate-900 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo e descrição */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/images/logo.svg" alt="Logo" className="h-10 w-10" />
              <span className="font-heading text-xl font-bold text-blue-400">Dev em Desenvolvimento</span>
            </Link>
            <p className="text-slate-400 mb-4">Blog sobre desenvolvimento de software, tecnologia e carreira.</p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/opedroreoli"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-900 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter size={18} />
              </a>
              <a
                href="https://github.com/PedroReoli"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-900 hover:text-blue-400 transition-colors"
                aria-label="GitHub"
              >
                <FiGithub size={18} />
              </a>
              <a
                href="mailto:pedrosousa2160@gmail.com"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-900 hover:text-blue-400 transition-colors"
                aria-label="Email"
              >
                <FiMail size={18} />
              </a>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6 text-white">Links Rápidos</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Me conheça */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6 text-white">Me conheça</h3>
            <div className="flex items-start gap-4 mb-6">
              <img
                src="/images/Eu.png"
                alt="Pedro Reoli"
                className="h-16 w-16 rounded-full object-cover border-2 border-blue-500"
              />
              <div>
                <h4 className="font-medium text-lg text-white">Pedro Reoli</h4>
                <p className="text-slate-400">Desenvolvedor Full Stack & Criador de Conteúdo</p>
              </div>
            </div>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://pedroreoliportfolio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <FiExternalLink className="h-5 w-5" />
                  <span>Portfólio</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-slate-400">
                  <FiMessageCircle className="h-5 w-5" />
                  <span>Discord: pedroreoli</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>&copy; {currentYear} Dev em Desenvolvimento. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
