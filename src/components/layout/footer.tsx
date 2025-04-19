import { Link } from "react-router-dom"
import { FiGithub, FiTwitter, FiExternalLink, FiMessageCircle } from "react-icons/fi"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo e descrição */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/images/logo.svg" alt="Logo" className="h-8 w-8" />
              <span className="font-heading text-lg font-bold">Dev em Desenvolvimento</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Blog sobre desenvolvimento de software, tecnologia e carreira.
            </p>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Social</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://x.com/opedroreoli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <FiTwitter className="h-5 w-5" />
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/PedroReoli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <FiGithub className="h-5 w-5" />
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Me conheça */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Me conheça</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://pedroreoliportfolio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <FiExternalLink className="h-5 w-5" />
                  <span>Portfólio</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FiMessageCircle className="h-5 w-5" />
                  <span>Discord: pedroreoli</span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <img src="/images/EuPixar.png" alt="Pedro Reoli" className="h-10 w-10 rounded-full object-cover" />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Dev em Desenvolvimento. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
