"use client"

import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { lessonsData } from "@/constants/LessonsData"
import { FiSearch, FiX, FiClock, FiArrowRight, FiFilter, FiBookOpen, FiPlay } from "react-icons/fi"
import { useInView } from "react-intersection-observer"

// Categorias fixas para filtros
const FIXED_CATEGORIES = ["Todos", "Iniciante", "Intermediário", "Avançado", "Frontend", "Backend", "DevOps"]

const LessonGridList = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredLessons, setFilteredLessons] = useState(lessonsData)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const [visibleLessons, setVisibleLessons] = useState(6)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Filtrar aulas com base na pesquisa e categoria
  useEffect(() => {
    let results = lessonsData

    // Filtrar por texto de pesquisa
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter((lesson) => {
        const titleMatch = lesson.title.toLowerCase().includes(query)
        const keywordMatch = lesson.keywords.some((keyword) => keyword.toLowerCase().includes(query))
        const descriptionMatch = lesson.description.toLowerCase().includes(query)
        return titleMatch || keywordMatch || descriptionMatch
      })
    }

    // Filtrar por categoria
    if (selectedCategory) {
      results = results.filter((lesson) =>
        lesson.keywords.some((keyword) => keyword.toLowerCase() === selectedCategory.toLowerCase()),
      )
    }

    setFilteredLessons(results)
  }, [searchQuery, selectedCategory])

  // Limpar pesquisa
  const clearSearch = () => {
    setSearchQuery("")
    if (searchRef.current) {
      searchRef.current.focus()
    }
  }

  // Carregar mais aulas
  const loadMore = () => {
    setVisibleLessons((prev) => Math.min(prev + 6, filteredLessons.length))
  }

  // Observar o último item para carregar mais
  const { ref: lastItemRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView && visibleLessons < filteredLessons.length) {
      loadMore()
    }
  }, [inView, filteredLessons, visibleLessons])

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
    <div className="w-full py-8 sm:py-12 px-4 sm:px-6 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Header com título e barra de pesquisa */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[var(--hover-primary)]">Aulas & Tutoriais</h1>
          <p className="text-[var(--text-secondary)] max-w-2xl">
            Aprenda com tutoriais práticos e aulas detalhadas sobre desenvolvimento de software, programação e
            tecnologias modernas.
          </p>
        </div>

        {/* Barra de pesquisa centralizada */}
        <div className="max-w-2xl mx-auto mb-8">
          <div
            className={`relative transition-all duration-300 ${
              isSearchFocused ? "ring-2 ring-[var(--hover-primary)] shadow-lg" : "shadow-md"
            }`}
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch
                className={`text-xl transition-colors ${
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
              placeholder="Buscar por aulas, tópicos ou tecnologias..."
              className="w-full pl-12 pr-12 py-4 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--text-secondary)] hover:text-[var(--hover-primary)]"
              >
                <FiX className="text-xl" />
              </button>
            )}
          </div>
        </div>

        {/* Filtros de categoria - Desktop */}
        <div className="hidden sm:flex items-center justify-center gap-3 mb-6">
          {FIXED_CATEGORIES.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category === "Todos" ? null : category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                (category === "Todos" && selectedCategory === null) || category === selectedCategory
                  ? "bg-[var(--hover-primary)] text-white shadow-md"
                  : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Botão de filtro móvel */}
        <div className="sm:hidden flex justify-center mb-6">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--bg-secondary)] rounded-full text-sm font-medium shadow-sm"
          >
            <FiFilter />
            {selectedCategory || "Filtrar por categoria"}
          </button>
        </div>

        {/* Filtros de categoria - Mobile */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="sm:hidden mb-6 overflow-hidden"
            >
              <div className="flex flex-wrap justify-center gap-2 py-2">
                {FIXED_CATEGORIES.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedCategory(category === "Todos" ? null : category)
                      setIsFilterOpen(false)
                    }}
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

        {/* Contagem de resultados */}
        <div className="flex justify-center items-center gap-2 text-[var(--text-secondary)] mb-8">
          <FiBookOpen className="text-[var(--hover-primary)]" />
          <p className="font-medium">
            {filteredLessons.length} {filteredLessons.length === 1 ? "aula" : "aulas"} disponíveis
          </p>
        </div>
      </div>

      {/* Grid de Aulas */}
      {filteredLessons.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 px-4">
          <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-[var(--bg-secondary)] mb-6">
            <FiSearch className="w-8 h-8 text-[var(--text-secondary)]" />
          </div>
          <h3 className="text-2xl font-semibold mb-3">Nenhum resultado encontrado</h3>
          <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-8">
            Não encontramos nenhuma aula correspondente à sua pesquisa. Tente outros termos ou navegue por todas as
            categorias.
          </p>
          <button
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory(null)
            }}
            className="px-8 py-3 bg-[var(--hover-primary)] text-white rounded-full hover:bg-opacity-90 transition-all"
          >
            Ver todas as aulas
          </button>
        </motion.div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredLessons.slice(0, visibleLessons).map((lesson, index) => (
                <motion.div
                  key={lesson.slug}
                  ref={index === visibleLessons - 1 ? lastItemRef : null}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className="group"
                >
                  <Link to={`/lesson/${lesson.slug}`} className="block h-full">
                    <div className="h-full flex flex-col bg-[var(--bg-secondary)] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[var(--border-primary)] hover:border-[var(--hover-primary)]">
                      {/* Imagem com overlay de play */}
                      <div className="relative overflow-hidden">
                        <div className="aspect-w-16 aspect-h-9">
                          <img
                            src={lesson.imageUrl || "/placeholder.svg?height=400&width=600"}
                            alt={lesson.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>

                        {/* Overlay com ícone de play */}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <FiPlay className="text-white text-2xl ml-1" />
                          </div>
                        </div>

                        {/* Tags posicionadas sobre a imagem */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[90%]">
                          {lesson.keywords.slice(0, 2).map((keyword, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 text-xs font-medium rounded-full bg-black/30 backdrop-blur-sm text-white border border-white/20"
                            >
                              {keyword}
                            </span>
                          ))}
                          {lesson.keywords.length > 2 && (
                            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-black/30 backdrop-blur-sm text-white border border-white/20">
                              +{lesson.keywords.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Conteúdo do card */}
                      <div className="flex flex-col flex-grow p-6">
                        <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-[var(--hover-primary)] transition-colors">
                          {lesson.title}
                        </h3>

                        <p className="text-[var(--text-secondary)] text-sm mb-5 line-clamp-3">{lesson.description}</p>

                        {/* Rodapé do card */}
                        <div className="mt-auto pt-4 border-t border-[var(--border-primary)] flex justify-between items-center">
                          <div className="flex items-center text-xs text-[var(--text-secondary)]">
                            <FiClock className="mr-1.5" />
                            <span>{lesson.date}</span>
                          </div>

                          <span className="inline-flex items-center text-xs font-medium text-[var(--hover-primary)] group-hover:translate-x-1 transition-transform">
                            Assistir aula
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
          {visibleLessons < filteredLessons.length && (
            <div className="mt-16 text-center">
              <button
                onClick={loadMore}
                className="px-10 py-4 bg-[var(--hover-primary)] text-white rounded-full hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg"
              >
                Carregar mais aulas
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default LessonGridList

