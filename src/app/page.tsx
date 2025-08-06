import { mdxComponents } from "@/components/mdx-components/mdx-components";
import { getAllArticles } from "@/lib/mdx";
import { ReactLenis } from "lenis/react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

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
