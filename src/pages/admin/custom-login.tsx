"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCustomAuth } from "@/contexts/custom-auth-context"
import CustomLoginForm from "@/components/admin/custom-login-form"

const CustomAdminLogin = () => {
  const { user, isLoading } = useCustomAuth()
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
      <CustomLoginForm />
    </div>
  )
}

export default CustomAdminLogin
