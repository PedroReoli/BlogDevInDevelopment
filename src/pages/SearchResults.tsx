"use client"

import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { searchContent } from "../services/supabase"
import BlogCard from "../components/blog/BlogCard"
import CourseCard from "../components/courses/CourseCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import type { Post, Course } from "../services/supabase"

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") || ""

  const [posts, setPosts] = useState<Post[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"all" | "posts" | "courses">("all")

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return

      setLoading(true)
      setError(null)

      try {
        document.title = `Busca: ${query} | DevEmDesenvolvimento`

        const { posts: foundPosts, courses: foundCourses } = await searchContent(query)

        setPosts(foundPosts)
        setCourses(foundCourses)
      } catch (err) {
        console.error("Erro na busca:", err)
        setError("Ocorreu um erro ao realizar a busca. Tente novamente.")
      } finally {
        setLoading(false)
      }
    }

    fetchResults()

    return () => {
      document.title = "DevEmDesenvolvimento"
    }
  }, [query])

  const totalResults = posts.length + courses.length

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Resultados da busca</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {loading ? (
            "Buscando..."
          ) : (
            <>
              {totalResults} {totalResults === 1 ? "resultado" : "resultados"} para{" "}
              <span className="font-medium">"{query}"</span>
            </>
          )}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      {!loading && totalResults === 0 && !error && (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">Nenhum resultado encontrado</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Não encontramos nenhum conteúdo correspondente à sua busca.
          </p>
          <Link to="/" className="btn btn-primary">
            Voltar para a página inicial
          </Link>
        </div>
      )}

      {(posts.length > 0 || courses.length > 0) && (
        <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">Todos ({totalResults})</TabsTrigger>
            <TabsTrigger value="posts">Blog ({posts.length})</TabsTrigger>
            <TabsTrigger value="courses">Cursos ({courses.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {posts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Posts do Blog</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.slice(0, 3).map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
                {posts.length > 3 && (
                  <div className="mt-4 text-right">
                    <button
                      onClick={() => setActiveTab("posts")}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Ver todos os {posts.length} posts
                    </button>
                  </div>
                )}
              </div>
            )}

            {courses.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Cursos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.slice(0, 3).map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
                {courses.length > 3 && (
                  <div className="mt-4 text-right">
                    <button
                      onClick={() => setActiveTab("courses")}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Ver todos os {courses.length} cursos
                    </button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="posts">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-gray-600 dark:text-gray-400">
                Nenhum post encontrado para esta busca.
              </p>
            )}
          </TabsContent>

          <TabsContent value="courses">
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-gray-600 dark:text-gray-400">
                Nenhum curso encontrado para esta busca.
              </p>
            )}
          </TabsContent>
        </Tabs>
      )}

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  )
}

export default SearchResults
