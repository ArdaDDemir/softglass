import { cn } from "../lib/cn";
import type { FieldsetHTMLAttributes, ReactNode } from "react";

export type FieldsetLook = "soft" | "solid" | "outline" | "ghost";

export type FieldsetProps = FieldsetHTMLAttributes<HTMLFieldSetElement> & {
  /** Legend text / node. */
  legend?: ReactNode;
  look?: FieldsetLook;
  /** Compact spacing. */
  density?: "comfy" | "compact";
  children?: ReactNode;
};

const lookClass: Record<FieldsetLook, string> = {
  soft: "",
  solid: "sg-fieldset-look-solid",
  outline: "sg-fieldset-look-outline",
  ghost: "sg-fieldset-look-ghost",
};

/**
 * Atom — Fieldset
 * Group related controls with an optional legend.
 */
export function Fieldset({
  className,
  legend,
  look = "soft",
  density = "comfy",
  children,
  disabled,
  ...props
}: FieldsetProps) {
  return (
    <fieldset
      className={cn(
        "sg-fieldset",
        lookClass[look],
        density === "compact" && "sg-fieldset-compact",
        className,
      )}
      data-look={look}
      disabled={disabled}
      {...props}
    >
      {legend ? <legend className="sg-fieldset-legend">{legend}</legend> : null}
      <div className="sg-fieldset-body">{children}</div>
    </fieldset>
  );
}
