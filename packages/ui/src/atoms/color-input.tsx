"use client";

import { cn } from "../lib/cn";
import type { InputHTMLAttributes, ReactNode } from "react";
import { useId, useState } from "react";

export type ColorInputLook = "soft" | "solid" | "outline" | "glass";
export type ColorInputSize = "sm" | "md" | "lg";

export type ColorInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "value" | "defaultValue" | "onChange"
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  look?: ColorInputLook;
  size?: ColorInputSize;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  fullWidth?: boolean;
};

const lookClass: Record<ColorInputLook, string> = {
  soft: "",
  solid: "sg-color-input-look-solid",
  outline: "sg-color-input-look-outline",
  glass: "sg-color-input-look-glass",
};

const sizeClass: Record<ColorInputSize, string> = {
  sm: "sg-color-input-sm",
  md: "",
  lg: "sg-color-input-lg",
};

/**
 * Atom — ColorInput
 * Simple color picker + hex text. No full color suite.
 */
export function ColorInput({
  className,
  value,
  defaultValue = "#7c3aed",
  onValueChange,
  look = "soft",
  size = "md",
  label,
  hint,
  error,
  fullWidth = true,
  id,
  disabled,
  ...props
}: ColorInputProps) {
  const reactId = useId();
  const inputId = id ?? `sg-color-${reactId}`;
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const current = isControlled ? value : internal;
  const invalid = Boolean(error);
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  function commit(next: string) {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }

  const control = (
    <div
      className={cn(
        "sg-color-input",
        lookClass[look],
        sizeClass[size],
        fullWidth && "sg-input-block",
        !label && !hint && !error && className,
      )}
      data-look={look}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
    >
      <label className="sg-color-input-swatch" htmlFor={`${inputId}-picker`}>
        <input
          id={`${inputId}-picker`}
          type="color"
          className="sg-color-input-native"
          value={/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(current) ? current : "#000000"}
          disabled={disabled}
          onChange={(e) => commit(e.target.value)}
          aria-label={typeof label === "string" ? `${label} picker` : "Color picker"}
        />
      </label>
      <input
        id={inputId}
        type="text"
        className="sg-color-input-text"
        value={current}
        disabled={disabled}
        spellCheck={false}
        aria-invalid={invalid || undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        onChange={(e) => commit(e.target.value)}
        {...props}
      />
    </div>
  );

  if (!label && !hint && !error) return control;

  return (
    <div className={cn("sg-field", fullWidth && "sg-input-block", className)}>
      {label ? (
        <label className="sg-field-label" htmlFor={inputId}>
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
