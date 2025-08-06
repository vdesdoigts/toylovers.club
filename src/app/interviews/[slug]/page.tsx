import { mdxComponents } from "@/components/mdx-components/mdx-components";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/mdx";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import rehypePrettyCode from "rehype-pretty-code";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Toy Lovers",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${article.metadata.title} | Toy Lovers`,
    description: article.metadata.description,
    openGraph: {
      title: article.metadata.title,
      description: article.metadata.description,
      type: "article",
      publishedTime: article.metadata.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: article.metadata.title,
      description: article.metadata.description,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { metadata, content } = article;

  return (
    <>
      {/* Article Content */}
      <article className="c-article min-h-screen bg-white py-12">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: "github-dark",
                    keepBackground: false,
                  },
                ],
              ],
            },
          }}
        />
      </article>

      {/* Article Footer */}
      <footer className="max-w-4xl mx-auto px-4 pb-12">
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-gray-600">
              Published on{" "}
              {new Date(metadata.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
            </div>
            <Link
              href="/articles"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to all articles
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
