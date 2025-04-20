"use client"

import type React from "react"

import { useState, useRef, type FormEvent, type ChangeEvent } from "react"
import { FiUpload, FiX, FiPlus, FiSave, FiAlertCircle, FiCheck, FiLoader } from "react-icons/fi"
import { supabase } from "@/lib/supabase"
import toast from "react-hot-toast"
import ContentEditor from "@/components/editor/content-editor"

interface WysiwygPostFormProps {
  onSuccess?: () => void
}

const WysiwygPostForm = ({ onSuccess }: WysiwygPostFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null)
  const [content, setContent] = useState("")
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [formStep, setFormStep] = useState<"details" | "content">("details")
  const coverInputRef = useRef<HTMLInputElement>(null)

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
    validateField("title", newTitle)
  }

  // Adicionar tag
  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
      validateField("tags", [...tags, currentTag.trim()])
    }
  }

  // Remover tag
  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(newTags)
    validateField("tags", newTags)
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
      validateField("coverImage", file)
    }
  }

  // Validar campo
  const validateField = (field: string, value: any) => {
    const errors = { ...formErrors }

    switch (field) {
      case "title":
        if (!value) {
          errors.title = "O título é obrigatório"
        } else if (value.length < 5) {
          errors.title = "O título deve ter pelo menos 5 caracteres"
        } else {
          delete errors.title
        }
        break
      case "slug":
        if (!value) {
          errors.slug = "O slug é obrigatório"
        } else if (!/^[a-z0-9-]+$/.test(value)) {
          errors.slug = "O slug deve conter apenas letras minúsculas, números e hífens"
        } else {
          delete errors.slug
        }
        break
      case "excerpt":
        if (!value) {
          errors.excerpt = "O resumo é obrigatório"
        } else if (value.length < 10) {
          errors.excerpt = "O resumo deve ter pelo menos 10 caracteres"
        } else if (value.length > 300) {
          errors.excerpt = "O resumo deve ter no máximo 300 caracteres"
        } else {
          delete errors.excerpt
        }
        break
      case "tags":
        if (!value || value.length === 0) {
          errors.tags = "Adicione pelo menos uma tag"
        } else {
          delete errors.tags
        }
        break
      case "coverImage":
        if (!value) {
          errors.coverImage = "A imagem de capa é obrigatória"
        } else {
          delete errors.coverImage
        }
        break
      case "content":
        if (!value || value.length < 50) {
          errors.content = "O conteúdo deve ter pelo menos 50 caracteres"
        } else {
          delete errors.content
        }
        break
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Validar formulário
  const validateForm = () => {
    validateField("title", title)
    validateField("slug", slug)
    validateField("excerpt", excerpt)
    validateField("tags", tags)
    validateField("coverImage", coverImage)
    validateField("content", content)

    return Object.keys(formErrors).length === 0
  }

  // Avançar para o próximo passo
  const handleNextStep = () => {
    const isValid =
      validateField("title", title) &&
      validateField("slug", slug) &&
      validateField("excerpt", excerpt) &&
      validateField("tags", tags) &&
      validateField("coverImage", coverImage)

    if (isValid) {
      setFormStep("content")
    } else {
      toast.error("Preencha todos os campos obrigatórios corretamente")
    }
  }

  // Voltar para o passo anterior
  const handlePreviousStep = () => {
    setFormStep("details")
  }

  // Enviar formulário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Preencha todos os campos obrigatórios corretamente")
      return
    }

    setIsSubmitting(true)
    const toastLoading = toast.loading("Salvando post...")

    try {
      // 1. Upload da imagem de capa
      const coverImageName = `${Date.now()}-${coverImage!.name}`
      const { error: coverUploadError } = await supabase.storage.from("covers").upload(coverImageName, coverImage!)

      if (coverUploadError) throw new Error(`Erro ao fazer upload da imagem: ${coverUploadError.message}`)

      // 2. Obter URL pública da imagem de capa
      const { data: coverImageData } = supabase.storage.from("covers").getPublicUrl(coverImageName)
      const coverImageUrl = coverImageData.publicUrl

      // 3. Salvar o conteúdo HTML no storage
      const contentBlob = new Blob([content], { type: "text/html" })
      const contentFileName = `${slug}-${Date.now()}.html`

      const { error: contentUploadError } = await supabase.storage
        .from("content")
        .upload(`html/${contentFileName}`, contentBlob)

      if (contentUploadError) throw new Error(`Erro ao salvar conteúdo: ${contentUploadError.message}`)

      // 4. Obter URL pública do conteúdo
      const { data: contentData } = supabase.storage.from("content").getPublicUrl(`html/${contentFileName}`)
      const contentPath = contentData.publicUrl

      // 5. Inserir post no banco de dados
      const { error: insertError } = await supabase.from("posts").insert({
        title,
        slug,
        excerpt,
        tags,
        cover_image_url: coverImageUrl,
        content_path: contentPath,
        published_at: new Date().toISOString(),
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
      setContent("")
      setFormStep("details")

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
      {formStep === "details" ? (
        <div className="space-y-6 bg-slate-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <span className="bg-blue-600 text-white w-7 h-7 rounded-full inline-flex items-center justify-center mr-2">
              1
            </span>
            Detalhes do Post
          </h2>

          <div className="form-group">
            <label htmlFor="title" className="form-label text-white flex items-center justify-between">
              <span>
                Título <span className="text-red-500">*</span>
              </span>
              {formErrors.title && <span className="text-red-500 text-sm">{formErrors.title}</span>}
            </label>
            <input
              id="title"
              type="text"
              className={`form-input bg-slate-700 border-slate-600 text-white ${formErrors.title ? "border-red-500" : ""}`}
              value={title}
              onChange={handleTitleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="slug" className="form-label text-white flex items-center justify-between">
              <span>
                Slug <span className="text-red-500">*</span>
              </span>
              {formErrors.slug && <span className="text-red-500 text-sm">{formErrors.slug}</span>}
            </label>
            <input
              id="slug"
              type="text"
              className={`form-input bg-slate-700 border-slate-600 text-white ${formErrors.slug ? "border-red-500" : ""}`}
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value)
                validateField("slug", e.target.value)
              }}
              required
              disabled={isSubmitting}
            />
            <p className="text-slate-400 text-sm mt-1">
              Identificador único para a URL do post (gerado automaticamente a partir do título)
            </p>
          </div>

          <div className="form-group w-full">
            <label htmlFor="excerpt" className="form-label text-white flex items-center justify-between">
              <span>
                Resumo <span className="text-red-500">*</span>
              </span>
              {formErrors.excerpt && <span className="text-red-500 text-sm">{formErrors.excerpt}</span>}
            </label>
            <textarea
              id="excerpt"
              className={`form-textarea bg-slate-700 border-slate-600 text-white w-full ${formErrors.excerpt ? "border-red-500" : ""}`}
              value={excerpt}
              onChange={(e) => {
                setExcerpt(e.target.value)
                validateField("excerpt", e.target.value)
              }}
              required
              disabled={isSubmitting}
              rows={3}
            />
            <div className="flex justify-between mt-1">
              <p className="text-slate-400 text-sm">Breve descrição do post</p>
              <p className={`text-sm ${excerpt.length > 300 ? "text-red-500" : "text-slate-400"}`}>
                {excerpt.length}/300 caracteres
              </p>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label text-white flex items-center justify-between">
              <span>
                Tags <span className="text-red-500">*</span>
              </span>
              {formErrors.tags && <span className="text-red-500 text-sm">{formErrors.tags}</span>}
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                className="form-input flex-grow bg-slate-700 border-slate-600 text-white"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Adicionar tag..."
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="btn bg-blue-600 hover:bg-blue-700 text-white"
                onClick={addTag}
                disabled={!currentTag.trim() || isSubmitting}
              >
                <FiPlus />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="tag flex items-center gap-1 bg-blue-900/30 text-blue-300 py-1 px-2 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    className="text-blue-300 hover:text-blue-100"
                    onClick={() => removeTag(tag)}
                    disabled={isSubmitting}
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
              {tags.length === 0 && <p className="text-slate-500 text-sm">Nenhuma tag adicionada</p>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label text-white flex items-center justify-between">
              <span>
                Imagem de Capa <span className="text-red-500">*</span>
              </span>
              {formErrors.coverImage && <span className="text-red-500 text-sm">{formErrors.coverImage}</span>}
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
              <div className="relative rounded-lg overflow-hidden">
                <img src={coverImagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    className="bg-red-600 text-white p-2 rounded-full"
                    onClick={() => {
                      setCoverImage(null)
                      setCoverImagePreview(null)
                      validateField("coverImage", null)
                    }}
                    disabled={isSubmitting}
                  >
                    <FiX size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="w-full h-48 border-2 border-dashed border-slate-600 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 hover:bg-slate-700/30 transition-colors"
                onClick={() => coverInputRef.current?.click()}
                disabled={isSubmitting}
              >
                <FiUpload size={24} className="mb-2 text-slate-400" />
                <span className="text-slate-300">Clique para fazer upload</span>
                <span className="text-slate-500 text-sm mt-1">JPG, PNG ou GIF (máx. 5MB)</span>
              </button>
            )}
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="button"
              className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
              onClick={handleNextStep}
              disabled={isSubmitting}
            >
              Próximo
              <FiCheck size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 bg-slate-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <span className="bg-blue-600 text-white w-7 h-7 rounded-full inline-flex items-center justify-center mr-2">
              2
            </span>
            Conteúdo do Post
          </h2>

          <div className="form-group">
            <label className="form-label text-white flex items-center justify-between">
              <span>
                Conteúdo <span className="text-red-500">*</span>
              </span>
              {formErrors.content && <span className="text-red-500 text-sm">{formErrors.content}</span>}
            </label>
            <ContentEditor
              initialValue={content}
              onChange={(value) => {
                setContent(value)
                validateField("content", value)
              }}
              title={title}
            />
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              className="btn bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
              onClick={handlePreviousStep}
              disabled={isSubmitting}
            >
              Voltar
            </button>
            <button
              type="submit"
              className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin" size={18} />
                  Publicando...
                </>
              ) : (
                <>
                  <FiSave size={18} />
                  Publicar Post
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {Object.keys(formErrors).length > 0 && (
        <div className="bg-red-900/30 border border-red-500 text-red-300 p-4 rounded-lg flex items-start gap-3">
          <FiAlertCircle className="mt-0.5 flex-shrink-0" size={18} />
          <div>
            <p className="font-medium">Corrija os erros abaixo antes de continuar:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              {Object.values(formErrors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </form>
  )
}

export default WysiwygPostForm
