"use client";

import { cn } from "../lib/cn";
import {
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type ToggleGroupLook = "soft" | "solid" | "outline" | "glass";
export type ToggleGroupSize = "sm" | "md" | "lg";
export type ToggleGroupType = "single" | "multiple";

export type ToggleGroupOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

export type ToggleGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> & {
  options: ToggleGroupOption[];
  type?: ToggleGroupType;
  /** single: string; multiple: string[] */
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  look?: ToggleGroupLook;
  size?: ToggleGroupSize;
  label?: string;
  disabled?: boolean;
  fullWidth?: boolean;
};

const lookClass: Record<ToggleGroupLook, string> = {
  soft: "",
  solid: "sg-toggle-group-look-solid",
  outline: "sg-toggle-group-look-outline",
  glass: "sg-toggle-group-look-glass",
};

const sizeClass: Record<ToggleGroupSize, string> = {
  sm: "sg-toggle-group-sm",
  md: "",
  lg: "sg-toggle-group-lg",
};

function asArray(v: string | string[] | undefined): string[] {
  if (v === undefined) return [];
  return Array.isArray(v) ? v : v ? [v] : [];
}

/**
 * Atom — ToggleGroup
 * Single or multi select button group (not Tabs, not Segmented form of range).
 */
export function ToggleGroup({
  className,
  options,
  type = "single",
  value,
  defaultValue,
  onValueChange,
  look = "soft",
  size = "md",
  label = "Options",
  disabled = false,
  fullWidth = false,
  ...props
}: ToggleGroupProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string[]>(
    asArray(defaultValue ?? (type === "single" ? options[0]?.value : [])),
  );
  const selected = asArray(isControlled ? value : internal);

  function isOn(v: string) {
    return selected.includes(v);
  }

  function toggle(v: string) {
    if (disabled) return;
    let next: string[];
    if (type === "single") {
      next = [v];
    } else {
      next = isOn(v) ? selected.filter((x) => x !== v) : [...selected, v];
    }
    if (!isControlled) setInternal(next);
    onValueChange?.(type === "single" ? (next[0] ?? "") : next);
  }

  return (
    <div
      role={type === "single" ? "radiogroup" : "group"}
      aria-label={label}
      className={cn(
        "sg-toggle-group",
        lookClass[look],
        sizeClass[size],
        fullWidth && "sg-toggle-group-block",
        className,
      )}
      data-look={look}
      data-type={type}
      data-disabled={disabled || undefined}
      {...props}
    >
      {options.map((opt) => {
        const on = isOn(opt.value);
        const itemDisabled = disabled || Boolean(opt.disabled);
        return (
          <button
            key={opt.value}
            type="button"
            role={type === "single" ? "radio" : "button"}
            aria-checked={type === "single" ? on : undefined}
            aria-pressed={type === "multiple" ? on : undefined}
            disabled={itemDisabled}
            className={cn("sg-toggle-group-item", on && "sg-toggle-group-item-on")}
            onClick={() => toggle(opt.value)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export type ToggleGroupItemProps = ButtonHTMLAttributes<HTMLButtonElement>;
