"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FiArrowRight, FiClock } from "react-icons/fi"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/types/supabase"

type Post = Database["public"]["Tables"]["posts"]["Row"]

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("published_at", { ascending: false })
          .limit(6)

        if (error) throw error
        setPosts(data || [])
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-8 py-12">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-heading tracking-tight">
            <span className="text-blue-500">DevEmDesenvolvimento</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 font-sans">
            Explorando o universo do desenvolvimento, games e tecnologia com uma abordagem única e pessoal.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/blog"
              className="rounded-full border-2 border-blue-500 bg-blue-500 text-white px-8 py-3 font-medium transition-all duration-300 hover:bg-transparent font-heading"
            >
              Explorar Blog
            </Link>
            <Link
              to="/sobre"
              className="rounded-full border-2 border-gray-700 bg-gray-700 text-white px-8 py-3 font-medium transition-all duration-300 hover:bg-transparent font-heading"
            >
              Sobre
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          <img src="/images/home.svg" alt="Dev Em Desenvolvimento" className="max-w-full h-auto" />
        </div>
      </section>

      {/* Posts Section */}
      <section>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 font-heading tracking-tight">Posts</h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-800 rounded-xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-700"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-blue-500/20 hover:translate-y-[-4px]"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.cover_image_url || "/images/placeholder.jpg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {post.tags && post.tags.length > 0 && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-heading">
                          {post.tags[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 font-heading tracking-tight">{post.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                      <FiClock size={14} className="text-blue-500" />
                      {formatDate(post.published_at)}
                    </p>
                    <p className="text-gray-300 mb-4 line-clamp-3 font-sans">{post.excerpt}</p>
                    <div className="flex justify-end">
                      <span className="text-blue-500 font-medium flex items-center gap-1 group font-heading">
                        Ler mais <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-800 rounded-xl">
            <p className="text-gray-400 font-sans">Nenhum post encontrado.</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="rounded-full border-2 border-blue-500 bg-blue-500 text-white px-8 py-3 font-medium transition-all duration-300 hover:bg-transparent inline-flex items-center gap-2 font-heading"
          >
            Ver todos os posts <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
