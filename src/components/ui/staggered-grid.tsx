"use client"

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"

interface StaggeredGridProps {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
}

export function StaggeredGrid({ children, className = "", staggerDelay = 100 }: StaggeredGridProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the animation of children
          children.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index])
            }, index * staggerDelay)
          })
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [children, staggerDelay])

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={`transition-all duration-700 ease-out ${
            visibleItems.includes(index) ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
