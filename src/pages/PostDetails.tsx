"use client"

import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { motion } from "framer-motion"
import { blogsData } from "@/constants/BlogsData"
import Loader from "@/components/Shared/Loader"
import NotFoundPage from "@/pages/NotFoundPage"
import { FiCalendar, FiClock, FiArrowLeft, FiArrowRight, FiShare2 } from "react-icons/fi"

const PostDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<any>(null)
  const [postContent, setPostContent] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [readingTime, setReadingTime] = useState("5 min")
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])

  useEffect(() => {
    setIsLoading(true)
    window.scrollTo(0, 0)

    const selectedPost = blogsData.find((p) => p.slug === id)
    if (!selectedPost) {
      setError("Post não encontrado.")
      setIsLoading(false)
      return
    }

    setPost(selectedPost)

    // Encontrar posts relacionados baseados em keywords
    const related = blogsData
      .filter((p) => p.slug !== id && p.keywords.some((k) => selectedPost.keywords.includes(k)))
      .slice(0, 3)
    setRelatedPosts(related)

    fetch(selectedPost.link)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar o conteúdo.")
        }
        return response.text()
      })
      .then((data) => {
        setPostContent(data)

        // Calcular tempo de leitura aproximado (1 palavra = 0.25 segundos)
        const wordCount = data.replace(/<[^>]*>/g, "").split(/\s+/).length
        const minutes = Math.ceil(wordCount / 200) // 200 palavras por minuto
        setReadingTime(`${minutes} min de leitura`)

        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError("Erro ao carregar o conteúdo do post.")
        setIsLoading(false)
      })
  }, [id])

  // Encontrar posts anterior e próximo
  const currentIndex = blogsData.findIndex((p) => p.slug === id)
  const prevPost = currentIndex > 0 ? blogsData[currentIndex - 1] : null
  const nextPost = currentIndex < blogsData.length - 1 ? blogsData[currentIndex + 1] : null

  // Compartilhar post
  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado para a área de transferência!")
    }
  }

  if (error) return <NotFoundPage />

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--bg-primary)] text-[var(--text-primary)]"
    >
      <Helmet>
        <title>{post.title} | DevEmDesenvolvimento</title>
        <meta name="description" content={post.description} />
      </Helmet>

      {/* Hero Section */}
      <div className="relative w-full">
        {/* Imagem de fundo com overlay */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full">
            <img src={post.imageUrl || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[var(--bg-primary)]"></div>
          </div>
        </div>

        {/* Conteúdo do hero */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-16 sm:pt-32 sm:pb-24 text-center">
          {/* Voltar para o blog */}
          <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <FiArrowLeft className="mr-2" />
            Voltar para o blog
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {post.keywords.map((keyword: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 backdrop-blur-sm text-white"
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* Título */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">{post.title}</h1>

          {/* Metadados */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-white/80 text-sm">
            <div className="flex items-center">
              <FiCalendar className="mr-2" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <FiClock className="mr-2" />
              <span>{readingTime}</span>
            </div>
            <button onClick={sharePost} className="flex items-center hover:text-white transition-colors">
              <FiShare2 className="mr-2" />
              <span>Compartilhar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo do Post */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="prose prose-lg dark:prose-invert mx-auto prose-headings:text-[var(--hover-primary)] prose-a:text-[var(--hover-primary)] prose-img:rounded-xl prose-pre:bg-[var(--bg-secondary)] prose-pre:border prose-pre:border-[var(--border-primary)]">
          <div className="post-content" dangerouslySetInnerHTML={{ __html: postContent || "" }} />
        </div>
      </div>

      {/* Navegação entre posts */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 border-t border-[var(--border-primary)]">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {prevPost ? (
            <Link
              to={`/post/${prevPost.slug}`}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-2 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] hover:border-[var(--hover-primary)] transition-all group"
            >
              <FiArrowLeft className="text-[var(--text-secondary)] group-hover:text-[var(--hover-primary)]" />
              <div>
                <div className="text-xs text-[var(--text-secondary)]">Post anterior</div>
                <div className="font-medium group-hover:text-[var(--hover-primary)] transition-colors">
                  {prevPost.title}
                </div>
              </div>
            </Link>
          ) : (
            <div></div>
          )}

          {nextPost && (
            <Link
              to={`/post/${nextPost.slug}`}
              className="flex flex-col sm:flex-row items-end sm:items-center gap-2 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] hover:border-[var(--hover-primary)] transition-all group text-right"
            >
              <div>
                <div className="text-xs text-[var(--text-secondary)]">Próximo post</div>
                <div className="font-medium group-hover:text-[var(--hover-primary)] transition-colors">
                  {nextPost.title}
                </div>
              </div>
              <FiArrowRight className="text-[var(--text-secondary)] group-hover:text-[var(--hover-primary)]" />
            </Link>
          )}
        </div>
      </div>

      {/* Posts relacionados */}
      {relatedPosts.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Posts relacionados</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost, index) => (
              <Link key={index} to={`/post/${relatedPost.slug}`} className="group block h-full">
                <div className="h-full flex flex-col bg-[var(--bg-secondary)] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[var(--border-primary)] hover:border-[var(--hover-primary)]">
                  {/* Imagem */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={relatedPost.imageUrl || "/placeholder.svg"}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Conteúdo */}
                  <div className="flex flex-col flex-grow p-4">
                    <h3 className="text-base font-semibold mb-2 line-clamp-2 group-hover:text-[var(--hover-primary)] transition-colors">
                      {relatedPost.title}
                    </h3>

                    <p className="text-[var(--text-secondary)] text-sm line-clamp-2 mb-3">{relatedPost.description}</p>

                    <div className="mt-auto text-xs text-[var(--text-secondary)]">{relatedPost.date}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default PostDetails

