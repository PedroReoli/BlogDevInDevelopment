"use client"

import { useState, useEffect } from "react"
import { getComments, type Comment } from "../../services/comments"
import CommentItem from "./CommentItem"
import CommentForm from "./CommentForm"

interface CommentListProps {
  postId?: string
  lessonId?: string
  limit?: number
}

const CommentList = ({ postId, lessonId, limit = 10 }: CommentListProps) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalComments, setTotalComments] = useState(0)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  const loadComments = async (reset = false) => {
    try {
      setLoading(true)
      setError(null)

      const currentPage = reset ? 0 : page
      const offset = currentPage * limit

      const { comments: newComments, count } = await getComments({
        postId,
        lessonId,
        parentId: null, // Apenas comentários principais
        limit,
        offset,
      })

      if (reset) {
        setComments(newComments)
      } else {
        setComments((prev) => [...prev, ...newComments])
      }

      setTotalComments(count || 0)
      setHasMore((count || 0) > (currentPage + 1) * limit)

      if (reset) {
        setPage(0)
      } else {
        setPage(currentPage + 1)
      }
    } catch (err) {
      console.error("Erro ao carregar comentários:", err)
      setError("Não foi possível carregar os comentários. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadComments(true)
  }, [postId, lessonId])

  const handleCommentAdded = () => {
    loadComments(true)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Comentários {totalComments > 0 && `(${totalComments})`}</h2>

      <CommentForm postId={postId} lessonId={lessonId} onCommentAdded={handleCommentAdded} />

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {loading && comments.length === 0 ? (
        <div className="py-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Carregando comentários...</p>
        </div>
      ) : comments.length === 0 ? (
        <div className="py-8 text-center bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                postId={postId}
                lessonId={lessonId}
                onCommentUpdated={() => loadComments(true)}
              />
            ))}
          </div>

          {hasMore && (
            <div className="py-4 text-center">
              <button
                onClick={() => loadComments()}
                disabled={loading}
                className={`btn btn-secondary ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? "Carregando..." : "Carregar mais comentários"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CommentList
