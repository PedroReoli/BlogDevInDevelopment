"use client"

import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signUp } from "../services/auth"
import { useAuth } from "../context/AuthContext"
import MetaTags from "../components/seo/MetaTags"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const { refreshUser } = useAuth()

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
      await signUp(email, password)
      setSuccess(true)
      await refreshUser()
      setTimeout(() => {
        navigate("/")
      }, 3000)
    } catch (err: any) {
      console.error("Erro ao cadastrar:", err)
      if (err.message.includes("already registered")) {
        setError("Este email já está cadastrado. Tente fazer login.")
      } else {
        setError("Erro ao criar conta. Por favor, tente novamente.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <MetaTags
        title="Cadastro"
        description="Crie sua conta no DevEmDesenvolvimento e tenha acesso a conteúdos exclusivos."
        keywords="cadastro, registro, conta, inscrição"
      />

      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Criar Conta</h1>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {success ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-md mb-6">
            <p>Conta criada com sucesso! Você será redirecionado em instantes.</p>
            <p className="text-sm mt-2">
              Verifique seu email para confirmar sua conta e ter acesso completo à plataforma.
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

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Senha
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
                Confirmar Senha
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
              {isLoading ? "Criando conta..." : "Criar Conta"}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p>
            Já tem uma conta?{" "}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register
