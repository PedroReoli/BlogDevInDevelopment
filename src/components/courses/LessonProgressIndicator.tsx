"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Circle } from "lucide-react"
import { getLessonProgress } from "../../services/supabase"
import { useAuth } from "../../context/AuthContext"

interface LessonProgressIndicatorProps {
  lessonId: string
  courseId: string
  compact?: boolean
}

const LessonProgressIndicator = ({ lessonId, courseId, compact = false }: LessonProgressIndicatorProps) => {
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    const fetchProgress = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false)
        return
      }

      try {
        const progress = await getLessonProgress(user.id, lessonId)
        setCompleted(progress?.completed || false)
      } catch (err) {
        console.error("Erro ao buscar progresso da aula:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [lessonId, isAuthenticated, user])

  if (loading) {
    return <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
  }

  if (!isAuthenticated) {
    return null
  }

  if (compact) {
    return completed ? (
      <CheckCircle size={16} className="text-green-500" />
    ) : (
      <Circle size={16} className="text-gray-400" />
    )
  }

  return (
    <div className="flex items-center">
      {completed ? (
        <>
          <CheckCircle size={18} className="text-green-500 mr-2" />
          <span className="text-sm">Concluído</span>
        </>
      ) : (
        <>
          <Circle size={18} className="text-gray-400 mr-2" />
          <span className="text-sm">Não concluído</span>
        </>
      )}
    </div>
  )
}

export default LessonProgressIndicator
