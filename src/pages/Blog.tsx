"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import BlogList from "../components/blog/BlogList"

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-gray-600 mb-6">
          Artigos, tutoriais e dicas sobre desenvolvimento web, programação e tecnologia.
        </p>

        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar posts..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <BlogList />
    </div>
  )
}

export default Blog
