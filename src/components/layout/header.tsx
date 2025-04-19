"use client"

import { useState, useEffect, type FormEvent } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FiSearch, FiMenu, FiX } from "react-icons/fi"
import { useAuth } from "@/contexts/auth-context"
import ThemeToggle from "@/components/theme/theme-toggle"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/blog?query=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled ? "bg-slate-900 shadow-md" : "bg-slate-900"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo e nome (esquerda) */}
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <img src="/images/logo.svg" alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-blue-400 hidden sm:inline">DevEmDesenvolvimento</span>
          </Link>

          {/* Barra de pesquisa (meio) - visível apenas em telas médias e grandes */}
          <div className="hidden md:block flex-grow max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Buscar posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 px-4 pr-10 rounded-full border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-blue-400"
                aria-label="Buscar"
              >
                <FiSearch size={18} />
              </button>
            </form>
          </div>

          {/* Navegação e theme toggle (direita) */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <button
              className="md:hidden p-2 rounded-full hover:bg-slate-800"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <FiX size={24} className="text-white" /> : <FiMenu size={24} className="text-white" />}
            </button>

            <nav
              className={`
                fixed md:static top-0 right-0 h-screen md:h-auto w-full md:w-auto
                bg-slate-900 md:bg-transparent z-50 md:z-auto
                transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0
                transition-transform duration-300 ease-in-out
                flex flex-col md:flex-row items-start md:items-center
                p-6 md:p-0 gap-6 shadow-lg md:shadow-none
              `}
            >
              <div className="flex justify-between items-center w-full md:hidden mb-6">
                <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
                  <img src="/images/logo.svg" alt="Logo" className="w-8 h-8" />
                  <span className="text-xl font-bold text-blue-400">DevEmDesenvolvimento</span>
                </Link>
                <button className="p-2 rounded-full hover:bg-slate-800" onClick={closeMenu} aria-label="Fechar menu">
                  <FiX size={24} className="text-white" />
                </button>
              </div>

              {/* Barra de pesquisa para mobile */}
              <div className="w-full mb-6 md:hidden">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Buscar posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-2 px-4 pr-10 rounded-full border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-blue-400"
                    aria-label="Buscar"
                  >
                    <FiSearch size={18} />
                  </button>
                </form>
              </div>

              <Link
                to="/"
                className={`transition-colors duration-200 px-3 py-2 rounded-md ${
                  isActive("/")
                    ? "font-semibold text-blue-400 bg-slate-800"
                    : "text-white hover:text-blue-400 hover:bg-slate-800"
                }`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/blog"
                className={`transition-colors duration-200 px-3 py-2 rounded-md ${
                  isActive("/blog")
                    ? "font-semibold text-blue-400 bg-slate-800"
                    : "text-white hover:text-blue-400 hover:bg-slate-800"
                }`}
                onClick={closeMenu}
              >
                Blog
              </Link>
              <Link
                to="/sobre"
                className={`transition-colors duration-200 px-3 py-2 rounded-md ${
                  isActive("/sobre")
                    ? "font-semibold text-blue-400 bg-slate-800"
                    : "text-white hover:text-blue-400 hover:bg-slate-800"
                }`}
                onClick={closeMenu}
              >
                Sobre
              </Link>
              {user && (
                <Link
                  to="/admin/dashboard"
                  className={`transition-colors duration-200 px-3 py-2 rounded-md ${
                    isActive("/admin/dashboard")
                      ? "font-semibold text-blue-400 bg-slate-800"
                      : "text-white hover:text-blue-400 hover:bg-slate-800"
                  }`}
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
              )}
              {!user && (
                <Link
                  to="/admin"
                  className={`transition-colors duration-200 px-3 py-2 rounded-md ${
                    isActive("/admin")
                      ? "font-semibold text-blue-400 bg-slate-800"
                      : "text-white hover:text-blue-400 hover:bg-slate-800"
                  }`}
                  onClick={closeMenu}
                >
                  Admin
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
