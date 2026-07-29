/** Values allowed in `cn(...)` — only strings survive. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClassValue = string | false | null | undefined | 0 | 0n | boolean;

/**
 * Tiny class merger — no runtime deps.
 * Prefer this over pulling tailwind-merge until we need conflict resolution.
 */
export function cn(...parts: ClassValue[]): string {
  return parts.filter((part): part is string => typeof part === "string" && part.length > 0).join(" ");
}
