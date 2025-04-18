"use client"

import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signUp } from "../../services/auth"
import { Eye, EyeOff, AlertCircle, Check } from "lucide-react"

const RegisterForm = () => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

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
      const result = await signUp(email, password, username)

      if (!result.success) {
        setError(result.error || "Falha ao criar conta. Tente novamente.")
        return
      }

      setSuccess(true)

      // Redirecionar após 3 segundos
      setTimeout(() => {
        navigate("/login", { state: { message: "Conta criada com sucesso! Faça login para continuar." } })
      }, 3000)
    } catch (err) {
      console.error("Erro ao registrar:", err)
      setError("Ocorreu um erro inesperado. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Criar conta</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Cadastre-se para acessar todos os recursos</p>
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
          <span>Conta criada com sucesso! Redirecionando para o login...</span>
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
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Nome de usuário
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="seunome"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Senha
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
            Confirmar senha
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
          {isLoading ? "Criando conta..." : "Criar conta"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterForm
