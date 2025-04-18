"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import { getBlogPostBySlug, type Post } from "../services/supabase"
import NotionRenderer from "../components/blog/NotionRenderer"
import CommentList from "../components/comments/CommentList"
import ShareButtons from "../components/social/ShareButtons"
import FavoriteButton from "../components/favorites/FavoriteButton"
import SEOHead from "../components/seo/SEOHead"

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return

      try {
        const data = await getBlogPostBySlug(slug)
        setPost(data)
      } catch (err) {
        setError("Erro ao carregar o post. Tente novamente mais tarde.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md mb-6">
          {error || "Post não encontrado."}
        </div>
        <Link
          to="/blog"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          <ArrowLeft size={16} className="mr-1" />
          Voltar para o blog
        </Link>
      </div>
    )
  }

  const formattedDate = new Date(post.published_at).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  const currentUrl = `${window.location.origin}/blog/${slug}`
  const shareTitle = `${post.title} | DevEmDesenvolvimento`
  const shareDescription = post.excerpt

  // Structured Data para o artigo do blog
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": currentUrl,
    },
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image_url || `${window.location.origin}/og-image.jpg`,
    author: {
      "@type": "Organization",
      name: "DevEmDesenvolvimento",
    },
    publisher: {
      "@type": "Organization",
      name: "DevEmDesenvolvimento",
      logo: {
        "@type": "ImageObject",
        url: `${window.location.origin}/logo.png`,
      },
    },
    datePublished: post.published_at,
    dateModified: post.published_at,
    keywords: post.tags.join(", "),
  }

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        keywords={post.tags.join(", ")}
        ogImage={post.cover_image_url || undefined}
        ogType="article"
        url={currentUrl}
        structuredData={articleStructuredData}
      />

      <div className="max-w-3xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6"
        >
          <ArrowLeft size={16} className="mr-1" />
          Voltar para o blog
        </Link>

        <article>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{post.title}</h1>

            <div className="flex flex-wrap items-center justify-between text-gray-600 dark:text-gray-400 gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <time dateTime={post.published_at}>{formattedDate}</time>
                </div>

                {post.tags.length > 0 && (
                  <div className="flex items-center flex-wrap gap-2">
                    <Tag size={16} className="mr-1" />
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <FavoriteButton postId={post.id} />
            </div>

            {post.cover_image_url && (
              <img
                src={post.cover_image_url || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-auto rounded-lg shadow-md mb-6"
              />
            )}
          </header>

          <NotionRenderer contentPath={post.content_path} />

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <ShareButtons url={currentUrl} title={shareTitle} description={shareDescription} />
          </div>
        </article>

        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
          <CommentList postId={post.id} />
        </div>
      </div>
    </>
  )
}

export default BlogPost
