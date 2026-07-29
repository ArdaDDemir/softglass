import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

/** RTL does not always auto-clean with every Vitest version — force it. */
afterEach(() => {
  cleanup();
});

/**
 * usePresence / exitDurationForMotion read matchMedia for reduced-motion.
 * jsdom does not implement it by default.
 */
Object.defineProperty(window, "matchMedia", {
  writable: true,
  configurable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

/** Combobox / Select highlight scroll — not in jsdom. */
Element.prototype.scrollIntoView = vi.fn();
