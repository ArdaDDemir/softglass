"use client";

import { cn } from "../lib/cn";
import type { AvatarLook } from "../lib/looks";
import { MOTION_DEFAULTS, type AvatarMotion } from "../lib/motion";
import {
  useState,
  type HTMLAttributes,
  type ImgHTMLAttributes,
  type ReactNode,
} from "react";

export type AvatarSize = "sm" | "md" | "lg" | "xl";
export type { AvatarLook, AvatarMotion };

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  src?: string | null;
  alt?: string;
  fallback?: ReactNode;
  size?: AvatarSize;
  /** Design: circle | rounded | soft */
  look?: AvatarLook;
  /** Presence / hover motion: none | lift | ring-pulse | status-ping */
  motion?: AvatarMotion;
  imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;
};

const sizeClass: Record<AvatarSize, string> = {
  sm: "sg-avatar-sm",
  md: "sg-avatar-md",
  lg: "sg-avatar-lg",
  xl: "sg-avatar-xl",
};

function toInitials(value: string) {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
}

/**
 * Atom — Avatar
 * Soft pill face; image with initials fallback.
 */
export function Avatar({
  className,
  src,
  alt = "",
  fallback,
  size = "md",
  look = "circle",
  motion = MOTION_DEFAULTS.avatar,
  imgProps,
  ...props
}: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  const fallbackNode =
    typeof fallback === "string" ? (
      <span className="sg-avatar-fallback">{toInitials(fallback)}</span>
    ) : (
      fallback ?? <span className="sg-avatar-fallback">?</span>
    );

  return (
    <span
      className={cn("sg-avatar", sizeClass[size], className)}
      data-look={look === "circle" ? undefined : look}
      data-motion={motion}
      {...props}
    >
      {showImage ? (
        <img
          className="sg-avatar-image"
          src={src ?? undefined}
          alt={alt}
          onError={() => setFailed(true)}
          {...imgProps}
        />
      ) : (
        fallbackNode
      )}
    </span>
  );
}

export type AvatarGroupProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export function AvatarGroup({
  className,
  children,
  ...props
}: AvatarGroupProps) {
  return (
    <div className={cn("sg-avatar-group", className)} {...props}>
      {children}
    </div>
  );
}
