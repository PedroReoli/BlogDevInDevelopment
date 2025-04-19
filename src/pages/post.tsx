"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/types/supabase"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { FiArrowLeft, FiCalendar, FiTag, FiClock } from "react-icons/fi"
import RelatedPosts from "@/components/blog/related-posts"

type Post = Database["public"]["Tables"]["posts"]["Row"]

const Post = () => {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [content, setContent] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [readingTime, setReadingTime] = useState(0)

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return

      try {
        setIsLoading(true)
        setError(null)

        // Buscar post pelo slug
        const { data: postData, error: postError } = await supabase.from("posts").select("*").eq("slug", slug).single()

        if (postError) throw new Error("Post não encontrado")
        if (!postData) throw new Error("Post não encontrado")

        setPost(postData)

        // Buscar conteúdo HTML
        const response = await fetch(postData.content_path)
        if (!response.ok) throw new Error("Erro ao carregar conteúdo do post")

        const htmlContent = await response.text()
        setContent(htmlContent)

        // Calcular tempo de leitura (estimativa: 200 palavras por minuto)
        const textContent = htmlContent.replace(/<[^>]*>/g, " ")
        const wordCount = textContent.split(/\s+/).length
        const calculatedReadingTime = Math.max(1, Math.ceil(wordCount / 200))
        setReadingTime(calculatedReadingTime)
      } catch (err) {
        console.error("Error fetching post:", err)
        setError((err as Error).message || "Erro ao carregar o post")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
    // Rolar para o topo quando o slug mudar
    window.scrollTo(0, 0)
  }, [slug])

  if (isLoading) {
    return (
      <div className="container py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-foreground rounded w-1/4 mb-8"></div>
          <div className="h-64 bg-foreground rounded-lg mb-8"></div>
          <div className="h-12 bg-foreground rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-foreground rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-foreground rounded"></div>
            <div className="h-4 bg-foreground rounded"></div>
            <div className="h-4 bg-foreground rounded"></div>
            <div className="h-4 bg-foreground rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Erro</h2>
          <p className="text-error mb-6">{error || "Post não encontrado"}</p>
          <Link to="/blog" className="btn btn-primary">
            Voltar para o Blog
          </Link>
        </div>
      </div>
    )
  }

  const formattedDate = format(new Date(post.published_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })

  return (
    <div className="container py-16">
      <Link
        to="/blog"
        className="flex items-center gap-2 text-text-secondary hover:text-primary mb-8 transition-colors duration-200"
      >
        <FiArrowLeft /> Voltar para o Blog
      </Link>

      {post.cover_image_url && (
        <img
          src={post.cover_image_url || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
        />
      )}

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <div className="flex flex-wrap gap-4 mb-8 text-text-secondary">
        <div className="flex items-center gap-1">
          <FiCalendar size={16} />
          <time dateTime={post.published_at}>{formattedDate}</time>
        </div>
        <div className="flex items-center gap-1">
          <FiClock size={16} />
          <span>{readingTime} min de leitura</span>
        </div>
        <div className="flex items-center gap-2">
          <FiTag size={16} />
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/blog?tag=${tag}`}
                className="tag hover:bg-primary hover:text-white transition-colors duration-200"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="prose max-w-none notion-content">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      <RelatedPosts currentPostId={post.id} currentPostTags={post.tags} />
    </div>
  )
}

export default Post
