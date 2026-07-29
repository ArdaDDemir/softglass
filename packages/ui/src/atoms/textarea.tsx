import { cn } from "../lib/cn";
import type { FieldLook } from "../lib/looks";
import { MOTION_DEFAULTS, type FieldMotion } from "../lib/motion";
import type { ReactNode, TextareaHTMLAttributes } from "react";
import { useId } from "react";

export type TextareaSize = "sm" | "md" | "lg";
export type { FieldMotion };

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  size?: TextareaSize;
  look?: FieldLook;
  /** Focus motion: none | ring | underline-grow | glow */
  motion?: FieldMotion;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  requiredMark?: boolean;
  fullWidth?: boolean;
  autoSize?: boolean;
};

const sizeClass: Record<TextareaSize, string> = {
  sm: "sg-textarea-sm",
  md: "",
  lg: "sg-textarea-lg",
};

/**
 * Atom — Textarea
 * Solid multi-line field (same contrast rules as Input).
 */
export function Textarea({
  className,
  size = "md",
  look = "solid",
  motion = MOTION_DEFAULTS.field,
  label,
  hint,
  error,
  requiredMark = false,
  fullWidth = true,
  autoSize = false,
  id,
  disabled,
  required,
  ...props
}: TextareaProps) {
  const reactId = useId();
  const areaId = id ?? `sg-textarea-${reactId}`;
  const hintId = hint ? `${areaId}-hint` : undefined;
  const errorId = error ? `${areaId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error);

  const control = (
    <textarea
      id={areaId}
      className={cn(
        "sg-textarea",
        sizeClass[size],
        fullWidth && "sg-input-block",
        autoSize && "sg-textarea-auto",
        className,
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

  if (!label && !hint && !error) {
    return control;
  }

  return (
    <div className={cn("sg-field", fullWidth && "sg-input-block")}>
      {label ? (
        <label
          className={cn("sg-field-label", requiredMark && "sg-field-required")}
          htmlFor={areaId}
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
