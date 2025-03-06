"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast, Toaster } from "react-hot-toast"
import {
  FaLock,
  FaLockOpen,
  FaPlus,
  FaTrash,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaInstagram,
  FaYoutube,
  FaTwitch,
  FaMedium,
  FaDev,
  FaEdit,
  FaMapMarkerAlt,
  FaBriefcase,
  FaBirthdayCake,
  FaGraduationCap,
  FaLink,
  FaUserAlt,
  FaCalendarAlt,
} from "react-icons/fa"
import type { JSX } from "react"

import { userProfileService } from "@/services/userProfileService"
import type { UserProfile, Education, SocialLink } from "@/types/userProfile"

// Mapeamento de plataformas de mídia social para seus ícones
const socialIcons: Record<string, JSX.Element> = {
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  twitter: <FaTwitter />,
  website: <FaGlobe />,
  instagram: <FaInstagram />,
  youtube: <FaYoutube />,
  twitch: <FaTwitch />,
  medium: <FaMedium />,
  dev: <FaDev />,
}

// Obter ícone para uma plataforma (não diferencia maiúsculas de minúsculas)
const getSocialIcon = (platform: string) => {
  const key = platform.toLowerCase()
  return socialIcons[key] || <FaGlobe />
}

// Gerar um ID único para novos itens
const generateId = () => `id_${Math.random().toString(36).substr(2, 9)}`

