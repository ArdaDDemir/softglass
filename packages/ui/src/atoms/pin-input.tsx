"use client";

import { cn } from "../lib/cn";
import {
  useId,
  useRef,
  useState,
  type ClipboardEvent,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export type PinInputLook = "solid" | "soft" | "outline" | "glass";
export type PinInputSize = "sm" | "md" | "lg";

export type PinInputProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> & {
  /** Number of cells. Default 6. */
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Fires once when all cells are filled. */
  onComplete?: (value: string) => void;
  look?: PinInputLook;
  size?: PinInputSize;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  /** Mask characters (password-style). */
  mask?: boolean;
  /** Digits only when true (default). */
  numeric?: boolean;
  autoFocus?: boolean;
};

const lookClass: Record<PinInputLook, string> = {
  solid: "",
  soft: "sg-pin-look-soft",
  outline: "sg-pin-look-outline",
  glass: "sg-pin-look-glass",
};

const sizeClass: Record<PinInputSize, string> = {
  sm: "sg-pin-sm",
  md: "",
  lg: "sg-pin-lg",
};

function onlyAllowed(raw: string, numeric: boolean) {
  if (numeric) return raw.replace(/\D/g, "");
  return raw.replace(/\s/g, "");
}

/**
 * Atom — PinInput
 * OTP / PIN cell group. Paste + arrow / backspace keyboard.
 */
export function PinInput({
  className,
  length = 6,
  value,
  defaultValue = "",
  onValueChange,
  onComplete,
  look = "solid",
  size = "md",
  label,
  hint,
  error,
  disabled = false,
  mask = false,
  numeric = true,
  autoFocus = false,
  ...props
}: PinInputProps) {
  const reactId = useId();
  const count = Math.max(1, Math.min(12, length));
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(
    onlyAllowed(defaultValue, numeric).slice(0, count),
  );
  const current = (isControlled ? onlyAllowed(value, numeric) : internal).slice(
    0,
    count,
  );
  const cells = Array.from({ length: count }, (_, i) => current[i] ?? "");
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const hintId = hint ? `${reactId}-hint` : undefined;
  const errorId = error ? `${reactId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error);

  function commit(next: string) {
    const clean = onlyAllowed(next, numeric).slice(0, count);
    if (!isControlled) setInternal(clean);
    onValueChange?.(clean);
    if (clean.length === count) onComplete?.(clean);
  }

  function setAt(index: number, char: string) {
    const arr = cells.slice();
    arr[index] = char;
    commit(arr.join(""));
  }

  function onPaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    if (disabled) return;
    const text = onlyAllowed(e.clipboardData.getData("text"), numeric).slice(
      0,
      count,
    );
    if (!text) return;
    commit(text);
    const focusIdx = Math.min(text.length, count - 1);
    refs.current[focusIdx]?.focus();
  }

  function onKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (cells[index]) {
        setAt(index, "");
      } else if (index > 0) {
        setAt(index - 1, "");
        refs.current[index - 1]?.focus();
      }
      return;
    }
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      refs.current[index - 1]?.focus();
      return;
    }
    if (e.key === "ArrowRight" && index < count - 1) {
      e.preventDefault();
      refs.current[index + 1]?.focus();
    }
  }

  const field = (
    <div
      className={cn(
        "sg-pin",
        lookClass[look],
        sizeClass[size],
        !label && !hint && !error && className,
      )}
      data-look={look}
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
      role="group"
      aria-label={
        label
          ? undefined
          : typeof props["aria-label"] === "string"
            ? props["aria-label"]
            : "PIN"
      }
      aria-labelledby={label ? `${reactId}-label` : undefined}
      aria-describedby={describedBy}
      {...props}
    >
      {cells.map((char, index) => (
        <input
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          id={index === 0 ? `${reactId}-0` : undefined}
          className="sg-pin-cell"
          type={mask ? "password" : "text"}
          inputMode={numeric ? "numeric" : "text"}
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={char}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          autoFocus={autoFocus && index === 0}
          onPaste={onPaste}
          onKeyDown={(e) => onKeyDown(index, e)}
          onChange={(e) => {
            const raw = onlyAllowed(e.target.value, numeric);
            const nextChar = raw.slice(-1);
            if (!nextChar) {
              setAt(index, "");
              return;
            }
            setAt(index, nextChar);
            if (index < count - 1) refs.current[index + 1]?.focus();
          }}
          onFocus={(e) => e.target.select()}
        />
      ))}
    </div>
  );

  if (!label && !hint && !error) return field;

  return (
    <div className={cn("sg-field", className)}>
      {label ? (
        <label
          id={`${reactId}-label`}
          className="sg-field-label"
          htmlFor={`${reactId}-0`}
        >
          {label}
        </label>
      ) : null}
      {field}
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
