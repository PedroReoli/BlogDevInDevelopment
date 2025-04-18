"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { isFavorite, toggleFavorite } from "../../services/supabase"
import { useAuth } from "../../context/AuthContext"

interface FavoriteButtonProps {
  postId?: string
  courseId?: string
  className?: string
}

const FavoriteButton = ({ postId, courseId, className = "" }: FavoriteButtonProps) => {
  const [isFav, setIsFav] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    const checkFavorite = async () => {
      if (!isAuthenticated || !user) return

      try {
        const result = await isFavorite(user.id, postId, courseId)
        setIsFav(result)
      } catch (err) {
        console.error("Erro ao verificar favorito:", err)
      }
    }

    checkFavorite()
  }, [isAuthenticated, user, postId, courseId])

  const handleToggleFavorite = async () => {
    if (!isAuthenticated || !user) {
      // Redirecionar para login ou mostrar mensagem
      alert("Faça login para adicionar aos favoritos")
      return
    }

    setIsLoading(true)

    try {
      const result = await toggleFavorite({
        user_id: user.id,
        post_id: postId,
        course_id: courseId,
      })
      setIsFav(result)
    } catch (err) {
      console.error("Erro ao alternar favorito:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading || !isAuthenticated}
      className={`flex items-center space-x-1 ${
        isFav
          ? "text-red-500 hover:text-red-600"
          : "text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500"
      } transition-colors ${className}`}
      aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      <Heart size={18} fill={isFav ? "currentColor" : "none"} />
      <span>{isFav ? "Favoritado" : "Favoritar"}</span>
    </button>
  )
}

export default FavoriteButton
