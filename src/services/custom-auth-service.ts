import { supabase } from "@/lib/supabase"

export interface AdminUser {
  id: string
  email: string
  created_at: string
}

export const CustomAuthService = {
  async signIn(email: string, password: string): Promise<{ user: AdminUser | null; error: string | null }> {
    try {
      // Buscar usuário pelo email e senha
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single()

      if (error) {
        console.error("Erro ao fazer login:", error)
        return { user: null, error: "Credenciais inválidas" }
      }

      if (!data) {
        return { user: null, error: "Usuário não encontrado" }
      }

      // Armazenar informações do usuário no localStorage
      localStorage.setItem("admin_user", JSON.stringify(data))

      return { user: data as AdminUser, error: null }
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      return { user: null, error: "Erro ao processar login" }
    }
  },

  async signOut(): Promise<void> {
    // Remover informações do usuário do localStorage
    localStorage.removeItem("admin_user")
  },

  getCurrentUser(): AdminUser | null {
    try {
      // Obter usuário do localStorage
      const userStr = localStorage.getItem("admin_user")
      if (!userStr) return null

      return JSON.parse(userStr) as AdminUser
    } catch (error) {
      console.error("Erro ao obter usuário atual:", error)
      localStorage.removeItem("admin_user") // Limpar dados corrompidos
      return null
    }
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  },
}
