"use client";

import { cn } from "../lib/cn";
import {
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

export type CopyButtonLook = "soft" | "solid" | "outline" | "ghost";
export type CopyButtonSize = "sm" | "md" | "lg";

export type CopyButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  /** Text (or value) to copy. */
  value: string;
  look?: CopyButtonLook;
  size?: CopyButtonSize;
  /** Idle label. */
  children?: ReactNode;
  /** Label while “Copied!” is shown. */
  copiedLabel?: ReactNode;
  /** How long to show copied state (ms). */
  resetMs?: number;
  onCopied?: () => void;
  onCopyError?: (error: unknown) => void;
};

const lookClass: Record<CopyButtonLook, string> = {
  soft: "",
  solid: "sg-copy-btn-look-solid",
  outline: "sg-copy-btn-look-outline",
  ghost: "sg-copy-btn-look-ghost",
};

const sizeClass: Record<CopyButtonSize, string> = {
  sm: "sg-copy-btn-sm",
  md: "",
  lg: "sg-copy-btn-lg",
};

/**
 * Atom — CopyButton
 * Copies `value` to clipboard; brief “Copied” feedback.
 */
export function CopyButton({
  className,
  value,
  look = "soft",
  size = "md",
  children = "Copy",
  copiedLabel = "Copied",
  resetMs = 1600,
  onCopied,
  onCopyError,
  disabled,
  type = "button",
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (disabled) return;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        // Fallback for older environments / tests
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      onCopied?.();
      window.setTimeout(() => setCopied(false), resetMs);
    } catch (err) {
      onCopyError?.(err);
    }
  }

  return (
    <button
      type={type}
      className={cn(
        "sg-copy-btn",
        lookClass[look],
        sizeClass[size],
        copied && "sg-copy-btn-copied",
        className,
      )}
      data-look={look}
      data-copied={copied || undefined}
      disabled={disabled}
      aria-label={copied ? String(copiedLabel) : undefined}
      onClick={copy}
      {...props}
    >
      {copied ? copiedLabel : children}
    </button>
  );
}
