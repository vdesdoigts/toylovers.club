import { Metadata } from "next";

export interface ArticleMetadata {
  title: string;
  description: string;
  publishedAt: string;
  slug: string;
  instagram?: string;
  covers?: Array<{ src: string; alt: string }>;
}

export interface SEOConfig {
  title: string;
  description: string;
  url?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

/**
 * Generate comprehensive metadata for pages
 */
export function generateSEOMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    url,
    image = "/og-image.jpg",
    imageAlt = "Toy Lovers - Showcasing Toy Photography Artists",
    type = "website",
    publishedTime,
    modifiedTime,
    author,
    section = "Photography",
    tags = [],
  } = config;

  const fullUrl = url
    ? `https://toylovers.club${url}`
    : "https://toylovers.club";

  return {
    title,
    description,
    keywords: [
      "toy photography",
      "toy photographers",
      "creative photography",
      "action figure photography",
      "collectibles photography",
      "miniature photography",
      ...tags,
    ],
    authors: author ? [{ name: author }] : [{ name: "Toy Lovers" }],
    category: section,
    openGraph: {
      type,
      locale: "en_US",
      url: fullUrl,
      siteName: "Toy Lovers",
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
          type: "image/jpeg",
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: "summary_large_image",
      site: "@toylovers",
      creator: "@toylovers",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: fullUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Generate article structured data for JSON-LD
 */
export function generateArticleStructuredData(
  article: ArticleMetadata,
  content?: string
) {
  const articleUrl = `https://toylovers.club/interviews/${article.slug}`;
  const mainImage = article.covers?.[0]?.src
    ? `https://toylovers.club${article.covers[0].src}`
    : "https://toylovers.club/og-image.jpg";

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: mainImage,
    author: {
      "@type": "Person",
      name: article.title, // The photographer's name
      ...(article.instagram && {
        sameAs: [`https://instagram.com/${article.instagram}`],
      }),
    },
    publisher: {
      "@type": "Organization",
      name: "Toy Lovers",
      url: "https://toylovers.club",
      logo: {
        "@type": "ImageObject",
        url: "https://toylovers.club/logo.png",
        width: 200,
        height: 200,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    url: articleUrl,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    articleSection: "Toy Photography",
    keywords: [
      "toy photography",
      article.instagram,
      "creative photography",
      "action figures",
      "collectibles",
    ].filter(Boolean),
    ...(content && {
      wordCount: content.split(/\s+/).length,
      articleBody: content.substring(0, 500) + "...",
    }),
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://toylovers.club${item.url}`,
    })),
  };
}

/**
 * Generate image gallery structured data for article covers
 */
export function generateImageGalleryStructuredData(
  covers: Array<{ src: string; alt: string }>,
  title: string
) {
  if (!covers || covers.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${title} - Photo Gallery`,
    description: `Photography gallery featuring work by ${title}`,
    image: covers.map((cover) => ({
      "@type": "ImageObject",
      url: `https://toylovers.club${cover.src}`,
      description: cover.alt,
      caption: cover.alt,
    })),
  };
}

/**
 * Extract dominant colors from image for theme-color meta tag
 */
export function getThemeColorForImage(imagePath: string): string {
  // This is a placeholder - in a real implementation, you might want to:
  // 1. Use a service like Vibrant.js to extract colors
  // 2. Pre-compute colors at build time
  // 3. Store them in the article metadata

  // For now, return a sensible default
  return "#ffffff";
}

/**
 * Generate social media sharing URLs
 */
export function generateSocialSharingUrls(
  url: string,
  title: string,
  description: string
) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=toylovers`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`,
  };
}
