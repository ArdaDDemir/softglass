"use client";

import { cn } from "../lib/cn";
import type { ChipLook } from "../lib/looks";
import {
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type ChipSize = "sm" | "md" | "lg";
/** Semantic chip role: filter = multi-filter, check = checkmark when selected */
export type ChipVariant = "default" | "filter" | "check";
export type { ChipLook };

export type ChipProps = Omit<HTMLAttributes<HTMLSpanElement>, "onClick"> & {
  children?: ReactNode;
  size?: ChipSize;
  look?: ChipLook;
  variant?: ChipVariant;
  selected?: boolean;
  defaultSelected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  removable?: boolean;
  onRemove?: () => void;
  removeLabel?: string;
  /**
   * When true (default), clicking the label toggles selection.
   * Static tags: interactive={false} + removable.
   */
  interactive?: boolean;
  leading?: ReactNode;
  disabled?: boolean;
};

const sizeClass: Record<ChipSize, string> = {
  sm: "sg-chip-sm",
  md: "",
  lg: "sg-chip-lg",
};

const lookClass: Record<ChipLook, string> = {
  soft: "",
  solid: "sg-chip-look-solid",
  outline: "sg-chip-look-outline",
  glass: "sg-chip-look-glass",
  glow: "sg-chip-look-glow",
};

const variantClass: Record<ChipVariant, string> = {
  default: "",
  filter: "sg-chip-variant-filter",
  check: "sg-chip-variant-check",
};

/**
 * Atom — Chip
 * Selectable / removable pill. Outer span + sibling controls (no nested buttons).
 */
export function Chip({
  className,
  children,
  size = "md",
  look = "soft",
  variant = "default",
  selected,
  defaultSelected = false,
  onSelectedChange,
  removable = false,
  onRemove,
  removeLabel = "Remove",
  interactive = true,
  leading,
  disabled = false,
  ...props
}: ChipProps) {
  const isControlled = selected !== undefined;
  const [internal, setInternal] = useState(defaultSelected);
  const isSelected = isControlled ? Boolean(selected) : internal;

  function toggle() {
    if (disabled || !interactive) return;
    const next = !isSelected;
    if (!isControlled) setInternal(next);
    onSelectedChange?.(next);
  }

  const leadingNode =
    leading ??
    (variant === "check" && isSelected ? (
      <span className="sg-chip-check" aria-hidden="true">
        ✓
      </span>
    ) : null);

  return (
    <span
      className={cn(
        "sg-chip",
        sizeClass[size],
        lookClass[look],
        variantClass[variant],
        isSelected && "sg-chip-selected",
        removable && "sg-chip-removable",
        disabled && "sg-chip-disabled",
        className,
      )}
      data-look={look}
      data-variant={variant}
      data-selected={isSelected ? "true" : "false"}
      data-disabled={disabled ? "true" : undefined}
      {...props}
    >
      {interactive ? (
        <button
          type="button"
          className="sg-chip-trigger"
          aria-pressed={isSelected}
          disabled={disabled}
          onClick={toggle}
        >
          {leadingNode ? (
            <span className="sg-chip-leading" aria-hidden="true">
              {leadingNode}
            </span>
          ) : null}
          <span className="sg-chip-label">{children}</span>
        </button>
      ) : (
        <span className="sg-chip-static">
          {leadingNode ? (
            <span className="sg-chip-leading" aria-hidden="true">
              {leadingNode}
            </span>
          ) : null}
          <span className="sg-chip-label">{children}</span>
        </span>
      )}
      {removable ? (
        <button
          type="button"
          className="sg-chip-x"
          disabled={disabled}
          aria-label={removeLabel}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (disabled) return;
            onRemove?.();
          }}
        >
          <span aria-hidden="true">×</span>
        </button>
      ) : null}
    </span>
  );
}
