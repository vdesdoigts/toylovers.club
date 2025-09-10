import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleVideo } from "./article-video";

const meta: Meta<typeof ArticleVideo> = {
  title: "Article/Video",
  component: ArticleVideo,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A video component designed for articles with responsive layout and caption support. Features standard video controls and consistent spacing that matches other article components.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: { type: "text" },
      description: "The video source URL (MP4 format)",
    },
    caption: {
      control: { type: "text" },
      description: "Caption text displayed below the video",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  args: {
    src: "/video-demo.mp4",
    caption:
      "A demonstration video showcasing the design process and key features.",
    className: "pb-15",
  },
};

// Long caption
export const LongCaption: Story = {
  args: {
    src: "/video-demo.mp4",
    caption:
      "This comprehensive video walkthrough covers the entire development lifecycle, from initial planning and design iterations through implementation, testing, and deployment. We&rsquo;ll explore best practices for component architecture, state management, and performance optimization.",
  },
};

// No caption
export const NoCaption: Story = {
  args: {
    src: "/video-demo.mp4",
    caption: "",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Video without caption text for cases where context is provided elsewhere.",
      },
    },
  },
};
