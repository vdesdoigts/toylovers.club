"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-up";
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  animation = "fade-up",
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getAnimationClass = () => {
    const base = "transition-all duration-1000 ease-out";

    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return `${base} opacity-0 translate-y-8`;
        case "fade-in":
          return `${base} opacity-0`;
        case "slide-left":
          return `${base} opacity-0 -translate-x-8`;
        case "slide-right":
          return `${base} opacity-0 translate-x-8`;
        case "scale-up":
          return `${base} opacity-0 scale-95`;
        default:
          return `${base} opacity-0 translate-y-8`;
      }
    }

    return `${base} opacity-100 translate-y-0 translate-x-0 scale-100`;
  };

  return (
    <div ref={ref} className={`${getAnimationClass()} ${className}`}>
      {children}
    </div>
  );
}
