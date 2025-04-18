import { supabase } from "./supabase"
import type { UserProfile } from "./supabase"

export type AuthUser = {
  id: string
  email: string
}

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    throw error
  }

  if (data.user) {
    // Criar perfil de usuário
    await supabase.from("user_profiles").insert({
      id: data.user.id,
      email: data.user.email,
    })
  }

  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }

  return true
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  if (error) {
    throw error
  }

  return true
}

export async function updatePassword(password: string) {
  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    throw error
  }

  return true
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    return null
  }

  return data.user
}

export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession()

  if (error || !data.session) {
    return null
  }

  return data.session
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error fetching user profile:", error)
    return null
  }

  return data
}
