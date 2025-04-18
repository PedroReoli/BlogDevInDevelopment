import { Link } from "react-router-dom"
import { BookOpen } from "lucide-react"
import type { Course } from "../../services/supabase"

interface CourseCardProps {
  course: Course
  lessonCount?: number
}

const CourseCard = ({ course, lessonCount = 0 }: CourseCardProps) => {
  return (
    <div className="card">
      {course.cover_image_url && (
        <Link to={`/cursos/${course.slug}`} className="block overflow-hidden h-48">
          <img
            src={course.cover_image_url || "/placeholder.svg"}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
      )}

      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/cursos/${course.slug}`} className="group">
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {course.title}
          </h2>
        </Link>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">{course.description}</p>

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <BookOpen size={16} className="mr-1" />
          <span>
            {lessonCount} {lessonCount === 1 ? "aula" : "aulas"}
          </span>
        </div>

        <Link to={`/cursos/${course.slug}`} className="btn btn-primary w-full text-center">
          Ver curso
        </Link>
      </div>
    </div>
  )
}

export default CourseCard
