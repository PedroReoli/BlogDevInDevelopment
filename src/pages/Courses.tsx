"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getCourses, getCourseBySlug, getLessonsByCourseId, type Course, type Post } from "../services/supabase"
import CourseCard from "../components/courses/CourseCard"
import LessonList from "../components/courses/LessonList"

const Courses = () => {
  const { courseSlug } = useParams<{ courseSlug?: string }>()
  const [courses, setCourses] = useState<Course[]>([])
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (courseSlug) {
          // Buscar um curso específico
          const course = await getCourseBySlug(courseSlug)
          setCurrentCourse(course)

          if (course) {
            // Buscar aulas do curso
            const courseLessons = await getLessonsByCourseId(course.id)
            setLessons(courseLessons)

            // Atualizar o título da página
            document.title = `${course.title} | DevEmDesenvolvimento`
          }
        } else {
          // Buscar todos os cursos
          const allCourses = await getCourses()
          setCourses(allCourses)

          // Resetar o curso atual
          setCurrentCourse(null)

          // Atualizar o título da página
          document.title = "Cursos | DevEmDesenvolvimento"
        }
      } catch (err) {
        setError("Erro ao carregar os dados. Tente novamente mais tarde.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Limpar o título ao desmontar
    return () => {
      document.title = "DevEmDesenvolvimento"
    }
  }, [courseSlug])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>
  }

  // Exibir um curso específico
  if (currentCourse) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{currentCourse.title}</h1>
          <p className="text-gray-600 mb-6">{currentCourse.description}</p>

          {currentCourse.cover_image_url && (
            <img
              src={currentCourse.cover_image_url || "/placeholder.svg"}
              alt={currentCourse.title}
              className="w-full max-h-80 object-cover rounded-lg shadow-md mb-8"
            />
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Conteúdo do Curso</h2>
          <LessonList courseId={currentCourse.id} courseSlug={currentCourse.slug} />
        </div>
      </div>
    )
  }

  // Exibir lista de cursos
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Cursos</h1>
        <p className="text-gray-600">
          Aprenda desenvolvimento web, programação e tecnologia com nossos cursos práticos.
        </p>
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600">Nenhum curso disponível ainda. Volte em breve!</p>
        </div>
      )}
    </div>
  )
}

export default Courses
