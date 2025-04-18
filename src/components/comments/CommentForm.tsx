"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { addComment } from "../../services/comments"
import { AlertCircle } from "lucide-react"

interface CommentFormProps {
  postId?: string
  lessonId?: string
  parentId?: string
  onCommentAdded: () => void
  placeholder?: string
  buttonText?: string
  cancelReply?: () => void
}

const CommentForm = ({
  postId,
  lessonId,
  parentId,
  onCommentAdded,
  placeholder = "Escreva seu comentário...",
  buttonText = "Comentar",
  cancelReply,
}: CommentFormProps) => {
  const { user, isAuthenticated } = useAuth()
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) {
      setError("O comentário não pode estar vazio")
      return
    }

    if (!isAuthenticated || !user) {
      setError("Você precisa estar logado para comentar")
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      const result = await addComment({
        content: content.trim(),
        userId: user.id,
        postId,
        lessonId,
        parentId,
      })

      if (!result.success) {
        throw new Error(result.error || "Erro ao adicionar comentário")
      }

      setContent("")
      onCommentAdded()

      if (cancelReply) {
        cancelReply()
      }
    } catch (err: any) {
      console.error("Erro ao enviar comentário:", err)
      setError(err.message || "Ocorreu um erro ao enviar o comentário")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 px-4 py-3 rounded-md text-center">
        <p>
          Faça{" "}
          <a href="/login" className="font-medium underline">
            login
          </a>{" "}
          para comentar
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className="input min-h-[100px] w-full"
        required
      />

      <div className="flex justify-end space-x-2">
        {cancelReply && (
          <button type="button" onClick={cancelReply} className="btn btn-secondary">
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className={`btn btn-primary ${isSubmitting || !content.trim() ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isSubmitting ? "Enviando..." : buttonText}
        </button>
      </div>
    </form>
  )
}

export default CommentForm
