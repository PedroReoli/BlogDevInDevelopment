"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { Link } from "react-router-dom"
// dps pegar essas interfaces e importar 
interface DropdownMenuItem {
  title: string
  description: string
  icon?: React.ReactNode
  link: string
}

interface ProjectCard {
  title: string
  description: string
  link: string
  imageUrl: string
}

interface DropdownMenuProps {
  isOpen: boolean
  items: {
    aprendizado: DropdownMenuItem[]
    social: DropdownMenuItem[]
  }
  onClose: () => void
  projectCard: ProjectCard
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen, items, onClose, projectCard }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className="absolute left-0 top-full mt-2 w-[800px] bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-lg shadow-lg border border-[var(--border-primary)] overflow-hidden z-50 animate-fadeIn"
    >
      <div className="grid grid-cols-[2fr_1fr] divide-x divide-[var(--border-primary)]">
        {/* Lado esquerdo - Aprendizado e Social */}
        <div className="p-5">
          {/* Seção Aprendizado */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
              Aprendizado
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {items.aprendizado.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="group flex items-start p-2 hover:bg-[var(--bg-hover)] rounded-md"
                  onClick={onClose}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-[var(--bg-hover)] rounded-md flex items-center justify-center mr-3">
                    {item.icon && <span className="text-lg text-[var(--hover-primary)]">{item.icon}</span>}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-[var(--text-primary)] group-hover:text-[var(--hover-primary)]">
                      {item.title}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Seção Social */}
          <div>
            <h3 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">Social</h3>
            <div className="grid grid-cols-2 gap-2">
              {items.social.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="group flex items-start p-2 hover:bg-[var(--bg-hover)] rounded-md"
                  onClick={onClose}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-[var(--bg-hover)] rounded-md flex items-center justify-center mr-3">
                    {item.icon && <span className="text-lg text-[var(--hover-primary)]">{item.icon}</span>}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-[var(--text-primary)] group-hover:text-[var(--hover-primary)]">
                      {item.title}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Lado direito - Último Projeto */}
        <div className="p-5">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                Último Projeto
              </h3>
              <Link
                to="/projetos"
                className="text-sm text-[var(--hover-primary)] hover:underline flex items-center"
                onClick={onClose}
              >
                Ver mais
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            <Link to={projectCard.link} className="block group" onClick={onClose}>
              <div className="relative overflow-hidden rounded-lg mb-3">
                <img
                  src={projectCard.imageUrl || "/placeholder.svg"}
                  alt={projectCard.title}
                  className="w-full h-32 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h4 className="font-medium text-sm text-[var(--text-primary)] group-hover:text-[var(--hover-primary)] mb-1">
                {projectCard.title}
              </h4>
              <p className="text-xs text-[var(--text-secondary)]">{projectCard.description}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DropdownMenu

