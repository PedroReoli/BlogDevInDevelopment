"use client"

import { useState, useEffect } from "react"
import { getCourseProgress, getLessonsByCourseId } from "../../services/supabase"
import { useAuth } from "../../context/AuthContext"

interface CourseProgressBarProps {
  courseId: string
}

const CourseProgressBar = ({ courseId }: CourseProgressBarProps) => {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)
  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    const fetchProgress = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false)
        return
      }

      try {
        // Buscar todas as aulas do curso
        const lessons = await getLessonsByCourseId(courseId)
        const totalLessons = lessons.length

        if (totalLessons === 0) {
          setProgress(0)
          setLoading(false)
          return
        }

        // Buscar progresso do usuário
        const userProgress = await getCourseProgress(user.id, courseId)
        const completedLessons = userProgress.filter((p) => p.completed).length

        // Calcular porcentagem
        const percentage = Math.round((completedLessons / totalLessons) * 100)
        setProgress(percentage)
      } catch (err) {
        console.error("Erro ao buscar progresso:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [courseId, isAuthenticated, user])

  if (loading) {
    return (
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden animate-pulse">
        <div className="h-full bg-blue-600 rounded-full w-0"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>Progresso</span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

export default CourseProgressBar
