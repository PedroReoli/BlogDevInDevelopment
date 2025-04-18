"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { resetPassword } from "../../services/auth"
import { AlertCircle, Check } from "lucide-react"

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const result = await resetPassword(email)

      if (!result.success) {
        setError(result.error || "Falha ao enviar email de recuperação. Tente novamente.")
        return
      }

      setSuccess(true)
    } catch (err) {
      console.error("Erro ao solicitar redefinição de senha:", err)
      setError("Ocorreu um erro inesperado. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Esqueceu sua senha?</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Enviaremos um link para redefinir sua senha</p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md mb-6 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success ? (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-md mb-6 flex items-start">
          <Check className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p>Email de recuperação enviado!</p>
            <p className="text-sm mt-1">
              Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="seu@email.com"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`btn btn-primary w-full ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Enviando..." : "Enviar link de recuperação"}
          </button>
        </form>
      )}

      <div className="mt-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Voltar para o login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPasswordForm
