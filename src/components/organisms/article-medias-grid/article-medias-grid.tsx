interface ArticleMediasGridProps {
  images: {
    src: string;
    alt: string;
  }[];
  copyright?: string;
  className?: string;
}

export function ArticleMediasGrid({
  images,
  copyright,
  className,
}: ArticleMediasGridProps) {
  return (
    <div
      className={`c-article-medias-grid w-full xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-8 xl:px-4 mt-12 lg:mt-15 ${
        className || ""
      }`}
    >
      <div className="flex">
        <div className="flex-shrink-0 w-1/6 hidden xl:block" />
        <div className="max-w-4xl w-full">
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {copyright && (
            <p className="text-sm text-gray-500 mt-4">
              Copyright © {copyright}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
