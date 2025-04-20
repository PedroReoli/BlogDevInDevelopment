"use client"

import { useEffect, useRef } from "react"
import DOMPurify from "dompurify"
import hljs from "highlight.js"
import "highlight.js/styles/github-dark.css"

interface EditorPreviewProps {
  content: string
  title?: string
}

const EditorPreview = ({ content, title }: EditorPreviewProps) => {
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (previewRef.current) {
      // Configurar DOMPurify para permitir atributos de imagem
      DOMPurify.addHook("afterSanitizeAttributes", (node) => {
        if (node.nodeName === "IMG") {
          // Adicionar classes para imagens
          node.classList.add("rounded-md", "max-w-full", "h-auto", "my-4")

          // Garantir que as imagens tenham alt text
          if (!node.getAttribute("alt")) {
            node.setAttribute("alt", "Imagem do conteúdo")
          }
        }

        // Adicionar target="_blank" para links externos
        if (node.nodeName === "A" && node.getAttribute("href")) {
          node.setAttribute("target", "_blank")
          node.setAttribute("rel", "noopener noreferrer")
        }
      })

      // Sanitizar o HTML para prevenir XSS
      const sanitizedContent = DOMPurify.sanitize(content)
      previewRef.current.innerHTML = sanitizedContent

      // Aplicar highlight em blocos de código
      previewRef.current.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement)
      })
    }
  }, [content])

  return (
    <div className="preview-container bg-slate-800 rounded-md p-6 overflow-auto">
      {title && <h1 className="text-3xl font-bold mb-6 text-white">{title}</h1>}
      <div
        ref={previewRef}
        className="prose prose-invert prose-lg max-w-none prose-headings:font-heading prose-headings:text-white prose-p:text-slate-300 prose-a:text-blue-400 prose-blockquote:border-blue-500 prose-code:bg-slate-900 prose-code:text-blue-300"
      />
    </div>
  )
}

export default EditorPreview
