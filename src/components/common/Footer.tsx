import { Link } from "react-router-dom"
import { Github, Linkedin, Twitter } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-lg font-bold text-gray-900">
              DevEmDesenvolvimento
            </Link>
            <p className="text-sm text-gray-600 mt-1">Compartilhando conhecimento em programação</p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} DevEmDesenvolvimento. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}

export default Footer
