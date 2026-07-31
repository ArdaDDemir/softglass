import { expect, test } from "@playwright/test";

/**
 * Gallery page visual smoke — aurora language, reduced motion.
 * Hash routes: welcome · theme · app · library/button · library/datatable
 */

const PAGES: { name: string; hash: string }[] = [
  { name: "welcome", hash: "#welcome" },
  { name: "theme", hash: "#theme" },
  { name: "app", hash: "#app" },
  { name: "library-button", hash: "#library/button" },
  { name: "library-datatable", hash: "#library/datatable" },
];

test.beforeEach(async ({ page }) => {
  // Stable language for snapshots
  await page.addInitScript(() => {
    try {
      localStorage.setItem("softglass-theme", "aurora");
    } catch {
      /* ignore */
    }
  });
});

for (const { name, hash } of PAGES) {
  test(`gallery ${name}`, async ({ page }) => {
    await page.goto(`/${hash}`, { waitUntil: "networkidle" });
    // Let client hash routing + theme paint settle
    await page.waitForTimeout(500);
    await expect(page.locator(".sg-gallery")).toBeVisible();

    // Hide sticky gallery chrome that can shimmer (blur) across runs
    await page.addStyleTag({
      content: `
        .sg-gallery-top, .sg-gallery-bottom {
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }
      `,
    });

    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
    });
  });
}
