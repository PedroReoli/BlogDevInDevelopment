import { createClient } from "@supabase/supabase-js"
import type { Database } from "../types/supabase"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be provided")
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Tipos para os dados
export type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  content_path: string
  cover_image_url?: string
  published_at: string
  tags: string[]
  course_id?: string
  lesson_order?: number
}

export type Course = {
  id: string
  title: string
  slug: string
  description: string
  cover_image_url?: string
  published_at: string
}

export type UserProfile = {
  id: string
  email: string
  username?: string
  avatar_url?: string
  full_name?: string
  bio?: string
  created_at: string
  updated_at: string
}

export type Comment = {
  id: string
  content: string
  user_id: string
  post_id?: string
  lesson_id?: string
  parent_id?: string
  created_at: string
  updated_at: string
  user?: UserProfile
  replies?: Comment[]
  replies_count?: number
}

export type LessonProgressType = {
  id: string
  user_id: string
  course_id: string
  lesson_id: string
  completed: boolean
  last_position?: number
  created_at: string
  updated_at: string
}

export type Favorite = {
  id: string
  user_id: string
  post_id?: string
  course_id?: string
  created_at: string
}

// Funções para buscar dados
export async function getBlogPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .is("course_id", null)
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error)
    throw error
  }

  return data as Post[]
}

export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).is("course_id", null).single()

  if (error) {
    console.error("Error fetching blog post:", error)
    throw error
  }

  return data as Post
}

export async function getCourses() {
  const { data, error } = await supabase.from("courses").select("*").order("published_at", { ascending: false })

  if (error) {
    console.error("Error fetching courses:", error)
    throw error
  }

  return data as Course[]
}

export async function getCourseBySlug(slug: string) {
  const { data, error } = await supabase.from("courses").select("*").eq("slug", slug).single()

  if (error) {
    console.error("Error fetching course:", error)
    throw error
  }

  return data as Course
}

export async function getLessonsByCourseId(courseId: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("course_id", courseId)
    .eq("is_course", true)
    .order("lesson_order", { ascending: true })

  if (error) {
    console.error("Error fetching lessons:", error)
    throw error
  }

  return data as Post[]
}

export async function getLessonBySlug(courseSlug: string, lessonSlug: string) {
  // Primeiro, obter o ID do curso
  const course = await getCourseBySlug(courseSlug)

  if (!course) {
    throw new Error("Course not found")
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("course_id", course.id)
    .eq("slug", lessonSlug)
    .eq("is_course", true)
    .single()

  if (error) {
    console.error("Error fetching lesson:", error)
    throw error
  }

  return data as Post
}

export async function searchContent(query: string) {
  // Buscar posts e cursos que correspondam à consulta
  const [postsResult, coursesResult] = await Promise.all([
    supabase
      .from("posts")
      .select("*")
      .or(`title.ilike.%${query}%, excerpt.ilike.%${query}%`)
      .order("published_at", { ascending: false }),

    supabase
      .from("courses")
      .select("*")
      .or(`title.ilike.%${query}%, description.ilike.%${query}%`)
      .order("published_at", { ascending: false }),
  ])

  if (postsResult.error) {
    console.error("Error searching posts:", postsResult.error)
    throw postsResult.error
  }

  if (coursesResult.error) {
    console.error("Error searching courses:", coursesResult.error)
    throw coursesResult.error
  }

  return {
    posts: postsResult.data as Post[],
    courses: coursesResult.data as Course[],
  }
}

// Funções para gerenciar comentários
export async function getCommentsByPostId(postId: string) {
  const { data, error } = await supabase
    .from("comments")
    .select(`
      *,
      user:user_id (
        id,
        email,
        username,
        avatar_url,
        full_name
      )
    `)
    .eq("post_id", postId)
    .is("parent_id", null)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching comments:", error)
    throw error
  }

  // Buscar respostas para cada comentário
  const commentsWithReplies = await Promise.all(
    data.map(async (comment) => {
      const { data: replies, error: repliesError } = await supabase
        .from("comments")
        .select(`
          *,
          user:user_id (
            id,
            email,
            username,
            avatar_url,
            full_name
          )
        `)
        .eq("parent_id", comment.id)
        .order("created_at", { ascending: true })

      if (repliesError) {
        console.error("Error fetching replies:", repliesError)
        return comment
      }

      return {
        ...comment,
        replies: replies,
      }
    }),
  )

  return commentsWithReplies as Comment[]
}

