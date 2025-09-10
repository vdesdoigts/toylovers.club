import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Badge from "./badge";

// Mock icons for demonstration
const StarIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const BellIcon = () => (
  <svg
    className="w-3 h-3"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

const meta: Meta<typeof Badge> = {
  title: "Design System/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile badge component for displaying status, labels, or notifications. Supports various styles, sizes, and interactive features.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "info",
        "neutral",
      ],
      description: "The color variant of the badge",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "The size of the badge",
    },
    outlined: {
      control: { type: "boolean" },
      description: "Whether the badge has an outlined style",
    },
    dot: {
      control: { type: "boolean" },
      description: "Whether to show a dot indicator",
    },
    removable: {
      control: { type: "boolean" },
      description: "Whether the badge can be removed",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic badge
export const Default: Story = {
  args: {
    children: "Badge",
  },
};

// Different variants
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Success",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Danger",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "Info",
  },
};

// Different sizes
export const Small: Story = {
  args: {
    size: "sm",
    variant: "primary",
    children: "Small",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    variant: "primary",
    children: "Medium",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    variant: "primary",
    children: "Large",
  },
};

// Outlined badges
export const Outlined: Story = {
  args: {
    variant: "primary",
    outlined: true,
    children: "Outlined",
  },
};

// With dot indicator
export const WithDot: Story = {
  args: {
    variant: "success",
    dot: true,
    children: "Online",
  },
};

// With icon
export const WithIcon: Story = {
  args: {
    variant: "warning",
    icon: <StarIcon />,
    children: "Featured",
  },
};

// Removable badge
export const Removable: Story = {
  args: {
    variant: "info",
    removable: true,
    children: "Removable",
    onRemove: () => alert("Badge removed!"),
  },
};

// Badge collection - all variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="neutral">Neutral</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All badge variants displayed together for easy comparison.",
      },
    },
  },
};

// Badge collection - outlined
export const AllOutlined: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="primary" outlined>
        Primary
      </Badge>
      <Badge variant="secondary" outlined>
        Secondary
      </Badge>
      <Badge variant="success" outlined>
        Success
      </Badge>
      <Badge variant="warning" outlined>
        Warning
      </Badge>
      <Badge variant="danger" outlined>
        Danger
      </Badge>
      <Badge variant="info" outlined>
        Info
      </Badge>
      <Badge variant="neutral" outlined>
        Neutral
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All badge variants in outlined style.",
      },
    },
  },
};

// Badge sizes comparison
export const SizeComparison: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge variant="primary" size="sm">
        Small
      </Badge>
      <Badge variant="primary" size="md">
        Medium
      </Badge>
      <Badge variant="primary" size="lg">
        Large
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badge sizes displayed side by side for comparison.",
      },
    },
  },
};

// Status indicators
export const StatusIndicators: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="success" dot>
        Online
      </Badge>
      <Badge variant="warning" dot>
        Away
      </Badge>
      <Badge variant="danger" dot>
        Offline
      </Badge>
      <Badge variant="info" dot>
        Busy
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Using badges as status indicators with dot indicators.",
      },
    },
  },
};

// Notification badges
export const Notifications: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="relative">
        <BellIcon />
        <Badge variant="danger" size="sm" className="absolute -top-1 -right-1">
          3
        </Badge>
      </div>
      <div className="relative">
        <HeartIcon />
        <Badge variant="primary" size="sm" className="absolute -top-1 -right-1">
          12
        </Badge>
      </div>
      <div className="relative">
        <StarIcon />
        <Badge variant="success" size="sm" className="absolute -top-1 -right-1">
          99+
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Using badges as notification indicators positioned on icons.",
      },
    },
  },
};

// Tag-like badges
export const Tags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant="neutral"
        removable
        onRemove={() => console.log("React removed")}
      >
        React
      </Badge>
      <Badge
        variant="neutral"
        removable
        onRemove={() => console.log("TypeScript removed")}
      >
        TypeScript
      </Badge>
      <Badge
        variant="neutral"
        removable
        onRemove={() => console.log("Tailwind removed")}
      >
        Tailwind
      </Badge>
      <Badge
        variant="neutral"
        removable
        onRemove={() => console.log("Storybook removed")}
      >
        Storybook
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Using badges as removable tags for categories or skills.",
      },
    },
  },
};

// Complex example
export const ComplexExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">User Profile</h3>
        <div className="flex items-center gap-2">
          <span>John Doe</span>
          <Badge variant="success" dot size="sm">
            Online
          </Badge>
          <Badge variant="warning" outlined size="sm">
            Premium
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Project Status</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="info" icon={<StarIcon />}>
            High Priority
          </Badge>
          <Badge variant="success">In Progress</Badge>
          <Badge variant="neutral" size="sm">
            3 tasks left
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="neutral" removable>
            JavaScript
          </Badge>
          <Badge variant="neutral" removable>
            React
          </Badge>
          <Badge variant="neutral" removable>
            Node.js
          </Badge>
          <Badge variant="neutral" removable>
            Python
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A complex example showing various badge use cases in a realistic interface.",
      },
    },
  },
};
