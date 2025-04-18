"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface SearchBarProps {
  placeholder?: string
  className?: string
  compact?: boolean
}

const SearchBar = ({ placeholder = "Buscar...", className = "", compact = false }: SearchBarProps) => {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/busca?q=${encodeURIComponent(query.trim())}`)
      setQuery("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={`input pr-10 ${compact ? "py-1 text-sm" : "py-2"}`}
        aria-label="Campo de busca"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        aria-label="Buscar"
      >
        <Search size={compact ? 16 : 20} />
      </button>
    </form>
  )
}

export default SearchBar
