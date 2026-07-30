import { cn } from "../lib/cn";
import type { HTMLAttributes } from "react";

export type CharacterCountLook = "soft" | "solid" | "muted" | "danger";

export type CharacterCountProps = HTMLAttributes<HTMLParagraphElement> & {
  /** Current length. */
  value: number;
  /** Optional max (shows value/max). */
  max?: number;
  look?: CharacterCountLook;
  /** Force danger look when over max (default true). */
  warnOver?: boolean;
};

const lookClass: Record<CharacterCountLook, string> = {
  soft: "",
  solid: "sg-char-count-look-solid",
  muted: "sg-char-count-look-muted",
  danger: "sg-char-count-look-danger",
};

/**
 * Atom — CharacterCount
 * Field helper: “12” or “12 / 100”. Turns danger when over max.
 */
export function CharacterCount({
  className,
  value,
  max,
  look = "muted",
  warnOver = true,
  ...props
}: CharacterCountProps) {
  const over = max !== undefined && value > max;
  const resolvedLook =
    warnOver && over ? "danger" : look;

  const text =
    max === undefined ? String(value) : `${value} / ${max}`;

  return (
    <p
      className={cn(
        "sg-char-count",
        lookClass[resolvedLook],
        over && "sg-char-count-over",
        className,
      )}
      data-look={resolvedLook}
      data-over={over || undefined}
      aria-live="polite"
      {...props}
    >
      {text}
    </p>
  );
}
