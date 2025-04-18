"use client"

import { motion } from "framer-motion"

interface CategoryPillProps {
  category: string
  isActive: boolean
  onClick: () => void
}

const CategoryPill = ({ category, isActive, onClick }: CategoryPillProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`py-2 px-4 rounded-full transition-all duration-300 ${
        isActive
          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
      }`}
    >
      {category}
    </motion.button>
  )
}

export default CategoryPill
