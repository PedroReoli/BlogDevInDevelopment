"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useAuth } from "../../context/AuthContext"
import { updateComment, deleteComment } from "../../services/comments"
import CommentForm from "./CommentForm"
import type { Comment } from "../../services/comments"
import { MessageSquare, Edit2, Trash2, X, Check } from "lucide-react"

interface CommentItemProps {
  comment: Comment
  postId?: string
  lessonId?: string
  onCommentUpdated: () => void
  showReplies?: boolean
}

const CommentItem = ({ comment, postId, lessonId, onCommentUpdated, showReplies = true }: CommentItemProps) => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)
  const [isReplying, setIsReplying] = useState(false)
  const [showingReplies, setShowingReplies] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isAuthor = user?.id === comment.user_id
  const formattedDate = formatDistanceToNow(new Date(comment.created_at), {
    addSuffix: true,
    locale: ptBR,
  })

  const handleEdit = async () => {
    if (!editContent.trim()) {
      setError("O comentário não pode estar vazio")
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      const result = await updateComment(comment.id, user!.id, editContent.trim())

      if (!result.success) {
        throw new Error(result.error || "Erro ao atualizar comentário")
      }

      setIsEditing(false)
      onCommentUpdated()
    } catch (err: any) {
      console.error("Erro ao editar comentário:", err)
      setError(err.message || "Ocorreu um erro ao editar o comentário")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este comentário?")) {
      return
    }

    setIsSubmitting(true)

    try {
      const result = await deleteComment(comment.id, user!.id)

      if (!result.success) {
        throw new Error(result.error || "Erro ao excluir comentário")
      }

      onCommentUpdated()
    } catch (err: any) {
      console.error("Erro ao excluir comentário:", err)
      alert(err.message || "Ocorreu um erro ao excluir o comentário")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4 last:border-0">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            {comment.user_profile.avatar_url ? (
              <img
                src={comment.user_profile.avatar_url || "/placeholder.svg"}
                alt={comment.user_profile.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                {comment.user_profile.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">{comment.user_profile.username}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</span>
          </div>

          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="input min-h-[80px] w-full"
              />

              {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-secondary flex items-center gap-1 text-sm py-1"
                  disabled={isSubmitting}
                >
                  <X size={16} />
                  <span>Cancelar</span>
                </button>
                <button
                  onClick={handleEdit}
                  className={`btn btn-primary flex items-center gap-1 text-sm py-1 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  <Check size={16} />
                  <span>{isSubmitting ? "Salvando..." : "Salvar"}</span>
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-800 dark:text-gray-200">{comment.content}</p>
          )}

          {/* Ações */}
          {!isEditing && (
            <div className="flex items-center gap-4 mt-2">
              {showReplies && (
                <button
                  onClick={() => setIsReplying(!isReplying)}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
                >
                  <MessageSquare size={16} />
                  <span>Responder</span>
                </button>
              )}

              {isAuthor && (
                <>
                  <button
                    onClick={() => {
                      setIsEditing(true)
                      setEditContent(comment.content)
                    }}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
                    disabled={isSubmitting}
                  >
                    <Edit2 size={16} />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1"
                    disabled={isSubmitting}
                  >
                    <Trash2 size={16} />
                    <span>Excluir</span>
                  </button>
                </>
              )}
            </div>
          )}

          {/* Formulário de resposta */}
          {isReplying && (
            <div className="mt-4">
              <CommentForm
                postId={postId}
                lessonId={lessonId}
                parentId={comment.id}
                onCommentAdded={() => {
                  onCommentUpdated()
                  setIsReplying(false)
                  setShowingReplies(true)
                }}
                placeholder="Escreva sua resposta..."
                buttonText="Responder"
                cancelReply={() => setIsReplying(false)}
              />
            </div>
          )}

          {/* Mostrar respostas */}
          {showReplies && comment.replies_count > 0 && !showingReplies && (
            <button
              onClick={() => setShowingReplies(true)}
              className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Ver {comment.replies_count} {comment.replies_count === 1 ? "resposta" : "respostas"}
            </button>
          )}

          {showReplies && showingReplies && (
            <CommentReplies
              commentId={comment.id}
              postId={postId}
              lessonId={lessonId}
              onCommentUpdated={onCommentUpdated}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// Componente para carregar e exibir respostas
const CommentReplies = ({
  commentId,
  postId,
  lessonId,
  onCommentUpdated,
}: {
  commentId: string
  postId?: string
  lessonId?: string
  onCommentUpdated: () => void
}) => {
  const [replies, setReplies] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  // Carregar respostas ao montar o componente
  useState(() => {
    const loadReplies = async () => {
      try {
        const { getComments } = await import("../../services/comments")
        const { comments } = await getComments({
          parentId: commentId,
          postId,
          lessonId,
        })
        setReplies(comments)
      } catch (error) {
        console.error("Erro ao carregar respostas:", error)
      } finally {
        setLoading(false)
      }
    }

    loadReplies()
  })

  if (loading) {
    return <div className="mt-4 ml-4 py-2">Carregando respostas...</div>
  }

  return (
    <div className="mt-4 ml-4 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
      {replies.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          postId={postId}
          lessonId={lessonId}
          onCommentUpdated={onCommentUpdated}
          showReplies={false}
        />
      ))}
    </div>
  )
}

export default CommentItem
