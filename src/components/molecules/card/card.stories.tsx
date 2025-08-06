import { Button } from "@/components";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Card from "./card";

const meta: Meta<typeof Card> = {
  title: "Design System/Card",
  component: Card,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A flexible card component that can contain various types of content. Perfect for displaying grouped information, product details, or interactive content blocks.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "elevated", "outlined", "filled"],
      description: "The visual style of the card",
    },
    padding: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg"],
      description: "The padding size inside the card",
    },
    hoverable: {
      control: { type: "boolean" },
      description: "Whether the card has hover effects",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the card is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic card
export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Card Title</h3>
        <p className="text-gray-600">
          This is a basic card with some content. Cards are flexible containers
          that can hold various types of information.
        </p>
      </div>
    ),
  },
};

// Card with header and footer
export const WithHeaderAndFooter: Story = {
  args: {
    header: <h2 className="text-xl font-bold text-gray-900">Product Card</h2>,
    children: (
      <div>
        <p className="text-gray-600 mb-4">
          A comprehensive product description that explains the features and
          benefits of this particular item.
        </p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-green-600">$29.99</span>
          <span className="text-sm text-gray-500">In Stock</span>
        </div>
      </div>
    ),
    footer: (
      <div className="flex gap-2">
        <Button variant="primary" size="sm">
          Add to Cart
        </Button>
        <Button variant="outline" size="sm">
          Wishlist
        </Button>
      </div>
    ),
  },
};

// Different variants
export const Elevated: Story = {
  args: {
    variant: "elevated",
    children: (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Elevated Card
        </h3>
        <p className="text-gray-600">
          This card has a subtle shadow for emphasis.
        </p>
      </div>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Outlined Card
        </h3>
        <p className="text-gray-600">
          This card has a thicker border for definition.
        </p>
      </div>
    ),
  },
};

export const Filled: Story = {
  args: {
    variant: "filled",
    children: (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Filled Card
        </h3>
        <p className="text-gray-600">
          This card has a background fill for subtle emphasis.
        </p>
      </div>
    ),
  },
};

// Interactive card
export const Interactive: Story = {
  args: {
    variant: "elevated",
    hoverable: true,
    onClick: () => alert("Card clicked!"),
    children: (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Interactive Card
        </h3>
        <p className="text-gray-600">
          Click me! This card responds to user interaction.
        </p>
      </div>
    ),
  },
};

// Different padding sizes
export const SmallPadding: Story = {
  args: {
    padding: "sm",
    children: (
      <div>
        <h4 className="font-semibold text-gray-900">Compact Card</h4>
        <p className="text-sm text-gray-600">
          Less padding for compact layouts.
        </p>
      </div>
    ),
  },
};

export const LargePadding: Story = {
  args: {
    padding: "lg",
    children: (
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Spacious Card
        </h3>
        <p className="text-gray-600">
          More padding for comfortable reading and visual breathing room.
        </p>
      </div>
    ),
  },
};

// Card gallery
export const CardGallery: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card variant="default">
        <h3 className="font-semibold mb-2">Default Card</h3>
        <p className="text-sm text-gray-600">Standard card styling</p>
      </Card>
      <Card variant="elevated">
        <h3 className="font-semibold mb-2">Elevated Card</h3>
        <p className="text-sm text-gray-600">With subtle shadow</p>
      </Card>
      <Card variant="outlined">
        <h3 className="font-semibold mb-2">Outlined Card</h3>
        <p className="text-sm text-gray-600">With border emphasis</p>
      </Card>
      <Card variant="filled">
        <h3 className="font-semibold mb-2">Filled Card</h3>
        <p className="text-sm text-gray-600">With background fill</p>
      </Card>
      <Card variant="elevated" hoverable>
        <h3 className="font-semibold mb-2">Hoverable Card</h3>
        <p className="text-sm text-gray-600">Try hovering over me!</p>
      </Card>
      <Card variant="default" disabled>
        <h3 className="font-semibold mb-2">Disabled Card</h3>
        <p className="text-sm text-gray-600">Cannot be interacted with</p>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A gallery showing all card variants and states for easy comparison.",
      },
    },
  },
};
