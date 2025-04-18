"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Check } from "lucide-react"
import { processHtmlWithImages } from "../../services/supabase"

interface HtmlUploaderProps {
  onHtmlProcessed: (contentPath: string) => void
  slug: string
  isCourse?: boolean
}

const HtmlUploader = ({ onHtmlProcessed, slug, isCourse = false }: HtmlUploaderProps) => {
  const [htmlFile, setHtmlFile] = useState<File | null>(null)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleHtmlFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setHtmlFile(e.target.files[0])
      setError(null)
    }
  }

  const handleImageFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files))
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!htmlFile) {
      setError("Por favor, selecione um arquivo HTML.")
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // Ler o conteúdo do arquivo HTML
      const htmlContent = await htmlFile.text()

      // Processar o HTML e fazer upload das imagens
      const contentPath = await processHtmlWithImages(htmlContent, slug, isCourse, imageFiles)

      // Passar o caminho do conteúdo processado para o componente pai
      onHtmlProcessed(contentPath)
      setSuccess(true)
    } catch (err) {
      console.error("Erro ao processar HTML:", err)
      setError("Ocorreu um erro ao processar o arquivo HTML. Tente novamente.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Upload de Conteúdo do Notion</h3>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">{error}</div>}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-4 flex items-center">
          <Check size={16} className="mr-2" />
          Conteúdo processado com sucesso!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Arquivo HTML do Notion</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
                </p>
                <p className="text-xs text-gray-500">Arquivo HTML exportado do Notion</p>
              </div>
              <input type="file" className="hidden" accept=".html" onChange={handleHtmlFileChange} />
            </label>
          </div>
          {htmlFile && (
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <Check size={16} className="mr-1 text-green-500" />
              {htmlFile.name}
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Imagens (opcional)</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
                </p>
                <p className="text-xs text-gray-500">Imagens relacionadas ao conteúdo (PNG, JPG, GIF)</p>
              </div>
              <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageFilesChange} />
            </label>
          </div>
          {imageFiles.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Check size={16} className="mr-1 text-green-500" />
                {imageFiles.length} {imageFiles.length === 1 ? "imagem selecionada" : "imagens selecionadas"}
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isProcessing || !htmlFile}
          className={`w-full py-2 px-4 rounded-md font-medium text-white ${
            isProcessing || !htmlFile ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isProcessing ? "Processando..." : "Processar Conteúdo"}
        </button>
      </form>
    </div>
  )
}

export default HtmlUploader
