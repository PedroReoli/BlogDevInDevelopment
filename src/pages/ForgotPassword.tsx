"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { resetPassword } from "../services/auth"
import MetaTags from "../components/seo/MetaTags"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await resetPassword(email)
      setSuccess(true)
    } catch (err) {
      console.error("Erro ao solicitar redefinição de senha:", err)
      setError("Erro ao processar sua solicitação. Por favor, tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <MetaTags
        title="Esqueci minha senha"
        description="Recupere sua senha para acessar sua conta no DevEmDesenvolvimento."
        keywords="recuperar senha, esqueci senha, redefinir senha"
      />

      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Esqueci minha senha</h1>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {success ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-md mb-6">
            <p>Enviamos um email com instruções para redefinir sua senha.</p>
            <p className="text-sm mt-2">
              Verifique sua caixa de entrada e siga as instruções para criar uma nova senha.
            </p>
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
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Enviando..." : "Enviar instruções"}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p>
            Lembrou sua senha?{" "}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              Voltar para o login
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
