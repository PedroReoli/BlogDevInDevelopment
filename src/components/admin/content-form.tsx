"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import { FiUpload, FiX } from "react-icons/fi"
import toast from "react-hot-toast"
import { supabase } from "@/lib/supabase"
import HtmlUploader from "@/components/admin/html-uploader"

const ContentForm = () => {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [tags, setTags] = useState("")
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  // Removendo a variável não utilizada
  const [contentPath, setContentPath] = useState<string | null>(null)

  const handleCoverImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setCoverImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = () => {
        setCoverImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeCoverImage = () => {
    setCoverImage(null)
    setCoverImagePreview(null)
  }

  const generateSlug = () => {
    const slugified = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-")

    setSlug(slugified)
  }

  const handleHtmlProcessed = (_html: string, path: string) => {
    setContentPath(path)
    toast.success("HTML processado com sucesso")
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!contentPath) {
      toast.error("É necessário fazer upload do conteúdo HTML")
      return
    }

    setIsSubmitting(true)

    try {
      let coverImageUrl = null

      // Upload cover image if exists
      if (coverImage) {
        const fileExt = coverImage.name.split(".").pop()
        const fileName = `${Date.now()}.${fileExt}`
        const filePath = `covers/${fileName}`

        const { error: uploadError } = await supabase.storage.from("covers").upload(filePath, coverImage)

        if (uploadError) {
          throw new Error("Erro ao fazer upload da imagem de capa")
        }

        const { data } = supabase.storage.from("covers").getPublicUrl(filePath)
        coverImageUrl = data.publicUrl
      }

      // Create post in database
      const { error } = await supabase.from("posts").insert({
        title,
        slug,
        excerpt,
        content_path: contentPath,
        cover_image_url: coverImageUrl,
        published_at: new Date().toISOString(),
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
      })

      if (error) {
        throw new Error("Erro ao criar post")
      }

      toast.success("Post criado com sucesso")

      // Reset form
      setTitle("")
      setSlug("")
      setExcerpt("")
      setTags("")
      setCoverImage(null)
      setCoverImagePreview(null)
      setContentPath(null)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Título
        </label>
        <input
          id="title"
          type="text"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={generateSlug}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="slug" className="form-label">
          Slug (URL)
        </label>
        <input
          id="slug"
          type="text"
          className="form-input"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
        <p className="text-sm mt-1" style={{ color: "var(--color-text-tertiary)" }}>
          Identificador único para a URL do post
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="excerpt" className="form-label">
          Resumo
        </label>
        <textarea
          id="excerpt"
          className="form-textarea"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="tags" className="form-label">
          Tags
        </label>
        <input
          id="tags"
          type="text"
          className="form-input"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Separe as tags por vírgula"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Imagem de Capa</label>

        {coverImagePreview ? (
          <div className="relative">
            <img
              src={coverImagePreview || "/placeholder.svg"}
              alt="Preview"
              className="w-full h-48 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={removeCoverImage}
              className="absolute top-2 right-2 p-1 rounded-full"
              style={{ backgroundColor: "var(--color-error)", color: "white" }}
              aria-label="Remover imagem"
            >
              <FiX size={16} />
            </button>
          </div>
        ) : (
          <div
            className="border-2 border-dashed rounded-md p-4 text-center"
            style={{ borderColor: "var(--color-border)" }}
          >
            <label htmlFor="coverImage" className="cursor-pointer block p-4">
              <FiUpload size={24} className="mx-auto mb-2" />
              <span className="block mb-2">Clique para fazer upload</span>
              <span className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
                PNG, JPG ou WEBP (max. 2MB)
              </span>
              <input
                id="coverImage"
                type="file"
                accept="image/*"
                onChange={handleCoverImageChange}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Conteúdo HTML (Notion)</label>
        <HtmlUploader onProcessed={handleHtmlProcessed} />
      </div>

      <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting || !contentPath}>
        {isSubmitting ? "Publicando..." : "Publicar Post"}
      </button>
    </form>
  )
}

export default ContentForm
