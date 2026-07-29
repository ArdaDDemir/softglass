"use client";

import { ToastProvider } from "@softglass/ui";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <ToastProvider position="bottom-right">{children}</ToastProvider>;
}
