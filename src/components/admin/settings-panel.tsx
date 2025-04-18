"use client"

import { useState, useEffect } from "react"
import { FiSave, FiAlertCircle, FiLoader } from "react-icons/fi"
import toast from "react-hot-toast"
import { UserSettingsService } from "@/services/user-settings-service"
import { CustomAuthService } from "@/services/custom-auth-service"

const SettingsPanel = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Configurações de perfil
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")

  // Carregar configurações do usuário
  useEffect(() => {
    const loadUserSettings = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Verificar se o usuário está autenticado
        const currentUser = CustomAuthService.getCurrentUser()

        if (!currentUser) {
          setError("Você precisa estar logado para acessar as configurações.")
          setIsLoading(false)
          return
        }

        // Definir email padrão do usuário atual
        setEmail(currentUser.email || "")

        // Carregar configurações
        const settings = await UserSettingsService.getUserSettings()

        if (settings) {
          setName(settings.name || "")
          setEmail(settings.email || "")
          setBio(settings.bio || "")
        } else {
          // Se não conseguir carregar as configurações, pelo menos mostramos o email
          setName(currentUser.email.split("@")[0] || "")
          setBio("Adicione uma biografia aqui")
        }
      } catch (err) {
        console.error("Erro ao carregar configurações:", err)
        setError("Erro ao carregar configurações. Tente novamente mais tarde.")
      } finally {
        setIsLoading(false)
      }
    }

    loadUserSettings()
  }, [])

  const handleSaveSettings = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Validar campos
      if (!name.trim()) {
        throw new Error("O nome é obrigatório")
      }

      if (!email.trim()) {
        throw new Error("O email é obrigatório")
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error("Formato de email inválido")
      }

      // Salvar configurações
      const result = await UserSettingsService.updateUserSettings({
        name,
        email,
        bio,
      })

      if (result.success) {
        toast.success("Configurações salvas com sucesso")
      } else {
        throw new Error(result.error || "Erro ao salvar configurações")
      }
    } catch (err) {
      const errorMessage = (err as Error).message
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 flex justify-center items-center h-64">
        <div className="flex flex-col items-center">
          <FiLoader size={32} className="animate-spin text-blue-500 mb-4" />
          <p className="text-slate-300">Carregando configurações...</p>
        </div>
      </div>
    )
  }

  // Se houver um erro de autenticação, mostrar mensagem de erro
  if (error && error.includes("logado")) {
    return (
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="bg-red-900/30 border border-red-500 text-red-300 p-4 rounded-lg flex items-start gap-3">
          <FiAlertCircle className="mt-0.5 flex-shrink-0" size={18} />
          <div>
            <p className="font-medium">{error}</p>
            <p className="mt-2">Faça login para acessar suas configurações.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden">
      {/* Conteúdo das configurações */}
      <div className="p-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Configurações de Perfil</h3>

          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-300 p-4 rounded-lg flex items-start gap-3 mb-4">
              <FiAlertCircle className="mt-0.5 flex-shrink-0" size={18} />
              <div>{error}</div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="name" className="form-label text-white">
                Nome
              </label>
              <input
                id="name"
                type="text"
                className="form-input bg-slate-700 border-slate-600 text-white w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-input bg-slate-700 border-slate-600 text-white w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="bio" className="form-label text-white">
              Biografia
            </label>
            <textarea
              id="bio"
              className="form-textarea bg-slate-700 border-slate-600 text-white w-full"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              disabled={isSubmitting}
            />
            <p className="text-slate-400 text-sm mt-1">
              Uma breve descrição sobre você que aparecerá na página "Sobre"
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleSaveSettings}
            className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Salvando...</span>
              </>
            ) : (
              <>
                <FiSave size={16} />
                <span>Salvar Configurações</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel
