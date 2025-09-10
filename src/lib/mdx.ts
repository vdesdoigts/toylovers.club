import fs from "fs";
import matter from "gray-matter";
import path from "path";

const articlesDirectory = path.join(process.cwd(), "src/data");

export interface ArticleMetadata {
  title: string;
  instagram: string;
  description: string;
  quote?: string;
  publishedAt: string;
  covers: {
    src: string;
    alt: string;
  }[];
}

export interface Article {
  slug: string;
  metadata: ArticleMetadata;
  content: string;
}

export function getAllArticleSlugs(): string[] {
  try {
    const files = fs.readdirSync(articlesDirectory);
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));
  } catch {
    console.warn("Articles directory not found, returning empty array");
    return [];
  }
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const filePath = path.join(articlesDirectory, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      metadata: {
        title: data.title || "Untitled",
        instagram: data.instagram || "",
        description: data.description || "",
        quote: data.quote || "",
        publishedAt: data.publishedAt || "",
        covers: data.covers || [],
      },
      content,
    };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

export function getAllArticles(): Article[] {
  const slugs = getAllArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => article !== null)
    .sort((a, b) => {
      // Sort by published date, newest first
      return (
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
      );
    });

  return articles;
}

export function getNextArticle(currentSlug: string): Article | null {
  const articles = getAllArticles();
  const currentIndex = articles.findIndex(
    (article) => article.slug === currentSlug
  );

  if (currentIndex === -1 || currentIndex === articles.length - 1) {
    return null; // Article not found or is the last article
  }

  return articles[currentIndex + 1];
}

export function getPreviousArticle(currentSlug: string): Article | null {
  const articles = getAllArticles();
  const currentIndex = articles.findIndex(
    (article) => article.slug === currentSlug
  );

  if (currentIndex === -1 || currentIndex === 0) {
    return null; // Article not found or is the first article
  }

  return articles[currentIndex - 1];
}

export function getNavigationInfo(currentSlug?: string): {
  prevArticle: Article | null;
  nextArticle: Article | null;
  isHomepage: boolean;
} {
  const articles = getAllArticles();

  // Handle homepage case (no slug provided or is first article)
  if (!currentSlug || currentSlug === articles[0]?.slug) {
    return {
      prevArticle: articles[articles.length - 1] || null, // Last article
      nextArticle: articles[1] || null, // Second article
      isHomepage: true,
    };
  }

  return {
    prevArticle: getPreviousArticle(currentSlug),
    nextArticle: getNextArticle(currentSlug),
    isHomepage: false,
  };
}
