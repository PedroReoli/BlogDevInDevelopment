"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FiArrowLeft, FiLoader, FiAlertCircle } from "react-icons/fi"
import { PostService } from "@/services/post-service"
import toast from "react-hot-toast"
// import WysiwygPostForm from "@/components/admin/wysiwyg-post-form"
import type { Database } from "@/types/supabase"

type Post = Database["public"]["Tables"]["posts"]["Row"]

const EditPost = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return

      try {
        setIsLoading(true)
        setError(null)
        const postData = await PostService.getPostById(id)
        setPost(postData)
      } catch (err) {
        console.error("Error fetching post:", err)
        setError((err as Error).message || "Erro ao carregar post")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [id])

  const handleSuccess = () => {
    toast.success("Post atualizado com sucesso")
    navigate("/admin/dashboard")
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex flex-col items-center">
          <FiLoader size={32} className="animate-spin text-blue-500 mb-4" />
          <p className="text-slate-300">Carregando post...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="bg-red-900/30 border border-red-500 text-red-300 p-4 rounded-lg flex items-start gap-3">
          <FiAlertCircle className="mt-0.5 flex-shrink-0" size={18} />
          <div>
            <p className="font-medium">Erro ao carregar post</p>
            <p className="mt-2">{error || "Post não encontrado"}</p>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
          >
            <FiArrowLeft size={16} />
            <span>Voltar para o dashboard</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-md"
          >
            <FiArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-white">Editar Post</h1>
        </div>
      </div>

    </div>
  )
}

export default EditPost
