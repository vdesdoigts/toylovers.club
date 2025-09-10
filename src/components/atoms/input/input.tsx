import React, { forwardRef } from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Input variant */
  variant?: "default" | "filled" | "outlined";
  /** Input size */
  size?: "sm" | "md" | "lg";
  /** Label for the input */
  label?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Error state and message */
  error?: boolean;
  errorMessage?: string;
  /** Success state */
  success?: boolean;
  /** Leading icon */
  leadingIcon?: React.ReactNode;
  /** Trailing icon */
  trailingIcon?: React.ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Full width */
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      size = "md",
      label,
      helperText,
      error = false,
      errorMessage,
      success = false,
      leadingIcon,
      trailingIcon,
      loading = false,
      fullWidth = false,
      className = "",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "block rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1";

    const variantStyles = {
      default: error
        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
        : success
        ? "border-green-300 focus:border-green-500 focus:ring-green-200"
        : "border-gray-300 focus:border-blue-500 focus:ring-blue-200",
      filled: error
        ? "border-transparent bg-red-50 focus:bg-white focus:border-red-500 focus:ring-red-200"
        : success
        ? "border-transparent bg-green-50 focus:bg-white focus:border-green-500 focus:ring-green-200"
        : "border-transparent bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-200",
      outlined: error
        ? "border-2 border-red-300 focus:border-red-500 focus:ring-red-200"
        : success
        ? "border-2 border-green-300 focus:border-green-500 focus:ring-green-200"
        : "border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-200",
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-4 py-3 text-lg",
    };

    const disabledStyles = disabled
      ? "opacity-50 cursor-not-allowed bg-gray-100"
      : "";
    const widthStyles = fullWidth ? "w-full" : "";

    const inputClasses = [
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      disabledStyles,
      widthStyles,
      leadingIcon ? "pl-10" : "",
      trailingIcon || loading ? "pr-10" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const labelClasses = [
      "block text-sm font-medium mb-1",
      error ? "text-red-700" : success ? "text-green-700" : "text-gray-700",
    ].join(" ");

    const helperTextClasses = [
      "mt-1 text-sm",
      error ? "text-red-600" : success ? "text-green-600" : "text-gray-500",
    ].join(" ");

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {label && <label className={labelClasses}>{label}</label>}

        <div className="relative">
          {leadingIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div
                className={
                  error
                    ? "text-red-400"
                    : success
                    ? "text-green-400"
                    : "text-gray-400"
                }
              >
                {leadingIcon}
              </div>
            </div>
          )}

          <input
            ref={ref}
            className={inputClasses}
            disabled={disabled || loading}
            {...props}
          />

          {(trailingIcon || loading) && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-blue-600 rounded-full" />
              ) : (
                <div
                  className={
                    error
                      ? "text-red-400"
                      : success
                      ? "text-green-400"
                      : "text-gray-400"
                  }
                >
                  {trailingIcon}
                </div>
              )}
            </div>
          )}
        </div>

        {(helperText || errorMessage) && (
          <p className={helperTextClasses}>
            {error && errorMessage ? errorMessage : helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
