"use client"

import { useState, useEffect } from "react"
import { FiEdit, FiTrash2, FiEye, FiSearch, FiFilter, FiCalendar, FiTag } from "react-icons/fi"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/types/supabase"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

type Post = Database["public"]["Tables"]["posts"]["Row"]

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.from("posts").select("*").order("published_at", { ascending: false })

      if (error) throw error

      setPosts(data || [])
      setFilteredPosts(data || [])

      // Extract unique tags
      const allTags = data?.flatMap((post) => post.tags) || []
      const uniqueTags = [...new Set(allTags)]
      setAvailableTags(uniqueTags)
    } catch (error) {
      console.error("Error fetching posts:", error)
      toast.error("Erro ao carregar posts")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Filter posts based on search term and selected tag
    let results = [...posts]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      results = results.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.excerpt.toLowerCase().includes(term) ||
          post.tags.some((tag) => tag.toLowerCase().includes(term)),
      )
    }

    if (selectedTag) {
      results = results.filter((post) => post.tags.includes(selectedTag))
    }

    setFilteredPosts(results)
  }, [searchTerm, selectedTag, posts])

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("posts").delete().eq("id", id)

      if (error) throw error

      toast.success("Post excluído com sucesso")
      fetchPosts()
      setShowDeleteConfirm(null)
    } catch (error) {
      console.error("Error deleting post:", error)
      toast.error("Erro ao excluir post")
    }
  }

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Search and filters */}
      <div className="mb-6 bg-slate-700 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Buscar posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 px-4 pl-10 rounded-md bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedTag(null)
              }}
              className="py-2 px-4 bg-slate-800 hover:bg-slate-600 text-white rounded-md transition-colors"
              disabled={!searchTerm && !selectedTag}
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {availableTags.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <FiTag className="text-slate-400" />
              <span className="text-slate-300 text-sm">Filtrar por tag:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`py-1 px-3 rounded-full text-xs transition-colors ${
                    selectedTag === tag ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12 bg-slate-700 rounded-lg">
          <FiFilter size={48} className="mx-auto mb-4 text-slate-500" />
          <h3 className="text-xl font-bold mb-2 text-white">Nenhum post encontrado</h3>
          <p className="text-slate-400">Tente ajustar seus filtros ou criar um novo post.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-700">
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Título</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium hidden md:table-cell">Data</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium hidden md:table-cell">Tags</th>
                  <th className="text-right py-3 px-4 text-slate-300 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-700/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {post.cover_image_url && (
                          <img
                            src={post.cover_image_url || "/placeholder.svg"}
                            alt={post.title}
                            className="w-12 h-12 object-cover rounded-md hidden sm:block"
                          />
                        )}
                        <div>
                          <div className="font-medium text-white">{post.title}</div>
                          <div className="text-slate-400 text-sm">{post.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <div className="flex items-center gap-2 text-slate-300">
                        <FiCalendar size={14} className="text-blue-400" />
                        {format(new Date(post.published_at), "dd MMM, yyyy", { locale: ptBR })}
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="py-1 px-2 bg-slate-700 text-slate-300 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="py-1 px-2 bg-slate-700 text-slate-300 rounded-full text-xs">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-slate-300 hover:text-blue-400 hover:bg-slate-700 rounded-md transition-colors"
                          title="Visualizar"
                        >
                          <FiEye size={18} />
                        </Link>
                        <button
                          className="p-2 text-slate-300 hover:text-amber-400 hover:bg-slate-700 rounded-md transition-colors"
                          title="Editar"
                          onClick={() => toast.error("Funcionalidade em desenvolvimento")}
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          className="p-2 text-slate-300 hover:text-red-400 hover:bg-slate-700 rounded-md transition-colors"
                          title="Excluir"
                          onClick={() => setShowDeleteConfirm(post.id)}
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-white">Confirmar exclusão</h3>
            <p className="text-slate-300 mb-6">
              Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-md transition-colors"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancelar
              </button>
              <button
                className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                onClick={() => showDeleteConfirm && handleDelete(showDeleteConfirm)}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostList
