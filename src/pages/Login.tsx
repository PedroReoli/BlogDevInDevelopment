"use client"

import type React from "react"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { signIn } from "../services/auth"
import { useAuth } from "../context/AuthContext"
import MetaTags from "../components/seo/MetaTags"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { refreshUser } = useAuth()

  // Obter o caminho de redirecionamento após o login
  const from = location.state?.from?.pathname || "/"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await signIn(email, password)
      await refreshUser()
      navigate(from, { replace: true })
    } catch (err) {
      console.error("Erro ao fazer login:", err)
      setError("Email ou senha incorretos. Por favor, tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <MetaTags
        title="Login"
        description="Faça login para acessar sua conta no DevEmDesenvolvimento."
        keywords="login, acesso, conta, autenticação"
      />

      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

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

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium">
                Senha
              </label>
              <Link to="/esqueci-senha" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>
            Não tem uma conta?{" "}
            <Link to="/cadastro" className="text-blue-600 dark:text-blue-400 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login
