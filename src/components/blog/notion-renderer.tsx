"use client"

import { useEffect, useRef } from "react"
import DOMPurify from "dompurify"

interface NotionRendererProps {
  html: string
}

const NotionRenderer = ({ html }: NotionRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      // Sanitize HTML to prevent XSS attacks
      const sanitizedHtml = DOMPurify.sanitize(html)
      containerRef.current.innerHTML = sanitizedHtml
    }
  }, [html])

  return <div ref={containerRef} className="notion-content" />
}

export default NotionRenderer
