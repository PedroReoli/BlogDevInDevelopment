import { Link } from "react-router-dom"
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      style={{ backgroundColor: "var(--color-bg-alt)", borderTop: "1px solid var(--color-border)" }}
      className="mt-16"
    >
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/logo.svg" alt="Logo" className="w-8 h-8" />
              <span className="text-xl font-bold" style={{ color: "var(--color-primary)" }}>
                DevEmDesenvolvimento
              </span>
            </div>
            <p style={{ color: "var(--color-text-light)" }} className="mb-4">
              Conteúdo sobre desenvolvimento web e programação para ajudar você a evoluir como desenvolvedor.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/PedroReoli"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                style={{ color: "var(--color-text-light)" }}
                className="hover:text-blue-500 transition-colors"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/pedro-reoli"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{ color: "var(--color-text-light)" }}
                className="hover:text-blue-500 transition-colors"
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href="https://twitter.com/pedro_reoli"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                style={{ color: "var(--color-text-light)" }}
                className="hover:text-blue-500 transition-colors"
              >
                <FiTwitter size={20} />
              </a>
              <a
                href="mailto:pedrosousa2160@gmail.com"
                aria-label="Email"
                style={{ color: "var(--color-text-light)" }}
                className="hover:text-blue-500 transition-colors"
              >
                <FiMail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  style={{ color: "var(--color-text-light)" }}
                  className="hover:text-blue-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  style={{ color: "var(--color-text-light)" }}
                  className="hover:text-blue-500 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  style={{ color: "var(--color-text-light)" }}
                  className="hover:text-blue-500 transition-colors"
                >
                  Sobre
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p style={{ color: "var(--color-text-light)" }} className="mb-4">
              Inscreva-se para receber as últimas atualizações e artigos diretamente no seu email.
            </p>
            <form className="flex gap-2">
              <input type="email" placeholder="Seu email" className="form-input flex-grow" required />
              <button type="submit" className="btn btn-primary whitespace-nowrap">
                Inscrever
              </button>
            </form>
          </div>
        </div>

        <div
          className="mt-8 pt-6 border-t text-center"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text-lighter)" }}
        >
          <p>&copy; {currentYear} DevEmDesenvolvimento. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
