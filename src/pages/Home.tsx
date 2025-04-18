"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { getBlogPosts, getCourses, type Post, type Course } from "../services/supabase"
import BlogCard from "../components/blog/BlogCard"
import CourseCard from "../components/courses/CourseCard"
import SEOHead from "../components/seo/SEOHead"

const Home = () => {
  const [recentPosts, setRecentPosts] = useState<Post[]>([])
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar posts recentes e cursos em paralelo
        const [posts, courses] = await Promise.all([getBlogPosts(), getCourses()])

        // Pegar apenas os 3 posts mais recentes
        setRecentPosts(posts.slice(0, 3))

        // Pegar apenas os 3 cursos mais recentes
        setFeaturedCourses(courses.slice(0, 3))
      } catch (err) {
        console.error("Erro ao carregar dados da página inicial:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Structured Data para a página inicial
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://devemdesenvolvimento.com.br",
    name: "DevEmDesenvolvimento",
    description: "Blog e plataforma de cursos sobre desenvolvimento web, programação e tecnologia.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://devemdesenvolvimento.com.br/busca?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <>
      <SEOHead structuredData={homeStructuredData} />

      <div>
        {/* Hero Section */}
        <section className="py-12 md:py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">DevEmDesenvolvimento</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Compartilhando conhecimento em programação, desenvolvimento web e tecnologia para ajudar você a evoluir como
            desenvolvedor.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/blog"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              Explorar Blog
            </Link>
            <Link
              to="/cursos"
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium py-2 px-6 rounded-md transition-colors"
            >
              Ver Cursos
            </Link>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Posts Recentes</h2>
            <Link
              to="/blog"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium inline-flex items-center"
            >
              Ver todos
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <p className="text-gray-600 dark:text-gray-400">Nenhum post publicado ainda. Volte em breve!</p>
            </div>
          )}
        </section>

        {/* Featured Courses Section */}
        <section className="py-12">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Cursos em Destaque</h2>
            <Link
              to="/cursos"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium inline-flex items-center"
            >
              Ver todos
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          {featuredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <p className="text-gray-600 dark:text-gray-400">Nenhum curso disponível ainda. Volte em breve!</p>
            </div>
          )}
        </section>

        {/* Newsletter Section */}
        <section className="py-12 bg-blue-600 text-white rounded-lg">
          <div className="text-center max-w-2xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Inscreva-se na Newsletter</h2>
            <p className="mb-6">Receba as últimas atualizações, novos posts e cursos diretamente no seu email.</p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-grow px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
              <button
                type="submit"
                className="bg-white text-blue-600 hover:bg-gray-100 font-medium px-4 py-2 rounded-md transition-colors"
              >
                Inscrever
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
