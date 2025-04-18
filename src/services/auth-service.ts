import { supabase } from "@/lib/supabase"

export const AuthService = {
  async signIn(email: string, password: string) {
    return await supabase.auth.signInWithPassword({ email, password })
  },

  async signOut() {
    return await supabase.auth.signOut()
  },

  async getCurrentSession() {
    return await supabase.auth.getSession()
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  },
}
