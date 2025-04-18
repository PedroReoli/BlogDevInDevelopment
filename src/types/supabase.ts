export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          id: string
          content: string
          user_id: string
          post_id: string | null
          lesson_id: string | null
          parent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          content: string
          user_id: string
          post_id?: string | null
          lesson_id?: string | null
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          content?: string
          user_id?: string
          post_id?: string | null
          lesson_id?: string | null
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          cover_image_url: string | null
          published_at: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          cover_image_url?: string | null
          published_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          cover_image_url?: string | null
          published_at?: string
          created_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          post_id: string | null
          course_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          post_id?: string | null
          course_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          post_id?: string | null
          course_id?: string | null
          created_at?: string
        }
      }
      lesson_progress: {
        Row: {
          id: string
          user_id: string
          course_id: string
          lesson_id: string
          completed: boolean
          last_position: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          lesson_id: string
          completed?: boolean
          last_position?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          lesson_id?: string
          completed?: boolean
          last_position?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content_path: string
          cover_image_url: string | null
          published_at: string
          tags: string[]
          course_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt: string
          content_path: string
          cover_image_url?: string | null
          published_at?: string
          tags?: string[]
          course_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content_path?: string
          cover_image_url?: string | null
          published_at?: string
          tags?: string[]
          course_id?: string | null
          created_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          email: string
          username: string | null
          avatar_url: string | null
          full_name: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          username?: string | null
          avatar_url?: string | null
          full_name?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string | null
          avatar_url?: string | null
          full_name?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      comment_replies_count: {
        Row: {
          parent_id: string | null
          count: number | null
        }
      }
    }
    Functions: {}
  }
}
