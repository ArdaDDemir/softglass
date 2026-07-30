import { cn } from "../lib/cn";
import type { ListLook } from "../lib/looks";
import type { HTMLAttributes, ReactNode } from "react";

export type { ListLook };

export type ListDensity = "comfortable" | "compact" | "relaxed";

export type ListProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  /** soft · solid · outline · ghost · inset */
  look?: ListLook;
  density?: ListDensity;
  dividers?: boolean;
  /**
   * Default `div` for ListItem rows.
   * Use ul/ol only with real `li` children.
   */
  as?: "ul" | "div" | "ol";
};

/**
 * Molecule — List
 * Host shell for ListItem. Does not re-skin the atom.
 */
export function List({
  className,
  children,
  look = "soft",
  density = "comfortable",
  dividers = false,
  as: Comp = "div",
  ...props
}: ListProps) {
  return (
    <Comp
      className={cn("sg-list", className)}
      data-look={look}
      data-density={density === "comfortable" ? undefined : density}
      data-dividers={dividers || undefined}
      {...props}
    >
      {children}
    </Comp>
  );
}
