"use client"

import type React from "react"

import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

interface RequireAuthProps {
  children: React.ReactNode
  adminOnly?: boolean
}

const RequireAuth = ({ children, adminOnly = false }: RequireAuthProps) => {
  const { isAuthenticated, isLoading, user, profile } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirecionar para a página de login, mas salvar a localização atual
    // para que possamos voltar a ela após o login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Verificar se é uma rota de admin e se o usuário é admin
  if (adminOnly && profile?.email !== "admin@devemdesenvolvimento.com.br") {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default RequireAuth
