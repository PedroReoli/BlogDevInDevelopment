"use client"

import type React from "react"
import { useState, useRef } from "react"
import { FiSearch, FiX } from "react-icons/fi"
import { motion } from "framer-motion"

interface SearchBarProps {
  searchQuery: string
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  placeholder = "Buscar...",
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClear = () => {
    if (inputRef.current) {
      const event = {
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>

      onSearchChange(event)
      inputRef.current.focus()
    }
  }

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`relative flex items-center overflow-hidden transition-all duration-300 bg-[var(--bg-secondary)] border ${
          isFocused
            ? "border-[var(--hover-primary)] shadow-[0_0_0_3px_rgba(var(--hover-primary-rgb),0.1)]"
            : "border-[var(--border-primary)]"
        } rounded-xl`}
      >
        <div className="absolute left-0 pl-4 flex items-center pointer-events-none">
          <FiSearch
            className={`transition-colors ${
              isFocused ? "text-[var(--hover-primary)]" : "text-[var(--text-secondary)]"
            }`}
          />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 sm:py-4 bg-transparent focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
        />

        {searchQuery && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleClear}
            className="absolute right-0 pr-4 flex items-center text-[var(--text-secondary)] hover:text-[var(--hover-primary)]"
          >
            <FiX />
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default SearchBar

