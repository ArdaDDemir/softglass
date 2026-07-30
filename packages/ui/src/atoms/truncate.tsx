import { cn } from "../lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

export type TruncateProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode;
  /** Max lines before ellipsis. 1 = single-line. */
  lines?: 1 | 2 | 3 | 4;
};

/**
 * Atom — Truncate
 * Ellipsis overflow for one or multi-line text.
 */
export function Truncate({
  className,
  children,
  lines = 1,
  title,
  ...props
}: TruncateProps) {
  const textTitle =
    title ?? (typeof children === "string" ? children : undefined);

  return (
    <span
      className={cn(
        "sg-truncate",
        lines === 1 ? "sg-truncate-1" : `sg-truncate-${lines}`,
        className,
      )}
      title={textTitle}
      {...props}
    >
      {children}
    </span>
  );
}
