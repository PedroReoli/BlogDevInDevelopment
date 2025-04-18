import { Link } from "react-router-dom"
import { Calendar } from "lucide-react"
import type { Post } from "../../services/supabase"

interface BlogCardProps {
  post: Post
}

const BlogCard = ({ post }: BlogCardProps) => {
  const formattedDate = new Date(post.published_at).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="card">
      {post.cover_image_url && (
        <Link to={`/blog/${post.slug}`} className="block overflow-hidden h-48">
          <img
            src={post.cover_image_url || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
      )}

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Calendar size={16} className="mr-1" />
          <span>{formattedDate}</span>
        </div>

        <Link to={`/blog/${post.slug}`} className="group">
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {post.title}
          </h2>
        </Link>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          to={`/blog/${post.slug}`}
          className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center mt-auto"
        >
          Ler mais
          <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default BlogCard
