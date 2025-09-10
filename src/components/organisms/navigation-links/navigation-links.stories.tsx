import type { Article } from "@/lib/mdx";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NavigationLinks } from "./navigation-links";

// Mock articles data for stories
const mockArticles: Article[] = [
  {
    slug: "photography-spotlight",
    metadata: {
      title: "Photography Spotlight: Action Figures",
      instagram: "@photographer1",
      description: "Amazing action figure photography",
      publishedAt: "2024-01-15",
      covers: [],
    },
    content: "",
  },
  {
    slug: "behind-the-scenes",
    metadata: {
      title: "Behind the Scenes: Creative Process",
      instagram: "@photographer2",
      description: "The creative process behind great shots",
      publishedAt: "2024-01-10",
      covers: [],
    },
    content: "",
  },
  {
    slug: "lighting-techniques",
    metadata: {
      title: "Mastering Lighting Techniques",
      instagram: "@photographer3",
      description: "Professional lighting for toy photography",
      publishedAt: "2024-01-05",
      covers: [],
    },
    content: "",
  },
];

const meta: Meta<typeof NavigationLinks> = {
  title: "Organisms/NavigationLinks",
  component: NavigationLinks,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#000000",
        },
      ],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    articles: mockArticles,
  },
  decorators: [
    (Story) => (
      <div className="bg-black p-4">
        <Story />
      </div>
    ),
  ],
};

export const InNavigationBar: Story = {
  args: {
    articles: mockArticles,
  },
  decorators: [
    (Story) => (
      <nav className="fixed w-full flex flex-row items-center justify-between top-0 z-50 h-[54px] bg-black">
        <div className="h-full flex flex-row items-center text-white">
          <div className="h-full w-[100px] flex flex-row justify-center items-center border-r border-[#212128]">
            <div className="text-white font-bold">LOGO</div>
          </div>
          <div className="h-full w-[54px] flex justify-center items-center cursor-pointer">
            <div className="w-6 h-6 text-white">☰</div>
          </div>
          <div>
            <span className="font-sans text-sm">
              1/3 interviews — Photography Spotlight: Action Figures
            </span>
          </div>
        </div>
        <div>
          <Story />
        </div>
      </nav>
    ),
  ],
};

export const WithSingleArticle: Story = {
  args: {
    articles: [mockArticles[0]], // Only one article - should disable navigation
  },
  decorators: [
    (Story) => (
      <div className="bg-black p-4">
        <Story />
      </div>
    ),
  ],
};

export const EmptyArticles: Story = {
  args: {
    articles: [], // No articles - should disable all navigation
  },
  decorators: [
    (Story) => (
      <div className="bg-black p-4">
        <Story />
      </div>
    ),
  ],
};
