interface ArticleMediasShowcaseProps {
  images: {
    src: string;
    alt: string;
  }[];
  copyright?: string;
  className?: string;
}

export function ArticleMediasShowcase({
  images,
  className,
}: ArticleMediasShowcaseProps) {
  return (
    <div
      className={`c-article-medias-showcase w-full xl:max-w-6xl 2xl:max-w-7xl mx-auto mt-12 lg:mt-15 px-4 sm:px-8 xl:px-4 lg:py-20 sm:py-8 py-4 bg-amber-200 ${
        className || ""
      }`}
    >
      <div className="flex">
        <div className="flex-shrink-0 w-1/5 hidden xl:block" />
        <div className="flex max-w-2xl xl:max-w-3xl  flex-row gap-4">
          {images.map((image, index) => (
            <div className="w-2/6" key={index}>
              <img src={image.src} alt={image.alt} className="w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
