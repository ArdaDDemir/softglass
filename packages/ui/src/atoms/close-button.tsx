import { cn } from "../lib/cn";
import type { CloseButtonLook } from "../lib/looks";
import type { ButtonHTMLAttributes } from "react";

export type CloseButtonSize = "sm" | "md" | "lg";
export type { CloseButtonLook };

export type CloseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: CloseButtonSize;
  look?: CloseButtonLook;
  /** Accessible name. Default "Close". */
  label?: string;
};

const sizeClass: Record<CloseButtonSize, string> = {
  sm: "sg-close-btn-sm",
  md: "",
  lg: "sg-close-btn-lg",
};

const lookClass: Record<CloseButtonLook, string> = {
  ghost: "",
  soft: "sg-close-btn-look-soft",
  solid: "sg-close-btn-look-solid",
  danger: "sg-close-btn-look-danger",
};

/**
 * Atom — CloseButton
 * Shared dismiss control for Chip, panels, chrome.
 */
export function CloseButton({
  className,
  size = "md",
  look = "ghost",
  label = "Close",
  type = "button",
  ...props
}: CloseButtonProps) {
  return (
    <button
      type={type}
      className={cn("sg-close-btn", sizeClass[size], lookClass[look], className)}
      data-look={look}
      aria-label={label}
      {...props}
    >
      <span className="sg-close-btn-glyph" aria-hidden="true">
        ×
      </span>
    </button>
  );
}
