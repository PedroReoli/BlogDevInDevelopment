"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getFavorites, type Favorite, type Post, type Course } from "../../services/supabase"
import { useAuth } from "../../context/AuthContext"
import FavoriteButton from "./FavoriteButton"

const FavoritesList = () => {
  const [favorites, setFavorites] = useState<(Favorite & { post?: Post; course?: Course })[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return

      try {
        const data = await getFavorites(user.id)
        setFavorites(data)
      } catch (err) {
        console.error("Erro ao buscar favoritos:", err)
        setError("Erro ao carregar favoritos. Por favor, tente novamente.")
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [user])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md">
        {error}
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>Você ainda não tem favoritos.</p>
        <p className="mt-2">
          Explore nossos{" "}
          <Link to="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
            artigos
          </Link>{" "}
          e{" "}
          <Link to="/cursos" className="text-blue-600 dark:text-blue-400 hover:underline">
            cursos
          </Link>{" "}
          para adicionar aos favoritos.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Meus Favoritos</h2>

      <div className="space-y-4">
        {favorites.map((favorite) => {
          if (favorite.post) {
            return (
              <div
                key={favorite.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <Link
                      to={`/blog/${favorite.post.slug}`}
                      className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {favorite.post.title}
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{favorite.post.excerpt}</p>
                  </div>
                  <FavoriteButton postId={favorite.post.id} />
                </div>
              </div>
            )
          } else if (favorite.course) {
            return (
              <div
                key={favorite.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <Link
                      to={`/cursos/${favorite.course.slug}`}
                      className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {favorite.course.title}
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{favorite.course.description}</p>
                  </div>
                  <FavoriteButton courseId={favorite.course.id} />
                </div>
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}

export default FavoritesList
