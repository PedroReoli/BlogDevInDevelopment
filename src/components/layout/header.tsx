"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { FiMenu, FiX } from "react-icons/fi"
import { useAuth } from "@/contexts/auth-context"
import ThemeToggle from "@/components/theme/theme-toggle"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
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
        isScrolled ? "bg-white bg-opacity-80 backdrop-blur-md shadow-sm dark:bg-gray-900 dark:bg-opacity-80" : ""
      }`}
      style={{ backgroundColor: isScrolled ? "" : "var(--color-bg)" }}
    >
      <div className="container py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <img src="/images/logo.svg" alt="Logo" className="w-8 h-8" />
          <span className="text-xl font-bold" style={{ color: "var(--color-primary)" }}>
            DevEmDesenvolvimento
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <nav
            className={`
              fixed md:static top-0 right-0 h-screen md:h-auto w-64 md:w-auto
              bg-white dark:bg-gray-900 md:bg-transparent z-50 md:z-auto
              transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0
              transition-transform duration-300 ease-in-out
              flex flex-col md:flex-row items-start md:items-center
              p-6 md:p-0 gap-6 shadow-lg md:shadow-none
            `}
            style={{ backgroundColor: "var(--color-bg)" }}
          >
            <button
              className="md:hidden self-end p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={closeMenu}
              aria-label="Fechar menu"
            >
              <FiX size={24} />
            </button>

            <Link
              to="/"
              className={`transition-colors duration-200 ${isActive("/") ? "font-semibold" : ""}`}
              style={{ color: isActive("/") ? "var(--color-primary)" : "" }}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/blog"
              className={`transition-colors duration-200 ${isActive("/blog") ? "font-semibold" : ""}`}
              style={{ color: isActive("/blog") ? "var(--color-primary)" : "" }}
              onClick={closeMenu}
            >
              Blog
            </Link>
            <Link
              to="/sobre"
              className={`transition-colors duration-200 ${isActive("/sobre") ? "font-semibold" : ""}`}
              style={{ color: isActive("/sobre") ? "var(--color-primary)" : "" }}
              onClick={closeMenu}
            >
              Sobre
            </Link>
            {user && (
              <Link
                to="/admin/dashboard"
                className={`transition-colors duration-200 ${isActive("/admin/dashboard") ? "font-semibold" : ""}`}
                style={{ color: isActive("/admin/dashboard") ? "var(--color-primary)" : "" }}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
            )}
            {!user && (
              <Link
                to="/admin"
                className={`transition-colors duration-200 ${isActive("/admin") ? "font-semibold" : ""}`}
                style={{ color: isActive("/admin") ? "var(--color-primary)" : "" }}
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
