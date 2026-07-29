import { cn } from "../lib/cn";
import type { FieldLook } from "../lib/looks";
import { MOTION_DEFAULTS, type FieldMotion } from "../lib/motion";
import type { InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";

export type InputSize = "sm" | "md" | "lg";
export type { FieldLook, FieldMotion };

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: InputSize;
  /** Design: solid | underline | filled | ghost */
  look?: FieldLook;
  /** Focus motion: none | ring | underline-grow | glow */
  motion?: FieldMotion;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  requiredMark?: boolean;
  fullWidth?: boolean;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
};

const sizeClass: Record<InputSize, string> = {
  sm: "sg-input-sm",
  md: "",
  lg: "sg-input-lg",
};

/**
 * Atom — Input
 * Solid surface for stable contrast. Optional addons + field meta.
 */
export function Input({
  className,
  size = "md",
  look = "solid",
  motion = MOTION_DEFAULTS.field,
  label,
  hint,
  error,
  requiredMark = false,
  fullWidth = true,
  leftAddon,
  rightAddon,
  id,
  disabled,
  required,
  ...props
}: InputProps) {
  const reactId = useId();
  const inputHtmlId = id ?? `sg-input-${reactId}`;
  const hintId = hint ? `${inputHtmlId}-hint` : undefined;
  const errorId = error ? `${inputHtmlId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error);

  const inputEl = (
    <input
      id={inputHtmlId}
      className={cn(
        "sg-input",
        sizeClass[size],
        fullWidth && "sg-input-block",
        !leftAddon && !rightAddon && className,
      )}
      data-look={look === "solid" ? undefined : look}
      data-motion={motion}
      disabled={disabled}
      required={required}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      {...props}
    />
  );

  const control =
    leftAddon || rightAddon ? (
      <div className={cn("sg-input-group", fullWidth && "sg-input-block", className)}>
        {leftAddon ? <span className="sg-input-addon">{leftAddon}</span> : null}
        {inputEl}
        {rightAddon ? <span className="sg-input-addon">{rightAddon}</span> : null}
      </div>
    ) : (
      inputEl
    );

  if (!label && !hint && !error) {
    return control;
  }

  return (
    <div className={cn("sg-field", fullWidth && "sg-input-block")}>
      {label ? (
        <label
          className={cn("sg-field-label", requiredMark && "sg-field-required")}
          htmlFor={inputHtmlId}
        >
          {label}
        </label>
      ) : null}
      {control}
      {hint && !error ? (
        <p id={hintId} className="sg-field-hint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="sg-field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
