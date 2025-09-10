import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleBody } from "./article-body";

const meta: Meta<typeof ArticleBody> = {
  title: "Article/Body",
  component: ArticleBody,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A wrapper component for article body content. Provides consistent layout with responsive margins, optimal reading width, and large, readable typography. Designed for long-form content.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: { type: "text" },
      description: "The content to be wrapped in the article body layout",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage with paragraph
export const Default: Story = {
  args: {
    children: (
      <p>
        This is a paragraph within the article body. The ArticleBody component
        provides optimal spacing and typography for long-form reading content.
        It ensures proper line length and readable text size across different
        screen sizes.
      </p>
    ),
    className: "pb-15",
  },
};

// Multiple paragraphs
export const MultipleParagraphs: Story = {
  args: {
    children: (
      <>
        <p className="mb-3">
          Design systems have become essential tools for creating consistent,
          scalable user interfaces across digital products. They provide a
          shared language between designers and developers, ensuring that visual
          elements and interactions remain coherent throughout an application.
        </p>
        <p className="mb-3">
          A well-designed system goes beyond just visual components. It
          encompasses the underlying principles, patterns, and processes that
          guide how teams build and maintain digital experiences. This includes
          everything from color palettes and typography scales to interaction
          patterns and accessibility guidelines.
        </p>
        <p className="mb-3">
          The benefits of implementing a design system are numerous: faster
          development cycles, improved consistency, better accessibility, and
          reduced maintenance overhead. Teams can focus on solving user problems
          rather than reinventing basic interface elements.
        </p>
      </>
    ),
  },
};

// Rich content with headings and lists
export const RichContent: Story = {
  args: {
    children: (
      <div>
        <h2 className="text-4xl font-sans mb-5">Key Principles</h2>
        <p>
          When building accessible components, several key principles should
          guide your approach:
        </p>
        <p className="mb-3">
          Each of these principles contributes to an inclusive user experience
          that works for everyone, regardless of their abilities or the
          technology they use to access your application.
        </p>
        <p className="mb-3">
          Implementation requires careful attention to detail and thorough
          testing with assistive technologies. This ensures that your components
          work as intended for all users.
        </p>
      </div>
    ),
  },
};
