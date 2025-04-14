"use client"

import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { blogsData } from "@/constants"
import { FiSearch, FiX, FiClock, FiArrowRight, FiFilter, FiBookOpen } from "react-icons/fi"
import { useInView } from "react-intersection-observer"

// Categorias fixas para filtros
const FIXED_CATEGORIES = ["Todos", "Banco de Dados", "C#", "Javascript", "POO", "Dicas", "SQL"]

const BlogGridList = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPosts, setFilteredPosts] = useState(blogsData)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const [visiblePosts, setVisiblePosts] = useState(6)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Filtrar posts com base na pesquisa e categoria
  useEffect(() => {
    let results = blogsData

    // Filtrar por texto de pesquisa
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(query)
        const keywordMatch = post.keywords.some((keyword) => keyword.toLowerCase().includes(query))
        const descriptionMatch = post.description.toLowerCase().includes(query)
        return titleMatch || keywordMatch || descriptionMatch
      })
    }

    // Filtrar por categoria
    if (selectedCategory) {
      results = results.filter((post) =>
        post.keywords.some((keyword) => keyword.toLowerCase() === selectedCategory.toLowerCase()),
      )
    }

    setFilteredPosts(results)
  }, [searchQuery, selectedCategory])

  // Limpar pesquisa
  const clearSearch = () => {
    setSearchQuery("")
    if (searchRef.current) {
      searchRef.current.focus()
    }
  }

  // Carregar mais posts
  const loadMore = () => {
    setVisiblePosts((prev) => Math.min(prev + 6, filteredPosts.length))
  }

  // Observar o último item para carregar mais
  const { ref: lastItemRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView && visiblePosts < filteredPosts.length) {
      loadMore()
    }
  }, [inView, filteredPosts, visiblePosts, inView, loadMore])

  // Variantes de animação para os cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  }

  return (
    <div className="w-full py-6 sm:py-10 px-4 sm:px-6 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Header com contagem e barra de pesquisa */}
      <div className="max-w-7xl mx-auto mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 mb-6">
          {/* Contagem de artigos */}
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <FiBookOpen className="text-[var(--hover-primary)]" />
            <p className="font-medium">
              {filteredPosts.length} {filteredPosts.length === 1 ? "artigo" : "artigos"} disponíveis
            </p>
          </div>

          {/* Barra de pesquisa moderna */}
          <div className="w-full sm:w-auto sm:min-w-[320px] relative">
            <div
              className={`relative transition-all duration-300 ${
                isSearchFocused ? "ring-2 ring-[var(--hover-primary)]" : ""
              }`}
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch
                  className={`transition-colors ${
                    isSearchFocused ? "text-[var(--hover-primary)]" : "text-[var(--text-secondary)]"
                  }`}
                />
              </div>
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Pesquisar artigos..."
                className="w-full pl-12 pr-12 py-3 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-full focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--text-secondary)] hover:text-[var(--hover-primary)]"
                >
                  <FiX />
                </button>
              )}
            </div>
          </div>

          {/* Botão de filtro móvel */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="sm:hidden flex items-center gap-2 px-4 py-2 bg-[var(--bg-secondary)] rounded-full text-sm font-medium"
          >
            <FiFilter />
            Filtrar
          </button>
        </div>

        {/* Filtros de categoria - Desktop */}
        <div className="hidden sm:flex items-center justify-center gap-3 pb-2">
          {FIXED_CATEGORIES.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category === "Todos" ? null : category)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                (category === "Todos" && selectedCategory === null) || category === selectedCategory
                  ? "bg-[var(--hover-primary)] text-white font-medium shadow-md"
                  : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Filtros de categoria - Mobile */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="sm:hidden mt-4 overflow-hidden"
            >
              <div className="flex flex-wrap justify-center gap-2 py-2">
                {FIXED_CATEGORIES.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category === "Todos" ? null : category)}
                    className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                      (category === "Todos" && selectedCategory === null) || category === selectedCategory
                        ? "bg-[var(--hover-primary)] text-white font-medium shadow-sm"
                        : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Grid de Blogs */}
      {filteredPosts.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 px-4">
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-[var(--bg-secondary)] mb-4">
            <FiSearch className="w-6 h-6 text-[var(--text-secondary)]" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Nenhum resultado encontrado</h3>
          <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-6">
            Não encontramos nenhum artigo correspondente à sua pesquisa. Tente outros termos ou navegue por todas as
            categorias.
          </p>
          <button
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory(null)
            }}
            className="px-6 py-2.5 bg-[var(--hover-primary)] text-white rounded-full hover:bg-opacity-90 transition-all"
          >
            Ver todos os artigos
          </button>
        </motion.div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredPosts.slice(0, visiblePosts).map((post, index) => (
                <motion.div
                  key={post.slug}
                  ref={index === visiblePosts - 1 ? lastItemRef : null}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className="group"
                >
                  <Link to={`/post/${post.slug}`} className="block h-full">
                    <div className="h-full flex flex-col bg-[var(--bg-secondary)] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[var(--border-primary)] hover:border-[var(--hover-primary)]">
                      {/* Imagem com overlay gradiente */}
                      <div className="relative overflow-hidden">
                        <div className="aspect-w-16 aspect-h-9">
                          <img
                            src={post.imageUrl || "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Tags posicionadas sobre a imagem */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[90%]">
                          {post.keywords.slice(0, 2).map((keyword, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 text-xs font-medium rounded-full bg-black/30 backdrop-blur-sm text-white border border-white/20"
                            >
                              {keyword}
                            </span>
                          ))}
                          {post.keywords.length > 2 && (
                            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-black/30 backdrop-blur-sm text-white border border-white/20">
                              +{post.keywords.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Conteúdo do card */}
                      <div className="flex flex-col flex-grow p-5">
                        <h3 className="text-lg sm:text-xl font-bold mb-3 line-clamp-2 group-hover:text-[var(--hover-primary)] transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-[var(--text-secondary)] text-sm sm:text-base mb-5 line-clamp-3">
                          {post.description}
                        </p>

                        {/* Rodapé do card */}
                        <div className="mt-auto pt-4 border-t border-[var(--border-primary)] flex justify-between items-center">
                          <div className="flex items-center text-xs text-[var(--text-secondary)]">
                            <FiClock className="mr-1.5" />
                            <span>{post.date}</span>
                          </div>

                          <span className="inline-flex items-center text-xs font-medium text-[var(--hover-primary)] group-hover:translate-x-1 transition-transform">
                            Ler artigo
                            <FiArrowRight className="ml-1.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Botão "Carregar mais" */}
          {visiblePosts < filteredPosts.length && (
            <div className="mt-12 text-center">
              <button
                onClick={loadMore}
                className="px-8 py-3.5 bg-[var(--hover-primary)] text-white rounded-full hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg"
              >
                Carregar mais artigos
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default BlogGridList

