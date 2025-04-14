import type React from "react"
import { FaStar } from "react-icons/fa"
import { Link } from "react-router-dom"

const AvalieNoGitHub: React.FC = () => {
  return (
    <div className="flex items-center space-x-1">
      <Link to="/github" className="flex items-center space-x-1 hover:text-[var(--hover-primary)] transition-all">
        <FaStar className="text-lg" />
        <span className="text-sm font-medium">Avalie no GitHub</span>
      </Link>
      <span className="text-sm font-medium">47K</span>
    </div>
  )
}

export default AvalieNoGitHub

