import type React from "react"
import { Link } from "react-router-dom"

interface LoginOuPerfilProps {
  isLoggedIn: boolean
  profileImage: string // Caminho da imagem do perfil
}

const LoginOuPerfil: React.FC<LoginOuPerfilProps> = ({ isLoggedIn, profileImage }) => {
  return isLoggedIn ? (
    <Link to="/profile" className="flex items-center space-x-2 hover:text-[var(--hover-primary)] transition-all">
      <div className="h-10 w-10 border-2 border-blue-500 rounded-full overflow-hidden flex items-center justify-center">
        <img
          src={profileImage || "/placeholder.svg"}
          alt="Perfil"
          className="h-full w-full object-cover rounded-full"
        />
      </div>
    </Link>
  ) : (
    <Link
      to="/login"
      className="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center"
    >
      <span className="text-sm font-semibold">Login</span>
    </Link>
  )
}

export default LoginOuPerfil

