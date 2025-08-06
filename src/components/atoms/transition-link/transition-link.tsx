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
  const { transitionTo } = useViewTransitions();

  return (
    <button onClick={() => transitionTo(href)} className={className}>
      {children}
    </button>
  );
}
