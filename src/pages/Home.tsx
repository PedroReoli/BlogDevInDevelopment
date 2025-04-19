"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FiArrowRight, FiCode, FiBook, FiLayers, FiChevronRight } from "react-icons/fi"
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
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 to-white dark:from-primary-950 dark:to-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/images/logo.svg" alt="Logo" className="w-10 h-10" />
                <h1 className="text-3xl md:text-4xl font-bold text-primary-500 font-heading">DevEmDesenvolvimento</h1>
              </div>
              <p className="text-2xl md:text-3xl font-bold mb-4">Aprenda Desenvolvimento Web de Forma Prática</p>
              <p className="text-text-secondary text-lg mb-8">
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
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-primary-300 rounded-lg blur opacity-30"></div>
                <div className="relative bg-card rounded-lg shadow-xl overflow-hidden">
                  <img
                    src="/placeholder.svg?height=400&width=400"
                    alt="DevEmDesenvolvimento"
                    className="w-full h-auto"
                    width="400"
                    height="400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Posts Recentes</h2>
            <Link to="/blog" className="flex items-center gap-2 text-primary-500 hover:underline">
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

      {/* Features Section */}
      <section className="py-16 bg-foreground">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Por que escolher o DevEmDesenvolvimento?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 text-center hover:translate-y-[-8px]">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300 mb-6">
                <FiCode size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Conteúdo Prático</h3>
              <p className="text-text-secondary">
                Tutoriais e artigos com exemplos práticos que você pode aplicar imediatamente em seus projetos.
              </p>
            </div>

            <div className="card p-6 text-center hover:translate-y-[-8px]">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300 mb-6">
                <FiBook size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Sempre Atualizado</h3>
              <p className="text-text-secondary">
                Conteúdo constantemente atualizado com as mais recentes tecnologias e melhores práticas do mercado.
              </p>
            </div>

            <div className="card p-6 text-center hover:translate-y-[-8px]">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300 mb-6">
                <FiLayers size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Abordagem Completa</h3>
              <p className="text-text-secondary">
                Do básico ao avançado, abordamos todos os aspectos do desenvolvimento web moderno.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para evoluir como desenvolvedor?</h2>
              <p className="text-lg mb-8 opacity-90">
                Junte-se à nossa comunidade e tenha acesso a conteúdos exclusivos, tutoriais e recursos para acelerar
                seu aprendizado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/blog" className="btn bg-white text-primary-600 hover:bg-gray-100">
                  Explorar conteúdos
                </Link>
                <a href="#newsletter" className="btn bg-primary-700 hover:bg-primary-800">
                  Assinar newsletter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-16 bg-foreground">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Tópicos que abordamos</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Frontend", topics: ["React", "Vue", "Angular", "CSS"] },
              { title: "Backend", topics: ["Node.js", "Python", "Java", "PHP"] },
              { title: "DevOps", topics: ["Docker", "CI/CD", "AWS", "Azure"] },
              { title: "Mobile", topics: ["React Native", "Flutter", "Swift", "Kotlin"] },
            ].map((category, index) => (
              <div key={index} className="card p-6 hover:shadow-lg">
                <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.topics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <FiChevronRight className="text-primary-500" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Fique por dentro das novidades</h2>
            <p className="text-text-secondary mb-8">
              Assine nossa newsletter e receba conteúdos exclusivos, dicas e tutoriais diretamente no seu email.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Seu melhor email" className="form-input flex-grow" required />
              <button type="submit" className="btn btn-primary whitespace-nowrap">
                Inscrever-se
              </button>
            </form>
            <p className="text-text-tertiary text-sm mt-4">
              Prometemos não enviar spam. Você pode cancelar a inscrição a qualquer momento.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
