"use client";

import { cn } from "../lib/cn";
import type { FieldLook } from "../lib/looks";
import { MOTION_DEFAULTS, type FieldMotion } from "../lib/motion";
import type { InputHTMLAttributes, ReactNode } from "react";
import { useId, useState } from "react";

export type PasswordInputSize = "sm" | "md" | "lg";
/** Same field language as Input, plus soft pill shell. */
export type PasswordInputLook = FieldLook | "soft" | "glass";

export type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> & {
  size?: PasswordInputSize;
  look?: PasswordInputLook;
  motion?: FieldMotion;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  requiredMark?: boolean;
  fullWidth?: boolean;
  revealed?: boolean;
  defaultRevealed?: boolean;
  onRevealedChange?: (revealed: boolean) => void;
  revealLabel?: string;
  hideLabel?: string;
};

const sizeClass: Record<PasswordInputSize, string> = {
  sm: "sg-input-sm",
  md: "",
  lg: "sg-input-lg",
};

/**
 * Atom — PasswordInput
 * Built on the same solid field shell as Input (input-group + addon).
 * Looks: solid | soft | glass | underline | filled | ghost
 */
export function PasswordInput({
  className,
  size = "md",
  look = "solid",
  motion = MOTION_DEFAULTS.field,
  label,
  hint,
  error,
  requiredMark = false,
  fullWidth = true,
  revealed,
  defaultRevealed = false,
  onRevealedChange,
  revealLabel = "Show password",
  hideLabel = "Hide password",
  id,
  disabled,
  required,
  ...props
}: PasswordInputProps) {
  const reactId = useId();
  const inputHtmlId = id ?? `sg-password-${reactId}`;
  const hintId = hint ? `${inputHtmlId}-hint` : undefined;
  const errorId = error ? `${inputHtmlId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error);

  const isControlled = revealed !== undefined;
  const [internal, setInternal] = useState(defaultRevealed);
  const isRevealed = isControlled ? Boolean(revealed) : internal;

  function setRevealed(next: boolean) {
    if (!isControlled) setInternal(next);
    onRevealedChange?.(next);
  }

  // FieldLook maps to data-look on the input; soft/glass are shell-level.
  const fieldLook =
    look === "soft" || look === "glass" ? "solid" : look;

  const control = (
    <div
      className={cn(
        "sg-input-group",
        "sg-password-input",
        look === "soft" && "sg-password-input-soft",
        look === "glass" && "sg-password-input-glass",
        fullWidth && "sg-input-block",
        !label && !hint && !error && className,
      )}
      data-look={look}
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
    >
      <input
        id={inputHtmlId}
        type={isRevealed ? "text" : "password"}
        className={cn("sg-input", sizeClass[size], fullWidth && "sg-input-block")}
        data-look={fieldLook === "solid" ? undefined : fieldLook}
        data-motion={motion}
        disabled={disabled}
        required={required}
        autoComplete={props.autoComplete ?? "current-password"}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        {...props}
      />
      <button
        type="button"
        className="sg-password-toggle"
        disabled={disabled}
        aria-label={isRevealed ? hideLabel : revealLabel}
        aria-pressed={isRevealed}
        onClick={() => setRevealed(!isRevealed)}
      >
        {isRevealed ? "Hide" : "Show"}
      </button>
    </div>
  );

  if (!label && !hint && !error) {
    return control;
  }

  return (
    <div className={cn("sg-field", fullWidth && "sg-input-block", className)}>
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
