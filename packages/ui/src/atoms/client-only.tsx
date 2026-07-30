"use client";

import { useEffect, useState, type ReactNode } from "react";

export type ClientOnlyProps = {
  children: ReactNode;
  /** Rendered on the server / before mount. */
  fallback?: ReactNode;
};

/**
 * Atom — ClientOnly
 * Renders children only after client mount (avoids hydration mismatch).
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{fallback}</>;
  return <>{children}</>;
}
