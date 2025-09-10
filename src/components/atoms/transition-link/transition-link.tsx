"use client";

import { useViewTransitions } from "@/lib/use-view-transitions";
import { ReactNode } from "react";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function TransitionLink({
  href,
  children,
  className,
}: TransitionLinkProps) {
  const { transitionTo, preloadRoute } = useViewTransitions();

  return (
    <button
      onClick={() => transitionTo(href)}
      onMouseEnter={() => preloadRoute(href)}
      className={className}
    >
      {children}
    </button>
  );
}
