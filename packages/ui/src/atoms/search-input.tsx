"use client";

import { cn } from "../lib/cn";
import type { FieldLook } from "../lib/looks";
import { MOTION_DEFAULTS, type FieldMotion } from "../lib/motion";
import type { InputHTMLAttributes, ReactNode } from "react";
import { useId, useState } from "react";

export type SearchInputSize = "sm" | "md" | "lg";
/** Same field language as Input, plus soft pill shell. */
export type SearchInputLook = FieldLook | "soft" | "glass";

export type SearchInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "value" | "defaultValue" | "onChange"
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: SearchInputSize;
  look?: SearchInputLook;
  motion?: FieldMotion;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  requiredMark?: boolean;
  fullWidth?: boolean;
  clearable?: boolean;
  clearLabel?: string;
};

const sizeClass: Record<SearchInputSize, string> = {
  sm: "sg-input-sm",
  md: "",
  lg: "sg-input-lg",
};

/**
 * Atom — SearchInput
 * Free-text search built on Input group shell + clear control.
 * Looks: solid | soft | glass | underline | filled | ghost
 */
export function SearchInput({
  className,
  value,
  defaultValue = "",
  onValueChange,
  size = "md",
  look = "solid",
  motion = MOTION_DEFAULTS.field,
  label,
  hint,
  error,
  requiredMark = false,
  fullWidth = true,
  clearable = true,
  clearLabel = "Clear search",
  id,
  disabled,
  required,
  placeholder = "Search…",
  ...props
}: SearchInputProps) {
  const reactId = useId();
  const inputHtmlId = id ?? `sg-search-${reactId}`;
  const hintId = hint ? `${inputHtmlId}-hint` : undefined;
  const errorId = error ? `${inputHtmlId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error);

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const current = isControlled ? String(value) : internal;

  function commit(next: string) {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }

  const showClear = clearable && current.length > 0 && !disabled;
  const fieldLook =
    look === "soft" || look === "glass" ? "solid" : look;

  const control = (
    <div
      className={cn(
        "sg-input-group",
        "sg-search-input",
        look === "soft" && "sg-search-input-soft",
        look === "glass" && "sg-search-input-glass",
        fullWidth && "sg-input-block",
        !label && !hint && !error && className,
      )}
      data-look={look}
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
    >
      <span className="sg-input-addon sg-search-addon" aria-hidden="true">
        Search
      </span>
      <input
        id={inputHtmlId}
        type="search"
        role="searchbox"
        className={cn(
          "sg-input",
          "sg-search-input-field",
          sizeClass[size],
          fullWidth && "sg-input-block",
        )}
        data-look={fieldLook === "solid" ? undefined : fieldLook}
        data-motion={motion}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        value={current}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onChange={(e) => commit(e.target.value)}
        {...props}
      />
      {showClear ? (
        <button
          type="button"
          className="sg-search-clear"
          disabled={disabled}
          aria-label={clearLabel}
          onClick={() => commit("")}
        >
          Clear
        </button>
      ) : null}
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
