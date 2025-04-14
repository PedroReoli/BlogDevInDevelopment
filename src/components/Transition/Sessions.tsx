"use client"

import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import BlogGridList from "@/pages/BlogGridList"
import LessonGridList from "@/pages/LessonGridList"
import ProjectGridList from "@/pages/ProjectGridList"
import { useSwipeable } from "react-swipeable"

const sections = [
  { id: "blog", title: "Blog", component: BlogGridList },
  { id: "lessons", title: "Aulas", component: LessonGridList },
  { id: "projects", title: "Projetos", component: ProjectGridList },
]

const Sessions = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const navigate = useCallback(
    (newIndex: number) => {
      setDirection(newIndex > currentIndex ? 1 : -1)
      setCurrentIndex(newIndex)
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    },
    [currentIndex],
  )

  const goToNext = useCallback(() => {
    if (currentIndex < sections.length - 1) {
      navigate(currentIndex + 1)
    }
  }, [currentIndex, navigate])

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      navigate(currentIndex - 1)
    }
  }, [currentIndex, navigate])

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrev,
    trackMouse: false,
    trackTouch: true,
    delta: 50,
    swipeDuration: 500,
    preventScrollOnSwipe: true,
  })

  const CurrentComponent = sections[currentIndex].component

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[var(--bg-primary)] border-b border-[var(--border-primary)] backdrop-blur-sm bg-opacity-80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Title and Navigation */}
            <div className="flex items-center space-x-8">
              <motion.h1
                className="text-3xl sm:text-4xl font-bold text-[var(--hover-primary)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {sections[currentIndex].title}
              </motion.h1>

              {/* Desktop Navigation */}
              <div className="hidden sm:flex items-center space-x-6">
                {sections.map((section, idx) => (
                  <button
                    key={section.id}
                    onClick={() => navigate(idx)}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                      currentIndex === idx
                        ? "text-[var(--hover-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {section.title}
                    {currentIndex === idx && (
                      <motion.div
                        layoutId="underline"
                        className="absolute left-0 right-0 bottom-0 h-0.5 bg-[var(--hover-primary)]"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex items-center space-x-2">
              {sections.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "bg-[var(--hover-primary)] w-6"
                      : "bg-[var(--text-secondary)] opacity-50 hover:opacity-75"
                  }`}
                  aria-label={`Go to ${sections[idx].title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative overflow-hidden" {...swipeHandlers}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            <CurrentComponent />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="fixed top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none z-50">
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className={`p-3 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] shadow-lg pointer-events-auto transition-all transform ${
              currentIndex > 0 ? "opacity-75 hover:opacity-100 hover:scale-110" : "opacity-30 cursor-not-allowed"
            }`}
            aria-label="Previous section"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            disabled={currentIndex === sections.length - 1}
            className={`p-3 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] shadow-lg pointer-events-auto transition-all transform ${
              currentIndex < sections.length - 1
                ? "opacity-75 hover:opacity-100 hover:scale-110"
                : "opacity-30 cursor-not-allowed"
            }`}
            aria-label="Next section"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sessions

