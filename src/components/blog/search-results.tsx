"use client"

import { useState, useEffect } from "react"
import { FiAlertCircle } from "react-icons/fi"
import BlogCard from "@/components/blog/blog-card"
import type { Database } from "@/types/supabase"
import type { SearchParams } from "@/components/blog/advanced-search"

type Post = Database["public"]["Tables"]["posts"]["Row"]

interface SearchResultsProps {
  posts: Post[]
  searchParams: SearchParams
  isLoading: boolean
}

const SearchResults = ({ posts, searchParams, isLoading }: SearchResultsProps) => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])

  useEffect(() => {
    // Aplicar filtros localmente
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

    // Filtrar por tags
    if (searchParams.tags.length > 0) {
      results = results.filter((post) => searchParams.tags.some((tag) => post.tags.includes(tag)))
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
  }, [posts, searchParams])

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
        <p>Buscando posts...</p>
      </div>
    )
  }

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-12 bg-foreground rounded-lg">
        <FiAlertCircle size={48} className="mx-auto mb-4 text-text-tertiary" />
        <h3 className="text-xl font-bold mb-2">Nenhum post encontrado</h3>
        <p className="text-text-secondary mb-4">Não encontramos posts que correspondam aos seus critérios de busca.</p>
        <p className="text-text-tertiary text-sm">Tente ajustar seus filtros ou usar termos de busca diferentes.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-text-secondary">
          {filteredPosts.length} {filteredPosts.length === 1 ? "post encontrado" : "posts encontrados"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
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
    </div>
  )
}

export default SearchResults
