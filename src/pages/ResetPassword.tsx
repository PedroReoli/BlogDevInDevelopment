"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { updatePassword } from "../services/auth"
import { supabase } from "../services/supabase"
import MetaTags from "../components/seo/MetaTags"

const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  // Verificar se o usuário está autenticado com um token de redefinição de senha
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        navigate("/login", { replace: true })
      }
    }

    checkSession()
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validar senha
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.")
      return
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.")
      return
    }

    setIsLoading(true)

    try {
      await updatePassword(password)
      setSuccess(true)
      setTimeout(() => {
        navigate("/login")
      }, 3000)
    } catch (err) {
      console.error("Erro ao redefinir senha:", err)
      setError("Erro ao redefinir senha. Por favor, tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <MetaTags
        title="Redefinir senha"
        description="Crie uma nova senha para sua conta no DevEmDesenvolvimento."
        keywords="redefinir senha, nova senha, atualizar senha"
      />

      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Redefinir senha</h1>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {success ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-md mb-6">
            <p>Senha redefinida com sucesso!</p>
            <p className="text-sm mt-2">Você será redirecionado para a página de login em instantes.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Nova senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              />
              <p className="text-xs text-gray-500 mt-1">A senha deve ter pelo menos 6 caracteres.</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirmar nova senha
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Redefinindo..." : "Redefinir senha"}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p>
            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              Voltar para o login
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
