import React from "react";

export interface BadgeProps {
  /** Badge variant */
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "neutral";
  /** Badge size */
  size?: "sm" | "md" | "lg";
  /** Badge content */
  children: React.ReactNode;
  /** Whether the badge has a dot indicator */
  dot?: boolean;
  /** Whether the badge is outlined */
  outlined?: boolean;
  /** Whether the badge is removable */
  removable?: boolean;
  /** Callback when badge is removed */
  onRemove?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Icon to display alongside text */
  icon?: React.ReactNode;
}

const Badge = ({
  variant = "neutral",
  size = "md",
  children,
  dot = false,
  outlined = false,
  removable = false,
  onRemove,
  className = "",
  icon,
  ...props
}: BadgeProps) => {
  const baseStyles =
    "inline-flex items-center gap-1 font-sans font-light transition-colors";

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
    lg: "px-3 py-1 text-base",
  };

  const variantStyles = outlined
    ? {
        primary: "text-amber-400 bg-white border border-amber-200",
        secondary: "text-gray-700 bg-gray-50 border border-gray-200",
        success: "text-green-700 bg-green-50 border border-green-200",
        warning: "text-yellow-700 bg-yellow-50 border border-yellow-200",
        danger: "text-red-700 bg-red-50 border border-red-200",
        info: "text-cyan-700 bg-cyan-50 border border-cyan-200",
        neutral: "text-gray-700 bg-gray-50 border border-gray-200",
      }
    : {
        primary: "text-white bg-amber-400",
        secondary: "text-white bg-gray-600",
        success: "text-white bg-green-600",
        warning: "text-yellow-900 bg-yellow-500",
        danger: "text-white bg-red-600",
        info: "text-white bg-cyan-600",
        neutral: "text-gray-700 bg-gray-200",
      };

  const dotSizeStyles = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  };

  const dotColors = {
    primary: "bg-amber-200",
    secondary: "bg-gray-600",
    success: "bg-green-600",
    warning: "bg-yellow-500",
    danger: "bg-red-600",
    info: "bg-cyan-600",
    neutral: "bg-gray-600",
  };

  const classes = [
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className,
  ].join(" ");

  const RemoveIcon = () => (
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
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  return (
    <span className={classes} {...props}>
      {dot && (
        <span
          className={`rounded-full ${dotSizeStyles[size]} ${dotColors[variant]}`}
        />
      )}

      {icon && <span className="flex-shrink-0">{icon}</span>}

      <span>{children}</span>

      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 flex-shrink-0 hover:bg-black/10 rounded-full p-0.5 transition-colors"
          aria-label="Remove badge"
        >
          <RemoveIcon />
        </button>
      )}
    </span>
  );
};

export default Badge;
