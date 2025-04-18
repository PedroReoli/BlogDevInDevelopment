"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, User, LogOut } from "lucide-react"
import ThemeToggle from "../common/ThemeToggle"
import SearchBar from "../common/SearchBar"
import { useAuth } from "../../context/AuthContext"
import { signOut } from "../../services/auth"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const location = useLocation()
  const { user, profile, isAuthenticated } = useAuth()

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (isUserMenuOpen) setIsUserMenuOpen(false)
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
    if (isMenuOpen) setIsMenuOpen(false)
  }

  const handleLogout = async () => {
    await signOut()
    setIsUserMenuOpen(false)
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">DevEmDesenvolvimento</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className={`text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 ${
                  isActive("/") ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                }`}
              >
                Início
              </Link>
              <Link
                to="/blog"
                className={`text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 ${
                  isActive("/blog") ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                }`}
              >
                Blog
              </Link>
              <Link
                to="/cursos"
                className={`text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 ${
                  isActive("/cursos") ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                }`}
              >
                Cursos
              </Link>
              <Link
                to="/sobre"
                className={`text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 ${
                  isActive("/sobre") ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                }`}
              >
                Sobre
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <SearchBar compact className="w-48" />
              <ThemeToggle />

              {/* User Menu (Desktop) */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-1 focus:outline-none"
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      {profile?.avatar_url ? (
                        <img
                          src={profile.avatar_url || "/placeholder.svg"}
                          alt={profile.username || "Usuário"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={16} className="text-gray-500 dark:text-gray-400" />
                      )}
                    </div>
                    <span className="hidden lg:inline-block text-sm font-medium">{profile?.username || "Usuário"}</span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                      <Link
                        to="/perfil"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Meu Perfil
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  Entrar
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />

            {/* User Menu Button (Mobile) */}
            {isAuthenticated && (
              <button
                onClick={toggleUserMenu}
                className="text-gray-700 dark:text-gray-300"
                aria-label="Menu do usuário"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url || "/placeholder.svg"}
                      alt={profile.username || "Usuário"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={16} className="text-gray-500 dark:text-gray-400" />
                  )}
                </div>
              </button>
            )}

            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <SearchBar className="mb-4" />
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className={`text-sm font-medium px-2 py-1 rounded-md ${
                  isActive("/")
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link
                to="/blog"
                className={`text-sm font-medium px-2 py-1 rounded-md ${
                  isActive("/blog")
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/cursos"
                className={`text-sm font-medium px-2 py-1 rounded-md ${
                  isActive("/cursos")
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Cursos
              </Link>
              <Link
                to="/sobre"
                className={`text-sm font-medium px-2 py-1 rounded-md ${
                  isActive("/sobre")
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>

              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="text-sm font-medium px-2 py-1 rounded-md text-blue-600 dark:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Entrar
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Mobile User Menu */}
        {isUserMenuOpen && isAuthenticated && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url || "/placeholder.svg"}
                      alt={profile.username || "Usuário"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={20} className="text-gray-500 dark:text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{profile?.username || "Usuário"}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{profile?.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  to="/perfil"
                  className="block w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <User size={16} className="inline mr-2" />
                  Meu Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <LogOut size={16} className="inline mr-2" />
                  Sair
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
