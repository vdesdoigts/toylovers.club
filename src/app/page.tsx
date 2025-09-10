import { mdxComponents } from "@/components/mdx-components/mdx-components";
import { getAllArticles } from "@/lib/mdx";
import { generateSEOMetadata } from "@/lib/seo";
import { ReactLenis } from "lenis/react";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

export const metadata: Metadata = generateSEOMetadata({
  title: "Toy Lovers: Toy Photographers Stories",
  description:
    "Discover talented toy photographers through interviews, stunning galleries, and behind-the-scenes stories. Explore creative toy photography from artists around the globe.",
  url: "/",
  type: "website",
});

export default function Home() {
  const articles = getAllArticles();
  const firstArticle = articles[0];

  if (!firstArticle) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center">
        <p>No articles found.</p>
      </div>
    );
  }

  return (
    <>
      <ReactLenis root />

      <article className="c-article bg-white py-12">
        <MDXRemote
          source={firstArticle.content}
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
    </>
  );
}
