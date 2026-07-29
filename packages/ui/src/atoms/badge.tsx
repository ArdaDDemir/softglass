import { cn } from "../lib/cn";
import type { BadgeLook } from "../lib/looks";
import { MOTION_DEFAULTS, type BadgeMotion } from "../lib/motion";
import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant =
  | "default"
  | "accent"
  | "solid"
  | "success"
  | "warning"
  | "danger";

export type BadgeSize = "sm" | "md" | "lg";
export type { BadgeLook, BadgeMotion };

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Design: soft | solid | outline | glow */
  look?: BadgeLook;
  /** Attention motion: none | pulse | pop-in | shimmer */
  motion?: BadgeMotion;
  /** Leading status dot. */
  dot?: boolean;
  children?: ReactNode;
};

const variantClass: Record<BadgeVariant, string> = {
  default: "",
  accent: "sg-badge-accent",
  solid: "sg-badge-solid",
  success: "sg-badge-success",
  warning: "sg-badge-warning",
  danger: "sg-badge-danger",
};

const sizeClass: Record<BadgeSize, string> = {
  sm: "sg-badge-sm",
  md: "",
  lg: "sg-badge-lg",
};

const lookClass: Record<BadgeLook, string> = {
  soft: "",
  solid: "sg-badge-look-solid",
  outline: "sg-badge-look-outline",
  glow: "sg-badge-look-glow",
};

/**
 * Atom — Badge
 * Soft pill labels with semantic variants + design looks.
 */
export function Badge({
  className,
  variant = "default",
  size = "md",
  look = "soft",
  motion = MOTION_DEFAULTS.badge,
  dot = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "sg-badge",
        variantClass[variant],
        sizeClass[size],
        lookClass[look],
        dot && "sg-badge-dot",
        className,
      )}
      data-look={look}
      data-motion={motion}
      {...props}
    >
      {children}
    </span>
  );
}
