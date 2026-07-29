import { cn } from "../lib/cn";
import type { ButtonLook } from "../lib/looks";
import { MOTION_DEFAULTS, type ButtonMotion } from "../lib/motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "danger"
  | "link";

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonRounded = "pill" | "soft" | "md";
export type { ButtonLook, ButtonMotion };

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  /**
   * Design language (independent of semantic variant):
   * solid | soft | glass | gradient | neon
   */
  look?: ButtonLook;
  /** Interaction motion: none | lift | press | sheen | ripple */
  motion?: ButtonMotion;
  iconOnly?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: "sg-btn-primary",
  secondary: "sg-btn-secondary",
  ghost: "sg-btn-ghost",
  outline: "sg-btn-outline",
  danger: "sg-btn-danger",
  link: "sg-btn-link",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "sg-btn-sm",
  md: "",
  lg: "sg-btn-lg",
};

const roundedClass: Record<ButtonRounded, string> = {
  pill: "",
  soft: "sg-btn-rounded-soft",
  md: "sg-btn-rounded-md",
};

const lookClass: Record<ButtonLook, string> = {
  solid: "",
  soft: "sg-btn-look-soft",
  glass: "sg-btn-look-glass",
  gradient: "sg-btn-look-gradient",
  neon: "sg-btn-look-neon",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  rounded = "pill",
  look = "solid",
  motion = MOTION_DEFAULTS.button,
  iconOnly = false,
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  type = "button",
  disabled,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={cn(
        "sg-btn",
        variantClass[variant],
        sizeClass[size],
        roundedClass[rounded],
        lookClass[look],
        iconOnly && "sg-btn-icon",
        fullWidth && "sg-btn-block",
        loading && "sg-btn-loading",
        className,
      )}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      data-look={look}
      data-motion={motion}
      {...props}
    >
      {loading ? <span className="sg-btn-spinner" aria-hidden="true" /> : null}
      {leftIcon ? (
        <span className="sg-btn-icon-slot" aria-hidden="true">
          {leftIcon}
        </span>
      ) : null}
      {children}
      {rightIcon ? (
        <span className="sg-btn-icon-slot" aria-hidden="true">
          {rightIcon}
        </span>
      ) : null}
    </button>
  );
}
