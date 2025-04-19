import { Link } from "react-router-dom"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { FiCalendar, FiClock, FiArrowRight } from "react-icons/fi"

interface BlogCardProps {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImageUrl: string | null
  publishedAt: string
  tags: string[]
}

const BlogCard = ({ title, slug, excerpt, coverImageUrl, publishedAt, tags }: BlogCardProps) => {
  const formattedDate = format(new Date(publishedAt), "dd MMM, yyyy", { locale: ptBR })

  // Estimar tempo de leitura (1 palavra = 0.2 segundos)
  const readingTime = Math.max(1, Math.ceil(excerpt.split(/\s+/).length / 200))

  return (
    <article className="group h-full flex flex-col overflow-hidden rounded-xl bg-slate-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {coverImageUrl && (
        <Link to={`/blog/${slug}`} className="block overflow-hidden aspect-video">
          <img
            src={coverImageUrl || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      )}
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center py-1 px-2 bg-blue-900/30 text-blue-300 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="inline-flex items-center py-1 px-2 bg-slate-700 text-slate-300 rounded-full text-xs font-medium">
              +{tags.length - 3}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold mb-3 line-clamp-2 text-white">
          <Link to={`/blog/${slug}`} className="hover:text-blue-400 transition-colors duration-200">
            {title}
          </Link>
        </h3>

        <p className="text-slate-300 mb-4 line-clamp-3">{excerpt}</p>

        <div className="mt-auto flex justify-between items-center mb-4 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <FiCalendar size={14} className="text-blue-400" />
            <time dateTime={publishedAt}>{formattedDate}</time>
          </div>
          <div className="flex items-center gap-1">
            <FiClock size={14} className="text-blue-400" />
            <span>{readingTime} min de leitura</span>
          </div>
        </div>

        <Link
          to={`/blog/${slug}`}
          className="flex items-center justify-center gap-2 py-2 px-4 bg-slate-700 rounded-lg text-slate-200 font-medium hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          Ler mais <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}

export default BlogCard
