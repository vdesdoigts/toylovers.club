import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Input from "./input";

// Mock icons for demonstration
const SearchIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const EyeIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const meta: Meta<typeof Input> = {
  title: "Design System/Input",
  component: Input,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A versatile input component with support for various states, icons, and validation. Perfect for forms and data entry interfaces.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "filled", "outlined"],
      description: "The visual style of the input",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "The size of the input",
    },
    error: {
      control: { type: "boolean" },
      description: "Whether the input is in error state",
    },
    success: {
      control: { type: "boolean" },
      description: "Whether the input is in success state",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the input is disabled",
    },
    loading: {
      control: { type: "boolean" },
      description: "Whether the input is in loading state",
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Whether the input takes full width",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic input
export const Default: Story = {
  args: {
    placeholder: "Enter text here...",
  },
};

// With label and helper text
export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email",
    helperText: "We'll never share your email with anyone else.",
    type: "email",
  },
};

// Different variants
export const Filled: Story = {
  args: {
    variant: "filled",
    label: "Search Query",
    placeholder: "What are you looking for?",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    label: "Username",
    placeholder: "Enter username",
  },
};

// Different sizes
export const Small: Story = {
  args: {
    size: "sm",
    label: "Compact Input",
    placeholder: "Small input field",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "Large Input",
    placeholder: "Large input field",
  },
};

// With icons
export const WithLeadingIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search for anything...",
    leadingIcon: <SearchIcon />,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    trailingIcon: <EyeIcon />,
  },
};

export const WithBothIcons: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    leadingIcon: <UserIcon />,
    trailingIcon: <CheckIcon />,
    success: true,
  },
};

// States
export const ErrorState: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    error: true,
    errorMessage: "Please enter a valid email address",
    value: "invalid-email",
  },
};

export const SuccessState: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    success: true,
    helperText: "Username is available!",
    value: "john_doe_2024",
    trailingIcon: <CheckIcon />,
  },
};

export const DisabledState: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "This input is disabled",
    disabled: true,
    value: "Cannot edit this",
  },
};

export const LoadingState: Story = {
  args: {
    label: "Username",
    placeholder: "Checking availability...",
    loading: true,
    value: "checking_username",
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    label: "Full Width Input",
    placeholder: "This input takes the full width",
    fullWidth: true,
    helperText: "This input will expand to fill the available space",
  },
};

// Form example
export const FormExample: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <Input label="First Name" placeholder="Enter your first name" fullWidth />
      <Input label="Last Name" placeholder="Enter your last name" fullWidth />
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        leadingIcon={<UserIcon />}
        fullWidth
        helperText="We'll use this to send you updates"
      />
      <Input
        label="Password"
        type="password"
        placeholder="Create a strong password"
        trailingIcon={<EyeIcon />}
        fullWidth
        helperText="Must be at least 8 characters long"
      />
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        success
        trailingIcon={<CheckIcon />}
        fullWidth
        helperText="Passwords match!"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example of multiple inputs in a form layout with various states and configurations.",
      },
    },
  },
};

// Input variants comparison
export const VariantComparison: Story = {
  render: () => (
    <div className="space-y-6">
      <Input
        variant="default"
        label="Default Variant"
        placeholder="Default input style"
        fullWidth
      />
      <Input
        variant="filled"
        label="Filled Variant"
        placeholder="Filled input style"
        fullWidth
      />
      <Input
        variant="outlined"
        label="Outlined Variant"
        placeholder="Outlined input style"
        fullWidth
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of all input variants side by side.",
      },
    },
  },
};
