"use client"

import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useCustomAuth } from "@/contexts/custom-auth-context"

interface CustomProtectedRouteProps {
  children: ReactNode
}

const CustomProtectedRoute = ({ children }: CustomProtectedRouteProps) => {
  const { user, isLoading } = useCustomAuth()

  if (isLoading) {
    return <div className="container py-8 text-center">Carregando...</div>
  }

  if (!user) {
    return <Navigate to="/admin" replace />
  }

  return <>{children}</>
}

export default CustomProtectedRoute
