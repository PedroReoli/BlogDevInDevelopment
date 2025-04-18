"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/types/supabase"
import { FiArrowRight } from "react-icons/fi"

type Post = Database["public"]["Tables"]["posts"]["Row"]

interface RelatedPostsProps {
  currentPostId: string
  currentPostTags: string[]
}

const RelatedPosts = ({ currentPostId, currentPostTags }: RelatedPostsProps) => {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        setIsLoading(true)

        // Buscar posts que compartilham tags com o post atual
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .neq("id", currentPostId) // Excluir o post atual
          .order("published_at", { ascending: false })

        if (error) throw error

        if (data) {
          // Calcular pontuação de relevância com base nas tags compartilhadas
          const scoredPosts = data.map((post) => {
            const sharedTags = post.tags.filter((tag: string) => currentPostTags.includes(tag))
            return {
              ...post,
              relevanceScore: sharedTags.length,
            }
          })

          // Filtrar posts com pelo menos uma tag em comum e ordenar por relevância
          const filtered = scoredPosts
            .filter((post) => post.relevanceScore > 0)
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .slice(0, 3) // Limitar a 3 posts relacionados

          setRelatedPosts(filtered)
        }
      } catch (error) {
        console.error("Error fetching related posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (currentPostId && currentPostTags.length > 0) {
      fetchRelatedPosts()
    } else {
      setIsLoading(false)
    }
  }, [currentPostId, currentPostTags])

  if (isLoading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Posts Relacionados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-xl"
              style={{ backgroundColor: "var(--color-foreground)" }}
            ></div>
          ))}
        </div>
      </div>
    )
  }

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Posts Relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="overflow-hidden hover:translate-y-[-4px] group"
            style={{
              backgroundColor: "var(--color-bg-card)",
              borderRadius: "0.75rem",
              boxShadow: "var(--shadow-md)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            {post.cover_image_url && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.cover_image_url || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-4 flex flex-col flex-grow">
              <h3
                className="font-bold mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors"
                style={{ fontSize: "1.125rem" }}
              >
                {post.title}
              </h3>
              <p className="text-sm line-clamp-3 mb-4" style={{ color: "var(--color-text-secondary)" }}>
                {post.excerpt}
              </p>
              <div className="mt-auto flex items-center" style={{ color: "var(--color-primary)" }}>
                <span>Ler post</span>
                <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RelatedPosts
