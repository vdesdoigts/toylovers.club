interface ArticleImageProps {
  src: string;
  caption: string;
  className?: string;
}

export function ArticleImage({ src, caption, className }: ArticleImageProps) {
  return (
    <div
      className={`c-article-image w-full xl:max-w-6xl 2xl:max-w-7xl mx-auto mt-12 lg:mt-15 px-4 sm:px-8 xl:px-4 ${
        className || ""
      }`}
    >
      <div className="flex">
        <div className="flex-shrink-0 w-1/6 hidden xl:block" />
        <div className="max-w-4xl w-full">
          <img src={src} alt={caption} className="w-full" />
          <div className="mt-2 text-sm text-gray-700">{caption}</div>
        </div>
      </div>
    </div>
  );
}
