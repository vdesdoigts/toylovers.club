import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleHeader } from "./article-header";

const meta: Meta<typeof ArticleHeader> = {
  title: "Article/Header",
  component: ArticleHeader,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A header component for articles featuring large typography, responsive layout, and support for rich descriptions. Provides optimal hierarchy and visual impact for article introductions.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
      description: "The main title of the article",
    },
    description: {
      control: { type: "text" },
      description: "The description or subtitle, can include React elements",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  args: {
    title: "Building Accessible Components",
    description:
      "A comprehensive guide to creating inclusive user interfaces that work for everyone, regardless of their abilities or the technology they use to access your application.",
    className: "py-15",
  },
};

// Short title and description
export const Short: Story = {
  args: {
    title: "Design Systems",
    description: "The foundation of consistent digital experiences.",
    className: "py-15",
  },
};

// Long title
export const LongTitle: Story = {
  args: {
    title:
      "The Complete Guide to Modern Web Development: From Design Systems to Performance Optimization",
    description:
      "Everything you need to know about building scalable, accessible, and performant web applications in today&rsquo;s development landscape.",
    className: "py-15",
  },
};
