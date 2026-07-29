"use client";

import { cn } from "../lib/cn";
import type { CheckboxLook } from "../lib/looks";
import { MOTION_DEFAULTS, type CheckboxMotion } from "../lib/motion";
import {
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

export type { CheckboxLook, CheckboxMotion };

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> & {
  label?: ReactNode;
  hint?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Design: box | card | pill */
  look?: CheckboxLook;
  /** Check feedback: none | pop | draw | fade-in | bounce */
  motion?: CheckboxMotion;
};

function CheckIcon() {
  return (
    <svg className="sg-check-mark" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 8.2 6.6 11.2 12.5 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Checkbox({
  className,
  label,
  hint,
  id,
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  onChange,
  look = "box",
  motion = MOTION_DEFAULTS.checkbox,
  ...props
}: CheckboxProps) {
  const reactId = useId();
  const checkId = id ?? `sg-check-${reactId}`;
  const isControlled = checked !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const on = isControlled ? Boolean(checked) : uncontrolled;

  return (
    <label
      className={cn("sg-check-root", className)}
      data-disabled={disabled || undefined}
      data-look={look === "box" ? undefined : look}
      data-motion={motion}
      data-checked={on || undefined}
      htmlFor={checkId}
    >
      <span
        className="sg-check-control"
        data-kind="checkbox"
        data-checked={on || undefined}
      >
        <input
          id={checkId}
          type="checkbox"
          className="sg-check-input"
          checked={isControlled ? checked : undefined}
          defaultChecked={isControlled ? undefined : defaultChecked}
          disabled={disabled}
          onChange={(e) => {
            if (!isControlled) setUncontrolled(e.target.checked);
            onChange?.(e);
            onCheckedChange?.(e.target.checked);
          }}
          {...props}
        />
        <span className="sg-check-face" aria-hidden>
          <CheckIcon />
        </span>
      </span>
      {label || hint ? (
        <span>
          {label ? <span className="sg-check-label">{label}</span> : null}
          {hint ? <span className="sg-check-hint">{hint}</span> : null}
        </span>
      ) : null}
    </label>
  );
}
