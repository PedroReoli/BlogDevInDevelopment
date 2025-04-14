"use client"

import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { motion } from "framer-motion"
import { lessonsData } from "@/constants/LessonsData"
import Loader from "@/components/Shared/Loader"
import NotFoundPage from "@/pages/NotFoundPage"
import { FiCalendar, FiClock, FiArrowLeft, FiArrowRight, FiShare2, FiPlay } from "react-icons/fi"

const LessonDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [lesson, setLesson] = useState<any>(null)
  const [lessonContent, setLessonContent] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [readingTime, setReadingTime] = useState("15 min")
  const [relatedLessons, setRelatedLessons] = useState<any[]>([])

  useEffect(() => {
    setIsLoading(true)
    window.scrollTo(0, 0)

    const selectedLesson = lessonsData.find((l) => l.slug === id)
    if (!selectedLesson) {
      setError("Aula não encontrada.")
      setIsLoading(false)
      return
    }

    setLesson(selectedLesson)

    // Encontrar aulas relacionadas baseadas em keywords
    const related = lessonsData
      .filter((l) => l.slug !== id && l.keywords.some((k) => selectedLesson.keywords.includes(k)))
      .slice(0, 3)
    setRelatedLessons(related)

    fetch(selectedLesson.link)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar o conteúdo.")
        }
        return response.text()
      })
      .then((data) => {
        setLessonContent(data)

        // Calcular tempo de leitura aproximado (1 palavra = 0.25 segundos)
        const wordCount = data.replace(/<[^>]*>/g, "").split(/\s+/).length
        const minutes = Math.ceil(wordCount / 200) // 200 palavras por minuto
        setReadingTime(`${minutes} min de leitura`)

        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError("Erro ao carregar o conteúdo da aula.")
        setIsLoading(false)
      })
  }, [id])

  // Encontrar aulas anterior e próxima
  const currentIndex = lessonsData.findIndex((l) => l.slug === id)
  const prevLesson = currentIndex > 0 ? lessonsData[currentIndex - 1] : null
  const nextLesson = currentIndex < lessonsData.length - 1 ? lessonsData[currentIndex + 1] : null

  // Compartilhar aula
  const shareLesson = () => {
    if (navigator.share) {
      navigator.share({
        title: lesson.title,
        text: lesson.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado para a área de transferência!")
    }
  }

  if (error) return <NotFoundPage />

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--bg-primary)] text-[var(--text-primary)]"
    >
      <Helmet>
        <title>{lesson.title} | Aulas</title>
        <meta name="description" content={lesson.description} />
      </Helmet>

      {/* Hero Section */}
      <div className="relative w-full">
        {/* Imagem de fundo com overlay */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full">
            <img
              src={lesson.imageUrl || "/placeholder.svg"}
              alt={lesson.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[var(--bg-primary)]"></div>
          </div>
        </div>

        {/* Conteúdo do hero */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-16 sm:pt-32 sm:pb-24 text-center">
          {/* Voltar para aulas */}
          <Link
            to="/lessons"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Voltar para aulas
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {lesson.keywords.map((keyword: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 backdrop-blur-sm text-white"
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* Título */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">{lesson.title}</h1>

          {/* Metadados */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-white/80 text-sm">
            <div className="flex items-center">
              <FiCalendar className="mr-2" />
              <span>{lesson.date}</span>
            </div>
            <div className="flex items-center">
              <FiClock className="mr-2" />
              <span>{readingTime}</span>
            </div>
            <button onClick={shareLesson} className="flex items-center hover:text-white transition-colors">
              <FiShare2 className="mr-2" />
              <span>Compartilhar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo da Aula */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="prose prose-lg dark:prose-invert mx-auto prose-headings:text-[var(--hover-primary)] prose-a:text-[var(--hover-primary)] prose-img:rounded-xl prose-pre:bg-[var(--bg-secondary)] prose-pre:border prose-pre:border-[var(--border-primary)]">
          <div className="lesson-content" dangerouslySetInnerHTML={{ __html: lessonContent || "" }} />
        </div>
      </div>

      {/* Navegação entre aulas */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 border-t border-[var(--border-primary)]">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {prevLesson ? (
            <Link
              to={`/lesson/${prevLesson.slug}`}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-2 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] hover:border-[var(--hover-primary)] transition-all group"
            >
              <FiArrowLeft className="text-[var(--text-secondary)] group-hover:text-[var(--hover-primary)]" />
              <div>
                <div className="text-xs text-[var(--text-secondary)]">Aula anterior</div>
                <div className="font-medium group-hover:text-[var(--hover-primary)] transition-colors">
                  {prevLesson.title}
                </div>
              </div>
            </Link>
          ) : (
            <div></div>
          )}

          {nextLesson && (
            <Link
              to={`/lesson/${nextLesson.slug}`}
              className="flex flex-col sm:flex-row items-end sm:items-center gap-2 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] hover:border-[var(--hover-primary)] transition-all group text-right"
            >
              <div>
                <div className="text-xs text-[var(--text-secondary)]">Próxima aula</div>
                <div className="font-medium group-hover:text-[var(--hover-primary)] transition-colors">
                  {nextLesson.title}
                </div>
              </div>
              <FiArrowRight className="text-[var(--text-secondary)] group-hover:text-[var(--hover-primary)]" />
            </Link>
          )}
        </div>
      </div>

      {/* Aulas relacionadas */}
      {relatedLessons.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Aulas relacionadas</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedLessons.map((relatedLesson, index) => (
              <Link key={index} to={`/lesson/${relatedLesson.slug}`} className="group block h-full">
                <div className="h-full flex flex-col bg-[var(--bg-secondary)] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[var(--border-primary)] hover:border-[var(--hover-primary)]">
                  {/* Imagem */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={relatedLesson.imageUrl || "/placeholder.svg"}
                      alt={relatedLesson.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <FiPlay className="text-white text-3xl" />
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="flex flex-col flex-grow p-4">
                    <h3 className="text-base font-semibold mb-2 line-clamp-2 group-hover:text-[var(--hover-primary)] transition-colors">
                      {relatedLesson.title}
                    </h3>

                    <p className="text-[var(--text-secondary)] text-sm line-clamp-2 mb-3">
                      {relatedLesson.description}
                    </p>

                    <div className="mt-auto text-xs text-[var(--text-secondary)]">{relatedLesson.date}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default LessonDetails

