"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "Cursos", path: "/cursos" },
  ]

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-gray-900">DevEmDesenvolvimento</span>
          </Link>

          {/* Menu para desktop */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-base font-medium transition-colors ${
                  isActive(item.path) ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Botão do menu mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-base font-medium transition-colors ${
                    isActive(item.path) ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
