"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

interface TagFilterProps {
  selectedTags: string[]
  onTagSelect: (tag: string) => void
  onTagDeselect: (tag: string) => void
}

interface TagWithCount {
  name: string
  count: number
}

const TagFilter = ({ selectedTags, onTagSelect, onTagDeselect }: TagFilterProps) => {
  const [tags, setTags] = useState<TagWithCount[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setIsLoading(true)
        const { data, error } = await supabase.from("posts").select("tags")

        if (error) throw error

        // Contar ocorrências de cada tag
        const tagCounts: Record<string, number> = {}
        data?.forEach((post) => {
          post.tags.forEach((tag: string) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1
          })
        })

        // Converter para array e ordenar por contagem
        const tagArray = Object.entries(tagCounts).map(([name, count]) => ({ name, count }))
        tagArray.sort((a, b) => b.count - a.count)

        setTags(tagArray)
      } catch (error) {
        console.error("Error fetching tags:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTags()
  }, [])

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagDeselect(tag)
    } else {
      onTagSelect(tag)
    }
  }

  if (isLoading) {
    return (
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Tags populares</h2>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-6 w-16 animate-pulse rounded-full"
              style={{ backgroundColor: "var(--color-foreground)" }}
            ></div>
          ))}
        </div>
      </div>
    )
  }

  if (tags.length === 0) {
    return null
  }

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-3">Tags populares</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag.name}
            onClick={() => handleTagClick(tag.name)}
            className="tag cursor-pointer transition-all duration-200"
            style={{
              backgroundColor: selectedTags.includes(tag.name) ? "var(--color-primary)" : "var(--color-bg-alt)",
              color: selectedTags.includes(tag.name) ? "white" : "var(--color-text-light)",
            }}
          >
            {tag.name} <span className="text-xs ml-1 opacity-80">({tag.count})</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TagFilter
