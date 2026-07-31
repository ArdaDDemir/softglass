/**
 * Softglass Gallery — ordered pages people can walk through.
 * One page at a time; hash = page id.
 */

export type GalleryPageId =
  | "welcome"
  | "install"
  | "languages"
  | "looks"
  | "essentials"
  | "forms"
  | "compose"
  | "app"
  | "library";

export type GalleryPage = {
  id: GalleryPageId;
  /** Short nav label */
  label: string;
  /** H1 on the page */
  title: string;
  /** One-line purpose */
  summary: string;
  /** What a visitor should leave knowing */
  takeaway: string;
};

export const GALLERY_PAGES: GalleryPage[] = [
  {
    id: "welcome",
    label: "Welcome",
    title: "Softglass",
    summary: "Open soft-glass UI kit for Next.js — six languages, one engine.",
    takeaway: "What Softglass is, and who it is for.",
  },
  {
    id: "install",
    label: "Install",
    title: "Install in three steps",
    summary: "npm packages, CSS tokens, set a language, render a component.",
    takeaway: "You can ship Softglass without forking the monorepo.",
  },
  {
    id: "languages",
    label: "Languages",
    title: "Six visual languages",
    summary: "3 light + 3 dark (Obsidian, Noir, Ember) — same components, different mood.",
    takeaway: "Theme is data-softglass-theme; brand is CSS variables.",
  },
  {
    id: "looks",
    label: "Looks",
    title: "Looks & motion",
    summary: "Design props that change chrome without new CSS files.",
    takeaway: "look + motion are first-class API, not one-off classes.",
  },
  {
    id: "essentials",
    label: "Essentials",
    title: "Everyday building blocks",
    summary: "Buttons, inputs, badges, cards — the atoms you use first.",
    takeaway: "Glass is chrome; solid surfaces hold long text.",
  },
  {
    id: "forms",
    label: "Forms",
    title: "Forms & pickers",
    summary: "Selects, date single/range, multi-select filter, switches.",
    takeaway: "Pickers portaled like Select; range is mode=\"range\".",
  },
  {
    id: "compose",
    label: "Compose",
    title: "Compose molecules",
    summary: "Accordion, sheet, empty states, steppers, lists, stats.",
    takeaway: "Molecules sit on atoms — same look language.",
  },
  {
    id: "app",
    label: "App",
    title: "Product shell & patterns",
    summary: "AppShell, PageHeader, settings sections, command palette.",
    takeaway: "How a real product chrome is assembled.",
  },
  {
    id: "library",
    label: "Library",
    title: "Component library",
    summary: "Every documented export — open a card for live Component Studio.",
    takeaway: "Click a component for controls, showcases, and prop docs (#library/id).",
  },
];

export function pageIndex(id: GalleryPageId): number {
  return GALLERY_PAGES.findIndex((p) => p.id === id);
}

export function pageById(id: string | undefined): GalleryPage {
  const found = GALLERY_PAGES.find((p) => p.id === id);
  return found ?? GALLERY_PAGES[0]!;
}

export function pageByNumber(n: number): GalleryPage {
  const i = Math.min(Math.max(1, n), GALLERY_PAGES.length) - 1;
  return GALLERY_PAGES[i]!;
}
