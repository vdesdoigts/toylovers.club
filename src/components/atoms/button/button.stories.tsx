import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "./button";

const meta: Meta<typeof Button> = {
  title: "Design System/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile button component built with TailwindCSS for the Toy Lovers. Supports multiple variants, sizes, and states.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline"],
      description: "The visual style of the button",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "The size of the button",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the button is disabled",
    },
    children: {
      control: { type: "text" },
      description: "The content of the button",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: "Button",
  },
};

// Primary variant
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

// Secondary variant
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

// Outline variant
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

// Different sizes
export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Button",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "Medium Button",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Button",
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};

// All variants together for comparison
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All button variants displayed together for easy comparison.",
      },
    },
  },
};

// All sizes together for comparison
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All button sizes displayed together for easy comparison.",
      },
    },
  },
};
