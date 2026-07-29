import { cn } from "../lib/cn";
import type { LabelHTMLAttributes, ReactNode } from "react";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  /** Show required asterisk after the text. */
  requiredMark?: boolean;
  children?: ReactNode;
};

/**
 * Atom — Label
 * Standalone field label (pairs with FormField or raw controls).
 */
export function Label({
  className,
  requiredMark = false,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn("sg-field-label", requiredMark && "sg-field-required", className)}
      {...props}
    >
      {children}
    </label>
  );
}
