"use client"

import type React from "react"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { signIn } from "../../services/auth"
import { Eye, EyeOff, AlertCircle } from "lucide-react"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as any)?.from || "/"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const result = await signIn(email, password)

      if (!result.success) {
        setError(result.error || "Falha ao fazer login. Verifique suas credenciais.")
        return
      }

      // Redirecionar para a página anterior ou home
      navigate(from, { replace: true })
    } catch (err) {
      console.error("Erro ao fazer login:", err)
      setError("Ocorreu um erro inesperado. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Entrar</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Faça login para acessar sua conta</p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md mb-6 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
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
            className="input"
            placeholder="seu@email.com"
            required
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
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`btn btn-primary w-full ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Não tem uma conta?{" "}
          <Link to="/cadastro" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
