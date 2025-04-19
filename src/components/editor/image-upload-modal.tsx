"use client"

import { useState, useRef, type ChangeEvent } from "react"
import { FiUpload, FiX, FiLink, FiImage } from "react-icons/fi"
import { UploadService } from "@/services/upload-service"

interface ImageUploadModalProps {
  onClose: () => void
  onImageInsert: (url: string, alt?: string) => void
}

const ImageUploadModal = ({ onClose, onImageInsert }: ImageUploadModalProps) => {
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload")
  const [imageUrl, setImageUrl] = useState("")
  const [altText, setAltText] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Verificar se é uma imagem
    if (!selectedFile.type.startsWith("image/")) {
      setError("O arquivo selecionado não é uma imagem")
      return
    }

    // Verificar tamanho (máx. 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("A imagem deve ter no máximo 5MB")
      return
    }

    setFile(selectedFile)
    setError(null)

    // Criar preview
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Selecione uma imagem para upload")
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const imageUrl = await UploadService.uploadImage(file)
      onImageInsert(imageUrl, altText)
      onClose()
    } catch (err) {
      setError((err as Error).message)
      setIsUploading(false)
    }
  }

  const handleUrlInsert = () => {
    if (!imageUrl.trim()) {
      setError("Informe a URL da imagem")
      return
    }

    onImageInsert(imageUrl, altText)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-color-border">
          <h3 className="text-lg font-semibold">Inserir Imagem</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-text-tertiary hover:text-text-primary"
            aria-label="Fechar"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-4">
          {/* Tabs */}
          <div className="flex border-b border-color-border mb-4">
            <button
              type="button"
              className={`py-2 px-4 flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === "upload" ? "border-primary text-primary" : "border-transparent"
              }`}
              onClick={() => setActiveTab("upload")}
            >
              <FiUpload size={18} />
              <span>Upload</span>
            </button>
            <button
              type="button"
              className={`py-2 px-4 flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === "url" ? "border-primary text-primary" : "border-transparent"
              }`}
              onClick={() => setActiveTab("url")}
            >
              <FiLink size={18} />
              <span>URL</span>
            </button>
          </div>

          {/* Conteúdo da tab */}
          {activeTab === "upload" ? (
            <div>
              <div className="mb-4">
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

                {preview ? (
                  <div className="relative">
                    <img
                      src={preview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-48 object-contain bg-foreground rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-error text-white p-1 rounded-full"
                      onClick={() => {
                        setFile(null)
                        setPreview(null)
                      }}
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-48 border-2 border-dashed border-color-border rounded-md flex flex-col items-center justify-center"
                  >
                    <FiImage size={32} className="mb-2 text-text-tertiary" />
                    <span>Clique para selecionar uma imagem</span>
                    <span className="text-text-tertiary text-sm mt-1">JPG, PNG ou GIF (máx. 5MB)</span>
                  </button>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="alt-text-upload" className="form-label">
                  Texto alternativo
                </label>
                <input
                  id="alt-text-upload"
                  type="text"
                  className="form-input"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Descreva a imagem (para acessibilidade)"
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <label htmlFor="image-url" className="form-label">
                  URL da imagem
                </label>
                <input
                  id="image-url"
                  type="url"
                  className="form-input"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="alt-text-url" className="form-label">
                  Texto alternativo
                </label>
                <input
                  id="alt-text-url"
                  type="text"
                  className="form-input"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Descreva a imagem (para acessibilidade)"
                />
              </div>
            </div>
          )}

          {error && <div className="text-error text-sm mb-4">{error}</div>}

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancelar
            </button>
            <button
              type="button"
              onClick={activeTab === "upload" ? handleUpload : handleUrlInsert}
              className="btn btn-primary"
              disabled={activeTab === "upload" ? isUploading || !file : !imageUrl.trim()}
            >
              {activeTab === "upload" ? (
                isUploading ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    Enviando...
                  </>
                ) : (
                  "Fazer Upload"
                )
              ) : (
                "Inserir"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageUploadModal
