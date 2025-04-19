import { Link } from "react-router-dom"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { FiCalendar, FiClock } from "react-icons/fi"

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
    <article className="card h-full flex flex-col transition-all duration-300">
      {coverImageUrl && (
        <Link to={`/blog/${slug}`} className="block overflow-hidden">
          <img
            src={coverImageUrl || "/placeholder.svg"}
            alt={title}
            className="card-image transition-transform duration-500 hover:scale-105"
          />
        </Link>
      )}
      <div className="card-content flex-grow flex flex-col">
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
          {tags.length > 3 && <span className="tag">+{tags.length - 3}</span>}
        </div>

        <h3 className="card-title flex-grow">
          <Link to={`/blog/${slug}`} className="hover:text-primary transition-colors duration-200">
            {title}
          </Link>
        </h3>

        <p className="text-text-secondary mb-4 line-clamp-3">{excerpt}</p>

        <div className="card-meta mt-auto flex justify-between items-center">
          <div className="flex items-center gap-1">
            <FiCalendar size={14} />
            <time dateTime={publishedAt}>{formattedDate}</time>
          </div>
          <div className="flex items-center gap-1">
            <FiClock size={14} />
            <span>{readingTime} min de leitura</span>
          </div>
        </div>

        <Link
          to={`/blog/${slug}`}
          className="btn btn-outline w-full mt-4 transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary"
        >
          Ler mais
        </Link>
      </div>
    </article>
  )
}

export default BlogCard
