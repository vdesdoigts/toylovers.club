import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleMediasGrid } from "./article-medias-grid";

const meta: Meta<typeof ArticleMediasGrid> = {
  title: "Article/MediasGrid",
  component: ArticleMediasGrid,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A grid component for displaying article media in a 3x2 layout. Perfect for showcasing multiple related images with optional copyright attribution. Features responsive design and consistent spacing.",
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
        "Optional copyright or attribution text displayed below the grid",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample images for stories
const sampleImages = [
  {
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
    alt: "Modern office workspace with clean design",
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    alt: "Contemporary office interior with natural lighting",
  },
  {
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop",
    alt: "Minimalist workspace with wooden elements",
  },
  {
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    alt: "Open plan office with collaborative spaces",
  },
  {
    src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&h=300&fit=crop",
    alt: "Bright office environment with plants",
  },
  {
    src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    alt: "Modern meeting room with glass walls",
  },
];

const architectureImages = [
  {
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
    alt: "Modern architectural facade with geometric patterns",
  },
  {
    src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    alt: "Urban building with innovative design elements",
  },
  {
    src: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=300&fit=crop",
    alt: "Contemporary architecture with glass and steel",
  },
  {
    src: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
    alt: "Sustainable building design with green features",
  },
  {
    src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
    alt: "Architectural details and craftsmanship",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
    alt: "Interior architectural elements and lighting",
  },
];

// Basic usage
export const Default: Story = {
  args: {
    images: sampleImages,
    className: "pb-15",
  },
};

// With copyright
export const WithCopyright: Story = {
  args: {
    images: sampleImages,
    copyright: "© 2024 Toy Lovers Studio. All rights reserved.",
  },
};

// Different aspect ratios
export const MixedAspectRatios: Story = {
  args: {
    images: [
      {
        src: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
        alt: "Portrait orientation architectural detail",
      },
      {
        src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
        alt: "Landscape orientation interior space",
      },
      {
        src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
        alt: "Square format design element",
      },
      {
        src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
        alt: "Wide format panoramic view",
      },
      {
        src: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop",
        alt: "Vertical composition with leading lines",
      },
      {
        src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        alt: "Standard format product shot",
      },
    ],
    copyright: "Mixed media collection by Visual Arts Studio",
  },
};
