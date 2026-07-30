import { cn } from "../lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

export type TextTone = "default" | "muted" | "subtle" | "accent" | "danger";
export type TextSize = "xs" | "sm" | "md" | "lg" | "xl";
export type TextWeight = "normal" | "medium" | "semibold" | "bold";

export type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  children?: ReactNode;
  tone?: TextTone;
  size?: TextSize;
  weight?: TextWeight;
  as?: "p" | "span" | "div";
};

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  children?: ReactNode;
  level?: HeadingLevel;
  tone?: TextTone;
  /** Visual size independent of semantic level. */
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
};

const toneClass: Record<TextTone, string> = {
  default: "",
  muted: "sg-text-muted",
  subtle: "sg-text-subtle",
  accent: "sg-text-accent",
  danger: "sg-text-danger",
};

const textSizeClass: Record<TextSize, string> = {
  xs: "sg-text-size-xs",
  sm: "sg-text-size-sm",
  md: "",
  lg: "sg-text-size-lg",
  xl: "sg-text-size-xl",
};

const weightClass: Record<TextWeight, string> = {
  normal: "",
  medium: "sg-text-weight-medium",
  semibold: "sg-text-weight-semibold",
  bold: "sg-text-weight-bold",
};

const headingSizeClass: Record<NonNullable<HeadingProps["size"]>, string> = {
  sm: "sg-heading-sm",
  md: "",
  lg: "sg-heading-lg",
  xl: "sg-heading-xl",
  "2xl": "sg-heading-2xl",
};

/**
 * Atom — Text
 * Lightweight body text helper (not a full typography kit).
 */
export function Text({
  className,
  children,
  tone = "default",
  size = "md",
  weight = "normal",
  as: Comp = "p",
  ...props
}: TextProps) {
  return (
    <Comp
      className={cn(
        "sg-text",
        toneClass[tone],
        textSizeClass[size],
        weightClass[weight],
        className,
      )}
      data-tone={tone}
      {...props}
    >
      {children}
    </Comp>
  );
}

/**
 * Atom — Heading
 * Lightweight heading helper.
 */
export function Heading({
  className,
  children,
  level = 2,
  tone = "default",
  size = "md",
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  return (
    <Tag
      className={cn(
        "sg-heading",
        toneClass[tone],
        headingSizeClass[size],
        className,
      )}
      data-level={level}
      {...props}
    >
      {children}
    </Tag>
  );
}
