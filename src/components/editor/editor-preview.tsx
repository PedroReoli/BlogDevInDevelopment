"use client"

import { useEffect, useRef } from "react"
import DOMPurify from "dompurify"
import hljs from "highlight.js"

interface EditorPreviewProps {
  content: string
  title?: string
}

const EditorPreview = ({ content, title }: EditorPreviewProps) => {
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (previewRef.current) {
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
    <div className="preview-container bg-card rounded-md shadow-md p-6 overflow-auto">
      {title && <h1 className="text-3xl font-bold mb-6">{title}</h1>}
      <div ref={previewRef} className="notion-content" />
    </div>
  )
}

export default EditorPreview
