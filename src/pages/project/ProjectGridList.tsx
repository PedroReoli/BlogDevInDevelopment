"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { projectsData } from "@/constants/ProjectData"
import { FiSearch, FiX, FiExternalLink, FiGithub, FiCode, FiLayers, FiStar } from "react-icons/fi"
import { useInView } from "react-intersection-observer"

// Categorias fixas para filtros
const FIXED_CATEGORIES = ["Todos", "Web", "Mobile", "Backend", "Frontend", "Full Stack", "UI/UX"]

const ProjectGridList = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProjects, setFilteredProjects] = useState(projectsData)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const [visibleProjects, setVisibleProjects] = useState(6)
  const [featuredProject, setFeaturedProject] = useState(projectsData[0])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Filtrar projetos com base na pesquisa e categoria
  useEffect(() => {
    let results = projectsData

    // Filtrar por texto de pesquisa
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter((project) => {
        const titleMatch = project.title.toLowerCase().includes(query)
        const keywordMatch = project.keywords.some((keyword) => keyword.toLowerCase().includes(query))
        const descriptionMatch = project.description.toLowerCase().includes(query)
        return titleMatch || keywordMatch || descriptionMatch
      })
    }

    // Filtrar por categoria
    if (selectedCategory) {
      results = results.filter((project) =>
        project.keywords.some((keyword) => keyword.toLowerCase() === selectedCategory.toLowerCase()),
      )
    }

    setFilteredProjects(results)
  }, [searchQuery, selectedCategory])

  // Definir projeto em destaque
  useEffect(() => {
    // Encontrar o projeto com mais keywords ou o primeiro da lista filtrada
    if (filteredProjects.length > 0) {
      const featured = filteredProjects.reduce(
        (prev, current) => (current.keywords.length > prev.keywords.length ? current : prev),
        filteredProjects[0],
      )
      setFeaturedProject(featured)
    }
  }, [filteredProjects])

  // Limpar pesquisa
  const clearSearch = () => {
    setSearchQuery("")
    if (searchRef.current) {
      searchRef.current.focus()
    }
  }

  // Carregar mais projetos
  const loadMore = useCallback(() => {
    setVisibleProjects((prev) => Math.min(prev + 6, filteredProjects.length))
  }, [filteredProjects.length])

  // Observar o último item para carregar mais
  const { ref: lastItemRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView && visibleProjects < filteredProjects.length) {
      loadMore()
    }
  }, [inView, filteredProjects.length, visibleProjects, loadMore])

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
    <div className="w-full py-10 px-4 sm:px-6 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Header com título */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[var(--hover-primary)]">Projetos & Portfólio</h1>
          <p className="text-[var(--text-secondary)] max-w-2xl">
            Explore nossa coleção de projetos práticos, desde aplicações web e mobile até sistemas completos e
            experimentos com novas tecnologias.
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
              placeholder="Busque por projetos, tecnologias ou conceitos..."
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
        <div className="hidden sm:flex items-center justify-center gap-3 mb-10">
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
            <FiLayers />
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
              className="sm:hidden mb-8 overflow-hidden"
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
      </div>

      {/* Projeto em Destaque */}
      {filteredProjects.length > 0 && !searchQuery && !selectedCategory && (
        <div className="max-w-7xl mx-auto mb-16">
          <div className="flex items-center gap-2 mb-6">
            <FiStar className="text-yellow-400" />
            <h2 className="text-2xl font-bold">Projeto em Destaque</h2>
          </div>

          <div className="bg-[var(--bg-secondary)] rounded-2xl overflow-hidden shadow-lg border border-[var(--border-primary)] hover:border-[var(--hover-primary)] transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Imagem do projeto */}
              <div className="relative h-64 lg:h-full overflow-hidden">
                <img
                  src={featuredProject.imageUrl || "/placeholder.svg?height=600&width=800"}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent lg:bg-gradient-to-r"></div>

                {/* Badges de tecnologia */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {featuredProject.keywords.slice(0, 3).map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/20"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Conteúdo do projeto */}
              <div className="p-8 lg:p-10 flex flex-col">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-[var(--hover-primary)]">
                  {featuredProject.title}
                </h3>

                <p className="text-[var(--text-secondary)] mb-6 lg:mb-8 text-base lg:text-lg">
                  {featuredProject.description}
                </p>

                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)] mb-8">
                  <span className="flex items-center gap-1">
                    <FiCode className="text-[var(--hover-primary)]" />
                    {featuredProject.keywords[0]}
                  </span>
                  <span>•</span>
                  <span>{featuredProject.date}</span>
                </div>

                <div className="mt-auto flex gap-4">
                  <Link
                    to={`/project/${featuredProject.slug}`}
                    className="px-6 py-3 bg-[var(--hover-primary)] text-white rounded-xl hover:bg-opacity-90 transition-all flex items-center gap-2"
                  >
                    <span>Ver Detalhes</span>
                    <FiExternalLink />
                  </Link>

                  <a
                    href="#"
                    className="px-6 py-3 border border-[var(--border-primary)] rounded-xl hover:bg-[var(--bg-hover)] transition-all flex items-center gap-2"
                  >
                    <FiGithub />
                    <span>Código</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid de Projetos */}
      {filteredProjects.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 px-4">
          <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-[var(--bg-secondary)] mb-6">
            <FiSearch className="w-8 h-8 text-[var(--text-secondary)]" />
          </div>
          <h3 className="text-2xl font-semibold mb-3">Nenhum projeto encontrado</h3>
          <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-8">
            Não encontramos nenhum projeto correspondente à sua pesquisa. Tente outros termos ou navegue por todas as
            categorias.
          </p>
          <button
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory(null)
            }}
            className="px-8 py-3 bg-[var(--hover-primary)] text-white rounded-full hover:bg-opacity-90 transition-all"
          >
            Ver todos os projetos
          </button>
        </motion.div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects
                .filter((project) => !(!searchQuery && !selectedCategory && project.slug === featuredProject.slug))
                .slice(0, visibleProjects)
                .map((project, index) => (
                  <motion.div
                    key={project.slug}
                    ref={index === visibleProjects - 1 ? lastItemRef : null}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    className="group"
                  >
                    <div className="h-full flex flex-col bg-[var(--bg-secondary)] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[var(--border-primary)] hover:border-[var(--hover-primary)]">
                      {/* Imagem com overlay */}
                      <div className="relative overflow-hidden">
                        <div className="aspect-w-16 aspect-h-9">
                          <img
                            src={project.imageUrl || "/placeholder.svg?height=400&width=600"}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>

                        {/* Overlay com botões */}
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex gap-3">
                            <Link
                              to={`/project/${project.slug}`}
                              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                            >
                              <FiExternalLink className="text-white text-xl" />
                            </Link>
                            <a
                              href="#"
                              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                            >
                              <FiGithub className="text-white text-xl" />
                            </a>
                          </div>
                        </div>

                        {/* Data do projeto */}
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-black/50 backdrop-blur-sm text-white">
                            {project.date}
                          </span>
                        </div>

                        {/* Tags posicionadas sobre a imagem */}
                        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 max-w-[90%]">
                          {project.keywords.slice(0, 2).map((keyword, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 text-xs font-medium rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/20"
                            >
                              {keyword}
                            </span>
                          ))}
                          {project.keywords.length > 2 && (
                            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/20">
                              +{project.keywords.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Conteúdo do card */}
                      <div className="flex flex-col flex-grow p-6">
                        <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--hover-primary)] transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-[var(--text-secondary)] text-sm mb-6 line-clamp-3">{project.description}</p>

                        {/* Botão de ver projeto */}
                        <div className="mt-auto text-center">
                          <Link
                            to={`/project/${project.slug}`}
                            className="inline-block px-6 py-2.5 bg-[var(--hover-primary)] text-white rounded-full hover:bg-opacity-90 transition-all shadow-sm hover:shadow-md"
                          >
                            Ver Projeto
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>

          {/* Botão "Carregar mais" */}
          {visibleProjects < filteredProjects.length && (
            <div className="mt-16 text-center">
              <button
                onClick={loadMore}
                className="px-10 py-4 bg-[var(--hover-primary)] text-white rounded-full hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg"
              >
                Carregar mais projetos
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProjectGridList

