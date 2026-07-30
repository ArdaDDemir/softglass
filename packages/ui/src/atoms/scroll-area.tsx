import { cn } from "../lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

export type ScrollAreaLook = "soft" | "solid" | "ghost";

export type ScrollAreaProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  look?: ScrollAreaLook;
  /** Max height (number = px). */
  maxHeight?: number | string;
  orientation?: "vertical" | "horizontal" | "both";
};

const lookClass: Record<ScrollAreaLook, string> = {
  soft: "",
  solid: "sg-scroll-area-look-solid",
  ghost: "sg-scroll-area-look-ghost",
};

/**
 * Atom — ScrollArea
 * Lightweight overflow region with soft scrollbar skin. Not a virtual list.
 */
export function ScrollArea({
  className,
  children,
  look = "soft",
  maxHeight = 220,
  orientation = "vertical",
  style,
  ...props
}: ScrollAreaProps) {
  const height =
    typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;

  return (
    <div
      className={cn(
        "sg-scroll-area",
        lookClass[look],
        orientation === "horizontal" && "sg-scroll-area-x",
        orientation === "both" && "sg-scroll-area-both",
        className,
      )}
      data-look={look}
      style={{
        maxHeight: orientation === "horizontal" ? undefined : height,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
