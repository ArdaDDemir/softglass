import { cn } from "../lib/cn";
import type { HTMLAttributes } from "react";

export type CountBadgeLook = "soft" | "solid" | "outline" | "danger";
export type CountBadgeSize = "sm" | "md" | "lg";

export type CountBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  /** Numeric count (or any short content). */
  count: number | string;
  /** Cap display e.g. 99 → 99+ when count > max. */
  max?: number;
  look?: CountBadgeLook;
  size?: CountBadgeSize;
  /** Hide when count is 0. Default true. */
  hideZero?: boolean;
};

const lookClass: Record<CountBadgeLook, string> = {
  soft: "",
  solid: "sg-count-badge-look-solid",
  outline: "sg-count-badge-look-outline",
  danger: "sg-count-badge-look-danger",
};

const sizeClass: Record<CountBadgeSize, string> = {
  sm: "sg-count-badge-sm",
  md: "",
  lg: "sg-count-badge-lg",
};

function formatCount(count: number | string, max?: number) {
  if (typeof count !== "number" || max === undefined) return String(count);
  if (count > max) return `${max}+`;
  return String(count);
}

/**
 * Atom — CountBadge
 * Compact numeric pill (notifications, carts). Complements Badge.
 */
export function CountBadge({
  className,
  count,
  max,
  look = "soft",
  size = "md",
  hideZero = true,
  ...props
}: CountBadgeProps) {
  if (hideZero && count === 0) return null;

  return (
    <span
      className={cn(
        "sg-count-badge",
        lookClass[look],
        sizeClass[size],
        className,
      )}
      data-look={look}
      {...props}
    >
      {formatCount(count, max)}
    </span>
  );
}
