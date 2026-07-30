import { cn } from "../lib/cn";
import type { ToolbarLook } from "../lib/looks";
import type { HTMLAttributes, ReactNode } from "react";

export type { ToolbarLook };

export type ToolbarProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  /** soft · solid · glass · ghost · accent */
  look?: ToolbarLook;
  size?: "sm" | "md";
  align?: "start" | "between" | "end";
};

/**
 * Molecule — Toolbar
 * Action strip. Looks change chrome structure (rail / glass / bare).
 */
export function Toolbar({
  className,
  children,
  look = "soft",
  size = "md",
  align = "between",
  ...props
}: ToolbarProps) {
  return (
    <div
      role="toolbar"
      className={cn("sg-toolbar", className)}
      data-look={look}
      data-size={size === "md" ? undefined : size}
      data-align={align === "between" ? undefined : align}
      {...props}
    >
      {children}
    </div>
  );
}

export type ToolbarGroupProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  /** Visually separate this cluster (subtle frost chip). */
  inset?: boolean;
};

export function ToolbarGroup({
  className,
  children,
  inset = false,
  ...props
}: ToolbarGroupProps) {
  return (
    <div
      className={cn("sg-toolbar-group", inset && "sg-toolbar-group-inset", className)}
      role="group"
      data-inset={inset || undefined}
      {...props}
    >
      {children}
    </div>
  );
}

export type ToolbarSpacerProps = HTMLAttributes<HTMLSpanElement>;

export function ToolbarSpacer({ className, ...props }: ToolbarSpacerProps) {
  return (
    <span
      className={cn("sg-toolbar-spacer", className)}
      aria-hidden="true"
      {...props}
    />
  );
}

export type ToolbarSeparatorProps = HTMLAttributes<HTMLDivElement>;

/** Vertical rule between groups. */
export function ToolbarSeparator({ className, ...props }: ToolbarSeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      className={cn("sg-toolbar-sep", className)}
      {...props}
    />
  );
}
