import React from "react";
import { Badge, Button, Card } from "../index";

// Import all organism components
import { ArticleBlockquote } from "../organisms/article-blockquote/article-blockquote";
import { ArticleBody } from "../organisms/article-body/article-body";
import { ArticleHeader } from "../organisms/article-header/article-header";
import { ArticleImage } from "../organisms/article-image/article-image";
import { ArticleMediasGrid } from "../organisms/article-medias-grid/article-medias-grid";
import { ArticleMediasShowcase } from "../organisms/article-medias-showcase/article-medias-showcase";
import { ArticleSwiper } from "../organisms/article-swiper/article-swiper";
import { ArticleVideo } from "../organisms/article-video/article-video";

// Export all components that should be available in MDX
export const mdxComponents = {
  // Design system components
  Button,
  Card,
  Badge,

  // Organism components for article layouts
  ArticleVideo,
  ArticleMediasGrid,
  ArticleMediasShowcase,
  ArticleBlockquote,
  ArticleBody,
  ArticleSwiper,
  ArticleHeader,
  ArticleImage,

  // Custom link styling
  a: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} className="hover:underline" {...props}>
      {children}
    </a>
  ),

  // Custom heading overrides
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="c-article-h1 text-4xl lg:text-6xl mb-10 font-sans"
      {...props}
    >
      {children}
    </h1>
  ),

  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="c-article-h2 text-2xl lg:text-4xl font-sans mb-5 mt-15"
      {...props}
    >
      {children}
    </h2>
  ),

  // Custom paragraph styling
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="c-article-p mt-3" {...props}>
      {children}
    </p>
  ),
};
