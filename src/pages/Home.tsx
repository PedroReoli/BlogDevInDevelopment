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
    <div className="bg-slate-900 text-white">
      {/* Hero Section com fundo azul escuro sólido */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">DevEmDesenvolvimento</h1>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4">Blog, Aulas e Projetos</h2>
              <p className="text-xl text-slate-300 mb-8">Programação, Tecnologia e Inovação.</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/blog" className="btn bg-blue-600 hover:bg-blue-700 text-white transition-all">
                  Explorar Blog
                </Link>
                <Link to="/sobre" className="btn bg-slate-800 hover:bg-slate-700 text-white border-none transition-all">
                  Sobre o Projeto
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="relative">
                <img
                  src="/images/logo.svg"
                  alt="DevEmDesenvolvimento Logo"
                  className="w-40 h-40 md:w-64 md:h-64 logo-animation"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section com fundo um pouco mais claro */}
      <section className="py-16 bg-slate-800">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-400">Últimos Posts</h2>
            <Link
              to="/blog"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
            >
              Ver todos <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-slate-700 rounded-lg animate-pulse">
                  <div className="h-48 bg-slate-600 rounded-t-lg"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-slate-600 rounded w-1/4"></div>
                    <div className="h-6 bg-slate-600 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-600 rounded"></div>
                    <div className="h-4 bg-slate-600 rounded w-5/6"></div>
                    <div className="h-10 bg-slate-600 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="text-center py-12 bg-slate-700 rounded-xl">
              <p className="text-xl">Nenhum post encontrado.</p>
              <p className="text-slate-300 mt-2">Volte em breve para novos conteúdos!</p>
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

      {/* Features Section com fundo azul escuro */}
      <section className="py-16 bg-slate-900">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-blue-400">O que você vai encontrar</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-8 rounded-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Tutoriais Detalhados</h3>
              <p className="text-slate-300 text-center">
                Aprenda passo a passo com tutoriais práticos e detalhados sobre as tecnologias mais recentes.
              </p>
            </div>

            <div className="bg-slate-800 p-8 rounded-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Artigos Técnicos</h3>
              <p className="text-slate-300 text-center">
                Conteúdo aprofundado sobre desenvolvimento web, boas práticas e padrões de projeto.
              </p>
            </div>

            <div className="bg-slate-800 p-8 rounded-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Projetos Práticos</h3>
              <p className="text-slate-300 text-center">
                Exemplos de código e projetos completos para você aplicar o conhecimento na prática.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section com fundo azul escuro */}
      <section className="py-16 bg-slate-800">
        <div className="container">
          <div className="bg-slate-700 rounded-2xl p-8 md:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para evoluir como desenvolvedor?</h2>
              <p className="text-lg mb-8 text-slate-300">
                Explore o blog e tenha acesso a conteúdos exclusivos, tutoriais e recursos para acelerar seu
                aprendizado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/blog" className="btn bg-blue-600 hover:bg-blue-700 text-white transition-all">
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
