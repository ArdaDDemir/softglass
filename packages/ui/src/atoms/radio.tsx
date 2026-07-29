"use client";

import { cn } from "../lib/cn";
import type { RadioLook } from "../lib/looks";
import { MOTION_DEFAULTS, type RadioMotion } from "../lib/motion";
import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

export type { RadioLook, RadioMotion };

export type RadioProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> & {
  label?: ReactNode;
  hint?: ReactNode;
  /** Design: dot (classic) | card | chip */
  look?: RadioLook;
  /** Selection feedback: none | pop | dot-scale | ring-expand */
  motion?: RadioMotion;
};

export type RadioGroupProps = {
  label?: ReactNode;
  name: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  /** Applied to all radios in the group */
  look?: RadioLook;
  /** Applied to all radios in the group */
  motion?: RadioMotion;
};

export function Radio({
  className,
  label,
  hint,
  id,
  disabled,
  checked,
  look = "dot",
  motion = MOTION_DEFAULTS.radio,
  ...props
}: RadioProps) {
  const reactId = useId();
  const radioId = id ?? `sg-radio-${reactId}`;

  return (
    <label
      className={cn("sg-check-root", className)}
      data-disabled={disabled || undefined}
      data-look={look}
      data-motion={motion}
      data-checked={checked || undefined}
      htmlFor={radioId}
    >
      <span
        className="sg-check-control"
        data-kind="radio"
        data-checked={checked || undefined}
      >
        <input
          id={radioId}
          type="radio"
          className="sg-check-input"
          disabled={disabled}
          checked={checked}
          {...props}
        />
        <span className="sg-check-face" aria-hidden>
          <span className="sg-check-dot" />
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

export function RadioGroup({
  label,
  name,
  value,
  defaultValue = "",
  onValueChange,
  children,
  className,
  disabled,
  look = "dot",
  motion = MOTION_DEFAULTS.radio,
}: RadioGroupProps) {
  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const current = isControlled ? value : uncontrolled;

  return (
    <fieldset
      className={cn("sg-check-group", className)}
      disabled={disabled}
      data-look={look}
      data-motion={motion}
    >
      {label ? (
        <legend className="sg-check-group-label">{label}</legend>
      ) : null}
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;
        const el = child as ReactElement<RadioProps>;
        const childValue = String(el.props.value ?? "");
        return cloneElement(el, {
          name,
          look: el.props.look ?? look,
          motion: el.props.motion ?? motion,
          checked: current === childValue,
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            el.props.onChange?.(e);
            if (e.target.checked) {
              if (!isControlled) setUncontrolled(childValue);
              onValueChange?.(childValue);
            }
          },
        });
      })}
    </fieldset>
  );
}
