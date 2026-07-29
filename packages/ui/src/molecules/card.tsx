import { cn } from "../lib/cn";
import type { CardLook } from "../lib/looks";
import { MOTION_DEFAULTS, type CardMotion } from "../lib/motion";
import type { HTMLAttributes, ReactNode } from "react";

export type CardSurface = "solid" | "glass" | "glass-elevated";
export type CardPadding = "none" | "sm" | "md" | "lg";
export type { CardLook, CardMotion };

export type CardProps = HTMLAttributes<HTMLElement> & {
  surface?: CardSurface;
  blur?: boolean;
  padding?: CardPadding;
  /** Design: flat | raised | outline | glow */
  look?: CardLook;
  /** Hover / attention motion: none | lift | glow-pulse */
  motion?: CardMotion;
  hoverable?: boolean;
  clickable?: boolean;
  as?: "article" | "div" | "section" | "nav" | "aside";
  children?: ReactNode;
};

const surfaceClass: Record<CardSurface, string> = {
  solid: "sg-surface-solid",
  glass: "sg-surface-glass",
  "glass-elevated": "sg-surface-glass-elevated",
};

const paddingClass: Record<CardPadding, string> = {
  none: "sg-card-flush",
  sm: "sg-card-sm",
  md: "",
  lg: "sg-card-lg",
};

/**
 * Molecule — Card
 * Frost by default (performant). Pass blur for true glass over busy media.
 */
export function Card({
  className,
  surface = "glass",
  blur = false,
  padding = "md",
  look,
  motion = MOTION_DEFAULTS.card,
  hoverable = false,
  clickable = false,
  as: Comp = "article",
  children,
  ...props
}: CardProps) {
  return (
    <Comp
      className={cn(
        "sg-card",
        surfaceClass[surface],
        paddingClass[padding],
        blur && "sg-blur",
        hoverable && "sg-card-hoverable",
        clickable && "sg-card-clickable",
        className,
      )}
      data-look={look}
      data-motion={motion}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("sg-card-header", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("sg-card-title", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("sg-card-description", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("sg-card-content", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("sg-card-footer", className)} {...props}>
      {children}
    </div>
  );
}
