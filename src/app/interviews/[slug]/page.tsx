import { mdxComponents } from "@/components/mdx-components/mdx-components";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/mdx";
import {
  generateArticleStructuredData,
  generateBreadcrumbStructuredData,
  generateImageGalleryStructuredData,
  generateSEOMetadata,
} from "@/lib/seo";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
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
    return generateSEOMetadata({
      title: "Article Not Found",
      description:
        "The requested toy photographer interview could not be found.",
      url: `/interviews/${slug}`,
    });
  }

  const { metadata } = article;
  const featuredImage = metadata.covers?.[0]?.src || "/og-image.jpg";
  const imageAlt =
    metadata.covers?.[0]?.alt || `${metadata.title} - Toy Photography`;

  return generateSEOMetadata({
    title: `${metadata.title} - Toy Photographer Interview`,
    description: metadata.description,
    url: `/interviews/${slug}`,
    image: featuredImage,
    imageAlt,
    type: "article",
    publishedTime: metadata.publishedAt,
    author: metadata.title,
    section: "Toy Photography Interviews",
    tags: [
      "toy photography interview",
      metadata.instagram || "",
      "creative photography",
      "action figures",
      "collectibles",
      "miniature photography",
    ].filter(Boolean),
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { metadata, content } = article;

  // Generate structured data for the article
  const articleStructuredData = generateArticleStructuredData(
    {
      title: metadata.title,
      description: metadata.description,
      publishedAt: metadata.publishedAt,
      slug,
      instagram: metadata.instagram,
      covers: metadata.covers,
    },
    content
  );

  // Generate breadcrumb structured data
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Interviews", url: "/interviews" },
    { name: metadata.title, url: `/interviews/${slug}` },
  ]);

  // Generate image gallery structured data if covers exist
  const imageGalleryData = metadata.covers
    ? generateImageGalleryStructuredData(metadata.covers, metadata.title)
    : null;

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      {imageGalleryData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGalleryData) }}
        />
      )}

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
      <footer className=" w-full xl:max-w-6xl 2xl:max-w-7xl mx-auto mt-12 lg:mt-15 px-4 sm:px-8 xl:px-4">
        <div className="flex">
          <div className="flex-shrink-0 w-1/6 hidden xl:block" />
          <div className="border-t border-gray-200 py-8 max-w-4xl w-full">
            <div className="text-sm text-gray-600">
              Published on{" "}
              {new Date(metadata.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {/* {metadata.instagram && (
                <>
                  {" "}
                  by{" "}
                  <a
                    href={`https://instagram.com/${metadata.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    @{metadata.instagram}
                  </a>
                </>
              )} */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
