"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FiArrowRight } from "react-icons/fi"
import { supabase } from "@/lib/supabase"
import BlogCard from "@/components/blog/blog-card"
import type { Database } from "@/types/supabase"

type Post = Database["public"]["Tables"]["posts"]["Row"]

const Home = () => {
  const [recentPosts, setRecentPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("published_at", { ascending: false })
          .limit(3)

        if (error) throw error

        setRecentPosts(data || [])
      } catch (error) {
        console.error("Error fetching recent posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecentPosts()
  }, [])

  return (
    <div>
      {/* Hero Section - Estilo moderno conforme a imagem */}
      <section className="py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">DevEmDesenvolvimento</h1>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Blog, Aulas e Projetos</h2>
              <p className="text-xl text-gray-400 mb-8">Programação, Tecnologia e Inovação.</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/blog" className="btn btn-primary">
                  Explorar Blog
                </Link>
                <Link to="/sobre" className="btn bg-transparent border border-white text-white hover:bg-white/10">
                  Sobre o Projeto
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <img src="/images/logo.svg" alt="DevEmDesenvolvimento Logo" className="w-40 h-40 md:w-64 md:h-64" />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Posts Recentes</h2>
            <Link to="/blog" className="flex items-center gap-2 text-primary hover:underline">
              Ver todos <FiArrowRight />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-48 bg-foreground"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-foreground rounded w-1/4"></div>
                    <div className="h-6 bg-foreground rounded w-3/4"></div>
                    <div className="h-4 bg-foreground rounded"></div>
                    <div className="h-4 bg-foreground rounded w-5/6"></div>
                    <div className="h-10 bg-foreground rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="text-center py-12 bg-foreground rounded-xl">
              <p className="text-xl">Nenhum post encontrado.</p>
              <p className="text-text-secondary mt-2">Volte em breve para novos conteúdos!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  slug={post.slug}
                  excerpt={post.excerpt}
                  coverImageUrl={post.cover_image_url}
                  publishedAt={post.published_at}
                  tags={post.tags}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container">
          <div className="rounded-2xl p-8 md:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para evoluir como desenvolvedor?</h2>
              <p className="text-lg mb-8 text-gray-400">
                Explore o blog e tenha acesso a conteúdos exclusivos, tutoriais e recursos para acelerar seu
                aprendizado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/blog" className="btn bg-primary text-white hover:bg-primary-700">
                  Explorar conteúdos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
