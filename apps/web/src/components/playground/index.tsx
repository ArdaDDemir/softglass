"use client";

import {
  GALLERY_PAGES,
  pageById,
  type GalleryPageId,
} from "@/components/playground/catalog";
import { GalleryShell } from "@/components/playground/gallery-shell";
import { GalleryPageBody } from "@/components/playground/pages";
import { useEffect, useState } from "react";

function isPageId(value: string): value is GalleryPageId {
  return GALLERY_PAGES.some((p) => p.id === value);
}

/**
 * Softglass Gallery — guided, paginated, mobile-first tour of the design system.
 * Replaces the old flat sidebar dump.
 */
export function Playground() {
  const [pageId, setPageId] = useState<GalleryPageId>("welcome");

  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "");
    if (isPageId(raw)) setPageId(raw);
  }, []);

  const go = (id: GalleryPageId) => {
    setPageId(id);
    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Keep takeaway in sync for a11y (title already in shell)
  const page = pageById(pageId);
  useEffect(() => {
    document.title = `${page.label} · Softglass Gallery`;
  }, [page.label]);

  return (
    <GalleryShell pageId={pageId} onPageId={go}>
      <GalleryPageBody pageId={pageId} onGo={go} />
    </GalleryShell>
  );
}
