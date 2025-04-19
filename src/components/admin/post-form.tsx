"use client"

import type React from "react"

import { useState, useRef, type FormEvent, type ChangeEvent } from "react"
import { FiUpload, FiX, FiPlus, FiSave } from "react-icons/fi"
import { supabase } from "@/lib/supabase"
import toast from "react-hot-toast"
// Removendo o import não utilizado
// import { useNavigate } from "react-router-dom"

interface PostFormProps {
  onSuccess?: () => void
}

const PostForm = ({ onSuccess }: PostFormProps) => {
  // Removendo a variável não utilizada
  // const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null)
  const [htmlFile, setHtmlFile] = useState<File | null>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)
  const htmlInputRef = useRef<HTMLInputElement>(null)

  // Gerar slug a partir do título
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-")
  }

  // Atualizar slug quando o título mudar
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    setSlug(generateSlug(newTitle))
  }

  // Adicionar tag
  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  // Remover tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  // Lidar com tecla Enter no input de tag
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  // Lidar com upload de imagem de capa
  const handleCoverImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("A imagem deve ter no máximo 5MB")
        return
      }

      if (!file.type.startsWith("image/")) {
        toast.error("O arquivo deve ser uma imagem")
        return
      }

      setCoverImage(file)
      const reader = new FileReader()
      reader.onload = () => {
        setCoverImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Lidar com upload de arquivo HTML
  const handleHtmlFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("O arquivo HTML deve ter no máximo 10MB")
        return
      }

      if (file.type !== "text/html" && !file.name.endsWith(".html")) {
        toast.error("O arquivo deve ser HTML")
        return
      }

      setHtmlFile(file)
    }
  }

  // Enviar formulário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!title || !slug || !excerpt || tags.length === 0 || !coverImage || !htmlFile) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }

    setIsSubmitting(true)
    const toastLoading = toast.loading("Salvando post...")

    try {
      // 1. Upload da imagem de capa
      const coverImageName = `${Date.now()}-${coverImage.name}`
      const { error: coverUploadError } = await supabase.storage.from("covers").upload(coverImageName, coverImage)

      if (coverUploadError) throw new Error(`Erro ao fazer upload da imagem: ${coverUploadError.message}`)

      // 2. Obter URL pública da imagem de capa
      const { data: coverImageData } = supabase.storage.from("covers").getPublicUrl(coverImageName)
      const coverImageUrl = coverImageData.publicUrl

      // 3. Upload do arquivo HTML
      const htmlFileName = `${slug}.html`
      const { error: htmlUploadError } = await supabase.storage.from("content").upload(htmlFileName, htmlFile)

      if (htmlUploadError) throw new Error(`Erro ao fazer upload do HTML: ${htmlUploadError.message}`)

      // 4. Obter URL pública do arquivo HTML
      const { data: htmlData } = supabase.storage.from("content").getPublicUrl(htmlFileName)
      const contentPath = htmlData.publicUrl

      // 5. Inserir post no banco de dados
      const { error: insertError } = await supabase.from("posts").insert({
        title,
        slug,
        excerpt,
        tags,
        cover_image_url: coverImageUrl,
        content_path: contentPath,
      })

      if (insertError) throw new Error(`Erro ao salvar post: ${insertError.message}`)

      // Sucesso
      toast.dismiss(toastLoading)
      toast.success("Post criado com sucesso!")

      // Limpar formulário
      setTitle("")
      setSlug("")
      setExcerpt("")
      setTags([])
      setCoverImage(null)
      setCoverImagePreview(null)
      setHtmlFile(null)

      // Callback de sucesso
      if (onSuccess) onSuccess()
    } catch (error) {
      toast.dismiss(toastLoading)
      toast.error(`Erro: ${(error as Error).message}`)
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Título <span style={{ color: "var(--color-error)" }}>*</span>
        </label>
        <input
          id="title"
          type="text"
          className="form-input"
          value={title}
          onChange={handleTitleChange}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="slug" className="form-label">
          Slug <span style={{ color: "var(--color-error)" }}>*</span>
        </label>
        <input
          id="slug"
          type="text"
          className="form-input"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <p className="text-sm mt-1" style={{ color: "var(--color-text-tertiary)" }}>
          Identificador único para a URL do post (gerado automaticamente a partir do título)
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="excerpt" className="form-label">
          Resumo <span style={{ color: "var(--color-error)" }}>*</span>
        </label>
        <textarea
          id="excerpt"
          className="form-textarea"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <p className="text-sm mt-1" style={{ color: "var(--color-text-tertiary)" }}>
          Breve descrição do post (máx. 200 caracteres)
        </p>
      </div>

      <div className="form-group">
        <label className="form-label">
          Tags <span style={{ color: "var(--color-error)" }}>*</span>
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            className="form-input flex-grow"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Adicionar tag..."
            disabled={isSubmitting}
          />
          <button
            type="button"
            className="btn btn-outline"
            onClick={addTag}
            disabled={!currentTag.trim() || isSubmitting}
          >
            <FiPlus />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <div key={tag} className="tag flex items-center gap-1">
              {tag}
              <button
                type="button"
                style={{ color: "var(--color-text-tertiary)" }}
                className="hover:text-red-500"
                onClick={() => removeTag(tag)}
                disabled={isSubmitting}
              >
                <FiX size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          Imagem de Capa <span style={{ color: "var(--color-error)" }}>*</span>
        </label>
        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          onChange={handleCoverImageChange}
          className="hidden"
          disabled={isSubmitting}
        />
        {coverImagePreview ? (
          <div className="relative">
            <img
              src={coverImagePreview || "/placeholder.svg"}
              alt="Preview"
              className="w-full h-48 object-cover rounded-md"
            />
            <button
              type="button"
              className="absolute top-2 right-2 p-1 rounded-full"
              style={{ backgroundColor: "var(--color-error)", color: "white" }}
              onClick={() => {
                setCoverImage(null)
                setCoverImagePreview(null)
              }}
              disabled={isSubmitting}
            >
              <FiX size={16} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="w-full h-48 border-2 border-dashed rounded-md flex flex-col items-center justify-center"
            style={{ borderColor: "var(--color-border)" }}
            onClick={() => coverInputRef.current?.click()}
            disabled={isSubmitting}
          >
            <FiUpload size={24} className="mb-2" />
            <span>Clique para fazer upload</span>
            <span className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
              JPG, PNG ou GIF (máx. 5MB)
            </span>
          </button>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">
          Arquivo HTML do Notion <span style={{ color: "var(--color-error)" }}>*</span>
        </label>
        <input
          ref={htmlInputRef}
          type="file"
          accept=".html,text/html"
          onChange={handleHtmlFileChange}
          className="hidden"
          disabled={isSubmitting}
        />
        <button
          type="button"
          className="w-full p-4 border-2 border-dashed rounded-md flex flex-col items-center justify-center"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: htmlFile ? "rgba(59, 130, 246, 0.1)" : "",
          }}
          onClick={() => htmlInputRef.current?.click()}
          disabled={isSubmitting}
        >
          {htmlFile ? (
            <>
              <FiSave size={24} className="mb-2" style={{ color: "var(--color-primary)" }} />
              <span className="font-medium">{htmlFile.name}</span>
              <span className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
                {(htmlFile.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </>
          ) : (
            <>
              <FiUpload size={24} className="mb-2" />
              <span>Clique para fazer upload do HTML exportado do Notion</span>
              <span className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
                Apenas arquivos HTML (máx. 10MB)
              </span>
            </>
          )}
        </button>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-tertiary)" }}>
          Exporte a página do Notion como HTML e faça upload do arquivo aqui
        </p>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar Post"}
        </button>
      </div>
    </form>
  )
}

export default PostForm
