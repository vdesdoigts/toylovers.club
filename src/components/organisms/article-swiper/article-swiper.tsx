import { ImageSwiper } from "@/components";

interface Slide {
  id: string;
  image: string;
  title: string;
  description: string;
  alt: string;
}

interface ArticleSwiperProps {
  slides: Slide[];
  className?: string;
}

export function ArticleSwiper({ slides, className }: ArticleSwiperProps) {
  return (
    <div
      className={`c-article-swiper mt-12 lg:mt-15 mx-auto w-full xl:max-w-6xl 2xl:max-w-7xl px-4 sm:px-8 xl:px-4 ${
        className || ""
      }`}
    >
      <ImageSwiper slides={slides} />
    </div>
  );
}
