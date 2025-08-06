interface ArticleHeaderProps {
  title: string;
  description: React.ReactNode;
  className?: string;
}

export function ArticleHeader({
  title,
  description,
  className,
}: ArticleHeaderProps) {
  return (
    <header
      className={`c-article-header w-full xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-8 xl:px-4 ${
        className || ""
      }`}
    >
      <div className="flex">
        <div className="flex-shrink-0 w-1/5 hidden xl:block" />
        <div className="w-4/5">
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-6xl mb-10 font-sans">{title}</h1>
          </div>
          <div className="max-w-2xl xl:max-w-3xl text-xl lg:text-3xl">
            {description}
          </div>
        </div>
      </div>
    </header>
  );
}
