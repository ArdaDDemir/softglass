"use client";

import { cn } from "../lib/cn";
import {
  useState,
  type ImgHTMLAttributes,
  type ReactNode,
} from "react";

export type ImageLook = "soft" | "solid" | "outline" | "glass";
export type ImageFit = "cover" | "contain" | "fill" | "none";

export type ImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "children"
> & {
  look?: ImageLook;
  fit?: ImageFit;
  /** Fallback when src missing or load fails. */
  fallback?: ReactNode;
  /** Fixed aspect ratio string e.g. "16 / 9" or "1". */
  aspectRatio?: string;
  /** Rounded corners. */
  rounded?: "sm" | "md" | "lg" | "full" | "none";
};

const lookClass: Record<ImageLook, string> = {
  soft: "",
  solid: "sg-image-look-solid",
  outline: "sg-image-look-outline",
  glass: "sg-image-look-glass",
};

const fitClass: Record<ImageFit, string> = {
  cover: "sg-image-fit-cover",
  contain: "sg-image-fit-contain",
  fill: "sg-image-fit-fill",
  none: "sg-image-fit-none",
};

const roundedClass: Record<NonNullable<ImageProps["rounded"]>, string> = {
  none: "sg-image-rounded-none",
  sm: "sg-image-rounded-sm",
  md: "",
  lg: "sg-image-rounded-lg",
  full: "sg-image-rounded-full",
};

/**
 * Atom — Image
 * Framed image with load-error fallback. Not a full media gallery.
 */
export function Image({
  className,
  src,
  alt = "",
  look = "soft",
  fit = "cover",
  fallback,
  aspectRatio,
  rounded = "md",
  style,
  onError,
  ...props
}: ImageProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <span
      className={cn(
        "sg-image",
        lookClass[look],
        fitClass[fit],
        roundedClass[rounded],
        !showImage && "sg-image-fallback-state",
        className,
      )}
      data-look={look}
      style={{
        ...style,
        aspectRatio: aspectRatio ?? style?.aspectRatio,
      }}
    >
      {showImage ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- alt passed through
        <img
          className="sg-image-media"
          src={src}
          alt={alt}
          onError={(e) => {
            setFailed(true);
            onError?.(e);
          }}
          {...props}
        />
      ) : (
        <span className="sg-image-fallback" role={alt ? "img" : undefined} aria-label={alt || undefined}>
          {fallback ?? (alt ? alt.slice(0, 2).toUpperCase() : "—")}
        </span>
      )}
    </span>
  );
}
