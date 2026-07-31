"use client";

import {
  GALLERY_PAGES,
  pageById,
  type GalleryPageId,
} from "@/components/playground/catalog";
import { GalleryShell } from "@/components/playground/gallery-shell";
import { GalleryPageBody } from "@/components/playground/pages";
import { useCallback, useEffect, useState } from "react";

function isPageId(value: string): value is GalleryPageId {
  return GALLERY_PAGES.some((p) => p.id === value);
}

type HashState = {
  pageId: GalleryPageId;
  /** Library component id when hash is #library/<id> */
  studioId: string | null;
};

function parseHash(raw: string): HashState {
  const hash = raw.replace(/^#/, "").trim();
  if (!hash) {
    return { pageId: "welcome", studioId: null };
  }

  const [pagePart, ...rest] = hash.split("/");
  if (pagePart === "library") {
    const studioId = rest.length > 0 ? rest.join("/").trim() || null : null;
    return { pageId: "library", studioId };
  }

  if (pagePart && isPageId(pagePart)) {
    return { pageId: pagePart, studioId: null };
  }

  return { pageId: "welcome", studioId: null };
}

function writeHash(pageId: GalleryPageId, studioId: string | null) {
  const next =
    pageId === "library" && studioId
      ? `#library/${studioId}`
      : `#${pageId}`;
  window.history.replaceState(null, "", next);
}

/**
 * Softglass Gallery — guided, paginated, mobile-first tour of the design system.
 * Hash: #pageId | #library/<componentId>
 */
export function Playground() {
  const [pageId, setPageId] = useState<GalleryPageId>("welcome");
  const [studioId, setStudioId] = useState<string | null>(null);

  const applyHash = useCallback(() => {
    const next = parseHash(window.location.hash);
    setPageId(next.pageId);
    setStudioId(next.studioId);
  }, []);

  useEffect(() => {
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [applyHash]);

  const go = useCallback((id: GalleryPageId) => {
    setPageId(id);
    setStudioId(null);
    writeHash(id, null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goStudio = useCallback((id: string | null) => {
    setPageId("library");
    setStudioId(id);
    writeHash("library", id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const page = pageById(pageId);
  useEffect(() => {
    if (pageId === "library" && studioId) {
      document.title = `${studioId} · Library · Softglass Gallery`;
    } else {
      document.title = `${page.label} · Softglass Gallery`;
    }
  }, [page.label, pageId, studioId]);

  return (
    <GalleryShell pageId={pageId} onPageId={go}>
      <GalleryPageBody
        pageId={pageId}
        onGo={go}
        studioId={studioId}
        onStudioId={goStudio}
      />
    </GalleryShell>
  );
}
