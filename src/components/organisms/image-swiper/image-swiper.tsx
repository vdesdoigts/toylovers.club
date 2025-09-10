"use client";

import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface SlideData {
  id: string;
  image: string;
  title: string;
  description?: string;
  alt: string;
  poster?: string;
}

interface ImageSwiperProps {
  slides: SlideData[];
  className?: string;
  copyright?: string;
}

export function ImageSwiper({
  slides,
  className = "",
  copyright,
}: ImageSwiperProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.activeIndex);
  };

  const onSlideChangeTransitionStart = () => {
    setIsAnimating(true);
  };

  const onSlideChangeTransitionEnd = () => {
    setIsAnimating(false);
  };

  const goToPrevSlide = () => {
    if (isAnimating) return;
    swiper?.slidePrev();
  };

  const goToNextSlide = () => {
    if (isAnimating) return;
    swiper?.slideNext();
  };

  return (
    <div
      className={`w-full flex flex-col xl:flex-row ${className}`}
      style={{ height: "50vh" }}
    >
      {/* Left Column - Slide Information */}
      <div className="swiper-left-column flex-shrink-0 w-full xl:w-1/5 bg-white py-4 xl:p-8 flex flex:row xl:flex-col justify-between relative z-20 order-2 xl:order-1">
        <div className="flex flex:row xl:flex-col gap-4">
          <div className="text-sm text-gray-600 mb-2">
            {String(currentSlide + 1).padStart(2)} of{" "}
            {String(slides.length).padStart(2)}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Copyright © {copyright}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <button
            onClick={goToPrevSlide}
            disabled={currentSlide === 0}
            className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-colors"
            aria-label="Previous slide"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={goToNextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-colors"
            aria-label="Next slide"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 4L10 8L6 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Right Column - Swiper */}
      <div className="c-image-swiper flex-1 relative bg-white z-10 order-1 xl:order-2">
        <Swiper
          allowSlidePrev={currentSlide > 0}
          allowSlideNext={currentSlide < slides.length - 1}
          modules={[Navigation, Keyboard]}
          onSwiper={setSwiper}
          onSlideChange={handleSlideChange}
          onTransitionStart={onSlideChangeTransitionStart}
          onTransitionEnd={onSlideChangeTransitionEnd}
          className="h-full"
          grabCursor
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          slidesPerView="auto"
          normalizeSlideIndex={false}
          style={{ height: "100%" }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id} className="!w-auto">
              <div
                data-id={index}
                className={`h-full flex items-center justify-center ${
                  index === 0 ? "pl-0" : ""
                } px-2`}
                style={{ opacity: index > slides.length - 1 ? 0 : 1 }}
              >
                {slide.image.includes(".mp4") ? (
                  <video
                    src={slide.image}
                    controls
                    playsInline
                    className="max-h-full w-auto object-contain"
                    style={{ maxHeight: "50vh" }}
                    poster={slide.poster}
                  />
                ) : (
                  <img
                    src={slide.image}
                    alt={slide.alt || slide.description}
                    className="max-h-full w-auto object-contain"
                    style={{ maxHeight: "50vh" }}
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <div className="h-full w-lvh flex items-center justify-center px-2" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
