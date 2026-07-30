"use client";

import { cn } from "../lib/cn";
import {
  useId,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export type SegmentedOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

export type SegmentedControlSize = "sm" | "md" | "lg";
export type SegmentedControlLook = "soft" | "solid" | "outline" | "glass";

export type SegmentedControlProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> & {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: SegmentedControlSize;
  look?: SegmentedControlLook;
  /** Accessible name for the radiogroup. */
  label?: string;
  disabled?: boolean;
  fullWidth?: boolean;
};

const sizeClass: Record<SegmentedControlSize, string> = {
  sm: "sg-segmented-sm",
  md: "",
  lg: "sg-segmented-lg",
};

const lookClass: Record<SegmentedControlLook, string> = {
  soft: "",
  solid: "sg-segmented-look-solid",
  outline: "sg-segmented-look-outline",
  glass: "sg-segmented-look-glass",
};

/**
 * Atom — SegmentedControl
 * Single-select segmented buttons (radiogroup). Not Tabs (no panels).
 */
export function SegmentedControl({
  className,
  options,
  value,
  defaultValue,
  onValueChange,
  size = "md",
  look = "soft",
  label = "Options",
  disabled = false,
  fullWidth = false,
  ...props
}: SegmentedControlProps) {
  const reactId = useId();
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(
    defaultValue ?? options[0]?.value ?? "",
  );
  const current = isControlled ? value : internal;

  function select(next: string) {
    if (disabled) return;
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const enabled = options.filter((o) => !o.disabled && !disabled);
    if (enabled.length === 0) return;
    const idx = enabled.findIndex((o) => o.value === current);
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = enabled[(idx + 1 + enabled.length) % enabled.length]!;
      select(next.value);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = enabled[(idx - 1 + enabled.length) % enabled.length]!;
      select(next.value);
    } else if (e.key === "Home") {
      e.preventDefault();
      select(enabled[0]!.value);
    } else if (e.key === "End") {
      e.preventDefault();
      select(enabled[enabled.length - 1]!.value);
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "sg-segmented",
        sizeClass[size],
        lookClass[look],
        fullWidth && "sg-segmented-block",
        className,
      )}
      data-look={look}
      data-disabled={disabled || undefined}
      onKeyDown={onKeyDown}
      {...props}
    >
      {options.map((opt) => {
        const selected = opt.value === current;
        const itemDisabled = disabled || Boolean(opt.disabled);
        return (
          <button
            key={opt.value}
            id={`${reactId}-${opt.value}`}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={itemDisabled}
            className={cn(
              "sg-segmented-item",
              selected && "sg-segmented-item-selected",
            )}
            tabIndex={selected ? 0 : -1}
            onClick={() => {
              if (itemDisabled) return;
              select(opt.value);
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export type SegmentedItemProps = ButtonHTMLAttributes<HTMLButtonElement>;
