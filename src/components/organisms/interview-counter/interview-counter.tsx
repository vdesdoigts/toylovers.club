"use client";

import type { Article } from "@/lib/mdx";
import { usePathname } from "next/navigation";

interface InterviewCounterProps {
  articles: Article[];
}

export function InterviewCounter({ articles }: InterviewCounterProps) {
  const pathname = usePathname();

  // Extract current article slug from pathname
  const currentSlug = pathname.startsWith("/interviews/")
    ? pathname.replace("/interviews/", "")
    : null;

  // Find current article index (1-based for display)
  const currentIndex = currentSlug
    ? articles.findIndex((article) => article.slug === currentSlug) + 1
    : 1; // Default to 1 for homepage or non-article pages

  // Get the current article (or latest if on homepage)
  const currentArticle = currentSlug
    ? articles.find((article) => article.slug === currentSlug)
    : articles[0];

  return (
    <span className="font-sans text-sm truncate">
      {articles.length + 1 - currentIndex}/{articles.length} interviews{" "}
      <span className="hidden sm:inline-block">
        {" — "}
        {currentArticle?.metadata.title && `${currentArticle.metadata.title}`}
      </span>
    </span>
  );
}