export async function getCommentsByLessonId(lessonId: string) {
  const { data, error } = await supabase
    .from("comments")
    .select(`
      *,
      user:user_id (
        id,
        email,
        username,
        avatar_url,
        full_name
      )
    `)
    .eq("lesson_id", lessonId)
    .is("parent_id", null)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching comments:", error)
    throw error
  }

  // Buscar respostas para cada comentário
  const commentsWithReplies = await Promise.all(
    data.map(async (comment) => {
      const { data: replies, error: repliesError } = await supabase
        .from("comments")
        .select(`
          *,
          user:user_id (
            id,
            email,
            username,
            avatar_url,
            full_name
          )
        `)
        .eq("parent_id", comment.id)
        .order("created_at", { ascending: true })

      if (repliesError) {
        console.error("Error fetching replies:", repliesError)
        return comment
      }

      return {
        ...comment,
        replies: replies,
      }
    }),
  )

  return commentsWithReplies as Comment[]
}

export async function createComment(comment: {
  content: string
  user_id: string
  post_id?: string
  lesson_id?: string
  parent_id?: string
}) {
  const { data, error } = await supabase.from("comments").insert(comment).select()

  if (error) {
    console.error("Error creating comment:", error)
    throw error
  }

  return data[0] as Comment
}

export async function updateComment(id: string, content: string) {
  const { data, error } = await supabase.from("comments").update({ content }).eq("id", id).select()

  if (error) {
    console.error("Error updating comment:", error)
    throw error
  }

  return data[0] as Comment
}

export async function deleteComment(id: string) {
  const { error } = await supabase.from("comments").delete().eq("id", id)

  if (error) {
    console.error("Error deleting comment:", error)
    throw error
  }

  return true
}

