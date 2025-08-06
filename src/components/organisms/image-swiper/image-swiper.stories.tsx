import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImageSwiper } from "./image-swiper";

const meta: Meta<typeof ImageSwiper> = {
  title: "Components/ImageSwiper",
  component: ImageSwiper,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSlides = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&h=600&fit=crop",
    title: "Modern Architecture",
    description:
      "A stunning example of contemporary architectural design featuring clean lines and innovative materials.",
    alt: "Modern building with glass facade",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=800&fit=crop",
    title: "Urban Landscape",
    description:
      "The dynamic interplay between urban development and natural elements in modern city planning.",
    alt: "City skyline with green spaces",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&h=500&fit=crop",
    title: "Minimalist Interior",
    description:
      "Exploring the beauty of simplicity through carefully curated spaces and thoughtful design.",
    alt: "Minimalist living room interior",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&h=900&fit=crop",
    title: "Architectural Details",
    description:
      "The intricate details that define exceptional architectural craftsmanship and attention to design.",
    alt: "Detailed view of architectural elements",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
    title: "Sustainable Design",
    description:
      "How modern architecture embraces sustainability while maintaining aesthetic excellence.",
    alt: "Green building with sustainable features",
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=700&fit=crop",
    title: "Creative Spaces",
    description:
      "Innovative approaches to creating functional yet inspiring work and living environments.",
    alt: "Creative office space design",
  },
];

export const Default: Story = {
  args: {
    slides: sampleSlides,
  },
};

export const WithCustomClass: Story = {
  args: {
    slides: sampleSlides,
    className: "border border-gray-200 rounded-lg overflow-hidden shadow-lg",
  },
};
