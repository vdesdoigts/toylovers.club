import { getAllArticles } from "@/lib/mdx";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const baseUrl = "https://toylovers.club";

  // Create article URLs
  const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/interviews/${article.slug}`,
    lastModified: new Date(article.metadata.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Main pages
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  return [...staticUrls, ...articleUrls];
}
