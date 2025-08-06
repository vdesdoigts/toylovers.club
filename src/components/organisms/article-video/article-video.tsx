interface ArticleVideoProps {
  src: string;
  caption: string;
  className?: string;
}

export function ArticleVideo({ src, caption, className }: ArticleVideoProps) {
  return (
    <div
      className={`c-article-video w-full xl:max-w-6xl 2xl:max-w-7xl mx-auto mt-12 lg:mt-15 px-4 sm:px-8 xl:px-4 ${
        className || ""
      }`}
    >
      <div className="flex">
        <div className="flex-shrink-0 w-1/6 hidden xl:block" />
        <div className="max-w-4xl">
          <video controls className="w-full">
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="mt-2 text-sm text-gray-700">{caption}</div>
        </div>
      </div>
    </div>
  );
}
