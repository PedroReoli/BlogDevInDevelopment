"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/types/supabase"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { FiArrowLeft, FiCalendar, FiTag, FiClock, FiShare2, FiMessageSquare } from "react-icons/fi"
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

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title || "DevEmDesenvolvimento Blog",
        text: post?.excerpt || "Confira este artigo interessante",
        url: window.location.href,
      })
    } else {
      // Fallback para copiar o link
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("Link copiado para a área de transferência!"))
        .catch((err) => console.error("Erro ao copiar link:", err))
    }
  }

  if (isLoading) {
    return (
      <div className="container py-16">
        <div className="animate-pulse max-w-4xl mx-auto">
          <div className="h-8 bg-foreground rounded w-1/4 mb-8"></div>
          <div className="h-64 bg-foreground rounded-xl mb-8"></div>
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
        <div className="text-center max-w-md mx-auto bg-card p-8 rounded-xl shadow-md">
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
    <div className="container py-12">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-primary-500 mb-8 transition-colors duration-200"
      >
        <FiArrowLeft /> Voltar para o Blog
      </Link>

      <article className="max-w-4xl mx-auto">
        {post.cover_image_url && (
          <div className="relative mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-primary-300 rounded-xl blur opacity-30"></div>
            <img
              src={post.cover_image_url || "/placeholder.svg"}
              alt={post.title}
              className="relative w-full h-64 md:h-96 object-cover rounded-xl shadow-md"
            />
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex flex-wrap gap-4 mb-8 text-text-secondary">
          <div className="flex items-center gap-1">
            <FiCalendar size={16} className="text-primary-500" />
            <time dateTime={post.published_at}>{formattedDate}</time>
          </div>
          <div className="flex items-center gap-1">
            <FiClock size={16} className="text-primary-500" />
            <span>{readingTime} min de leitura</span>
          </div>
          <div className="flex items-center gap-2">
            <FiTag size={16} className="text-primary-500" />
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blog?tag=${tag}`}
                  className="tag hover:bg-primary-500 hover:text-white transition-colors duration-200"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8 p-4 bg-foreground rounded-lg">
          <div className="text-sm text-text-secondary">Compartilhe este artigo</div>
          <div className="flex gap-3">
            <button
              onClick={sharePost}
              className="p-2 rounded-full hover:bg-card transition-colors"
              aria-label="Compartilhar"
              title="Compartilhar"
            >
              <FiShare2 size={18} className="text-primary-500" />
            </button>
            <a
              href="#comments"
              className="p-2 rounded-full hover:bg-card transition-colors"
              aria-label="Comentários"
              title="Comentários"
            >
              <FiMessageSquare size={18} className="text-primary-500" />
            </a>
          </div>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-a:text-primary-500 prose-img:rounded-xl prose-img:shadow-md notion-content">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-medium">Tags:</span>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/blog?tag=${tag}`}
                className="tag hover:bg-primary-500 hover:text-white transition-colors duration-200"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        <div id="comments" className="mt-12 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold mb-6">Comentários</h2>
          <div className="bg-foreground p-8 rounded-xl text-center">
            <p className="text-text-secondary mb-4">Os comentários estão em desenvolvimento.</p>
            <button className="btn btn-primary">Seja o primeiro a comentar</button>
          </div>
        </div>
      </article>

      <RelatedPosts currentPostId={post.id} currentPostTags={post.tags} />
    </div>
  )
}

export default Post
