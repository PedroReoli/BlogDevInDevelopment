"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, BookOpen, Clock, Calendar } from "lucide-react"
import { getCourseBySlug, getLessonsByCourseId, type Course, type Post } from "../services/supabase"
import LessonList from "../components/courses/LessonList"

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return

      try {
        // Buscar o curso
        const courseData = await getCourseBySlug(slug)
        setCourse(courseData)

        if (courseData) {
          // Buscar aulas do curso
          const lessonsData = await getLessonsByCourseId(courseData.id)
          setLessons(lessonsData)

          // Atualizar o título da página
          document.title = `${courseData.title} | DevEmDesenvolvimento`
        }
      } catch (err) {
        setError("Erro ao carregar o curso. Tente novamente mais tarde.")
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
  }, [slug])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          {error || "Curso não encontrado."}
        </div>
        <Link to="/cursos" className="inline-flex items-center text-blue-600 hover:text-blue-700">
          <ArrowLeft size={16} className="mr-1" />
          Voltar para cursos
        </Link>
      </div>
    )
  }

  const formattedDate = new Date(course.published_at).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="min-h-screen">
      <Link to="/cursos" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft size={16} className="mr-1" />
        Voltar para cursos
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        {course.cover_image_url && (
          <div className="relative h-64 md:h-80">
            <img
              src={course.cover_image_url || "/placeholder.svg"}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{course.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen size={16} className="mr-1" />
                    <span>
                      {lessons.length} {lessons.length === 1 ? "aula" : "aulas"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>Acesso vitalício</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="p-6">
          {!course.cover_image_url && <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>}

          <div className="prose max-w-none">
            <p className="text-gray-700">{course.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Sobre este curso</h2>
            <div className="prose max-w-none">
              <p>
                Este curso foi projetado para ajudar você a dominar os conceitos e técnicas essenciais para se tornar um
                desenvolvedor proficiente. Através de aulas práticas e exemplos do mundo real, você aprenderá a aplicar
                esses conhecimentos em projetos reais.
              </p>
              <h3 className="text-lg font-bold mt-4">O que você vai aprender</h3>
              <ul>
                <li>Fundamentos e conceitos avançados</li>
                <li>Melhores práticas e padrões de projeto</li>
                <li>Desenvolvimento de aplicações completas</li>
                <li>Técnicas de otimização e performance</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-blue-500 text-white">
                <h3 className="font-bold">Conteúdo do curso</h3>
              </div>
              <LessonList courseId={course.id} courseSlug={course.slug} />

              {lessons.length > 0 && (
                <div className="p-4 border-t border-gray-200">
                  <Link
                    to={`/cursos/${course.slug}/${lessons[0].slug}`}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-center transition-colors"
                  >
                    Começar agora
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
