import { supabase } from "@/lib/supabase"
import type { Database } from "@/types/supabase"

type Post = Database["public"]["Tables"]["posts"]["Row"]
type PostInsert = Database["public"]["Tables"]["posts"]["Insert"]

export const PostService = {
  async getAllPosts(): Promise<Post[]> {
    const { data, error } = await supabase.from("posts").select("*").order("published_at", { ascending: false })

    if (error) {
      throw new Error(`Error fetching posts: ${error.message}`)
    }

    return data || []
  },

  async getRecentPosts(limit = 3): Promise<Post[]> {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("published_at", { ascending: false })
      .limit(limit)

    if (error) {
      throw new Error(`Error fetching recent posts: ${error.message}`)
    }

    return data || []
  },

  async getPostBySlug(slug: string): Promise<Post> {
    const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).single()

    if (error) {
      throw new Error(`Error fetching post: ${error.message}`)
    }

    if (!data) {
      throw new Error("Post not found")
    }

    return data
  },

  async createPost(post: PostInsert): Promise<Post> {
    const { data, error } = await supabase.from("posts").insert(post).select().single()

    if (error) {
      throw new Error(`Error creating post: ${error.message}`)
    }

    if (!data) {
      throw new Error("Failed to create post")
    }

    return data
  },

  async uploadImage(file: File, bucket: "covers" | "content"): Promise<string> {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `${bucket === "covers" ? "covers" : "content/images"}/${fileName}`

    const { error } = await supabase.storage.from(bucket).upload(filePath, file)

    if (error) {
      throw new Error(`Error uploading image: ${error.message}`)
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)

    return data.publicUrl
  },

  async uploadHtml(html: string, fileName: string): Promise<string> {
    const filePath = `content/html/${Date.now()}-${fileName}`

    const { error } = await supabase.storage.from("content").upload(filePath, new Blob([html], { type: "text/html" }))

    if (error) {
      throw new Error(`Error uploading HTML: ${error.message}`)
    }

    const { data } = supabase.storage.from("content").getPublicUrl(filePath)

    return data.publicUrl
  },
}
