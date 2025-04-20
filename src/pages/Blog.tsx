"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/types/supabase"
import { FiTrendingUp, FiFilter, FiX, FiSearch } from "react-icons/fi"
import BlogCard from "@/components/blog/blog-card"
import FeaturedPost from "@/components/blog/featured-post"
import CategoryPill from "@/components/blog/category-pill"
import { motion } from "framer-motion"

type Post = Database["public"]["Tables"]["posts"]["Row"]

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const [searchParams, setSearchParams] = useState({
    query: "",
    tags: [] as string[],
    dateFrom: null as string | null,
    dateTo: null as string | null,
    sortBy: "recent" as "recent" | "oldest" | "relevance",
  })
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const location = useLocation()

  useEffect(() => {
    fetchPosts()

    // Verificar se há parâmetros de busca na URL
    const queryParams = new URLSearchParams(location.search)
    const queryFromUrl = queryParams.get("query")
    const tagFromUrl = queryParams.get("tag")

    if (queryFromUrl) {
      setSearchParams((prev) => ({
        ...prev,
        query: queryFromUrl,
      }))
    }

    if (tagFromUrl) {
      setSearchParams((prev) => ({
        ...prev,
        tags: [...prev.tags, tagFromUrl],
      }))
    }
  }, [location.search])

  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.from("posts").select("*").order("published_at", { ascending: false })

      if (error) throw error

      if (data) {
        setPosts(data)
        setFilteredPosts(data)

        // Extrair categorias únicas de todos os posts
        const allTags = data.flatMap((post) => post.tags)
        const uniqueTags = [...new Set(allTags)].sort()
        setCategories(uniqueTags)

        // Selecionar posts em destaque (os 3 mais recentes)
        setFeaturedPosts(data.slice(0, 3))
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    filterPosts()
  }, [searchParams, posts, activeCategory])

  const filterPosts = () => {
    let results = [...posts]

    // Filtrar por texto de busca
    if (searchParams.query) {
      const query = searchParams.query.toLowerCase()
      results = results.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Filtrar por tags selecionadas
    if (searchParams.tags.length > 0) {
      results = results.filter((post) => searchParams.tags.some((tag) => post.tags.includes(tag)))
    }

    // Filtrar por categoria ativa
    if (activeCategory) {
      results = results.filter((post) => post.tags.includes(activeCategory))
    }

    // Filtrar por data
    if (searchParams.dateFrom) {
      const dateFrom = new Date(searchParams.dateFrom)
      results = results.filter((post) => new Date(post.published_at) >= dateFrom)
    }

    if (searchParams.dateTo) {
      const dateTo = new Date(searchParams.dateTo)
      dateTo.setHours(23, 59, 59, 999) // Fim do dia
      results = results.filter((post) => new Date(post.published_at) <= dateTo)
    }

    // Ordenar resultados
    if (searchParams.sortBy === "recent") {
      results.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    } else if (searchParams.sortBy === "oldest") {
      results.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime())
    } else if (searchParams.sortBy === "relevance" && searchParams.query) {
      // Ordenação por relevância (posts que têm a query no título são mais relevantes)
      const query = searchParams.query.toLowerCase()
      results.sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(query) ? 2 : 0
        const bTitle = b.title.toLowerCase().includes(query) ? 2 : 0
        const aTags = a.tags.some((tag) => tag.toLowerCase().includes(query)) ? 1 : 0
        const bTags = b.tags.some((tag) => tag.toLowerCase().includes(query)) ? 1 : 0

        return bTitle + bTags - (aTitle + aTags)
      })
    }

    setFilteredPosts(results)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    filterPosts()
  }

  const handleCategoryClick = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null)
    } else {
      setActiveCategory(category)
    }
  }

  const handleTagSelect = (tag: string) => {
    if (!searchParams.tags.includes(tag)) {
      setSearchParams({
        ...searchParams,
        tags: [...searchParams.tags, tag],
      })
    }
  }

  const handleTagRemove = (tag: string) => {
    setSearchParams({
      ...searchParams,
      tags: searchParams.tags.filter((t) => t !== tag),
    })
  }

  const clearFilters = () => {
    setSearchParams({
      query: "",
      tags: [],
      dateFrom: null,
      dateTo: null,
      sortBy: "recent",
    })
    setActiveCategory(null)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white font-heading text-center">
              Blog <span className="text-blue-500">DevEmDesenvolvimento</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 text-center">
              Explorando o universo do desenvolvimento, games e tecnologia com uma abordagem única e pessoal.
            </p>

            {/* Barra de busca principal - redesenhada e corrigida */}
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-8">
              <div className="flex items-center">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Buscar posts..."
                    value={searchParams.query}
                    onChange={(e) => setSearchParams({ ...searchParams, query: e.target.value })}
                    className="w-full py-3 px-5 pl-12 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
                  />
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500" size={20} />
                </div>

                <button
                  type="button"
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  className="mx-2 p-3 text-slate-400 hover:text-blue-500 transition-colors bg-slate-800 rounded-lg border border-slate-600"
                  aria-label="Filtros avançados"
                >
                  <FiFilter size={20} />
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-sm font-medium transition-colors"
                >
                  Buscar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* Filtros avançados */}
        {showAdvancedSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-slate-800 rounded-xl p-6 mb-8 shadow-lg border border-slate-700"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Filtros Avançados</h2>
              <button onClick={() => setShowAdvancedSearch(false)} className="text-slate-400 hover:text-white">
                <FiX size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tags */}
              <div>
                <label className="block text-white mb-2 font-medium">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {categories.slice(0, 10).map((category) => (
                    <button
                      key={category}
                      onClick={() => handleTagSelect(category)}
                      className={`py-1 px-3 rounded-full text-sm ${
                        searchParams.tags.includes(category)
                          ? "bg-blue-600 text-white"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Tags selecionadas */}
                {searchParams.tags.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-slate-400 mb-2">Tags selecionadas:</p>
                    <div className="flex flex-wrap gap-2">
                      {searchParams.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center py-1 px-2 bg-blue-900/30 text-blue-300 rounded-full text-xs"
                        >
                          {tag}
                          <button
                            onClick={() => handleTagRemove(tag)}
                            className="ml-1 text-blue-300 hover:text-blue-100"
                          >
                            <FiX size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Data e ordenação */}
              <div>
                <div className="mb-4">
                  <label className="block text-white mb-2 font-medium">Período</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-slate-400">De</label>
                      <input
                        type="date"
                        className="w-full py-2 px-3 rounded-md bg-slate-700 border border-slate-600 text-white"
                        value={searchParams.dateFrom || ""}
                        onChange={(e) => setSearchParams({ ...searchParams, dateFrom: e.target.value || null })}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400">Até</label>
                      <input
                        type="date"
                        className="w-full py-2 px-3 rounded-md bg-slate-700 border border-slate-600 text-white"
                        value={searchParams.dateTo || ""}
                        onChange={(e) => setSearchParams({ ...searchParams, dateTo: e.target.value || null })}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-white mb-2 font-medium">Ordenar por</label>
                  <select
                    className="w-full py-2 px-3 rounded-md bg-slate-700 border border-slate-600 text-white"
                    value={searchParams.sortBy}
                    onChange={(e) => setSearchParams({ ...searchParams, sortBy: e.target.value as any })}
                  >
                    <option value="recent">Mais recentes primeiro</option>
                    <option value="oldest">Mais antigos primeiro</option>
                    <option value="relevance">Relevância</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={clearFilters}
                className="mr-3 py-2 px-4 bg-slate-700 text-slate-300 rounded-md hover:bg-slate-600"
              >
                Limpar Filtros
              </button>
              <button onClick={filterPosts} className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Aplicar Filtros
              </button>
            </div>
          </motion.div>
        )}

        {/* Posts em destaque */}
        {!activeCategory && searchParams.tags.length === 0 && !searchParams.query && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <FiTrendingUp size={24} className="text-blue-500 mr-2" />
              <h2 className="text-2xl font-bold text-white font-heading">Posts em Destaque</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post, index) => (
                <FeaturedPost key={post.id} post={post} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Categorias rápidas */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-white font-heading">Categorias</h2>
          <div className="flex flex-wrap gap-3">
            {categories.slice(0, 8).map((category) => (
              <CategoryPill
                key={category}
                category={category}
                isActive={activeCategory === category}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white font-heading">
              {activeCategory ? `Posts em ${activeCategory}` : "Todos os Posts"}
            </h2>
            <p className="text-slate-400">
              {filteredPosts.length} {filteredPosts.length === 1 ? "post encontrado" : "posts encontrados"}
            </p>
          </div>

          {searchParams.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="text-sm text-slate-400">Filtrando por:</span>
              {searchParams.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center py-1 px-2 bg-blue-900/30 text-blue-300 rounded-full text-xs"
                >
                  {tag}
                  <button onClick={() => handleTagRemove(tag)} className="ml-1 text-blue-300 hover:text-blue-100">
                    <FiX size={14} />
                  </button>
                </span>
              ))}
              <button
                onClick={() => setSearchParams({ ...searchParams, tags: [] })}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-slate-800 rounded-xl overflow-hidden animate-pulse">
                <div className="h-48 bg-slate-700"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-slate-700 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-700 rounded w-full"></div>
                  <div className="h-4 bg-slate-700 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-slate-800 rounded-xl">
            <div className="inline-block p-4 rounded-full bg-slate-700 mb-4">
              <FiSearch size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Nenhum post encontrado</h3>
            <p className="text-slate-300 mb-4">Não encontramos posts que correspondam aos seus critérios de busca.</p>
            <button onClick={clearFilters} className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Limpar Filtros
            </button>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.id} variants={item}>
                <BlogCard
                  id={post.id}
                  title={post.title}
                  slug={post.slug}
                  excerpt={post.excerpt}
                  coverImageUrl={post.cover_image_url}
                  publishedAt={post.published_at}
                  tags={post.tags}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Blog
