"use client"

import { useState, type ChangeEvent, useRef } from "react"
import { FiUpload, FiFile, FiImage, FiCheck, FiLoader, FiX } from "react-icons/fi"
import { supabase } from "@/lib/supabase"

interface HtmlUploaderProps {
  onProcessed: (html: string, path: string) => void
}

const HtmlUploader = ({ onProcessed }: HtmlUploaderProps) => {
  const [htmlFile, setHtmlFile] = useState<File | null>(null)
  const [images, setImages] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const handleHtmlChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type === "text/html") {
        setHtmlFile(file)
      }
    }
  }

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)
      setImages((prev) => [...prev, ...fileArray])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const processHtml = async () => {
    if (!htmlFile) return

    setIsProcessing(true)
    setProgress(0)

    try {
      // Read HTML file
      const htmlContent = await htmlFile.text()

      // Process images if any
      let processedHtml = htmlContent
      const imageMap = new Map<string, string>()

      if (images.length > 0) {
        // Upload images to Supabase Storage
        for (let i = 0; i < images.length; i++) {
          const image = images[i]
          const fileName = image.name
          const filePath = `content/images/${Date.now()}-${fileName}`

          const { error } = await supabase.storage.from("content").upload(filePath, image)

          if (error) throw error

          const { data } = supabase.storage.from("content").getPublicUrl(filePath)
          imageMap.set(fileName, data.publicUrl)

          // Update progress
          setProgress(Math.round(((i + 1) / images.length) * 100))
        }

        // Replace image paths in HTML
        for (const [localPath, publicUrl] of imageMap.entries()) {
          // Replace both relative and absolute paths
          processedHtml = processedHtml.replace(
            new RegExp(`(src=["'])(?:.*?)(${localPath})(["'])`, "g"),
            `$1${publicUrl}$3`,
          )
        }
      }

      // Add custom CSS classes
      processedHtml = processedHtml
        .replace(/<h1/g, '<h1 class="notion-h1"')
        .replace(/<h2/g, '<h2 class="notion-h2"')
        .replace(/<h3/g, '<h3 class="notion-h3"')
        .replace(/<p/g, '<p class="notion-p"')
        .replace(/<img/g, '<img class="notion-img"')
        .replace(/<pre/g, '<pre class="notion-pre"')
        .replace(/<code/g, '<code class="notion-code"')
        .replace(/<blockquote/g, '<blockquote class="notion-blockquote"')

      // Upload processed HTML to Supabase Storage
      const contentPath = `content/html/${Date.now()}-${htmlFile.name}`

      const { error } = await supabase.storage
        .from("content")
        .upload(contentPath, new Blob([processedHtml], { type: "text/html" }))

      if (error) throw error

      // Get public URL
      const { data } = supabase.storage.from("content").getPublicUrl(contentPath)

      // Call callback with processed HTML and path
      onProcessed(processedHtml, data.publicUrl)
      setIsComplete(true)
    } catch (error) {
      console.error("Error processing HTML:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-border rounded-md p-4">
        {htmlFile ? (
          <div className="flex items-center gap-2 p-2 bg-foreground rounded-md">
            <FiFile size={20} />
            <span className="flex-grow truncate">{htmlFile.name}</span>
            <button type="button" onClick={() => setHtmlFile(null)} className="text-error">
              <FiX size={16} />
            </button>
          </div>
        ) : (
          <label htmlFor="htmlFile" className="cursor-pointer block p-4 text-center">
            <FiUpload size={24} className="mx-auto mb-2" />
            <span className="block mb-2">Faça upload do arquivo HTML exportado do Notion</span>
            <input id="htmlFile" type="file" accept=".html" onChange={handleHtmlChange} className="hidden" />
          </label>
        )}
      </div>

      <div className="border-2 border-dashed border-border rounded-md p-4">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="form-label mb-0">Imagens relacionadas</label>
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="btn btn-outline py-1 px-2 text-sm"
            >
              Adicionar
            </button>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              className="hidden"
            />
          </div>
          <p className="text-text-tertiary text-sm">Faça upload das imagens referenciadas no HTML</p>
          <p className="text-text-tertiary text-sm">
            As imagens devem ter os mesmos nomes dos arquivos referenciados no HTML do Notion para serem substituídas
            corretamente.
          </p>
        </div>

        {images.length > 0 ? (
          <>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {images.map((image, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-foreground rounded-md">
                  <FiImage size={16} />
                  <span className="flex-grow truncate">{image.name}</span>
                  <button type="button" onClick={() => removeImage(index)} className="text-error">
                    <FiX size={16} />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-green-400 text-xs mt-2">
              ✓ {images.length} {images.length === 1 ? "imagem adicionada" : "imagens adicionadas"} - Serão vinculadas
              automaticamente ao HTML
            </p>
          </>
        ) : (
          <div className="text-center p-4 text-text-tertiary">Nenhuma imagem adicionada</div>
        )}
      </div>

      {isProcessing && (
        <div className="mt-4">
          <div className="w-full bg-foreground rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-center mt-2">Processando... {progress}%</p>
        </div>
      )}

      <button
        type="button"
        onClick={processHtml}
        disabled={!htmlFile || isProcessing || isComplete}
        className={`btn w-full ${isComplete ? "btn-secondary" : "btn-primary"}`}
      >
        {isComplete ? (
          <span className="flex items-center justify-center gap-2">
            <FiCheck size={16} />
            Processado com Sucesso
          </span>
        ) : isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <FiLoader size={16} className="animate-spin" />
            Processando...
          </span>
        ) : (
          "Processar HTML"
        )}
      </button>
    </div>
  )
}

export default HtmlUploader
