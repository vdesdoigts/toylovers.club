import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleMediasShowcase } from "./article-medias-showcase";

const meta: Meta<typeof ArticleMediasShowcase> = {
  title: "Article/MediasShowcase",
  component: ArticleMediasShowcase,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A showcase component for displaying featured images in a prominent horizontal layout with distinctive amber background. Perfect for highlighting key visuals or creating visual breaks in article content.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    images: {
      control: { type: "object" },
      description: "Array of image objects with src and alt properties",
    },
    copyright: {
      control: { type: "text" },
      description:
        "Optional copyright or attribution text (currently not displayed but reserved for future use)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample images for stories
const showcaseImages = [
  {
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop",
    alt: "Modern architectural detail with clean lines",
  },
  {
    src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
    alt: "Contemporary interior design elements",
  },
  {
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop",
    alt: "Modern architectural detail with clean lines",
  },
];

// Basic usage with two images
export const Default: Story = {
  args: {
    images: showcaseImages,
    className: "pb-15",
  },
};

// Two images
export const TwoImages: Story = {
  args: {
    images: showcaseImages.slice(0, 2),
    copyright: "Product photography by Creative Studios",
  },
};

// Single image showcase
export const SingleImage: Story = {
  args: {
    images: [
      {
        src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
        alt: "Featured architectural masterpiece",
      },
    ],
    copyright: "Featured work by Architectural Masters",
  },
  parameters: {
    docs: {
      description: {
        story: "Showcase with a single prominent image for maximum impact.",
      },
    },
  },
};
