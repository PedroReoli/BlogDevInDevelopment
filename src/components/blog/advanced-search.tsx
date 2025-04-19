"use client"

import { useState, useEffect } from "react"
import { FiSearch, FiFilter, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { supabase } from "@/lib/supabase"

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

  const handleSearch = () => {
    onSearch(params)
  }

  const handleReset = () => {
    const resetParams = {
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
    <div className="bg-card rounded-lg shadow-md p-4 mb-8 transition-all duration-300">
      {/* Barra de busca principal */}
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            className="form-input pl-10 w-full"
            placeholder="Buscar posts..."
            value={params.query}
            onChange={(e) => setParams({ ...params, query: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" size={18} />
        </div>
        <button
          type="button"
          className="btn btn-outline flex items-center gap-2"
          onClick={toggleExpanded}
          aria-expanded={isExpanded}
        >
          <FiFilter size={18} />
          <span className="hidden sm:inline">Filtros</span>
          {isExpanded ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
        </button>
        <button type="button" className="btn btn-primary" onClick={handleSearch}>
          Buscar
        </button>
      </div>

      {/* Filtros avançados */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-color-border grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-300">
          {/* Filtro por tags */}
          <div>
            <label className="form-label">Tags</label>
            <div className="flex gap-2 mb-2">
              <select
                className="form-select flex-grow"
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
              <button type="button" className="btn btn-outline" onClick={handleAddTag} disabled={!selectedTag}>
                Adicionar
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {params.tags.map((tag) => (
                <div key={tag} className="tag flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    className="text-text-tertiary hover:text-error"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
              {params.tags.length === 0 && <span className="text-text-tertiary text-sm">Nenhuma tag selecionada</span>}
            </div>
          </div>

          {/* Filtro por data */}
          <div>
            <label className="form-label">Período</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-sm text-text-secondary">De</label>
                <input
                  type="date"
                  className="form-input"
                  value={params.dateFrom || ""}
                  onChange={(e) => setParams({ ...params, dateFrom: e.target.value || null })}
                />
              </div>
              <div>
                <label className="text-sm text-text-secondary">Até</label>
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
            <button type="button" className="btn btn-outline mr-2" onClick={handleReset}>
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
        <div className="mt-4 pt-4 border-t border-color-border">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium">Filtros ativos:</span>

            {params.tags.length > 0 && (
              <div className="flex items-center gap-1 bg-foreground rounded-full px-3 py-1">
                <span className="text-sm">Tags: {params.tags.join(", ")}</span>
                <button
                  type="button"
                  className="text-text-tertiary hover:text-error"
                  onClick={() => setParams({ ...params, tags: [] })}
                >
                  <FiX size={14} />
                </button>
              </div>
            )}

            {(params.dateFrom || params.dateTo) && (
              <div className="flex items-center gap-1 bg-foreground rounded-full px-3 py-1">
                <span className="text-sm">
                  Período:
                  {params.dateFrom ? ` de ${format(new Date(params.dateFrom), "dd/MM/yyyy", { locale: ptBR })}` : ""}
                  {params.dateTo ? ` até ${format(new Date(params.dateTo), "dd/MM/yyyy", { locale: ptBR })}` : ""}
                </span>
                <button
                  type="button"
                  className="text-text-tertiary hover:text-error"
                  onClick={() => setParams({ ...params, dateFrom: null, dateTo: null })}
                >
                  <FiX size={14} />
                </button>
              </div>
            )}

            <button type="button" className="text-sm text-primary hover:underline ml-auto" onClick={handleReset}>
              Limpar todos
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdvancedSearch
