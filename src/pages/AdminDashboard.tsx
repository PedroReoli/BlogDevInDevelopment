"use client"

import { useState } from "react"
import { useAdminAuth } from "../hooks/useAdminAuth"
import { LogOut, FileText, BookOpen, Plus, Trash2, Home } from "lucide-react"
import ContentForm from "../components/admin/ContentForm"
import { supabase, type Post, type Course } from "../services/supabase"
import NewCourseForm from "../components/admin/NewCourseForm"
import { Link } from "react-router-dom"

const AdminDashboard = () => {
  const { isLoading, logout } = useAdminAuth()
  const [activeTab, setActiveTab] = useState<"posts" | "courses" | "newPost" | "newCourse">("posts")
  const [posts, setPosts] = useState<Post[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(false)
  const [isLoadingCourses, setIsLoadingCourses] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isAddingLesson, setIsAddingLesson] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Função para carregar posts
  const loadPosts = async () => {
    setIsLoadingPosts(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("is_course", false)
        .order("published_at", { ascending: false })

      if (error) throw error

      setPosts(data || [])
    } catch (err: any) {
      console.error("Erro ao carregar posts:", err)
      setError("Falha ao carregar posts. " + err.message)
    } finally {
      setIsLoadingPosts(false)
    }
  }

  // Função para carregar cursos
  const loadCourses = async () => {
    setIsLoadingCourses(true)
    setError(null)

    try {
      const { data, error } = await supabase.from("courses").select("*").order("published_at", { ascending: false })

      if (error) throw error

      setCourses(data || [])
    } catch (err: any) {
      console.error("Erro ao carregar cursos:", err)
      setError("Falha ao carregar cursos. " + err.message)
    } finally {
      setIsLoadingCourses(false)
    }
  }

  // Função para excluir um post
  const deletePost = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este post?")) return

    setError(null)

    try {
      // Primeiro, buscar o post para obter o content_path
      const { data: post, error: fetchError } = await supabase
        .from("posts")
        .select("content_path")
        .eq("id", id)
        .single()

      if (fetchError) throw fetchError

      // Excluir o post do banco de dados
      const { error: deleteError } = await supabase.from("posts").delete().eq("id", id)

      if (deleteError) throw deleteError

      // Se houver um content_path, excluir o arquivo do Storage
      if (post?.content_path) {
        await supabase.storage.from("content").remove([post.content_path])
      }

      // Atualizar a lista de posts
      setPosts(posts.filter((p) => p.id !== id))

      setSuccessMessage("Post excluído com sucesso!")
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err: any) {
      console.error("Erro ao excluir post:", err)
      setError("Falha ao excluir post. " + err.message)
    }
  }

  // Função para excluir um curso
  const deleteCourse = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este curso? Todas as aulas associadas também serão excluídas.")) return

    setError(null)

    try {
      // Primeiro, buscar todas as aulas do curso para obter os content_paths
      const { data: lessons, error: fetchError } = await supabase
        .from("posts")
        .select("id, content_path")
        .eq("course_id", id)
        .eq("is_course", true)

      if (fetchError) throw fetchError

      // Excluir todas as aulas do curso
      if (lessons && lessons.length > 0) {
        const { error: deleteError } = await supabase.from("posts").delete().eq("course_id", id)

        if (deleteError) throw deleteError

        // Excluir os arquivos do Storage
        for (const lesson of lessons) {
          if (lesson.content_path) {
            await supabase.storage.from("content").remove([lesson.content_path])
          }
        }
      }

      // Excluir o curso
      const { error: deleteCourseError } = await supabase.from("courses").delete().eq("id", id)

      if (deleteCourseError) throw deleteCourseError

      // Atualizar a lista de cursos
      setCourses(courses.filter((c) => c.id !== id))

      setSuccessMessage("Curso excluído com sucesso!")
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err: any) {
      console.error("Erro ao excluir curso:", err)
      setError("Falha ao excluir curso. " + err.message)
    }
  }

  // Carregar dados quando a tab mudar
  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab)

    if (tab === "posts" && posts.length === 0) {
      loadPosts()
    } else if (tab === "courses" && courses.length === 0) {
      loadCourses()
    }
  }

  // Função para lidar com a criação bem-sucedida de um post
  const handlePostCreated = () => {
    setSuccessMessage("Post criado com sucesso!")
    setTimeout(() => setSuccessMessage(null), 3000)

    // Recarregar a lista de posts
    if (activeTab === "newPost") {
      loadPosts()
      setActiveTab("posts")
    }
  }

  // Função para lidar com a criação bem-sucedida de uma aula
  const handleLessonCreated = () => {
    setSuccessMessage("Aula criada com sucesso!")
    setTimeout(() => setSuccessMessage(null), 3000)

    // Voltar para a visualização do curso
    setIsAddingLesson(false)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-blue-600 flex items-center">
              <Home size={18} className="mr-1" />
              <span>Ver site</span>
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <LogOut size={16} className="mr-2" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">{error}</div>}

        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
            {successMessage}
          </div>
        )}

        {/* Tabs de navegação */}
        <div className="bg-white shadow-sm rounded-lg mb-6">
          <nav className="flex">
            <button
              onClick={() => handleTabChange("posts")}
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === "posts" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FileText size={16} className="inline mr-2" />
              Posts do Blog
            </button>
            <button
              onClick={() => handleTabChange("courses")}
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === "courses"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <BookOpen size={16} className="inline mr-2" />
              Cursos
            </button>
            <button
              onClick={() => handleTabChange("newPost")}
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === "newPost"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Plus size={16} className="inline mr-2" />
              Novo Post
            </button>
            <button
              onClick={() => handleTabChange("newCourse")}
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === "newCourse"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Plus size={16} className="inline mr-2" />
              Novo Curso
            </button>
          </nav>
        </div>

        {/* Conteúdo da tab selecionada */}
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Lista de Posts */}
          {activeTab === "posts" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Posts do Blog</h2>

              {isLoadingPosts ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                </div>
              ) : posts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Nenhum post encontrado.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Título
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Slug
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Data
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {posts.map((post) => (
                        <tr key={post.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{post.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{post.slug}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {new Date(post.published_at).toLocaleDateString("pt-BR")}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => deletePost(post.id)} className="text-red-600 hover:text-red-900">
                              <Trash2 size={16} className="inline" />
                              <span className="ml-1">Excluir</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Lista de Cursos */}
          {activeTab === "courses" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Cursos</h2>

              {isLoadingCourses ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                </div>
              ) : courses.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Nenhum curso encontrado.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Título
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Slug
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Data
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {courses.map((course) => (
                        <tr key={course.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{course.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{course.slug}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {new Date(course.published_at).toLocaleDateString("pt-BR")}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => {
                                setSelectedCourse(course)
                                setIsAddingLesson(true)
                              }}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              <Plus size={16} className="inline" />
                              <span className="ml-1">Adicionar Aula</span>
                            </button>
                            <button onClick={() => deleteCourse(course.id)} className="text-red-600 hover:text-red-900">
                              <Trash2 size={16} className="inline" />
                              <span className="ml-1">Excluir</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Formulário para Novo Post */}
          {activeTab === "newPost" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Novo Post do Blog</h2>
              <ContentForm type="post" onSuccess={handlePostCreated} />
            </div>
          )}

          {/* Formulário para Novo Curso */}
          {activeTab === "newCourse" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Novo Curso</h2>
              <NewCourseForm
                onSuccess={() => {
                  loadCourses()
                  setActiveTab("courses")
                }}
              />
            </div>
          )}

          {/* Formulário para Nova Aula */}
          {isAddingLesson && selectedCourse && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Nova Aula para: {selectedCourse.title}</h2>
                  <button onClick={() => setIsAddingLesson(false)} className="text-gray-500 hover:text-gray-700">
                    &times;
                  </button>
                </div>

                <ContentForm type="lesson" courseId={selectedCourse.id} onSuccess={handleLessonCreated} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
