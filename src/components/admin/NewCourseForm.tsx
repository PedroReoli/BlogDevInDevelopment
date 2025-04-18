"use client"

import type React from "react"

import { useState } from "react"
import { supabase } from "../../services/supabase"

interface NewCourseFormProps {
  onSuccess?: () => void
}

const NewCourseForm = ({ onSuccess }: NewCourseFormProps) => {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [coverImageUrl, setCoverImageUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !slug || !description) {
      setError("Por favor, preencha todos os campos obrigatórios.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const newCourse = {
        title,
        slug,
        description,
        cover_image_url: coverImageUrl || null,
      }

      const { error: insertError } = await supabase.from("courses").insert(newCourse)

      if (insertError) {
        throw insertError
      }

      setSuccess(true)

      // Limpar o formulário
      setTitle("")
      setSlug("")
      setDescription("")
      setCoverImageUrl("")

      if (onSuccess) {
        onSuccess()
      }
    } catch (err: any) {
      console.error("Erro ao salvar curso:", err)
      setError(err.message || "Ocorreu um erro ao salvar o curso. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg p-6">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">{error}</div>}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-4">
          Curso criado com sucesso!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Título*
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
            Slug* (URL amigável)
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descrição*
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="coverImageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            URL da Imagem de Capa
          </label>
          <input
            type="url"
            id="coverImageUrl"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-md font-medium text-white ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Salvando..." : "Salvar Curso"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewCourseForm
