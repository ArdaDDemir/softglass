import { cn } from "../lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

export type KbdSize = "sm" | "md" | "lg";
export type KbdLook = "soft" | "solid" | "outline" | "glass";

export type KbdProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  size?: KbdSize;
  look?: KbdLook;
};

const sizeClass: Record<KbdSize, string> = {
  sm: "sg-kbd-sm",
  md: "",
  lg: "sg-kbd-lg",
};

const lookClass: Record<KbdLook, string> = {
  soft: "",
  solid: "sg-kbd-look-solid",
  outline: "sg-kbd-look-outline",
  glass: "sg-kbd-look-glass",
};

/**
 * Atom — Kbd
 * Keyboard key glyph for docs and shortcuts.
 */
export function Kbd({
  className,
  children,
  size = "md",
  look = "soft",
  ...props
}: KbdProps) {
  return (
    <kbd
      className={cn("sg-kbd", sizeClass[size], lookClass[look], className)}
      data-look={look}
      {...props}
    >
      {children}
    </kbd>
  );
}
