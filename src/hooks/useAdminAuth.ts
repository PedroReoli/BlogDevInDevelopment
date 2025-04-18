"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// Tempo de expiração da sessão em milissegundos (2 horas)
const SESSION_EXPIRY = 2 * 60 * 60 * 1000

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = localStorage.getItem("adminAuthenticated") === "true"
      const authTime = Number(localStorage.getItem("adminAuthTime") || "0")
      const currentTime = Date.now()

      // Verificar se a autenticação expirou
      if (authenticated && currentTime - authTime > SESSION_EXPIRY) {
        // Sessão expirada
        localStorage.removeItem("adminAuthenticated")
        localStorage.removeItem("adminAuthTime")
        setIsAuthenticated(false)
        navigate("/admin")
        return
      }

      setIsAuthenticated(authenticated)
      setIsLoading(false)

      if (!authenticated) {
        navigate("/admin")
      }
    }

    checkAuth()
  }, [navigate])

  const logout = () => {
    localStorage.removeItem("adminAuthenticated")
    localStorage.removeItem("adminAuthTime")
    setIsAuthenticated(false)
    navigate("/admin")
  }

  return { isAuthenticated, isLoading, logout }
}
