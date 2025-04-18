"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Circle, PlayCircle, CheckCircle, Lock } from "lucide-react"
import { getLessonsByCourseId, type Post } from "../../services/supabase"
import { useAuth } from "../../context/AuthContext"
import { getLessonProgress } from "../../services/progress"

interface LessonListProps {
  courseId: string
  courseSlug: string
  currentLessonSlug?: string
}

const LessonList = ({ courseId, courseSlug, currentLessonSlug }: LessonListProps) => {
  const { user, isAuthenticated } = useAuth()
  const [lessons, setLessons] = useState<Post[]>([])
  const [lessonProgress, setLessonProgress] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await getLessonsByCourseId(courseId)
        setLessons(data)

        // Carregar progresso das aulas se o usuário estiver autenticado
        if (isAuthenticated && user) {
          const progressMap: Record<string, boolean> = {}

          for (const lesson of data) {
            const progress = await getLessonProgress(user.id, lesson.id)
            progressMap[lesson.id] = !!progress?.completed
          }

          setLessonProgress(progressMap)
        }
      } catch (err) {
        setError("Erro ao carregar as aulas. Tente novamente mais tarde.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchLessons()
  }, [courseId, isAuthenticated, user])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-6">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">{error}</div>
  }

  if (lessons.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500 dark:text-gray-400">Nenhuma aula disponível neste curso.</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-800">
      {lessons.map((lesson, index) => {
        const isActive = lesson.slug === currentLessonSlug
        const isCompleted = lessonProgress[lesson.id]
        const isLocked = false // Aqui você pode implementar sua lógica de aulas bloqueadas

        return (
          <div key={lesson.id} className="group">
            <Link
              to={isLocked ? "#" : `/cursos/${courseSlug}/${lesson.slug}`}
              className={`flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                isActive ? "bg-blue-50 dark:bg-blue-900/20" : ""
              } ${isLocked ? "cursor-not-allowed opacity-70" : ""}`}
            >
              <div className="mr-3 text-gray-400 dark:text-gray-500 flex-shrink-0">
                {isLocked ? (
                  <Lock size={20} className="text-gray-400 dark:text-gray-500" />
                ) : isCompleted ? (
                  <CheckCircle size={20} className="text-green-500 dark:text-green-400" />
                ) : isActive ? (
                  <PlayCircle size={20} className="text-blue-600 dark:text-blue-400" />
                ) : (
                  <Circle size={20} />
                )}
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Aula {index + 1}</span>
                </div>
                <h4
                  className={`font-medium ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : isCompleted
                        ? "text-gray-700 dark:text-gray-200"
                        : "text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                  }`}
                >
                  {lesson.title}
                </h4>
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default LessonList
