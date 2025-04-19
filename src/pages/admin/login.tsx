"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/auth-context"
import LoginForm from "@/components/admin/login-form"

const AdminLogin = () => {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user && !isLoading) {
      navigate("/admin/dashboard")
    }
  }, [user, isLoading, navigate])

  if (isLoading) {
    return <div className="container py-16 text-center">Carregando...</div>
  }

  return (
    <div className="container py-16">
      <LoginForm />
    </div>
  )
}

export default AdminLogin
