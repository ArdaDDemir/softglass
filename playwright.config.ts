import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT || 4173);
const BASE = process.env.PLAYWRIGHT_BASE_URL || `http://127.0.0.1:${PORT}`;

/**
 * Softglass gallery visual regression.
 * Baselines: apps/web/e2e/gallery.visual.spec.ts-snapshots/
 *
 * Update: npm run test:visual:update
 * CI: npm run test:visual
 */
export default defineConfig({
  testDir: "./apps/web/e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "list",
  timeout: 60_000,
  // Stable names across OS (baselines are CI/linux-oriented; local may update)
  snapshotPathTemplate:
    "{testDir}/{testFilePath}-snapshots/{arg}{ext}",
  expect: {
    toHaveScreenshot: {
      // Soft glass blurs / fonts can shift slightly across OS
      maxDiffPixelRatio: 0.05,
      animations: "disabled",
    },
  },
  use: {
    baseURL: BASE,
    trace: "on-first-retry",
    colorScheme: "light",
    reducedMotion: "reduce",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 800 },
      },
    },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        // Requires prior `npm run build` (CI and local)
        command: `npm run start -w @softglass/web -- -p ${PORT} -H 127.0.0.1`,
        url: BASE,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
});
