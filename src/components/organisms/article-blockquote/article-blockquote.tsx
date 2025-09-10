interface ArticleBlockquoteProps {
  quote: string;
  author: string;
  className?: string;
}

export function ArticleBlockquote({
  quote,
  author,
  className,
}: ArticleBlockquoteProps) {
  return (
    <div
      className={`c-article-blockquote w-full xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-8 xl:px-4 mt-12 lg:mt-15 ${
        className || ""
      }`}
    >
      <div className="flex">
        <div className="flex-shrink-0 w-1/5 hidden xl:block" />
        <div className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-tight pr-5">
          <blockquote>
            <p className="font-sans">{quote}</p>
            <cite className="mt-5 text-sm block">{author}</cite>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
