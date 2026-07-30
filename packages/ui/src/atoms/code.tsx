import { cn } from "../lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

export type CodeLook = "soft" | "solid" | "accent" | "muted";

export type CodeProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  /** block = pre-like; default inline */
  block?: boolean;
  look?: CodeLook;
};

const lookClass: Record<CodeLook, string> = {
  soft: "",
  solid: "sg-code-look-solid",
  accent: "sg-code-look-accent",
  muted: "sg-code-look-muted",
};

/**
 * Atom — Code
 * Inline (or block) monospace code snippet — not a full syntax highlighter.
 */
export function Code({
  className,
  children,
  block = false,
  look = "soft",
  ...props
}: CodeProps) {
  if (block) {
    return (
      <pre
        className={cn("sg-code", "sg-code-block", lookClass[look], className)}
        data-look={look}
        {...props}
      >
        <code>{children}</code>
      </pre>
    );
  }

  return (
    <code
      className={cn("sg-code", lookClass[look], className)}
      data-look={look}
      {...props}
    >
      {children}
    </code>
  );
}
