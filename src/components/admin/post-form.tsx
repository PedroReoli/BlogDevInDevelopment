"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { FiUpload, FiTag, FiPlus, FiX, FiSave, FiLoader } from "react-icons/fi"
import { PostService } from "@/services/post-service"
import toast from "react-hot-toast"
import HtmlUploader from "./html-uploader"
import EnsureStorageBucket from "@/components/editor/ensure-storage-bucket"

interface PostFormProps {
  onSuccess?: () => void
  initialData?: any
}

const PostForm = ({ onSuccess, initialData }: PostFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "")
  const [slug, setSlug] = useState(initialData?.slug || "")
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "")
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])
  const [tagInput, setTagInput] = useState("")
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [coverImageUrl, setCoverImageUrl] = useState(initialData?.cover_image_url || "")
  const [coverImagePreview, setCoverImagePreview] = useState(initialData?.cover_image_url || "")
  const [contentPath, setContentPath] = useState(initialData?.content_path || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  // Gerar slug a partir do título
  useEffect(() => {
    if (title && !initialData) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
      setSlug(generatedSlug)
    }
  }, [title, initialData])

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setCoverImage(file)

      // Criar preview
      const reader = new FileReader()
      reader.onload = () => {
        setCoverImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleHtmlProcessed = (_html: string, path: string) => {
    setContentPath(path)
    toast.success("HTML processado com sucesso!")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validar campos obrigatórios
      if (!title || !slug || !excerpt || tags.length === 0 || !contentPath) {
        throw new Error("Preencha todos os campos obrigatórios")
      }

      // Upload da imagem de capa, se houver uma nova
      let finalCoverImageUrl = coverImageUrl
      if (coverImage) {
        setIsUploading(true)
        finalCoverImageUrl = await PostService.uploadImage(coverImage, "covers")
        setIsUploading(false)
      }

      // Criar ou atualizar post
      const postData = {
        title,
        slug,
        excerpt,
        tags,
        content_path: contentPath,
        cover_image_url: finalCoverImageUrl,
        published_at: new Date().toISOString(),
        is_published: true,
      }

      if (initialData) {
        await PostService.updatePost(initialData.id, postData)
        toast.success("Post atualizado com sucesso!")
      } else {
        await PostService.createPost(postData)
        toast.success("Post criado com sucesso!")
      }

      // Limpar formulário ou redirecionar
      if (!initialData) {
        setTitle("")
        setSlug("")
        setExcerpt("")
        setTags([])
        setCoverImage(null)
        setCoverImagePreview("")
        setCoverImageUrl("")
        setContentPath("")
      }

      // Callback de sucesso
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Error submitting post:", error)
      toast.error((error as Error).message || "Erro ao salvar post")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Título */}
      <div className="form-group">
        <label htmlFor="title" className="form-label text-white">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input bg-slate-700 border-slate-600 text-white w-full"
          placeholder="Título do post"
          required
        />
      </div>

      {/* Slug */}
      <div className="form-group">
        <label htmlFor="slug" className="form-label text-white">
          Slug <span className="text-red-500">*</span>
        </label>
        <input
          id="slug"
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="form-input bg-slate-700 border-slate-600 text-white w-full"
          placeholder="identificador-unico-para-a-url"
          required
        />
        <p className="text-slate-400 text-sm mt-1">
          Identificador único para a URL do post (gerado automaticamente a partir do título)
        </p>
      </div>

      {/* Resumo */}
      <div className="form-group">
        <label htmlFor="excerpt" className="form-label text-white">
          Resumo <span className="text-red-500">*</span>
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="form-input bg-slate-700 border-slate-600 text-white w-full min-h-[120px]"
          placeholder="Breve descrição do post (máx. 200 caracteres)"
          maxLength={200}
          rows={4}
          required
        />
        <p className="text-slate-400 text-sm mt-1">Breve descrição do post (máx. 200 caracteres)</p>
      </div>

      {/* Tags */}
      <div className="form-group">
        <label className="form-label text-white">
          Tags <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
            className="form-input bg-slate-700 border-slate-600 text-white flex-grow"
            placeholder="Adicionar tag"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="btn bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
          >
            <FiPlus size={18} />
            <span>Adicionar</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag) => (
            <div
              key={tag}
              className="inline-flex items-center py-1 px-2 bg-blue-900/30 text-blue-300 rounded-full text-sm"
            >
              <FiTag size={14} className="mr-1" />
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 text-blue-300 hover:text-blue-100"
              >
                <FiX size={14} />
              </button>
            </div>
          ))}
          {tags.length === 0 && <span className="text-slate-400 text-sm">Nenhuma tag adicionada</span>}
        </div>
      </div>

      {/* Imagem de capa */}
      <div className="form-group">
        <label className="form-label text-white">Imagem de capa</label>
        <div className="mt-2">
          {coverImagePreview ? (
            <div className="relative mb-4">
              <img
                src={coverImagePreview || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setCoverImage(null)
                  setCoverImagePreview("")
                  setCoverImageUrl("")
                }}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
              >
                <FiX size={16} />
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center mb-4">
              <FiUpload size={32} className="mx-auto mb-2 text-slate-400" />
              <p className="text-slate-300 mb-2">Clique para fazer upload da imagem de capa</p>
              <p className="text-slate-400 text-sm">JPG, PNG ou GIF (máx. 5MB)</p>
            </div>
          )}

          <input type="file" id="cover-image" accept="image/*" onChange={handleCoverImageChange} className="hidden" />
          <label
            htmlFor="cover-image"
            className="btn bg-slate-700 hover:bg-slate-600 text-white flex items-center gap-2 justify-center cursor-pointer"
          >
            <FiUpload size={18} />
            <span>{coverImagePreview ? "Trocar imagem" : "Selecionar imagem"}</span>
          </label>
        </div>
      </div>

      {/* Upload do HTML do Notion */}
      <div className="form-group">
        <label className="form-label text-white">
          Conteúdo do Notion <span className="text-red-500">*</span>
        </label>
        <EnsureStorageBucket bucketName="content">
          <HtmlUploader onProcessed={handleHtmlProcessed} />
        </EnsureStorageBucket>
      </div>

      {/* Botão de envio */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 flex items-center gap-2"
          disabled={isSubmitting || isUploading}
        >
          {isSubmitting || isUploading ? (
            <>
              <FiLoader size={18} className="animate-spin" />
              <span>{isUploading ? "Enviando imagem..." : "Salvando..."}</span>
            </>
          ) : (
            <>
              <FiSave size={18} />
              <span>{initialData ? "Atualizar post" : "Publicar post"}</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export default PostForm
