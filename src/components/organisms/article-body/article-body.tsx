interface ArticleBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function ArticleBody({ children, className }: ArticleBodyProps) {
  return (
    <div
      className={`c-article-body mt-12 lg:mt-15 w-full xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-8 xl:px-4 ${
        className || ""
      }`}
    >
      <div className="flex">
        <div className="flex-shrink-0 w-1/5 hidden xl:block" />
        <div className="max-w-2xl xl:max-w-3xl text-xl leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
