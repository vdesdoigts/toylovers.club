"use client";

import Image from "next/image";
import { useState } from "react";

interface Cover {
  src: string;
  alt: string;
}

interface TightPackingGridProps {
  covers: Cover[];
  className?: string;
}

interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

export function TightPackingGrid({
  covers,
  className = "",
}: TightPackingGridProps) {
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});
  const [imageDimensions, setImageDimensions] = useState<
    Record<string, ImageDimensions>
  >({});

  const handleImageLoad = (src: string, img: HTMLImageElement) => {
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    setImageDimensions((prev) => ({
      ...prev,
      [src]: {
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio,
      },
    }));
    setImageLoaded((prev) => ({ ...prev, [src]: true }));
  };

  // Take exactly 6 images (2 rows of 3)
  const displayCovers = covers.slice(0, 6);

  // Split into two rows of 3 images each
  const row1 = displayCovers.slice(0, 3);
  const row2 = displayCovers.slice(3, 6);

  const calculateRowLayout = (rowImages: Cover[]) => {
    // Get aspect ratios for all images in this row
    const aspectRatios = rowImages.map((cover) => {
      const dims = imageDimensions[cover.src];
      return dims ? dims.aspectRatio : 1.5; // Default aspect ratio if not loaded yet
    });

    // Calculate total aspect ratio for the row
    const totalAspectRatio = aspectRatios.reduce(
      (sum, ratio) => sum + ratio,
      0
    );

    // Calculate width percentage for each image based on its aspect ratio
    return aspectRatios.map((ratio) => (ratio / totalAspectRatio) * 100);
  };

  const renderRow = (rowImages: Cover[], rowIndex: number) => {
    const widthPercentages = calculateRowLayout(rowImages);

    return (
      <div key={`row-${rowIndex}`} className="flex w-full gap-1">
        {rowImages.map((cover, imageIndex) => {
          const widthPercentage = widthPercentages[imageIndex];

          return (
            <div
              key={`${cover.src}-${rowIndex}-${imageIndex}`}
              className="relative group overflow-hidden bg-gray-50"
              style={{
                width: `${widthPercentage}%`,
                aspectRatio: imageDimensions[cover.src]?.aspectRatio || 1.5,
              }}
            >
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                className={`object-cover transition-all duration-500 group-hover:scale-[1.02] ${
                  imageLoaded[cover.src] ? "opacity-100" : "opacity-0"
                }`}
                onLoad={(e) =>
                  handleImageLoad(cover.src, e.target as HTMLImageElement)
                }
                sizes="33vw"
              />
              {!imageLoaded[cover.src] && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}

              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm" />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {row1.length > 0 && renderRow(row1, 0)}
      {row2.length > 0 && renderRow(row2, 1)}
    </div>
  );
}
