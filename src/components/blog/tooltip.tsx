"use client"

import * as React from "react"

interface TooltipProps {
  children: React.ReactNode
  content: string
}

export const Tooltip = ({ children, content }: TooltipProps) => {
  const [show, setShow] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => setShow(true), 300)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => setShow(false), 200)
  }

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {show && (
        <div className="absolute z-50 px-2 py-1 text-xs font-medium text-white bg-black/80 rounded whitespace-nowrap bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 pointer-events-none">
          {content}
          <div className="absolute w-2 h-2 bg-black/80 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1"></div>
        </div>
      )}
    </div>
  )
}

// Adicionando o TooltipProvider para compatibilidade com o componente Post
interface TooltipProviderProps {
  children: React.ReactNode
}

export const TooltipProvider = ({ children }: TooltipProviderProps) => {
  return <>{children}</>
}
