"use client"

import { useEffect } from "react"
import { Helmet } from "react-helmet"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { FaHome, FaSearch, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa"

const NotFoundPage = () => {
  // Efeito para registrar o erro 404 (poderia ser conectado a uma ferramenta de analytics)
  useEffect(() => {
    console.log("Página não encontrada acessada:", window.location.pathname)
  }, [])

  // Variantes de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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

  // Animação do número 404
  const numberVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        duration: 0.8,
      },
    },
  }

  // Sugestões de páginas populares
  const popularPages = [
    { name: "Blog", path: "/blog" },
    { name: "Aulas", path: "/lessons" },
    { name: "Projetos", path: "/projects" },
    { name: "Documentação", path: "/docs" },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)] px-4 py-16">
      {/* SEO da Página 404 */}
      <Helmet>
        <title>Página Não Encontrada | DevEmDesenvolvimento</title>
        <meta name="description" content="A página que você tentou acessar não existe." />
      </Helmet>

      <motion.div
        className="w-full max-w-4xl mx-auto flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Ícone de Erro Animado */}
        <motion.div className="relative mb-8" variants={itemVariants}>
          <div className="absolute -inset-4 rounded-full bg-red-500/20 blur-xl animate-pulse"></div>
          <div className="relative bg-[var(--bg-secondary)] p-6 rounded-full border-2 border-red-500/50">
            <FaExclamationTriangle className="w-16 h-16 text-red-500" />
          </div>
        </motion.div>

        {/* Número 404 Animado */}
        <motion.h1
          className="text-7xl sm:text-8xl font-bold mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"
          variants={numberVariants}
        >
          404
        </motion.h1>

        {/* Mensagem de Erro */}
        <motion.div className="text-center mb-10" variants={itemVariants}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Página Não Encontrada</h2>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Ops! Parece que você se perdeu no caminho. A página que você está procurando não existe ou pode ter sido
            movida. Verifique o endereço ou use uma das opções abaixo para continuar navegando.
          </p>
        </motion.div>


        {/* Botões de Ação */}
        <motion.div className="flex flex-col sm:flex-row gap-4 mb-12" variants={itemVariants}>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--hover-primary)] text-white rounded-xl hover:bg-opacity-90 transition-all shadow-lg hover:shadow-[var(--hover-primary)]/20"
          >
            <FaHome />
            <span>Voltar para a Página Inicial</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-[var(--border-primary)] rounded-xl hover:bg-[var(--bg-secondary)] transition-all"
          >
            <FaArrowLeft />
            <span>Voltar à Página Anterior</span>
          </button>
        </motion.div>

        {/* Barra de Pesquisa */}
        <motion.div className="w-full max-w-xl mb-10" variants={itemVariants}>
          <div className="relative">
            <input
              type="text"
              placeholder="Tente pesquisar o que você procura..."
              className="w-full px-5 py-4 pl-12 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl focus:outline-none focus:border-[var(--hover-primary)] focus:ring-2 focus:ring-[var(--hover-primary)]/20 transition-all"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-[var(--hover-primary)] text-white rounded-lg hover:bg-opacity-90 transition-all text-sm">
              Pesquisar
            </button>
          </div>
        </motion.div>

        {/* Sugestões de Páginas */}
        <motion.div className="text-center" variants={itemVariants}>
          <h3 className="text-lg font-medium mb-4 text-[var(--text-secondary)]">
            Ou visite uma destas páginas populares:
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {popularPages.map((page, index) => (
              <Link
                key={index}
                to={page.path}
                className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg hover:border-[var(--hover-primary)] hover:text-[var(--hover-primary)] transition-all"
              >
                {page.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFoundPage

