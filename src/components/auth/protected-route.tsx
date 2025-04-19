"use client"

import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "@/contexts/auth-context"

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div className="container py-8 text-center">Carregando...</div>
  }

  if (!user) {
    return <Navigate to="/admin" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
