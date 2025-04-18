"use client"

import { Link } from "react-router-dom"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { FiCalendar, FiArrowRight } from "react-icons/fi"
import type { Database } from "@/types/supabase"
import { motion } from "framer-motion"

type Post = Database["public"]["Tables"]["posts"]["Row"]

interface FeaturedPostProps {
  post: Post
  index: number
}

const FeaturedPost = ({ post, index }: FeaturedPostProps) => {
  const formattedDate = format(new Date(post.published_at), "dd MMM, yyyy", { locale: ptBR })

  // Diferentes estilos baseados no índice
  const isMainFeature = index === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-xl ${isMainFeature ? "lg:col-span-2 lg:row-span-2" : ""}`}
    >
      <Link to={`/blog/${post.slug}`} className="block h-full">
        <div className="relative h-full">
          {/* Imagem de fundo */}
          <div className="absolute inset-0">
            <img
              src={post.cover_image_url || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent opacity-90"></div>
          </div>

          {/* Conteúdo */}
          <div className="relative h-full flex flex-col justify-end p-6">
            {post.tags && post.tags.length > 0 && (
              <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full mb-3 font-medium">
                {post.tags[0]}
              </span>
            )}

            <h3
              className={`font-bold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300 ${
                isMainFeature ? "text-2xl md:text-3xl" : "text-xl"
              }`}
            >
              {post.title}
            </h3>

            <p className="text-slate-300 mb-4 line-clamp-2">{post.excerpt}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-slate-400 text-sm">
                <FiCalendar size={14} className="mr-1" />
                <time dateTime={post.published_at}>{formattedDate}</time>
              </div>

              <span className="text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                Ler mais <FiArrowRight />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default FeaturedPost
