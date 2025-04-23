"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/types/supabase"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { FiArrowLeft, FiCalendar, FiTag, FiClock, FiShare2, FiChevronUp, FiBookOpen } from "react-icons/fi"
import RelatedPosts from "@/components/blog/related-posts"
import NotionRenderer from "@/components/blog/notion-renderer"
import { Tooltip, TooltipProvider } from "@/components/blog/tooltip"

type Post = Database["public"]["Tables"]["posts"]["Row"]

const Post = () => {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [content, setContent] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [readingTime, setReadingTime] = useState(0)
  const [readingProgress, setReadingProgress] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isFocusMode, setIsFocusMode] = useState(false)
  const articleRef = useRef<HTMLElement>(null)

  // Monitorar progresso de leitura
  useEffect(() => {
    const handleScroll = () => {
      if (articleRef.current) {
        const articleTop = articleRef.current.offsetTop
        const articleHeight = articleRef.current.offsetHeight
        const windowHeight = window.innerHeight
        const scrollY = window.scrollY

        // Calcular progresso
        const totalToScroll = articleHeight - windowHeight
        const scrolled = scrollY - articleTop + windowHeight
        const progress = Math.min(Math.max(scrolled / totalToScroll, 0), 1) * 100

        setReadingProgress(progress)
        setShowScrollTop(scrollY > 300)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

        // Calcular tempo de leitura (estimativa mais precisa)
        const textContent = htmlContent.replace(/<[^>]*>/g, " ")
        const wordCount = textContent.split(/\s+/).length

        // Considerar imagens no tempo de leitura (12 segundos por imagem)
        const imgCount = (htmlContent.match(/<img/g) || []).length
        const imgReadingTime = (imgCount * 12) / 60

        // Considerar complexidade do conteúdo
        const complexWords = textContent.split(/\s+/).filter((word) => word.length > 6).length
        const complexityFactor = 1 + (complexWords / wordCount) * 0.1

        const calculatedReadingTime = Math.max(1, Math.ceil((wordCount / 200) * complexityFactor + imgReadingTime))
        setReadingTime(calculatedReadingTime)

        // Registrar visualização
        const viewsKey = `post_view_${postData.id}`
        if (!sessionStorage.getItem(viewsKey)) {
          await supabase.rpc("increment_post_views", { post_id: postData.id })
          sessionStorage.setItem(viewsKey, "true")
        }
      } catch (err) {
        console.error("Error fetching post:", err)
        setError((err as Error).message || "Erro ao carregar o post")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
    // Rolar para o topo quando o slug mudar
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [slug])

  const sharePost = () => {
    const url = window.location.href
    const title = post?.title || "DevEmDesenvolvimento Blog"
    const text = post?.excerpt || "Confira este artigo interessante"

    if (navigator.share) {
      navigator.share({ title, text, url })
    } else {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert("Link copiado para a área de transferência")
        })
        .catch((err) => console.error("Erro ao copiar link:", err))
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
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
    <TooltipProvider>
      <div className={`transition-all duration-300 ${isFocusMode ? "bg-card" : ""}`}>
        {/* Barra de progresso */}
        <div
          className="fixed top-0 left-0 h-1 bg-primary-500 z-50 transition-all duration-200"
          style={{ width: `${readingProgress}%` }}
        />

        <div className="container py-12 relative">
          {!isFocusMode && (
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-primary-500 mb-8 transition-colors duration-200"
            >
              <FiArrowLeft /> Voltar para o Blog
            </Link>
          )}

          <article
            ref={articleRef}
            className={`max-w-4xl mx-auto transition-all duration-300 ${isFocusMode ? "max-w-3xl" : ""}`}
          >
            {post.cover_image_url && (
              <div className="relative mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-primary-300 rounded-xl blur opacity-30"></div>
                <img
                  src={post.cover_image_url || "/placeholder.svg"}
                  alt={post.title}
                  className="relative w-full h-64 md:h-96 object-cover rounded-xl shadow-md"
                  loading="eager"
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

            <div className="flex justify-between items-center mb-8 p-4 bg-foreground rounded-lg shadow-sm">
              <div className="text-sm font-medium">Compartilhe este artigo</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={sharePost}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                  aria-label="Compartilhar"
                >
                  <FiShare2 size={16} />
                  <span>Compartilhar</span>
                </button>

                <Tooltip content={isFocusMode ? "Sair do modo foco" : "Modo foco"}>
                  <button
                    onClick={() => setIsFocusMode(!isFocusMode)}
                    className={`p-2 rounded-md transition-colors ${isFocusMode ? "bg-primary-500 text-white" : "hover:bg-foreground"}`}
                    aria-label={isFocusMode ? "Sair do modo foco" : "Modo foco"}
                  >
                    <FiBookOpen size={18} />
                  </button>
                </Tooltip>
              </div>
            </div>

            {/* Usamos o NotionRenderer atualizado com o conteúdo HTML */}
            <NotionRenderer html={content} className="mb-8" />

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
          </article>

          {!isFocusMode && <RelatedPosts currentPostId={post.id} currentPostTags={post.tags} />}
        </div>

        {/* Botão voltar ao topo */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-all duration-300 z-50 print:hidden"
            aria-label="Voltar ao topo"
          >
            <FiChevronUp size={24} />
          </button>
        )}
      </div>
    </TooltipProvider>
  )
}

export default Post
