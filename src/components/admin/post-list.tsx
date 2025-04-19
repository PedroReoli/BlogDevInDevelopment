"use client"

import { useState, useEffect } from "react"
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/types/supabase"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import toast from "react-hot-toast"

type Post = Database["public"]["Tables"]["posts"]["Row"]

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.from("posts").select("*").order("published_at", { ascending: false })

      if (error) throw error

      setPosts(data || [])
    } catch (error) {
      console.error("Error fetching posts:", error)
      toast.error("Erro ao carregar posts")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este post?")) return

    try {
      const { error } = await supabase.from("posts").delete().eq("id", id)

      if (error) throw error

      toast.success("Post excluído com sucesso")
      fetchPosts()
    } catch (error) {
      console.error("Error deleting post:", error)
      toast.error("Erro ao excluir post")
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Carregando posts...</div>
  }

  if (posts.length === 0) {
    return <div className="text-center py-8">Nenhum post encontrado. Crie seu primeiro post!</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-color-border">
            <th className="text-left py-2 px-4">Título</th>
            <th className="text-left py-2 px-4 hidden md:table-cell">Data</th>
            <th className="text-left py-2 px-4 hidden md:table-cell">Tags</th>
            <th className="text-right py-2 px-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-color-border">
              <td className="py-4 px-4">
                <div className="font-medium">{post.title}</div>
                <div className="text-text-tertiary text-sm">{post.slug}</div>
              </td>
              <td className="py-4 px-4 hidden md:table-cell">
                {format(new Date(post.published_at), "dd MMM, yyyy", { locale: ptBR })}
              </td>
              <td className="py-4 px-4 hidden md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && <span className="tag">+{post.tags.length - 3}</span>}
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex justify-end gap-2">
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-text-secondary hover:text-primary"
                    title="Visualizar"
                  >
                    <FiEye size={18} />
                  </a>
                  <button
                    className="p-1 text-text-secondary hover:text-warning"
                    title="Editar"
                    onClick={() => toast.error("Funcionalidade em desenvolvimento")}
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    className="p-1 text-text-secondary hover:text-error"
                    title="Excluir"
                    onClick={() => handleDelete(post.id)}
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
  )
}

export default PostList
