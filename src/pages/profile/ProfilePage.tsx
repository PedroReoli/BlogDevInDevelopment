"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
} from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-hot-toast"

// Map of social media platforms to their icons
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

// Get icon for a platform (case insensitive)
const getSocialIcon = (platform: string) => {
  const key = platform.toLowerCase()
  return socialIcons[key] || <FaGlobe />
}

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState("/images/profile.jpg")
  const [isHoveringImage, setIsHoveringImage] = useState(false)

  // Campos editáveis
  const [bio, setBio] = useState(
    "Desenvolvedor apaixonado por inovação e tecnologia. Trabalho com desenvolvimento web há mais de 5 anos, focando em criar experiências de usuário intuitivas e acessíveis. Entusiasta de código aberto e sempre em busca de novos desafios.",
  )
  const [profession, setProfession] = useState("Desenvolvedor Fullstack")
  const [location, setLocation] = useState("Rio de Janeiro, Brasil")
  const [age, setAge] = useState("22")
  const [educations, setEducations] = useState<string[]>([
    "Bacharel em Ciência da Computação",
    "Especialização em Desenvolvimento Web",
  ])
  const [newEducation, setNewEducation] = useState("")
  const [socialLinks, setSocialLinks] = useState<{ platform: string; link: string }[]>([
    { platform: "GitHub", link: "github.com/pedrosousa" },
    { platform: "LinkedIn", link: "linkedin.com/in/pedrosousa" },
    { platform: "Website", link: "pedrosousa.dev" },
  ])
  const [newSocial, setNewSocial] = useState({ platform: "", link: "" })

  // Salvar alterações
  const handleSaveChanges = () => {
    setIsLoading(true)

    // Simulando uma chamada de API
    setTimeout(() => {
      setIsLoading(false)
      setIsEditing(false)
      toast.success("Perfil atualizado com sucesso!")
    }, 1000)
  }

  // Funções para adicionar/remover formações
  const handleAddEducation = () => {
    if (newEducation.trim()) {
      setEducations([...educations, newEducation])
      setNewEducation("")
      toast.success("Formação adicionada!")
    } else {
      toast.error("Por favor, insira uma formação válida")
    }
  }

  const handleRemoveEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index))
    toast.success("Formação removida!")
  }

  // Funções para adicionar/remover redes sociais
  const handleAddSocial = () => {
    if (newSocial.platform && newSocial.link) {
      setSocialLinks([...socialLinks, newSocial])
      setNewSocial({ platform: "", link: "" })
      toast.success("Rede social adicionada!")
    } else {
      toast.error("Por favor, preencha todos os campos")
    }
  }

  const handleRemoveSocial = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index))
    toast.success("Rede social removida!")
  }

  // Efeito de confirmação ao sair do modo de edição
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isEditing) {
        e.preventDefault()
        e.returnValue = ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [isEditing])

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

  return (
    <div className="p-6 bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      {/* Botão Editar Perfil */}
      <div className="flex justify-end mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isEditing ? handleSaveChanges : () => setIsEditing(true)}
          className={`flex items-center space-x-2 border-2 border-[var(--hover-primary)] 
            text-[var(--hover-primary)] bg-transparent px-5 py-2.5 rounded-full 
            hover:bg-[var(--hover-primary)] hover:text-white transition-all duration-300
            shadow-md hover:shadow-lg ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-t-2 border-[var(--hover-primary)] border-t-transparent rounded-full animate-spin mr-2"></div>
          ) : isEditing ? (
            <FaLockOpen className="text-lg" />
          ) : (
            <FaLock className="text-lg" />
          )}
          <span>{isEditing ? "Salvar Alterações" : "Editar Perfil"}</span>
        </motion.button>
      </div>

      {/* Card Principal */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-[var(--bg-secondary)] p-8 rounded-2xl shadow-xl max-w-4xl mx-auto border border-[var(--border-primary)]"
      >
        {/* Header do Card */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <div
            className="relative group"
            onMouseEnter={() => setIsHoveringImage(true)}
            onMouseLeave={() => setIsHoveringImage(false)}
          >
            <div className="w-32 h-32 rounded-full border-4 border-[var(--hover-primary)] flex items-center justify-center overflow-hidden relative">
              <img
                src={profileImage || "/placeholder.svg"}
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {isEditing && (
                <div
                  className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${isHoveringImage ? "opacity-100" : "opacity-0"}`}
                >
                  <FaEdit className="text-white text-2xl" />
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[var(--hover-primary)] text-white rounded-full p-2 shadow-lg">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[var(--hover-primary)] to-blue-400 bg-clip-text text-transparent">
              Pedro Sousa
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">Pronomes: Ele/Dele</p>
            <div className="flex items-center justify-center sm:justify-start mt-2 space-x-1">
              <span className="px-3 py-1 bg-[var(--hover-primary)]/10 text-[var(--hover-primary)] rounded-full text-xs font-medium">
                Membro desde 2022
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-500 rounded-full text-xs font-medium">
                Premium
              </span>
            </div>
          </div>
        </motion.div>

        {/* Informações Editáveis */}
        <div className="space-y-8">
          {/* Bio */}
          <motion.div variants={itemVariants}>
            <p className="text-[var(--hover-primary)] font-bold text-lg mb-2 flex items-center">
              <span className="mr-2">Bio</span>
              <div className="h-px flex-grow bg-gradient-to-r from-[var(--hover-primary)] to-transparent"></div>
            </p>
            {isEditing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full border-2 border-[var(--border-primary)] focus:border-[var(--hover-primary)] rounded-xl p-3 mt-1 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all duration-300 focus:ring-2 focus:ring-[var(--hover-primary)]/20 focus:outline-none"
                rows={4}
                placeholder="Conte um pouco sobre você..."
              />
            ) : (
              <p className="text-[var(--text-secondary)] leading-relaxed">{bio}</p>
            )}
          </motion.div>

          {/* Outras Informações */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Profissão */}
            <div className="space-y-2">
              <p className="text-[var(--hover-primary)] font-bold flex items-center">
                <span className="mr-2">Profissão</span>
                <div className="h-px flex-grow bg-gradient-to-r from-[var(--hover-primary)] to-transparent"></div>
              </p>
              {isEditing ? (
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full border-2 border-[var(--border-primary)] focus:border-[var(--hover-primary)] rounded-xl p-3 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all duration-300 focus:ring-2 focus:ring-[var(--hover-primary)]/20 focus:outline-none"
                  placeholder="Sua profissão atual"
                />
              ) : (
                <div className="flex items-center">
                  <div className="w-1 h-6 bg-[var(--hover-primary)] rounded-full mr-2"></div>
                  <p className="text-[var(--text-secondary)]">{profession}</p>
                </div>
              )}
            </div>

            {/* Localização */}
            <div className="space-y-2">
              <p className="text-[var(--hover-primary)] font-bold flex items-center">
                <span className="mr-2">Mora em</span>
                <div className="h-px flex-grow bg-gradient-to-r from-[var(--hover-primary)] to-transparent"></div>
              </p>
              {isEditing ? (
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border-2 border-[var(--border-primary)] focus:border-[var(--hover-primary)] rounded-xl p-3 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all duration-300 focus:ring-2 focus:ring-[var(--hover-primary)]/20 focus:outline-none"
                  placeholder="Sua localização"
                />
              ) : (
                <div className="flex items-center">
                  <div className="w-1 h-6 bg-[var(--hover-primary)] rounded-full mr-2"></div>
                  <p className="text-[var(--text-secondary)]">{location}</p>
                </div>
              )}
            </div>

            {/* Idade */}
            <div className="space-y-2">
              <p className="text-[var(--hover-primary)] font-bold flex items-center">
                <span className="mr-2">Idade</span>
                <div className="h-px flex-grow bg-gradient-to-r from-[var(--hover-primary)] to-transparent"></div>
              </p>
              {isEditing ? (
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full border-2 border-[var(--border-primary)] focus:border-[var(--hover-primary)] rounded-xl p-3 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all duration-300 focus:ring-2 focus:ring-[var(--hover-primary)]/20 focus:outline-none"
                  placeholder="Sua idade"
                />
              ) : (
                <div className="flex items-center">
                  <div className="w-1 h-6 bg-[var(--hover-primary)] rounded-full mr-2"></div>
                  <p className="text-[var(--text-secondary)]">{age} anos</p>
                </div>
              )}
            </div>

            {/* Formações */}
            <div className="space-y-2 sm:col-span-2">
              <p className="text-[var(--hover-primary)] font-bold flex items-center">
                <span className="mr-2">Formações</span>
                <div className="h-px flex-grow bg-gradient-to-r from-[var(--hover-primary)] to-transparent"></div>
              </p>
              <div className="space-y-3">
                <AnimatePresence>
                  {educations.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex items-center justify-between border border-[var(--border-primary)] rounded-xl p-3 bg-[var(--bg-primary)] group hover:border-[var(--hover-primary)] transition-all duration-300"
                    >
                      <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300">
                        {edu}
                      </span>
                      {isEditing && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRemoveEducation(index)}
                          className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-500/10 transition-all duration-300"
                        >
                          <FaTrash />
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Nova Formação"
                      value={newEducation}
                      onChange={(e) => setNewEducation(e.target.value)}
                      className="flex-1 border-2 border-[var(--border-primary)] focus:border-[var(--hover-primary)] rounded-xl p-3 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all duration-300 focus:ring-2 focus:ring-[var(--hover-primary)]/20 focus:outline-none"
                      onKeyDown={(e) => e.key === "Enter" && handleAddEducation()}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddEducation}
                      className="text-[var(--hover-primary)] hover:text-white hover:bg-[var(--hover-primary)] p-3 rounded-xl border-2 border-[var(--hover-primary)] transition-all duration-300"
                    >
                      <FaPlus />
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Redes Sociais */}
          <motion.div variants={itemVariants}>
            <p className="text-[var(--hover-primary)] font-bold text-lg mb-3 flex items-center">
              <span className="mr-2">Meus Sites e Redes Sociais</span>
              <div className="h-px flex-grow bg-gradient-to-r from-[var(--hover-primary)] to-transparent"></div>
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <AnimatePresence>
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex items-center justify-between border border-[var(--border-primary)] rounded-xl p-3 bg-[var(--bg-primary)] group hover:border-[var(--hover-primary)] transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-[var(--hover-primary)] text-xl">{getSocialIcon(social.platform)}</div>
                        <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300">
                          {social.platform}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={
                            social.link.startsWith("http://") || social.link.startsWith("https://")
                              ? social.link
                              : `https://${social.link}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--hover-primary)] hover:underline transition-all duration-300"
                        >
                          Acessar
                        </a>
                        {isEditing && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemoveSocial(index)}
                            className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-500/10 transition-all duration-300"
                          >
                            <FaTrash />
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col sm:flex-row items-center gap-3"
                >
                  <input
                    type="text"
                    placeholder="Plataforma (ex: GitHub, LinkedIn)"
                    value={newSocial.platform}
                    onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })}
                    className="w-full border-2 border-[var(--border-primary)] focus:border-[var(--hover-primary)] rounded-xl p-3 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all duration-300 focus:ring-2 focus:ring-[var(--hover-primary)]/20 focus:outline-none"
                  />
                  <input
                    type="url"
                    placeholder="Link (ex: github.com/username)"
                    value={newSocial.link}
                    onChange={(e) => setNewSocial({ ...newSocial, link: e.target.value })}
                    className="w-full border-2 border-[var(--border-primary)] focus:border-[var(--hover-primary)] rounded-xl p-3 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all duration-300 focus:ring-2 focus:ring-[var(--hover-primary)]/20 focus:outline-none"
                    onKeyDown={(e) => e.key === "Enter" && handleAddSocial()}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddSocial}
                    className="text-[var(--hover-primary)] hover:text-white hover:bg-[var(--hover-primary)] p-3 rounded-xl border-2 border-[var(--hover-primary)] transition-all duration-300 sm:self-stretch flex items-center justify-center"
                  >
                    <FaPlus />
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProfilePage

