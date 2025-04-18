"use client"

import { useState, useEffect } from "react"
import { FiFileText, FiTag, FiCalendar } from "react-icons/fi"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const BlogStats = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalTags: 0,
    latestPostDate: null as Date | null,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true)
        const { data, error } = await supabase.from("posts").select("published_at, tags")

        if (error) throw error

        if (data) {
          // Total de posts
          const totalPosts = data.length

          // Total de tags únicas
          const allTags = data.flatMap((post) => post.tags)
          const uniqueTags = new Set(allTags)
          const totalTags = uniqueTags.size

          // Data do post mais recente
          let latestPostDate: Date | null = null
          if (data.length > 0) {
            const dates = data.map((post) => new Date(post.published_at))
            latestPostDate = new Date(Math.max(...dates.map((date) => date.getTime())))
          }

          setStats({
            totalPosts,
            totalTags,
            latestPostDate,
          })
        }
      } catch (error) {
        console.error("Error fetching blog stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-foreground animate-pulse rounded-xl"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-card p-4 rounded-xl shadow-md flex items-center transition-all duration-300">
        <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-4">
          <FiFileText size={24} className="text-primary-600 dark:text-primary-300" />
        </div>
        <div>
          <p className="text-text-tertiary text-sm">Total de Posts</p>
          <p className="text-2xl font-bold">{stats.totalPosts}</p>
        </div>
      </div>

      <div className="bg-card p-4 rounded-xl shadow-md flex items-center transition-all duration-300">
        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
          <FiTag size={24} className="text-green-600 dark:text-green-400" />
        </div>
        <div>
          <p className="text-text-tertiary text-sm">Tags Únicas</p>
          <p className="text-2xl font-bold">{stats.totalTags}</p>
        </div>
      </div>

      <div className="bg-card p-4 rounded-xl shadow-md flex items-center transition-all duration-300">
        <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-4">
          <FiCalendar size={24} className="text-primary-600 dark:text-primary-300" />
        </div>
        <div>
          <p className="text-text-tertiary text-sm">Última Publicação</p>
          <p className="text-2xl font-bold">
            {stats.latestPostDate ? format(stats.latestPostDate, "dd MMM, yyyy", { locale: ptBR }) : "Nenhum post"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default BlogStats