// Funções para gerenciar progresso de aulas
export async function getLessonProgress(userId: string, lessonId: string) {
  const { data, error } = await supabase
    .from("lesson_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("lesson_id", lessonId)
    .single()

  if (error && error.code !== "PGRST116") {
    // PGRST116 é o código para "não encontrado"
    console.error("Error fetching lesson progress:", error)
    throw error
  }

  return data as LessonProgressType | null
}

export async function getCourseProgress(userId: string, courseId: string) {
  const { data, error } = await supabase
    .from("lesson_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("course_id", courseId)

  if (error) {
    console.error("Error fetching course progress:", error)
    throw error
  }

  return data as LessonProgressType[]
}

export async function updateLessonProgress(progress: {
  user_id: string
  course_id: string
  lesson_id: string
  completed: boolean
  last_position?: number
}) {
  // Verificar se já existe um registro de progresso
  const existingProgress = await getLessonProgress(progress.user_id, progress.lesson_id)

  if (existingProgress) {
    // Atualizar o registro existente
    const { data, error } = await supabase
      .from("lesson_progress")
      .update({
        completed: progress.completed,
        last_position: progress.last_position,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingProgress.id)
      .select()

    if (error) {
      console.error("Error updating lesson progress:", error)
      throw error
    }

    return data[0] as LessonProgressType
  } else {
    // Criar um novo registro
    const { data, error } = await supabase.from("lesson_progress").insert(progress).select()

    if (error) {
      console.error("Error creating lesson progress:", error)
      throw error
    }

    return data[0] as LessonProgressType
  }
}

// Funções para gerenciar favoritos
export async function getFavorites(userId: string) {
  const { data, error } = await supabase
    .from("favorites")
    .select(`
      *,
      post:post_id (*),
      course:course_id (*)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching favorites:", error)
    throw error
  }

  return data as (Favorite & { post?: Post; course?: Course })[]
}

export async function isFavorite(userId: string, postId?: string, courseId?: string) {
  let query = supabase.from("favorites").select("*").eq("user_id", userId)

  if (postId) {
    query = query.eq("post_id", postId)
  }

  if (courseId) {
    query = query.eq("course_id", courseId)
  }

  const { data, error } = await query.maybeSingle()

  if (error) {
    console.error("Error checking favorite:", error)
    throw error
  }

  return !!data
}

export async function toggleFavorite(favorite: {
  user_id: string
  post_id?: string
  course_id?: string
}) {
  // Verificar se já é favorito
  const isFav = await isFavorite(favorite.user_id, favorite.post_id, favorite.course_id)

  if (isFav) {
    // Remover dos favoritos
    let query = supabase.from("favorites").delete().eq("user_id", favorite.user_id)

    if (favorite.post_id) {
      query = query.eq("post_id", favorite.post_id)
    }

    if (favorite.course_id) {
      query = query.eq("course_id", favorite.course_id)
    }

    const { error } = await query

    if (error) {
      console.error("Error removing favorite:", error)
      throw error
    }

    return false
  } else {
    // Adicionar aos favoritos
    const { error } = await supabase.from("favorites").insert(favorite)

    if (error) {
      console.error("Error adding favorite:", error)
      throw error
    }

    return true
  }
}

// Funções para gerenciar perfil de usuário
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single()

  if (error && error.code !== "PGRST116") {
    // PGRST116 é o código para "não encontrado"
    console.error("Error fetching user profile:", error)
    throw error
  }

  return data as UserProfile | null
}

export async function updateUserProfile(profile: {
  id: string
  username?: string
  avatar_url?: string
  full_name?: string
  bio?: string
}) {
  const { data, error } = await supabase
    .from("user_profiles")
    .update({
      username: profile.username,
      avatar_url: profile.avatar_url,
      full_name: profile.full_name,
      bio: profile.bio,
      updated_at: new Date().toISOString(),
    })
    .eq("id", profile.id)
    .select()

  if (error) {
    console.error("Error updating user profile:", error)
    throw error
  }

  return data[0] as UserProfile
}

export async function uploadAvatar(userId: string, file: File) {
  const fileExt = file.name.split(".").pop()
  const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `avatars/${fileName}`

  const { error: uploadError } = await supabase.storage.from("public").upload(filePath, file)

  if (uploadError) {
    console.error("Error uploading avatar:", uploadError)
    throw uploadError
  }

  const { data } = supabase.storage.from("public").getPublicUrl(filePath)

  // Atualizar o perfil do usuário com a nova URL do avatar
  await updateUserProfile({
    id: userId,
    avatar_url: data.publicUrl,
  })

  return data.publicUrl
}

/**
 * Faz upload de uma imagem para o Supabase Storage
 */
async function uploadImageToSupabase(file: File, storagePath: string): Promise<string> {
  // Fazer upload do arquivo para o Supabase Storage
  const { data, error } = await supabase.storage.from("content").upload(storagePath, file, {
    cacheControl: "3600",
    upsert: true,
  })

  if (error) {
    throw error
  }

  // Obter a URL pública da imagem
  const { data: urlData } = supabase.storage.from("content").getPublicUrl(storagePath)

  return urlData.publicUrl
}

/**
 * Processa o HTML exportado do Notion e faz upload das imagens para o Supabase Storage
 */
export async function processHtmlWithImages(
  html: string,
  slug: string,
  isCourse = false,
  imageFiles: File[] = [],
): Promise<string> {
  // Carregar o HTML com cheerio (certifique-se de ter a biblioteca cheerio instalada)
  const cheerio = await import("cheerio")
  const $ = cheerio.load(html)

  // Mapa para relacionar nomes de arquivos com os arquivos reais
  const fileMap = new Map<string, File>()
  imageFiles.forEach((file) => {
    fileMap.set(file.name, file)
  })

  // Encontrar todas as imagens no HTML
  const imagePromises: Promise<void>[] = []

  $("img").each((_, el) => {
    const img = $(el)
    const src = img.attr("src")

    if (src && !src.startsWith("http")) {
      // É uma imagem local da exportação
      const fileName = src.split("/").pop() || ""
      const file = fileMap.get(fileName)

      if (file) {
        // Definir o caminho no Supabase Storage
        const storagePath = isCourse ? `courses/${slug}/images/${fileName}` : `blog/${slug}/images/${fileName}`

        // Adicionar à lista de uploads
        const uploadPromise = uploadImageToSupabase(file, storagePath)
          .then((publicUrl) => {
            // Atualizar o src da imagem no HTML
            img.attr("src", publicUrl)
          })
          .catch((err) => {
            console.error(`Erro ao fazer upload da imagem ${fileName}:`, err)
          })

        imagePromises.push(uploadPromise)
      }
    }
  })

  // Aguardar todos os uploads de imagens
  await Promise.all(imagePromises)

  // Retornar o HTML processado
  const processedHtml = $.html()

  // Salvar o HTML processado no Storage
  const contentPath = isCourse ? `courses/${slug}/content.html` : `blog/${slug}/content.html`
  const { error: storageError } = await supabase.storage
    .from("content")
    .upload(contentPath, new Blob([processedHtml], { type: "text/html" }), {
      cacheControl: "3600",
      upsert: true,
    })

  if (storageError) {
    console.error("Erro ao salvar HTML no Storage:", storageError)
    throw storageError
  }

  return contentPath
}

/**
 * Obtém o conteúdo HTML do Storage
 */
export async function getContentHtml(contentPath: string | null): Promise<string> {
  if (!contentPath) {
    return ""
  }

  const { data, error } = await supabase.storage.from("content").download(contentPath)

  if (error) {
    console.error("Erro ao obter HTML do Storage:", error)
    throw error
  }

  if (data === null) {
    return ""
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = reject
    reader.readAsText(data)
  })
}
