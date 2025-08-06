"use client";

import type { Article } from "@/lib/mdx";
import { useViewTransitions } from "@/lib/use-view-transitions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavigationLinksProps {
  articles: Article[];
}

export function NavigationLinks({ articles }: NavigationLinksProps) {
  const pathname = usePathname();
  const { transitionTo } = useViewTransitions();

  // Extract current article slug from pathname
  const currentSlug = pathname.startsWith("/interviews/")
    ? pathname.replace("/interviews/", "")
    : null;

  // Find current article index
  const currentIndex = currentSlug
    ? articles.findIndex((article) => article.slug === currentSlug)
    : -1; // -1 for homepage or non-article pages

  // Calculate prev/next links
  let prevHref: string | undefined;
  let nextHref: string | undefined;

  // Handle edge cases
  if (articles.length === 0) {
    // No articles - disable all navigation
    prevHref = undefined;
    nextHref = undefined;
  } else if (articles.length === 1) {
    // Only one article - disable navigation (or could wrap to same article)
    prevHref = undefined;
    nextHref = undefined;
  } else if (currentIndex === -1) {
    // On homepage or non-article page - go to last and second article
    prevHref = articles[articles.length - 1]
      ? `/interviews/${articles[articles.length - 1].slug}`
      : undefined;
    nextHref = articles[1] ? `/interviews/${articles[1].slug}` : undefined;
  } else {
    // On an article page with multiple articles
    const prevIndex = currentIndex - 1;
    const nextIndex = currentIndex + 1;

    // Previous article (wrap to last if at beginning)
    if (prevIndex >= 0) {
      prevHref = `/interviews/${articles[prevIndex].slug}`;
    } else {
      // Wrap to last article
      prevHref = `/interviews/${articles[articles.length - 1].slug}`;
    }

    // Next article (wrap to first if at end)
    if (nextIndex < articles.length) {
      nextHref = `/interviews/${articles[nextIndex].slug}`;
    } else {
      // Wrap to first article
      nextHref = `/interviews/${articles[0].slug}`;
    }
  }
  return (
    <div className="flex flex-row items-center text-xs font-sans text-white/40 uppercase pr-6">
      {prevHref ? (
        <button
          onClick={() => transitionTo(prevHref)}
          className="group flex flex-row items-center gap-1 border-r border-[#212128] px-4 hover:text-white transition-colors duration-300 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform duration-300" />
          Prev
        </button>
      ) : (
        <div className="flex flex-row items-center gap-1 border-r border-[#212128] px-4 opacity-30">
          <ChevronLeft className="w-5 h-5 text-white" />
          Prev
        </div>
      )}

      {nextHref ? (
        <button
          onClick={() => transitionTo(nextHref)}
          className="group flex flex-row items-center gap-1 px-4 py-2 hover:text-white transition-colors duration-300 cursor-pointer"
        >
          Next
          <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      ) : (
        <div className="flex flex-row items-center gap-1 px-4 py-2 opacity-30">
          Next
          <ChevronRight className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
}
