"use client"

import { useState } from "react"
import BlogCard from "@/components/blog/blog-card"
import type { Database } from "@/types/supabase"

type Post = Database["public"]["Tables"]["posts"]["Row"]

interface BlogListProps {
  posts: Post[]
}

const BlogList = ({ posts }: BlogListProps) => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input"
        />
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-8">
          <h3>Nenhum post encontrado</h3>
          <p>Tente buscar por outro termo ou remova os filtros.</p>
        </div>
      ) : (
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
      )}
    </div>
  )
}

export default BlogList
