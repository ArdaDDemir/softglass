"use client";

import { cn } from "../lib/cn";
import type { FileFieldLook } from "../lib/looks";
import type { InputHTMLAttributes, ReactNode } from "react";
import { useId, useRef, useState } from "react";

export type FileFieldSize = "sm" | "md" | "lg";
export type { FileFieldLook };

export type FileFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "value" | "defaultValue" | "onChange"
> & {
  /** Controlled file list. When set, pair with onFilesChange. */
  files?: File[];
  onFilesChange?: (files: File[]) => void;
  size?: FileFieldSize;
  /** Visual language: solid | soft | dashed | ghost */
  look?: FileFieldLook;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  requiredMark?: boolean;
  fullWidth?: boolean;
  /** Button / trigger text. */
  buttonLabel?: string;
  /** Empty list message. */
  emptyLabel?: string;
  /** Allow clearing selected files from the list. Default true. */
  clearable?: boolean;
};

const sizeClass: Record<FileFieldSize, string> = {
  sm: "sg-file-field-sm",
  md: "",
  lg: "sg-file-field-lg",
};

const lookClass: Record<FileFieldLook, string> = {
  solid: "",
  soft: "sg-file-field-look-soft",
  dashed: "sg-file-field-look-dashed",
  ghost: "sg-file-field-look-ghost",
};

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Atom — FileField
 * Solid-surface file picker with basic name list. No upload / cloud.
 */
export function FileField({
  className,
  files,
  onFilesChange,
  size = "md",
  look = "solid",
  label,
  hint,
  error,
  requiredMark = false,
  fullWidth = true,
  buttonLabel = "Choose file",
  emptyLabel = "No file selected",
  clearable = true,
  multiple = false,
  disabled,
  id,
  accept,
  ...props
}: FileFieldProps) {
  const reactId = useId();
  const inputId = id ?? `sg-file-${reactId}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error);
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = files !== undefined;
  const [uncontrolled, setUncontrolled] = useState<File[]>([]);
  const list = isControlled ? files : uncontrolled;

  function commit(next: File[]) {
    if (!isControlled) setUncontrolled(next);
    onFilesChange?.(next);
  }

  function onInputChange(fileList: FileList | null) {
    const next = fileList ? Array.from(fileList) : [];
    commit(next);
  }

  function removeAt(index: number) {
    if (disabled) return;
    const next = list.filter((_, i) => i !== index);
    commit(next);
    if (inputRef.current) inputRef.current.value = "";
  }

  function clearAll() {
    if (disabled) return;
    commit([]);
    if (inputRef.current) inputRef.current.value = "";
  }

  const control = (
    <div
      className={cn(
        "sg-file-field",
        sizeClass[size],
        lookClass[look],
        fullWidth && "sg-input-block",
        !label && !hint && !error && className,
      )}
      data-look={look}
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
    >
      <div className="sg-file-field-trigger">
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          className="sg-file-field-input"
          multiple={multiple}
          disabled={disabled}
          accept={accept}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          onChange={(e) => onInputChange(e.target.files)}
          {...props}
        />
        <span className="sg-file-field-button" aria-hidden="true">
          {buttonLabel}
        </span>
        <span className="sg-file-field-summary">
          {list.length === 0
            ? emptyLabel
            : multiple
              ? `${list.length} file${list.length === 1 ? "" : "s"}`
              : list[0]!.name}
        </span>
      </div>

      {list.length > 0 ? (
        <ul className="sg-file-field-list">
          {list.map((file, index) => (
            <li key={`${file.name}-${file.size}-${file.lastModified}-${index}`} className="sg-file-field-item">
              <span className="sg-file-field-name" title={file.name}>
                {file.name}
              </span>
              <span className="sg-file-field-meta">{formatSize(file.size)}</span>
              {clearable ? (
                <button
                  type="button"
                  className="sg-file-field-remove"
                  disabled={disabled}
                  aria-label={`Remove ${file.name}`}
                  onClick={() => removeAt(index)}
                >
                  ×
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}

      {clearable && list.length > 1 ? (
        <button
          type="button"
          className="sg-file-field-clear"
          disabled={disabled}
          onClick={clearAll}
        >
          Clear all
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
          htmlFor={inputId}
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
