import { cn } from "../lib/cn";
import { Label } from "./label";
import type { HTMLAttributes, ReactNode } from "react";
import { useId } from "react";

export type FormFieldProps = HTMLAttributes<HTMLDivElement> & {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  requiredMark?: boolean;
  /** Associates label with a control id (passed to htmlFor). */
  htmlFor?: string;
  /** When true, stretch to container width. */
  fullWidth?: boolean;
  children?: ReactNode;
};

/**
 * Atom — FormField
 * Layout wrapper: label + control slot + hint/error.
 * Use when composing custom controls that are not Input/Select.
 */
export function FormField({
  className,
  label,
  hint,
  error,
  requiredMark = false,
  htmlFor,
  fullWidth = true,
  children,
  ...props
}: FormFieldProps) {
  const reactId = useId();
  const fieldId = htmlFor ?? `sg-field-${reactId}`;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;

  return (
    <div
      className={cn("sg-field", fullWidth && "sg-input-block", className)}
      {...props}
    >
      {label ? (
        <Label htmlFor={htmlFor} requiredMark={requiredMark}>
          {label}
        </Label>
      ) : null}
      {children}
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
