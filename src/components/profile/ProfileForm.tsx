"use client"

import type React from "react"

import { useState } from "react"
import { updateUserProfile, type UserProfile } from "../../services/supabase"
import { useAuth } from "../../context/AuthContext"
import AvatarUpload from "./AvatarUpload"

interface ProfileFormProps {
  profile: UserProfile
  onUpdate: () => void
}

const ProfileForm = ({ profile, onUpdate }: ProfileFormProps) => {
  const [username, setUsername] = useState(profile.username || "")
  const [fullName, setFullName] = useState(profile.full_name || "")
  const [bio, setBio] = useState(profile.bio || "")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { refreshUser } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setIsLoading(true)

    try {
      await updateUserProfile({
        id: profile.id,
        username,
        full_name: fullName,
        bio,
      })
      setSuccess(true)
      await refreshUser()
      onUpdate()
    } catch (err: any) {
      console.error("Erro ao atualizar perfil:", err)
      if (err.message.includes("unique constraint")) {
        setError("Este nome de usuário já está em uso. Por favor, escolha outro.")
      } else {
        setError("Erro ao atualizar perfil. Por favor, tente novamente.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Editar Perfil</h2>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-md mb-6">
          Perfil atualizado com sucesso!
        </div>
      )}

      <div className="mb-6">
        <AvatarUpload userId={profile.id} currentAvatarUrl={profile.avatar_url} onUpdate={onUpdate} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={profile.email}
            disabled
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1">O email não pode ser alterado.</p>
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
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          />
        </div>

        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-1">
            Nome completo
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium mb-1">
            Biografia
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Salvando..." : "Salvar alterações"}
        </button>
      </form>
    </div>
  )
}

export default ProfileForm
