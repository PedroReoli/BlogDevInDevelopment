import { supabase } from "./supabase"

export type Progress = {
  id: string
  user_id: string
  course_id: string
  lesson_id: string
  completed: boolean
  last_position?: number
  created_at: string
  updated_at: string
}

export type CourseProgress = {
  course_id: string
  total_lessons: number
  completed_lessons: number
  percentage: number
  last_lesson_id?: string
}

export async function markLessonProgress(
  userId: string,
  courseId: string,
  lessonId: string,
  completed: boolean,
  lastPosition?: number,
) {
  try {
    // Verificar se já existe um registro de progresso
    const { data: existingProgress, error: fetchError } = await supabase
      .from("lesson_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .eq("lesson_id", lessonId)
      .maybeSingle()

    if (fetchError) throw fetchError

    if (existingProgress) {
      // Atualizar registro existente
      const { error } = await supabase
        .from("lesson_progress")
        .update({
          completed,
          last_position: lastPosition,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingProgress.id)

      if (error) throw error
    } else {
      // Criar novo registro
      const { error } = await supabase.from("lesson_progress").insert({
        user_id: userId,
        course_id: courseId,
        lesson_id: lessonId,
        completed,
        last_position: lastPosition,
      })

      if (error) throw error
    }

    return { success: true }
  } catch (error: any) {
    console.error("Erro ao atualizar progresso da aula:", error)
    return { success: false, error: error.message || "Erro ao atualizar progresso" }
  }
}

export async function getLessonProgress(userId: string, lessonId: string): Promise<Progress | null> {
  try {
    const { data, error } = await supabase
      .from("lesson_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("lesson_id", lessonId)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        // Nenhum registro encontrado
        return null
      }
      throw error
    }

    return data as Progress
  } catch (error) {
    console.error("Erro ao buscar progresso da aula:", error)
    return null
  }
}

export async function getCourseProgress(userId: string, courseId: string): Promise<CourseProgress | null> {
  try {
    // Buscar total de aulas do curso
    const { count: totalLessons, error: countError } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("course_id", courseId)
      .eq("is_course", true)

    if (countError) throw countError

    // Buscar aulas completadas
    const { data: completedLessons, error: progressError } = await supabase
      .from("lesson_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .eq("completed", true)

    if (progressError) throw progressError

    // Buscar última aula acessada
    const { data: lastLesson, error: lastLessonError } = await supabase
      .from("lesson_progress")
      .select("lesson_id")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle()

    if (lastLessonError) throw lastLessonError

    const completedCount = completedLessons?.length || 0
    const percentage = totalLessons ? Math.round((completedCount / totalLessons) * 100) : 0

    return {
      course_id: courseId,
      total_lessons: totalLessons || 0,
      completed_lessons: completedCount,
      percentage,
      last_lesson_id: lastLesson?.lesson_id,
    }
  } catch (error) {
    console.error("Erro ao buscar progresso do curso:", error)
    return null
  }
}

export async function getAllCoursesProgress(userId: string): Promise<Record<string, CourseProgress>> {
  try {
    // Buscar todos os cursos que o usuário já acessou
    const { data: userCourses, error: coursesError } = await supabase
      .from("lesson_progress")
      .select("course_id")
      .eq("user_id", userId)
      .distinct("course_id")

    if (coursesError) throw coursesError

    if (!userCourses || userCourses.length === 0) {
      return {}
    }

    const courseIds = userCourses.map((c) => c.course_id)
    const progressMap: Record<string, CourseProgress> = {}

    // Buscar progresso para cada curso
    for (const courseId of courseIds) {
      const progress = await getCourseProgress(userId, courseId)
      if (progress) {
        progressMap[courseId] = progress
      }
    }

    return progressMap
  } catch (error) {
    console.error("Erro ao buscar progresso de todos os cursos:", error)
    return {}
  }
}
