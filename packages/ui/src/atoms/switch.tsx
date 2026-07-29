"use client";

import { cn } from "../lib/cn";
import type { SwitchLook } from "../lib/looks";
import { MOTION_DEFAULTS, type SwitchMotion } from "../lib/motion";
import {
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { useId } from "react";

export type { SwitchLook, SwitchMotion };

export type SwitchProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange" | "role"
> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: ReactNode;
  hint?: ReactNode;
  /** Design: track | ios | minimal */
  look?: SwitchLook;
  /** Thumb travel: none | snap | spring | elastic */
  motion?: SwitchMotion;
};

/**
 * Atom — Switch
 * Soft glass track; accent when on. role="switch" for a11y.
 */
export function Switch({
  className,
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  hint,
  look = "track",
  motion = MOTION_DEFAULTS.switch,
  disabled,
  id,
  ...props
}: SwitchProps) {
  const reactId = useId();
  const switchId = id ?? `sg-switch-${reactId}`;
  const isControlled = checked !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const isOn = isControlled ? Boolean(checked) : uncontrolled;

  function toggle() {
    if (disabled) return;
    const next = !isOn;
    if (!isControlled) setUncontrolled(next);
    onCheckedChange?.(next);
  }

  const control = (
    <button
      id={switchId}
      type="button"
      role="switch"
      aria-checked={isOn}
      disabled={disabled}
      data-checked={isOn || undefined}
      data-look={look === "track" ? undefined : look}
      data-motion={motion}
      className={cn("sg-switch", !label && className)}
      onClick={toggle}
      {...props}
    >
      <span className="sg-switch-thumb" aria-hidden="true" />
    </button>
  );

  if (!label && !hint) {
    return control;
  }

return (
    // Button sits inside label — no htmlFor (avoids double toggle).
    <label
      className={cn("sg-switch-root", className)}
      data-disabled={disabled || undefined}
    >
      {control}
      <span>
        <span className="sg-switch-label">{label}</span>
        {hint ? <span className="sg-switch-hint">{hint}</span> : null}
      </span>
    </label>
  );
}
