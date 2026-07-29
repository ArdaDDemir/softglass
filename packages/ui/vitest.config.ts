import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

/**
 * Minimal unit/smoke setup for @softglass/ui.
 * Not a full E2E farm — a few high-signal component checks.
 */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    css: false,
  },
});