const ProfilePage = () => {
  // Estado para dados do perfil do usuário
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  // Estados da interface
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isHoveringImage, setIsHoveringImage] = useState(false)

  // Estados temporários para novos itens
  const [newEducation, setNewEducation] = useState({ title: "", institution: "", year: "" })
  const [newSocial, setNewSocial] = useState({ platform: "", link: "" })

  // Buscar perfil do usuário ao montar o componente
  useEffect(() => {
    const loadUserProfile = async () => {
      setIsLoading(true)
      try {
        // Usando um ID de usuário fictício, já que nosso serviço mock não o utiliza realmente
        const data = await userProfileService.getUserProfile("user123")
        setUserProfile(data)
      } catch (error) {
        console.error("Falha ao carregar perfil do usuário:", error)
        toast.error("Falha ao carregar dados do perfil")
      } finally {
        setIsLoading(false)
      }
    }

    loadUserProfile()
  }, [])

  // Lidar com o salvamento de alterações
  const handleSaveChanges = async () => {
    if (!userProfile) return

    setIsSaving(true)
    try {
      const updatedProfile = await userProfileService.updateUserProfile(userProfile)
      setUserProfile(updatedProfile)
      setIsEditing(false)
      toast.success("Perfil atualizado com sucesso!")
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error)
      toast.error("Falha ao atualizar perfil")
    } finally {
      setIsSaving(false)
    }
  }

  // Lidar com alterações de campo
  const handleFieldChange = (field: keyof UserProfile, value: any) => {
    if (!userProfile) return

    setUserProfile((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        [field]: value,
      }
    })
  }

  // Funções para adicionar/remover formações
  const handleAddEducation = () => {
    if (!userProfile) return
    if (!newEducation.title.trim()) {
      toast.error("O título da formação é obrigatório")
      return
    }

    const newEducationItem: Education = {
      id: generateId(),
      title: newEducation.title,
      institution: newEducation.institution || undefined,
      year: newEducation.year || undefined,
    }

    setUserProfile({
      ...userProfile,
      educations: [...userProfile.educations, newEducationItem],
    })

    setNewEducation({ title: "", institution: "", year: "" })
    toast.success("Formação adicionada com sucesso!")
  }

  const handleRemoveEducation = (id: string) => {
    if (!userProfile) return

    setUserProfile({
      ...userProfile,
      educations: userProfile.educations.filter((edu) => edu.id !== id),
    })

    toast.success("Formação removida com sucesso!")
  }

  // Funções para adicionar/remover links sociais
  const handleAddSocial = () => {
    if (!userProfile) return
    if (!newSocial.platform.trim() || !newSocial.link.trim()) {
      toast.error("Plataforma e link são obrigatórios")
      return
    }

    const newSocialItem: SocialLink = {
      id: generateId(),
      platform: newSocial.platform,
      link: newSocial.link,
    }

    setUserProfile({
      ...userProfile,
      socialLinks: [...userProfile.socialLinks, newSocialItem],
    })

    setNewSocial({ platform: "", link: "" })
    toast.success("Link social adicionado com sucesso!")
  }

  const handleRemoveSocial = (id: string) => {
    if (!userProfile) return

    setUserProfile({
      ...userProfile,
      socialLinks: userProfile.socialLinks.filter((social) => social.id !== id),
    })

    toast.success("Link social removido com sucesso!")
  }

  // Variantes de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-[var(--hover-primary)] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[var(--text-secondary)]">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="bg-[var(--bg-secondary)] p-8 rounded-xl shadow-lg border border-[var(--border-primary)] text-center">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Perfil Não Encontrado</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Não foi possível carregar os dados do perfil. Por favor, tente novamente mais tarde.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[var(--hover-primary)] text-white rounded-lg hover:bg-opacity-90 transition-all"
          >
            Atualizar Página
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] py-10 px-4 sm:px-6 ">
      <Toaster position="top-right" />

      {/* Cabeçalho da Página */}
      <div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">
          <span className="bg-gradient-to-r from-[var(--hover-primary)] to-blue-400 bg-clip-text text-transparent">
            Meu Perfil
          </span>
        </h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isEditing ? handleSaveChanges : () => setIsEditing(true)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
            isEditing
              ? "bg-[var(--hover-primary)] text-white"
              : "bg-transparent border-2 border-[var(--hover-primary)] text-[var(--hover-primary)]"
          } ${isLoading || isSaving ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"}`}
          disabled={isLoading || isSaving}
        >
          {isSaving ? (
            <>
              <div className="w-5 h-5 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Salvando...</span>
            </>
          ) : isEditing ? (
            <>
              <FaLockOpen className="text-lg" />
              <span>Salvar Alterações</span>
            </>
          ) : (
            <>
              <FaLock className="text-lg" />
              <span>Editar Perfil</span>
            </>
          )}
        </motion.button>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-5xl mx-auto">
        {/* Card do Cabeçalho do Perfil */}
        <motion.div
          variants={itemVariants}
          className="bg-[var(--bg-secondary)] rounded-2xl shadow-lg border border-[var(--border-primary)] overflow-hidden mb-8"
        >
          {/* Imagem de Capa */}
          <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 relative">
            {isEditing && (
              <button className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all">
                <FaEdit />
              </button>
            )}
          </div>

          {/* Informações do Perfil */}
          <div className="px-6 sm:px-8 pb-8 -mt-16 relative">
            {/* Imagem do Perfil */}
            <div
              className="relative inline-block"
              onMouseEnter={() => setIsHoveringImage(true)}
              onMouseLeave={() => setIsHoveringImage(false)}
            >
              <div className="w-32 h-32 rounded-full border-4 border-[var(--bg-secondary)] overflow-hidden shadow-lg">
                <img
                  src={userProfile.profileImage || "/placeholder.svg?height=128&width=128"}
                  alt={userProfile.displayName}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {isEditing && (
                  <div
                    className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
                      isHoveringImage ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <FaEdit className="text-white text-2xl" />
                  </div>
                )}
              </div>
              {userProfile.isOnline && (
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[var(--bg-secondary)]"></div>
              )}
              {userProfile.isPremium && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full transform translate-x-1/3 -translate-y-1/3">
                  PRO
                </div>
              )}
            </div>

            {/* Informações do Usuário */}
            <div className="mt-4 sm:mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold">{userProfile.displayName}</h2>
                <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
                  <span>@{userProfile.username}</span>
                  <span className="text-xs">•</span>
                  <span>{userProfile.pronouns}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                <div className="flex items-center text-sm text-[var(--text-secondary)]">
                  <FaCalendarAlt className="mr-1.5 text-[var(--hover-primary)]" />
                  <span>Membro desde {userProfile.memberSince}</span>
                </div>
                <div className="flex items-center text-sm text-[var(--text-secondary)]">
                  <FaBriefcase className="mr-1.5 text-[var(--hover-primary)]" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={userProfile.profession}
                      onChange={(e) => handleFieldChange("profession", e.target.value)}
                      className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-md px-2 py-1"
                      placeholder="Sua profissão"
                    />
                  ) : (
                    <span>{userProfile.profession}</span>
                  )}
                </div>
                <div className="flex items-center text-sm text-[var(--text-secondary)]">
                  <FaMapMarkerAlt className="mr-1.5 text-[var(--hover-primary)]" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={userProfile.location}
                      onChange={(e) => handleFieldChange("location", e.target.value)}
                      className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-md px-2 py-1"
                      placeholder="Sua localização"
                    />
                  ) : (
                    <span>{userProfile.location}</span>
                  )}
                </div>
                <div className="flex items-center text-sm text-[var(--text-secondary)]">
                  <FaBirthdayCake className="mr-1.5 text-[var(--hover-primary)]" />
                  {isEditing ? (
                    <input
                      type="number"
                      value={userProfile.age}
                      onChange={(e) => handleFieldChange("age", Number.parseInt(e.target.value))}
                      className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-md px-2 py-1 w-16"
                      placeholder="Idade"
                    />
                  ) : (
                    <span>{userProfile.age} anos</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid de Conteúdo Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Esquerda */}
          <div className="lg:col-span-2 space-y-8">
            {/* Seção Bio */}
            <motion.div
              variants={itemVariants}
              className="bg-[var(--bg-secondary)] rounded-2xl shadow-lg border border-[var(--border-primary)] p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaUserAlt className="mr-2 text-[var(--hover-primary)]" />
                <span>Sobre Mim</span>
              </h3>

              {isEditing ? (
                <textarea
                  value={userProfile.bio}
                  onChange={(e) => handleFieldChange("bio", e.target.value)}
                  className="w-full min-h-[150px] bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-4 focus:border-[var(--hover-primary)] focus:ring-2 focus:ring-[var(--hover-primary)]/20 focus:outline-none transition-all"
                  placeholder="Conte um pouco sobre você..."
                />
              ) : (
                <p className="text-[var(--text-secondary)] leading-relaxed">{userProfile.bio}</p>
              )}
            </motion.div>

            {/* Seção Formação */}
            <motion.div
              variants={itemVariants}
              className="bg-[var(--bg-secondary)] rounded-2xl shadow-lg border border-[var(--border-primary)] p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaGraduationCap className="mr-2 text-[var(--hover-primary)]" />
                <span>Formação</span>
              </h3>

              <div className="space-y-4">
                <AnimatePresence>
                  {userProfile.educations.map((edu) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start justify-between p-4 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-primary)] hover:border-[var(--hover-primary)] transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-[var(--hover-primary)] text-lg">
                          <FaGraduationCap />
                        </div>
                        <div>
                          <h4 className="font-medium group-hover:text-[var(--hover-primary)] transition-colors">
                            {edu.title}
                          </h4>
                          {(edu.institution || edu.year) && (
                            <p className="text-sm text-[var(--text-secondary)]">
                              {edu.institution}
                              {edu.institution && edu.year ? " • " : ""}
                              {edu.year}
                            </p>
                          )}
                        </div>
                      </div>

                      {isEditing && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRemoveEducation(edu.id)}
                          className="text-red-500 hover:text-red-600 p-1.5 rounded-full hover:bg-red-500/10 transition-all"
                          aria-label="Remover formação"
                        >
                          <FaTrash />
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 p-4 bg-[var(--bg-primary)] rounded-xl border border-dashed border-[var(--border-primary)]"
                  >
                    <h4 className="font-medium mb-3 text-[var(--text-secondary)]">Adicionar Nova Formação</h4>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Título ou Certificado *"
                        value={newEducation.title}
                        onChange={(e) => setNewEducation({ ...newEducation, title: e.target.value })}
                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-3 focus:border-[var(--hover-primary)] focus:outline-none"
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Instituição"
                          value={newEducation.institution}
                          onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                          className="w-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-3 focus:border-[var(--hover-primary)] focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Ano"
                          value={newEducation.year}
                          onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                          className="w-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-3 focus:border-[var(--hover-primary)] focus:outline-none"
                        />
                      </div>
                      <div className="flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handleAddEducation}
                          className="flex items-center gap-2 px-4 py-2 bg-[var(--hover-primary)] text-white rounded-lg hover:bg-opacity-90 transition-all"
                        >
                          <FaPlus size={14} />
                          <span>Adicionar Formação</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Coluna Direita */}
          <div className="space-y-8">
            {/* Seção Links Sociais */}
            <motion.div
              variants={itemVariants}
              className="bg-[var(--bg-secondary)] rounded-2xl shadow-lg border border-[var(--border-primary)] p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaLink className="mr-2 text-[var(--hover-primary)]" />
                <span>Links Sociais</span>
              </h3>

              <div className="space-y-3">
                <AnimatePresence>
                  {userProfile.socialLinks.map((social) => (
                    <motion.div
                      key={social.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between p-3 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-primary)] hover:border-[var(--hover-primary)] transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-[var(--hover-primary)] text-xl">{getSocialIcon(social.platform)}</div>
                        <span className="font-medium group-hover:text-[var(--hover-primary)] transition-colors">
                          {social.platform}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={social.link.startsWith("http") ? social.link : `https://${social.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[var(--hover-primary)] hover:underline"
                        >
                          Visitar
                        </a>

                        {isEditing && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemoveSocial(social.id)}
                            className="text-red-500 hover:text-red-600 p-1.5 rounded-full hover:bg-red-500/10 transition-all"
                            aria-label="Remover link social"
                          >
                            <FaTrash />
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 p-4 bg-[var(--bg-primary)] rounded-xl border border-dashed border-[var(--border-primary)]"
                  >
                    <h4 className="font-medium mb-3 text-[var(--text-secondary)]">Adicionar Novo Link Social</h4>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Plataforma (ex: GitHub, LinkedIn)"
                        value={newSocial.platform}
                        onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })}
                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-3 focus:border-[var(--hover-primary)] focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Link (ex: github.com/username)"
                        value={newSocial.link}
                        onChange={(e) => setNewSocial({ ...newSocial, link: e.target.value })}
                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg p-3 focus:border-[var(--hover-primary)] focus:outline-none"
                      />
                      <div className="flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handleAddSocial}
                          className="flex items-center gap-2 px-4 py-2 bg-[var(--hover-primary)] text-white rounded-lg hover:bg-opacity-90 transition-all"
                        >
                          <FaPlus size={14} />
                          <span>Adicionar Link</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Card de Estatísticas */}
            <motion.div
              variants={itemVariants}
              className="bg-[var(--bg-secondary)] rounded-2xl shadow-lg border border-[var(--border-primary)] p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold mb-4">Estatísticas de Atividade</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Postagens</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Comentários</span>
                  <span className="font-medium">142</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Projetos</span>
                  <span className="font-medium">7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Reputação</span>
                  <span className="font-medium text-[var(--hover-primary)]">1.245</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProfilePage

