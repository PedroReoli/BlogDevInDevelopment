"use client"

import { useState, useEffect, type FormEvent } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FiMenu, FiX, FiSearch } from "react-icons/fi"
import { useCustomAuth } from "@/contexts/custom-auth-context"
import Logo from "@/components/common/logo"
import { useMobile } from "@/hooks/use-mobile"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = useCustomAuth()
  const { isMobile } = useMobile()
  const location = useLocation()
  const navigate = useNavigate()

  // Fechar o menu ao mudar de página
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/blog?query=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-[#0f172a] border-b border-gray-800">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        {/* Logo */}
        <Logo />

        {/* Search Bar - Visível apenas em desktop */}
        {!isMobile && (
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 px-4 pl-10 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                aria-label="Buscar"
              >
                <FiSearch size={18} />
              </button>
            </div>
          </form>
        )}

        {/* Navigation */}
        <div className="flex items-center gap-4">
          {/* Menu para mobile */}
          {isMobile ? (
            <>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors md:hidden"
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              >
                {isMenuOpen ? <FiX size={24} className="text-white" /> : <FiMenu size={24} className="text-white" />}
              </button>

              {/* Menu mobile */}
              {isMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-[#0f172a] border-b border-gray-800 shadow-lg">
                  <nav className="container py-4">
                    {/* Search Bar para mobile */}
                    <form onSubmit={handleSearch} className="mb-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Buscar posts..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full py-2 px-4 pl-10 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="submit"
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          aria-label="Buscar"
                        >
                          <FiSearch size={18} />
                        </button>
                      </div>
                    </form>

                    <ul className="flex flex-col space-y-4">
                      <li>
                        <Link
                          to="/blog"
                          className="block px-4 py-2 text-white hover:bg-gray-800 rounded-md transition-colors"
                        >
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/sobre"
                          className="block px-4 py-2 text-white hover:bg-gray-800 rounded-md transition-colors"
                        >
                          Sobre
                        </Link>
                      </li>
                      {user && (
                        <li>
                          <Link
                            to="/admin/dashboard"
                            className="block px-4 py-2 text-white hover:bg-gray-800 rounded-md transition-colors"
                          >
                            Dashboard
                          </Link>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              )}
            </>
          ) : (
            /* Menu para desktop */
            <nav>
              <ul className="flex items-center space-x-6">
                <li>
                  <Link to="/blog" className="text-white hover:text-blue-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/sobre" className="text-white hover:text-blue-400 transition-colors">
                    Sobre
                  </Link>
                </li>
                {user && (
                  <li>
                    <Link to="/admin/dashboard" className="text-white hover:text-blue-400 transition-colors">
                      Dashboard
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
