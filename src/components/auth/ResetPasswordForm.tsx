"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { updatePassword } from "../../services/auth"
import { Eye, EyeOff, AlertCircle, Check } from "lucide-react"

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

  // Verificar se o usuário está autenticado via hash na URL
  useEffect(() => {
    // O Supabase Auth já lida com o hash automaticamente
    // Apenas verificamos se estamos na página correta
    if (!window.location.hash.includes("type=recovery")) {
      setError("Link de recuperação inválido ou expirado.")
    }
  }, [])

  const validatePassword = () => {
    if (password.length < 8) {
      return "A senha deve ter pelo menos 8 caracteres"
    }
    if (password !== confirmPassword) {
      return "As senhas não coincidem"
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar senha
    const passwordError = validatePassword()
    if (passwordError) {
      setError(passwordError)
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      const result = await updatePassword(password)

      if (!result.success) {
        setError(result.error || "Falha ao redefinir senha. Tente novamente.")
        return
      }

      setSuccess(true)

      // Redirecionar após 3 segundos
      setTimeout(() => {
        navigate("/login", { state: { message: "Senha redefinida com sucesso! Faça login com sua nova senha." } })
      }, 3000)
    } catch (err) {
      console.error("Erro ao redefinir senha:", err)
      setError("Ocorreu um erro inesperado. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  if (error && !error.includes("Link de recuperação")) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Redefinir senha</h1>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md mb-6 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>

        <div className="text-center mt-6">
          <button onClick={() => navigate("/esqueci-senha")} className="btn btn-primary">
            Solicitar novo link
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Redefinir senha</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Crie uma nova senha para sua conta</p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md mb-6 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-md mb-6 flex items-start">
          <Check className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>Senha redefinida com sucesso! Redirecionando para o login...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Nova senha
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input pr-10"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
              aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">A senha deve ter pelo menos 8 caracteres</p>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
            Confirmar nova senha
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || success}
          className={`btn btn-primary w-full ${isLoading || success ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Redefinindo..." : "Redefinir senha"}
        </button>
      </form>
    </div>
  )
}

export default ResetPasswordForm
