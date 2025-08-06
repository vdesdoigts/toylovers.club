import React from "react";

export interface CardProps {
  /** Card variant */
  variant?: "default" | "elevated" | "outlined" | "filled";
  /** Card padding size */
  padding?: "none" | "sm" | "md" | "lg";
  /** Card content */
  children: React.ReactNode;
  /** Optional header content */
  header?: React.ReactNode;
  /** Optional footer content */
  footer?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Click handler for interactive cards */
  onClick?: () => void;
  /** Whether the card is hoverable */
  hoverable?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

const Card = ({
  variant = "default",
  padding = "md",
  children,
  header,
  footer,
  className = "",
  onClick,
  hoverable = false,
  disabled = false,
  ...props
}: CardProps) => {
  const baseStyles = "rounded-lg transition-all duration-200";

  const variantStyles = {
    default: "bg-white border border-gray-200",
    elevated: "bg-white shadow-md",
    outlined: "bg-white border-2 border-gray-300",
    filled: "bg-gray-50 border border-gray-200",
  };

  const paddingStyles = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const interactiveStyles =
    onClick || hoverable
      ? "cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
      : "";

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  const classes = [
    baseStyles,
    variantStyles[variant],
    paddingStyles[padding],
    interactiveStyles,
    disabledStyles,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const cardContent = (
    <>
      {header && (
        <div className="mb-4 pb-3 border-b border-gray-200">{header}</div>
      )}
      <div className="flex flex-col flex-1">{children}</div>
      {footer && (
        <div className="mt-4 pt-3 border-t border-gray-200">{footer}</div>
      )}
    </>
  );

  return (
    <div
      className={`c-card`}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {cardContent}
    </div>
  );
};

export default Card;
