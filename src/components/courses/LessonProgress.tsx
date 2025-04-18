"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { markLessonProgress, getLessonProgress } from "../../services/progress"
import { CheckCircle, Circle } from "lucide-react"

interface LessonProgressProps {
  courseId: string
  lessonId: string
  onProgressChange?: (completed: boolean) => void
}

const LessonProgress = ({ courseId, lessonId, onProgressChange }: LessonProgressProps) => {
  const { user, isAuthenticated } = useAuth()
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProgress = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false)
        return
      }

      try {
        const progress = await getLessonProgress(user.id, lessonId)
        setCompleted(!!progress?.completed)
      } catch (error) {
        console.error("Erro ao carregar progresso:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProgress()
  }, [user, isAuthenticated, lessonId])

  const toggleProgress = async () => {
    if (!isAuthenticated || !user) return

    const newStatus = !completed
    setCompleted(newStatus)

    try {
      await markLessonProgress(user.id, courseId, lessonId, newStatus)
      if (onProgressChange) {
        onProgressChange(newStatus)
      }
    } catch (error) {
      console.error("Erro ao atualizar progresso:", error)
      setCompleted(!newStatus) // Reverter em caso de erro
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <button
      onClick={toggleProgress}
      disabled={loading}
      className={`flex items-center gap-2 ${
        loading ? "opacity-50 cursor-not-allowed" : "hover:text-blue-600 dark:hover:text-blue-400"
      }`}
      aria-label={completed ? "Marcar como não concluída" : "Marcar como concluída"}
    >
      {completed ? (
        <CheckCircle className="text-green-500 dark:text-green-400" size={20} />
      ) : (
        <Circle className="text-gray-400 dark:text-gray-500" size={20} />
      )}
      <span>{completed ? "Concluída" : "Marcar como concluída"}</span>
    </button>
  )
}

export default LessonProgress
