import { cn } from "../lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ColorSwatchSize = "sm" | "md" | "lg";
export type ColorSwatchLook = "soft" | "solid" | "outline" | "glass";

export type ColorSwatchProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** CSS color (hex/rgb/var). */
  color: string;
  size?: ColorSwatchSize;
  look?: ColorSwatchLook;
  selected?: boolean;
  /** Accessible name. Defaults to color string. */
  label?: string;
  children?: ReactNode;
};

const sizeClass: Record<ColorSwatchSize, string> = {
  sm: "sg-swatch-sm",
  md: "",
  lg: "sg-swatch-lg",
};

const lookClass: Record<ColorSwatchLook, string> = {
  soft: "",
  solid: "sg-swatch-look-solid",
  outline: "sg-swatch-look-outline",
  glass: "sg-swatch-look-glass",
};

/**
 * Atom — ColorSwatch
 * Clickable color chip for palettes.
 */
export function ColorSwatch({
  className,
  color,
  size = "md",
  look = "soft",
  selected = false,
  label,
  type = "button",
  style,
  ...props
}: ColorSwatchProps) {
  return (
    <button
      type={type}
      className={cn(
        "sg-swatch",
        sizeClass[size],
        lookClass[look],
        selected && "sg-swatch-selected",
        className,
      )}
      data-look={look}
      data-selected={selected || undefined}
      aria-label={label ?? color}
      aria-pressed={selected}
      style={{ ...style, ["--sg-swatch-color" as string]: color }}
      {...props}
    >
      <span className="sg-swatch-fill" aria-hidden="true" />
    </button>
  );
}
