import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TightPackingGrid } from "./tight-packing-grid";

const meta: Meta<typeof TightPackingGrid> = {
  title: "Organisms/TightPackingGrid",
  component: TightPackingGrid,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    covers: {
      description:
        "Array of image covers to display in two rows (3 images per row max). Images maintain aspect ratio and fill width with no white space.",
    },
    className: {
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample covers data for stories
const sampleCovers = [
  {
    src: "/lovers/monsterlaut/monsterlaut_batman_00.jpg",
    alt: "Batman figure",
  },
  {
    src: "/lovers/monsterlaut/monsterlaut_batman_03.jpg",
    alt: "Batman in action",
  },
  { src: "/lovers/monsterlaut/monsterlaut_kamen_00.jpg", alt: "Kamen Rider" },
  {
    src: "/lovers/monsterlaut/monsterlaut_nosfe_00.jpg",
    alt: "Nosferatu figure",
  },
  { src: "/lovers/monsterlaut/monsterlaut_sup_01.jpg", alt: "Superman" },
  { src: "/lovers/monsterlaut/monsterlaut_ultraman_00.jpg", alt: "Ultraman" },
];

export const TwoFullRows: Story = {
  name: "Two Full Rows (6 images)",
  args: {
    covers: sampleCovers,
  },
};

export const PartialSecondRow: Story = {
  name: "Partial Second Row (4 images)",
  args: {
    covers: sampleCovers.slice(0, 4),
  },
};

export const AlmostTwoRows: Story = {
  name: "Almost Two Rows (5 images)",
  args: {
    covers: sampleCovers.slice(0, 5),
  },
};

export const WithCustomClass: Story = {
  args: {
    covers: sampleCovers,
    className: "max-w-4xl",
  },
};
