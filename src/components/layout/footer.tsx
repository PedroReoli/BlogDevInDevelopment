import { Link } from "react-router-dom"
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-color-border">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DevEmDesenvolvimento</h3>
            <p className="text-text-secondary">
              Conteúdo sobre desenvolvimento web e programação para ajudar você a evoluir como desenvolvedor.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/sobre">Sobre</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-text-secondary hover:text-primary"
              >
                <FiGithub size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-text-secondary hover:text-primary"
              >
                <FiLinkedin size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-text-secondary hover:text-primary"
              >
                <FiTwitter size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-color-border text-center text-text-tertiary">
          <p>&copy; {currentYear} DevEmDesenvolvimento. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
