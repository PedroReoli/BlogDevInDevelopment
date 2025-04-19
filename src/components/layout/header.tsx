"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { FiMenu, FiX } from "react-icons/fi"
import { useAuth } from "@/contexts/auth-context"
import ThemeToggle from "@/components/theme/theme-toggle"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useAuth()
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <header className="py-4 border-b border-color-border transition-colors duration-300">
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold" onClick={closeMenu}>
          DevEmDesenvolvimento
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <button
            className="md:hidden p-2 rounded-full hover:bg-foreground"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <nav
            className={`
            fixed md:static top-0 right-0 h-screen md:h-auto w-64 md:w-auto
            bg-background md:bg-transparent z-50 md:z-auto
            transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0
            transition-transform duration-300 ease-in-out
            flex flex-col md:flex-row items-start md:items-center
            p-6 md:p-0 gap-6
          `}
          >
            <button
              className="md:hidden self-end p-2 rounded-full hover:bg-foreground"
              onClick={closeMenu}
              aria-label="Fechar menu"
            >
              <FiX size={24} />
            </button>

            <Link to="/" className={`${isActive("/") ? "font-semibold text-primary" : ""}`} onClick={closeMenu}>
              Home
            </Link>
            <Link to="/blog" className={`${isActive("/blog") ? "font-semibold text-primary" : ""}`} onClick={closeMenu}>
              Blog
            </Link>
            <Link
              to="/sobre"
              className={`${isActive("/sobre") ? "font-semibold text-primary" : ""}`}
              onClick={closeMenu}
            >
              Sobre
            </Link>
            {user && (
              <Link
                to="/admin/dashboard"
                className={`${isActive("/admin/dashboard") ? "font-semibold text-primary" : ""}`}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
            )}
            {!user && (
              <Link
                to="/admin"
                className={`${isActive("/admin") ? "font-semibold text-primary" : ""}`}
                onClick={closeMenu}
              >
                Admin
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
