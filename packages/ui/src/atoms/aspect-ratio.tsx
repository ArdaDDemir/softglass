import { cn } from "../lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

export type AspectRatioProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * CSS aspect-ratio value.
   * number = width/height (e.g. 16/9 → 1.777), or string "16 / 9".
   */
  ratio?: number | string;
  children?: ReactNode;
};

/**
 * Atom — AspectRatio
 * Locks child to a given aspect ratio box.
 */
export function AspectRatio({
  className,
  ratio = 16 / 9,
  children,
  style,
  ...props
}: AspectRatioProps) {
  const aspect =
    typeof ratio === "number" ? String(ratio) : ratio;

  return (
    <div
      className={cn("sg-aspect-ratio", className)}
      style={{ aspectRatio: aspect, ...style }}
      {...props}
    >
      <div className="sg-aspect-ratio-content">{children}</div>
    </div>
  );
}
