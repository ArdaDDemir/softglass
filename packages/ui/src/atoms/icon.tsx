import { cn } from "../lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

export type IconSize = "sm" | "md" | "lg" | "xl";
export type IconLook = "soft" | "solid" | "outline" | "ghost";

export type IconProps = HTMLAttributes<HTMLSpanElement> & {
  /** Icon content (SVG / emoji / node). No icon set ships with Softglass. */
  children?: ReactNode;
  size?: IconSize;
  look?: IconLook;
  /** Accessible name. When set, role=img; else aria-hidden. */
  label?: string;
};

const sizeClass: Record<IconSize, string> = {
  sm: "sg-icon-sm",
  md: "",
  lg: "sg-icon-lg",
  xl: "sg-icon-xl",
};

const lookClass: Record<IconLook, string> = {
  soft: "",
  solid: "sg-icon-look-solid",
  outline: "sg-icon-look-outline",
  ghost: "sg-icon-look-ghost",
};

/**
 * Atom — Icon
 * Wrapper only — no icon pack. Slot your SVG or glyph as children.
 */
export function Icon({
  className,
  children,
  size = "md",
  look = "soft",
  label,
  ...props
}: IconProps) {
  const decorative = !label;

  return (
    <span
      className={cn("sg-icon", sizeClass[size], lookClass[look], className)}
      data-look={look}
      role={decorative ? undefined : "img"}
      aria-label={label}
      aria-hidden={decorative || undefined}
      {...props}
    >
      {children}
    </span>
  );
}
