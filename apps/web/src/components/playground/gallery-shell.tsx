"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  GALLERY_PAGES,
  pageById,
  pageByNumber,
  pageIndex,
  type GalleryPageId,
} from "@/components/playground/catalog";
import { Button, Sheet, ShellNav, ShellNavItem } from "@softglass/ui";
import { useCallback, useEffect, useState, type ReactNode } from "react";

type GalleryShellProps = {
  pageId: GalleryPageId;
  onPageId: (id: GalleryPageId) => void;
  children: ReactNode;
};

/**
 * Mobile-first gallery chrome:
 * top brand bar · scrollable body · sticky bottom pager (+ TOC sheet).
 */
export function GalleryShell({ pageId, onPageId, children }: GalleryShellProps) {
  const page = pageById(pageId);
  const index = pageIndex(pageId);
  const pageNumber = index + 1;
  const pageCount = GALLERY_PAGES.length;
  const [tocOpen, setTocOpen] = useState(false);

  const goNumber = useCallback(
    (n: number) => {
      const next = pageByNumber(n);
      onPageId(next.id);
      setTocOpen(false);
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${next.id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [onPageId],
  );

  const goPrev = () => {
    if (pageNumber > 1) goNumber(pageNumber - 1);
  };
  const goNext = () => {
    if (pageNumber < pageCount) goNumber(pageNumber + 1);
  };

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (pageNumber > 1) goNumber(pageNumber - 1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (pageNumber < pageCount) goNumber(pageNumber + 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNumber, pageCount, pageNumber]);

  return (
    <div className="sg-gallery">
      <header className="sg-gallery-top">
        <div className="sg-gallery-top-inner">
          <div className="sg-gallery-brand">
            <span className="sg-gallery-mark" aria-hidden>
              ◆
            </span>
            <div>
              <div className="sg-gallery-brand-name">Softglass</div>
              <div className="sg-gallery-brand-sub">Gallery · guided tour</div>
            </div>
          </div>
          <div className="sg-gallery-top-actions">
            <Button
              size="sm"
              variant="secondary"
              className="sg-gallery-toc-btn"
              onClick={() => setTocOpen(true)}
            >
              Pages
            </Button>
            {/* compact only — full names wrap the header (Pearl Soft falls down) */}
            <ThemeSwitcher density="compact" className="sg-gallery-theme" />
          </div>
        </div>
      </header>

      <main className="sg-gallery-body" id="gallery-main">
        <div className="sg-gallery-page-head">
          <div className="sg-gallery-kicker">
            <span className="sg-gallery-kicker-label">{page.label}</span>
          </div>
          <h1 className="sg-gallery-title">{page.title}</h1>
          <p className="sg-gallery-summary">{page.summary}</p>
          <p className="sg-gallery-takeaway">
            <strong>Takeaway:</strong> {page.takeaway}
          </p>
        </div>

        <div className="sg-gallery-content">{children}</div>
      </main>

      <footer className="sg-gallery-bottom" aria-label="Gallery navigation">
        <div className="sg-gallery-bottom-inner">
          <Button
            size="sm"
            variant="secondary"
            disabled={pageNumber <= 1}
            onClick={goPrev}
          >
            ← Prev
          </Button>

          <p className="sg-gallery-page-status" aria-live="polite">
            {pageNumber} / {pageCount}
          </p>

          <Button
            size="sm"
            variant="primary"
            disabled={pageNumber >= pageCount}
            onClick={goNext}
          >
            Next →
          </Button>
        </div>

        <nav className="sg-gallery-steps" aria-label="Jump to section">
          {GALLERY_PAGES.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className="sg-gallery-step"
              data-active={i === index || undefined}
              onClick={() => goNumber(i + 1)}
              aria-current={i === index ? "page" : undefined}
              title={p.summary}
            >
              <span className="sg-gallery-step-dot" aria-hidden />
              <span className="sg-gallery-step-label">{p.label}</span>
            </button>
          ))}
        </nav>
      </footer>

      <Sheet
        open={tocOpen}
        onOpenChange={setTocOpen}
        title="Gallery pages"
        description="Jump anywhere in the tour."
        side="bottom"
      >
        <ShellNav aria-label="All gallery pages">
          {GALLERY_PAGES.map((p, i) => (
            <ShellNavItem
              key={p.id}
              href={`#${p.id}`}
              active={p.id === pageId}
              onClick={(e) => {
                e.preventDefault();
                goNumber(i + 1);
              }}
            >
              <span className="sg-gallery-toc-num">{i + 1}</span>
              <span>
                <strong>{p.label}</strong>
                <span className="sg-gallery-toc-sum">{p.summary}</span>
              </span>
            </ShellNavItem>
          ))}
        </ShellNav>
      </Sheet>
    </div>
  );
}
