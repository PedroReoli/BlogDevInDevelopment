"use client"

import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { FiLock } from "react-icons/fi"
import { useAuth } from "@/contexts/auth-context"
import toast from "react-hot-toast"

const LoginForm = () => {
  const [email, setEmail] = useState("pedrosousa2160@gmail.com")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (email !== "pedrosousa2160@gmail.com") {
      toast.error("Apenas o administrador pode fazer login")
      return
    }

    setIsLoading(true)

    try {
      const { error } = await signIn(email, password)

      if (error) {
        toast.error("Credenciais inválidas")
      } else {
        toast.success("Login realizado com sucesso")
        navigate("/admin/dashboard")
      }
    } catch (error) {
      toast.error("Erro ao fazer login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-card rounded-lg shadow-md">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
          <FiLock size={24} />
        </div>
        <h1 className="text-2xl font-bold">Área Administrativa</h1>
        <p className="text-text-secondary">Faça login para acessar o painel</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled
          />
          <p className="text-text-tertiary text-sm mt-1">Apenas o administrador pode fazer login</p>
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Senha
          </label>
          <input
            id="password"
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  )
}

export default LoginForm
