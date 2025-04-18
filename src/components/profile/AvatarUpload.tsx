"use client"

import type React from "react"

import { useState } from "react"
import { User, Upload } from "lucide-react"
import { uploadAvatar } from "../../services/supabase"

interface AvatarUploadProps {
  userId: string
  currentAvatarUrl?: string | null
  onUpdate: () => void
}

const AvatarUpload = ({ userId, currentAvatarUrl, onUpdate }: AvatarUploadProps) => {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatarUrl || null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo de arquivo
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!validTypes.includes(file.type)) {
      setError("Formato de arquivo inválido. Use JPEG, PNG, GIF ou WebP.")
      return
    }

    // Validar tamanho (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("O arquivo é muito grande. O tamanho máximo é 2MB.")
      return
    }

    // Criar preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Fazer upload
    setIsUploading(true)
    setError(null)

    try {
      await uploadAvatar(userId, file)
      onUpdate()
    } catch (err) {
      console.error("Erro ao fazer upload do avatar:", err)
      setError("Erro ao fazer upload da imagem. Por favor, tente novamente.")
      setPreviewUrl(currentAvatarUrl)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          {previewUrl ? (
            <img src={previewUrl || "/placeholder.svg"} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <User size={40} className="text-gray-500 dark:text-gray-400" />
          )}
        </div>

        <label
          htmlFor="avatar-upload"
          className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
        >
          <Upload size={16} />
          <span className="sr-only">Alterar foto</span>
        </label>

        <input
          id="avatar-upload"
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </div>

      {isUploading && <p className="text-sm text-gray-500">Fazendo upload...</p>}
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      <p className="text-sm text-gray-500 mt-2">Formatos aceitos: JPEG, PNG, GIF, WebP. Tamanho máximo: 2MB.</p>
    </div>
  )
}

export default AvatarUpload
