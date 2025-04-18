"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { useAuth } from "../context/AuthContext"
import ProfileForm from "../components/profile/ProfileForm"
import FavoritesList from "../components/favorites/FavoritesList"
import MetaTags from "../components/seo/MetaTags"

const Profile = () => {
  const { user, profile, refreshUser } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")

  useEffect(() => {
    document.title = "Meu Perfil | DevEmDesenvolvimento"
  }, [])

  if (!user || !profile) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <>
      <MetaTags
        title="Meu Perfil"
        description="Gerencie seu perfil, favoritos e progresso no DevEmDesenvolvimento."
        keywords="perfil, conta, favoritos, progresso, configurações"
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Meu Perfil</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="favorites">Favoritos</TabsTrigger>
            <TabsTrigger value="progress">Meu Progresso</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileForm profile={profile} onUpdate={refreshUser} />
          </TabsContent>

          <TabsContent value="favorites">
            <FavoritesList />
          </TabsContent>

          <TabsContent value="progress">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Meu Progresso</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Aqui você pode acompanhar seu progresso nos cursos que está estudando.
              </p>
              {/* Implementar componente de progresso do usuário */}
              <div className="mt-6">
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Em breve você poderá ver seu progresso em todos os cursos aqui.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default Profile
