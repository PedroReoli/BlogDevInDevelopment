"use client"

import { useState, useEffect } from "react"
import { FiSearch, FiFilter, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { supabase } from "@/lib/supabase"
import { useLocation } from "react-router-dom"

interface AdvancedSearchProps {
  onSearch: (params: SearchParams) => void
  initialParams?: SearchParams
}

export interface SearchParams {
  query: string
  tags: string[]
  dateFrom: string | null
  dateTo: string | null
  sortBy: "recent" | "oldest" | "relevance"
}

const AdvancedSearch = ({ onSearch, initialParams }: AdvancedSearchProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [params, setParams] = useState<SearchParams>(
    initialParams || {
      query: "",
      tags: [],
      dateFrom: null,
      dateTo: null,
      sortBy: "recent",
    },
  )
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [selectedTag, setSelectedTag] = useState<string>("")
  const location = useLocation()

  // Buscar todas as tags disponíveis
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data, error } = await supabase.from("posts").select("tags")

        if (error) throw error

        if (data) {
          // Extrair todas as tags únicas de todos os posts
          const allTags = data.flatMap((post) => post.tags)
          const uniqueTags = [...new Set(allTags)].sort()
          setAvailableTags(uniqueTags)
        }
      } catch (error) {
        console.error("Erro ao buscar tags:", error)
      }
    }

    fetchTags()
  }, [])

  // Sincronizar com parâmetros de URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const queryFromUrl = queryParams.get("query")

    if (queryFromUrl && queryFromUrl !== params.query) {
      setParams((prev) => ({
        ...prev,
        query: queryFromUrl,
      }))

      // Executar a busca automaticamente quando vier da URL
      onSearch({
        ...params,
        query: queryFromUrl,
      })
    }
  }, [location.search, onSearch])

  const handleSearch = () => {
    onSearch(params)
  }

  const handleReset = () => {
    const resetParams: SearchParams = {
      query: "",
      tags: [],
      dateFrom: null,
      dateTo: null,
      sortBy: "recent",
    }
    setParams(resetParams)
    onSearch(resetParams)
  }

  const handleAddTag = () => {
    if (selectedTag && !params.tags.includes(selectedTag)) {
      const newTags = [...params.tags, selectedTag]
      setParams({ ...params, tags: newTags })
      setSelectedTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    const newTags = params.tags.filter((t) => t !== tag)
    setParams({ ...params, tags: newTags })
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-8 transition-all duration-300 border border-gray-200 dark:border-gray-800">
      {/* Barra de busca principal */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <input
            type="text"
            className="form-input pl-10 w-full rounded-full"
            placeholder="Buscar posts..."
            value={params.query}
            onChange={(e) => setParams({ ...params, query: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <button
          type="button"
          className="btn flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={toggleExpanded}
          aria-expanded={isExpanded}
        >
          <FiFilter size={18} />
          <span className="hidden sm:inline">Filtros</span>
          {isExpanded ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
        </button>
        <button type="button" className="btn btn-primary shadow-sm hover:shadow-blue-500/20" onClick={handleSearch}>
          Buscar
        </button>
      </div>

      {/* Filtros avançados */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300 border-gray-200 dark:border-gray-800">
          {/* Filtro por tags */}
          <div>
            <label className="form-label">Tags</label>
            <div className="flex gap-2 mb-2">
              <select
                className="form-select flex-grow rounded-md"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                <option value="">Selecione uma tag</option>
                {availableTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={handleAddTag}
                disabled={!selectedTag}
              >
                Adicionar
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {params.tags.map((tag) => (
                <div
                  key={tag}
                  className="inline-flex items-center py-1 px-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                >
                  {tag}
                  <button
                    type="button"
                    className="ml-1 text-blue-500 hover:text-blue-700 dark:hover:text-blue-200"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
              {params.tags.length === 0 && (
                <span className="text-sm text-gray-500 dark:text-gray-400">Nenhuma tag selecionada</span>
              )}
            </div>
          </div>

          {/* Filtro por data */}
          <div>
            <label className="form-label">Período</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">De</label>
                <input
                  type="date"
                  className="form-input"
                  value={params.dateFrom || ""}
                  onChange={(e) => setParams({ ...params, dateFrom: e.target.value || null })}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Até</label>
                <input
                  type="date"
                  className="form-input"
                  value={params.dateTo || ""}
                  onChange={(e) => setParams({ ...params, dateTo: e.target.value || null })}
                />
              </div>
            </div>
          </div>

          {/* Ordenação */}
          <div>
            <label className="form-label">Ordenar por</label>
            <select
              className="form-select w-full"
              value={params.sortBy}
              onChange={(e) => setParams({ ...params, sortBy: e.target.value as "recent" | "oldest" | "relevance" })}
            >
              <option value="recent">Mais recentes primeiro</option>
              <option value="oldest">Mais antigos primeiro</option>
              <option value="relevance">Relevância</option>
            </select>
          </div>

          {/* Botões de ação */}
          <div className="flex items-end justify-end">
            <button
              type="button"
              className="btn bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 mr-2"
              onClick={handleReset}
            >
              Limpar filtros
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSearch}>
              Aplicar filtros
            </button>
          </div>
        </div>
      )}

      {/* Resumo dos filtros ativos */}
      {(params.tags.length > 0 || params.dateFrom || params.dateTo) && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium">Filtros ativos:</span>

            {params.tags.length > 0 && (
              <div className="flex items-center gap-1 rounded-full px-3 py-1 bg-gray-100 dark:bg-gray-800">
                <span className="text-sm">Tags: {params.tags.join(", ")}</span>
                <button
                  type="button"
                  className="text-gray-500 dark:text-gray-400 hover:text-red-500"
                  onClick={() => setParams({ ...params, tags: [] })}
                >
                  <FiX size={14} />
                </button>
              </div>
            )}

            {(params.dateFrom || params.dateTo) && (
              <div className="flex items-center gap-1 rounded-full px-3 py-1 bg-gray-100 dark:bg-gray-800">
                <span className="text-sm">
                  Período:
                  {params.dateFrom ? ` de ${format(new Date(params.dateFrom), "dd/MM/yyyy", { locale: ptBR })}` : ""}
                  {params.dateTo ? ` até ${format(new Date(params.dateTo), "dd/MM/yyyy", { locale: ptBR })}` : ""}
                </span>
                <button
                  type="button"
                  className="text-gray-500 dark:text-gray-400 hover:text-red-500"
                  onClick={() => setParams({ ...params, dateFrom: null, dateTo: null })}
                >
                  <FiX size={14} />
                </button>
              </div>
            )}

            <button
              type="button"
              className="text-sm ml-auto text-blue-500 hover:text-blue-700 hover:underline"
              onClick={handleReset}
            >
              Limpar todos
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdvancedSearch
