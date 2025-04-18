"use client"

import { useEffect, useRef, useState } from "react"
import DOMPurify from "dompurify"
import { getContentHtml } from "../../services/supabase"

interface NotionRendererProps {
  contentPath: string | null
}

const NotionRenderer = ({ contentPath }: NotionRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        setError(null)

        // Buscar o conteúdo HTML do Storage
        const htmlContent = await getContentHtml(contentPath)

        if (containerRef.current) {
          // Sanitizar o HTML para evitar XSS
          const sanitizedHtml = DOMPurify.sanitize(htmlContent)
          containerRef.current.innerHTML = sanitizedHtml

          // Adicionar target="_blank" para links externos
          const links = containerRef.current.querySelectorAll("a")
          links.forEach((link) => {
            if (link.host !== window.location.host) {
              link.setAttribute("target", "_blank")
              link.setAttribute("rel", "noopener noreferrer")
            }
          })

          // Adicionar classes para elementos de código
          const codeBlocks = containerRef.current.querySelectorAll("pre")
          codeBlocks.forEach((block) => {
            block.classList.add("notion-code-block")
          })
        }
      } catch (err) {
        console.error("Erro ao carregar conteúdo:", err)
        setError("Não foi possível carregar o conteúdo. Tente novamente mais tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [contentPath])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>
  }

  return <div ref={containerRef} className="notion-content prose prose-lg max-w-none" />
}

export default NotionRenderer
