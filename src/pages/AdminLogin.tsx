"use client"

import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"

const AdminLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Verificar credenciais com as variáveis de ambiente
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD

      if (!adminEmail || !adminPassword) {
        throw new Error("Credenciais de administrador não configuradas")
      }

      if (email === adminEmail && password === adminPassword) {
        // Armazenar estado de autenticação no localStorage
        localStorage.setItem("adminAuthenticated", "true")
        localStorage.setItem("adminAuthTime", Date.now().toString())

        // Redirecionar para o painel de administração
        navigate("/admin/dashboard")
      } else {
        throw new Error("Credenciais inválidas")
      }
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Área Administrativa</h1>
          <p className="text-gray-600 mt-1">DevEmDesenvolvimento</p>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md font-medium text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
