import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleBlockquote } from "./article-blockquote";

const meta: Meta<typeof ArticleBlockquote> = {
  title: "Article/Blockquote",
  component: ArticleBlockquote,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A blockquote component designed for articles. Features responsive layout with centered content, large typography, and author attribution. Optimized for readability and visual impact.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    quote: {
      control: { type: "text" },
      description: "The quote text to display",
    },
    author: {
      control: { type: "text" },
      description: "The author or source of the quote",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  args: {
    quote:
      "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs",
    className: "pb-15",
  },
};

// Short quote
export const ShortQuote: Story = {
  args: {
    quote: "Less is more.",
    author: "Ludwig Mies van der Rohe",
  },
};

// Long quote
export const LongQuote: Story = {
  args: {
    quote:
      "The details are not the details. They make the design. The whole beauty of the design is in the details. You have to think about all the small things, because they create the whole experience.",
    author: "Charles Eames",
  },
};

// Different authors showcase
export const AuthorShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <ArticleBlockquote
        quote="Simplicity is the ultimate sophistication."
        author="Leonardo da Vinci"
      />
      <ArticleBlockquote
        quote="The best way to predict the future is to invent it."
        author="Alan Kay"
      />
      <ArticleBlockquote
        quote="Design is a solution to a problem. Art is a question to a problem."
        author="John Maeda"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Multiple blockquotes from different notable figures in design and technology.",
      },
    },
  },
};
