"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { FiArrowLeft, FiLoader } from "react-icons/fi"
import { PostService } from "@/services/post-service"
import PostForm from "@/components/admin/post-form"
import toast from "react-hot-toast"

const EditPost = () => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return

      try {
        setIsLoading(true)
        setError(null)
        const data = await PostService.getPostById(id)
        setPost(data)
      } catch (err) {
        console.error("Error fetching post:", err)
        setError((err as Error).message || "Erro ao carregar post")
        toast.error("Erro ao carregar post")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-16">
            <FiLoader size={32} className="animate-spin text-blue-500" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-red-900/30 border border-red-500 text-red-300 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Erro ao carregar post</h2>
            <p className="mb-4">{error || "Post não encontrado"}</p>
            <Link to="/admin/dashboard" className="btn bg-slate-700 hover:bg-slate-600 text-white">
              Voltar para o Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
          >
            <FiArrowLeft size={18} />
            <span>Voltar para o Dashboard</span>
          </Link>
        </div>

        <div className="bg-slate-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-white mb-6">Editar Post</h1>
          <PostForm initialData={post} />
        </div>
      </div>
    </div>
  )
}

export default EditPost
