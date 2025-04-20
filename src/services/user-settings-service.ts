import { supabase } from "@/lib/supabase"
import { CustomAuthService } from "./custom-auth-service"

export interface UserSettings {
  id: string
  name: string
  email: string
  bio: string | null
  created_at?: string
  updated_at?: string
}

export const UserSettingsService = {
  /**
   * Obtém as configurações do usuário atual
   */
  async getUserSettings(): Promise<UserSettings | null> {
    try {
      // Usar o serviço de autenticação personalizado
      const currentUser = CustomAuthService.getCurrentUser()

      if (!currentUser) {
        console.warn("Usuário não autenticado ao tentar obter configurações")
        return null
      }

      const userId = currentUser.id

      // Primeiro, tenta buscar as configurações existentes
      const { data, error } = await supabase.from("user_settings").select("*").eq("id", userId).single()

      if (error) {
        // Se o erro for "não encontrado", podemos criar configurações iniciais
        if (error.code === "PGRST116") {
          // código para "não encontrado"
          // Criar configurações iniciais
          const initialSettings: UserSettings = {
            id: userId,
            name: currentUser.email.split("@")[0], // Nome padrão baseado no email
            email: currentUser.email,
            bio: "Adicione uma biografia aqui",
          }

          // Inserir configurações iniciais
          await supabase.from("user_settings").insert(initialSettings)

          return initialSettings
        }

        console.error("Erro ao obter configurações do usuário:", error)
        return null
      }

      return data as UserSettings
    } catch (error) {
      console.error("Erro ao obter configurações do usuário:", error)
      return null
    }
  },

  /**
   * Atualiza as configurações do usuário
   */
  async updateUserSettings(settings: Partial<UserSettings>): Promise<{ success: boolean; error?: string }> {
    try {
      // Usar o serviço de autenticação personalizado
      const currentUser = CustomAuthService.getCurrentUser()

      if (!currentUser) {
        return { success: false, error: "Usuário não autenticado" }
      }

      const userId = currentUser.id

      // Adicionar timestamp de atualização
      const updatedSettings = {
        ...settings,
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase.from("user_settings").update(updatedSettings).eq("id", userId)

      if (error) {
        console.error("Erro ao atualizar configurações:", error)
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      console.error("Erro ao atualizar configurações:", error)
      return { success: false, error: (error as Error).message }
    }
  },

  /**
   * Cria configurações iniciais para um novo usuário
   */
  async createInitialSettings(userId: string, email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const initialSettings = {
        id: userId,
        name: email.split("@")[0], // Nome padrão baseado no email
        email,
        bio: "Adicione uma biografia aqui",
      }

      const { error } = await supabase.from("user_settings").insert(initialSettings)

      if (error) {
        // Se o erro for de conflito (registro já existe), não é um problema real
        if (error.code === "23505") {
          // código de erro para violação de chave única
          return { success: true }
        }
        console.error("Erro ao criar configurações iniciais:", error)
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      console.error("Erro ao criar configurações iniciais:", error)
      return { success: false, error: (error as Error).message }
    }
  },
}
