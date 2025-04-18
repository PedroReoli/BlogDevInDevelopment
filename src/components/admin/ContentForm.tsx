"use client"

import type React from "react"

import { useState } from "react"
import { supabase } from "../../services/supabase"
import HtmlUploader from "./HtmlUploader"

interface ContentFormProps {
  type: "post" | "lesson"
  courseId?: string
  onSuccess?: () => void
}

const ContentForm = ({ type, courseId, onSuccess }: ContentFormProps) => {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [coverImageUrl, setCoverImageUrl] = useState("")
  const [tags, setTags] = useState("")
  const [lessonOrder, setLessonOrder] = useState(0)
  const [contentPath, setContentPath] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleHtmlProcessed = (path: string) => {
    setContentPath(path)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !slug || !excerpt) {
      setError("Por favor, preencha todos os campos obrigatórios.")
      return
    }

    if (!contentPath) {
      setError("Por favor, faça upload do conteúdo HTML.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag)

      const newPost = {
        title,
        slug,
        excerpt,
        cover_image_url: coverImageUrl || null,
        content_path: contentPath,
        is_course: type === "lesson",
        course_id: type === "lesson" ? courseId : null,
        lesson_order: type === "lesson" ? lessonOrder : null,
        tags: tagsArray,
      }

      const { error: insertError } = await supabase.from("posts").insert(newPost)

      if (insertError) {
        throw insertError
      }

      setSuccess(true)

      // Limpar o formulário
      setTitle("")
      setSlug("")
      setExcerpt("")
      setCoverImageUrl("")
      setTags("")
      setLessonOrder(0)
      setContentPath(null)

      if (onSuccess) {
        onSuccess()
      }
    } catch (err: any) {
      console.error("Erro ao salvar conteúdo:", err)
      setError(err.message || "Ocorreu um erro ao salvar o conteúdo. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">{type === "post" ? "Novo Post do Blog" : "Nova Aula"}</h2>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">{error}</div>}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-4">
          {type === "post" ? "Post criado com sucesso!" : "Aula criada com sucesso!"}
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
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
            Resumo*
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
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

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags (separadas por vírgula)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="react, javascript, tutorial"
          />
        </div>

        {type === "lesson" && (
          <div>
            <label htmlFor="lessonOrder" className="block text-sm font-medium text-gray-700 mb-1">
              Ordem da Aula
            </label>
            <input
              type="number"
              id="lessonOrder"
              value={lessonOrder}
              onChange={(e) => setLessonOrder(Number.parseInt(e.target.value))}
              min={0}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <HtmlUploader onHtmlProcessed={handleHtmlProcessed} slug={slug || "temp"} isCourse={type === "lesson"} />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || !contentPath}
            className={`w-full py-2 px-4 rounded-md font-medium text-white ${
              isSubmitting || !contentPath ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContentForm
