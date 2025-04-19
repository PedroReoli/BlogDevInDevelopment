"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/types/supabase"
import AdvancedSearch, { type SearchParams } from "@/components/blog/advanced-search"
import SearchResults from "@/components/blog/search-results"
import TagFilter from "@/components/blog/tag-filter"
import BlogStats from "@/components/blog/blog-stats"

type Post = Database["public"]["Tables"]["posts"]["Row"]

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    tags: [],
    dateFrom: null,
    dateTo: null,
    sortBy: "recent",
  })

  const location = useLocation()

  useEffect(() => {
    fetchPosts()

    // Verificar se há parâmetros de busca na URL
    const queryParams = new URLSearchParams(location.search)
    const queryFromUrl = queryParams.get("query")

    if (queryFromUrl) {
      setSearchParams((prev) => ({
        ...prev,
        query: queryFromUrl,
      }))
    }
  }, [location.search])

  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.from("posts").select("*")

      if (error) throw error

      setPosts(data || [])
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params)
  }

  const handleTagSelect = (tag: string) => {
    if (!searchParams.tags.includes(tag)) {
      const newTags = [...searchParams.tags, tag]
      const newParams = { ...searchParams, tags: newTags }
      setSearchParams(newParams)
    }
  }

  const handleTagDeselect = (tag: string) => {
    const newTags = searchParams.tags.filter((t) => t !== tag)
    const newParams = { ...searchParams, tags: newTags }
    setSearchParams(newParams)
  }

  return (
    <div className="container py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <div className="absolute -inset-1 bg-blue-500 rounded-full blur-sm opacity-20"></div>
          <img src="/images/logo.svg" alt="Logo" className="w-10 h-10 relative z-10" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold gradient-text">Blog</h1>
      </div>

      <BlogStats />

      <TagFilter selectedTags={searchParams.tags} onTagSelect={handleTagSelect} onTagDeselect={handleTagDeselect} />

      <AdvancedSearch onSearch={handleSearch} initialParams={searchParams} />

      <SearchResults posts={posts} searchParams={searchParams} isLoading={isLoading} />
    </div>
  )
}

export default Blog
