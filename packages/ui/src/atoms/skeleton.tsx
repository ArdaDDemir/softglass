import { cn } from "../lib/cn";
import type { CSSProperties, HTMLAttributes } from "react";

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  /** Optional fixed width (number = px, or CSS string). */
  width?: number | string;
  /** Optional fixed height (number = px, or CSS string). */
  height?: number | string;
  /** Circle avatar placeholder. */
  circle?: boolean;
  /** Rounded pill shape. */
  rounded?: "sm" | "md" | "lg" | "full";
};

/**
 * Atom — Skeleton
 * Soft shimmer placeholder while content loads.
 */
export function Skeleton({
  className,
  width,
  height,
  circle = false,
  rounded = "md",
  style,
  ...props
}: SkeletonProps) {
  const inline: CSSProperties = {
    ...style,
    width: width === undefined ? style?.width : typeof width === "number" ? `${width}px` : width,
    height:
      height === undefined ? style?.height : typeof height === "number" ? `${height}px` : height,
  };

  return (
    <div
      className={cn(
        "sg-skeleton",
        circle && "sg-skeleton-circle",
        !circle && rounded === "sm" && "sg-skeleton-rounded-sm",
        !circle && rounded === "md" && "sg-skeleton-rounded-md",
        !circle && rounded === "lg" && "sg-skeleton-rounded-lg",
        !circle && rounded === "full" && "sg-skeleton-rounded-full",
        className,
      )}
      style={inline}
      aria-hidden="true"
      {...props}
    />
  );
}
