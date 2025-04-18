"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowRight, Menu, X } from "lucide-react"
import { getCourseBySlug, getLessonBySlug, getLessonsByCourseId, type Post, type Course } from "../services/supabase"
import NotionRenderer from "../components/blog/NotionRenderer"
import LessonList from "../components/courses/LessonList"
import LessonProgress from "../components/courses/LessonProgress"
import CommentList from "../components/comments/CommentList"
import ShareButtons from "../components/social/ShareButtons"
import { useAuth } from "../context/AuthContext"

const CourseLesson = () => {
  const { courseSlug, lessonSlug } = useParams<{ courseSlug: string; lessonSlug: string }>()
  const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(false)
  const { isAuthenticated } = useAuth()

  const [course, setCourse] = useState<Course | null>(null)
  const [lesson, setLesson] = useState<Post | null>(null)
  const [allLessons, setAllLessons] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [progressUpdated, setProgressUpdated] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!courseSlug || !lessonSlug) return

      try {
        // Buscar o curso
        const courseData = await getCourseBySlug(courseSlug)
        setCourse(courseData)

        if (courseData) {
          // Buscar a aula específica
          const lessonData = await getLessonBySlug(courseSlug, lessonSlug)
          setLesson(lessonData)

          // Buscar todas as aulas do curso para navegação
          const lessons = await getLessonsByCourseId(courseData.id)
          setAllLessons(lessons)

          if (lessonData) {
            // Atualizar o título da página
            document.title = `${lessonData.title} | ${courseData.title} | DevEmDesenvolvimento`
          }
        }
      } catch (err) {
        setError("Erro ao carregar a aula. Tente novamente mais tarde.")
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
  }, [courseSlug, lessonSlug])

  // Encontrar aulas anterior e próxima
  const currentIndex = allLessons.findIndex((l) => l.slug === lessonSlug)
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  const handleProgressChange = (completed: boolean) => {
    setProgressUpdated(true)
    // Podemos adicionar lógica adicional aqui se necessário
  }

  const currentUrl = `${window.location.origin}/cursos/${courseSlug}/${lessonSlug}`
  const shareTitle = lesson ? `${lesson.title} | ${course?.title} | DevEmDesenvolvimento` : ""
  const shareDescription = lesson?.excerpt || ""

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !course || !lesson) {
    return (
      <div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md mb-6">
          {error || "Aula ou curso não encontrado."}
        </div>
        <Link
          to="/cursos"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:hover:text-blue-400"
        >
          <ArrowLeft size={16} className="mr-1" />
          Voltar para cursos
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Botão de toggle para o sidebar em dispositivos móveis */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg"
          aria-label={showSidebar ? "Fechar menu de aulas" : "Abrir menu de aulas"}
        >
          {showSidebar ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar para dispositivos móveis */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
          showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowSidebar(false)}
      >
        <div
          className={`fixed right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ${
            showSidebar ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 bg-blue-500 text-white flex justify-between items-center">
            <h3 className="font-bold">Conteúdo do curso</h3>
            <button onClick={() => setShowSidebar(false)} className="text-white">
              <X size={20} />
            </button>
          </div>
          <div className="overflow-y-auto h-full pb-20">
            <LessonList courseId={course.id} courseSlug={course.slug} currentLessonSlug={lesson.slug} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar com lista de aulas para desktop */}
        <div className="lg:col-span-1 hidden lg:block">
          <div className="sticky top-24">
            <Link
              to={`/cursos/${courseSlug}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-4"
            >
              <ArrowLeft size={16} className="mr-1" />
              Voltar para o curso
            </Link>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-blue-500 text-white">
                <h3 className="font-bold">Conteúdo do curso</h3>
              </div>
              <LessonList courseId={course.id} courseSlug={course.slug} currentLessonSlug={lesson.slug} />
            </div>
          </div>
        </div>

        {/* Conteúdo da aula */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{lesson.title}</h1>
              <div className="h-1 w-24 bg-blue-500 rounded"></div>
            </header>

            {isAuthenticated && (
              <div className="mb-6">
                <LessonProgress courseId={course.id} lessonId={lesson.id} onProgressChange={handleProgressChange} />
              </div>
            )}

            <article className="prose dark:prose-invert max-w-none">
              <NotionRenderer contentPath={lesson.content_path} />
            </article>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <ShareButtons url={currentUrl} title={shareTitle} description={shareDescription} />
            </div>

            {/* Navegação entre aulas */}
            <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
              {prevLesson ? (
                <Link
                  to={`/cursos/${courseSlug}/${prevLesson.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-md"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Anterior</div>
                    <div className="font-medium">{prevLesson.title}</div>
                  </div>
                </Link>
              ) : (
                <div></div>
              )}

              {nextLesson ? (
                <Link
                  to={`/cursos/${courseSlug}/${nextLesson.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-md text-right"
                >
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Próxima</div>
                    <div className="font-medium">{nextLesson.title}</div>
                  </div>
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </div>

          {/* Seção de comentários */}
          <div className="mt-8">
            <CommentList lessonId={lesson.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseLesson
