import { supabase } from "./supabase"

export type Comment = {
  id: string
  content: string
  user_id: string
  post_id: string | null
  lesson_id: string | null
  parent_id: string | null
  created_at: string
  updated_at: string
  user_profile: {
    username: string
    avatar_url: string | null
  }
  replies_count: number
}

export async function getComments(options: {
  postId?: string
  lessonId?: string
  parentId?: string | null
  limit?: number
  offset?: number
}) {
  try {
    const { postId, lessonId, parentId, limit = 10, offset = 0 } = options

    let query = supabase
      .from("comments")
      .select(`
        *,
        user_profile:user_id (
          username,
          avatar_url
        ),
        replies_count:replies!parent_id(count)
      `)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    // Filtrar por post ou aula
    if (postId) {
      query = query.eq("post_id", postId)
    } else if (lessonId) {
      query = query.eq("lesson_id", lessonId)
    }

    // Filtrar por comentários principais ou respostas
    if (parentId === null) {
      query = query.is("parent_id", null)
    } else if (parentId) {
      query = query.eq("parent_id", parentId)
    }

    const { data, error, count } = await query

    if (error) throw error

    return {
      comments: data as Comment[],
      count,
    }
  } catch (error) {
    console.error("Erro ao buscar comentários:", error)
    return { comments: [], count: 0 }
  }
}

export async function addComment(data: {
  content: string
  userId: string
  postId?: string
  lessonId?: string
  parentId?: string | null
}) {
  try {
    const { content, userId, postId, lessonId, parentId } = data

    const { data: comment, error } = await supabase
      .from("comments")
      .insert({
        content,
        user_id: userId,
        post_id: postId || null,
        lesson_id: lessonId || null,
        parent_id: parentId || null,
      })
      .select()
      .single()

    if (error) throw error

    return { success: true, comment }
  } catch (error: any) {
    console.error("Erro ao adicionar comentário:", error)
    return { success: false, error: error.message || "Erro ao adicionar comentário" }
  }
}

export async function updateComment(commentId: string, userId: string, content: string) {
  try {
    // Verificar se o usuário é o autor do comentário
    const { data: existingComment, error: fetchError } = await supabase
      .from("comments")
      .select("user_id")
      .eq("id", commentId)
      .single()

    if (fetchError) throw fetchError

    if (existingComment.user_id !== userId) {
      throw new Error("Você não tem permissão para editar este comentário")
    }

    const { error } = await supabase
      .from("comments")
      .update({ content, updated_at: new Date().toISOString() })
      .eq("id", commentId)

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    console.error("Erro ao atualizar comentário:", error)
    return { success: false, error: error.message || "Erro ao atualizar comentário" }
  }
}

export async function deleteComment(commentId: string, userId: string) {
  try {
    // Verificar se o usuário é o autor do comentário
    const { data: existingComment, error: fetchError } = await supabase
      .from("comments")
      .select("user_id")
      .eq("id", commentId)
      .single()

    if (fetchError) throw fetchError

    if (existingComment.user_id !== userId) {
      throw new Error("Você não tem permissão para excluir este comentário")
    }

    const { error } = await supabase.from("comments").delete().eq("id", commentId)

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    console.error("Erro ao excluir comentário:", error)
    return { success: false, error: error.message || "Erro ao excluir comentário" }
  }
}
