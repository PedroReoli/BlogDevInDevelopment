"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FiArrowRight, FiCode, FiBook, FiLayers } from "react-icons/fi"
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
      {/* Hero Section */}
      <section className="py-16 bg-foreground">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">Aprenda Desenvolvimento Web de Forma Prática</h1>
              <p className="text-text-secondary text-lg mb-6">
                Conteúdo de qualidade sobre programação, desenvolvimento web e as mais recentes tecnologias do mercado.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/blog" className="btn btn-primary">
                  Explorar Blog
                </Link>
                <Link to="/sobre" className="btn btn-outline">
                  Sobre o Projeto
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/placeholder.svg"
                alt="DevEmDesenvolvimento"
                className="max-w-full h-auto rounded-lg shadow-lg"
                width="400"
                height="400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Posts Recentes</h2>
            <Link to="/blog" className="flex items-center gap-2 text-primary">
              Ver todos <FiArrowRight />
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Carregando posts recentes...</div>
          ) : recentPosts.length === 0 ? (
            <div className="text-center py-8">
              <p>Nenhum post encontrado.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Features Section */}
      <section className="py-16 bg-foreground">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Por que escolher o DevEmDesenvolvimento?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-card rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <FiCode size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Conteúdo Prático</h3>
              <p className="text-text-secondary">
                Tutoriais e artigos com exemplos práticos que você pode aplicar imediatamente em seus projetos.
              </p>
            </div>

            <div className="p-6 bg-card rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <FiBook size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Sempre Atualizado</h3>
              <p className="text-text-secondary">
                Conteúdo constantemente atualizado com as mais recentes tecnologias e melhores práticas do mercado.
              </p>
            </div>

            <div className="p-6 bg-card rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <FiLayers size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Abordagem Completa</h3>
              <p className="text-text-secondary">
                Do básico ao avançado, abordamos todos os aspectos do desenvolvimento web moderno.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
