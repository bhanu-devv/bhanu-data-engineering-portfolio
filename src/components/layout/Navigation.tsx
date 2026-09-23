"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useActiveSection } from "@/hooks/use-active-section";

interface NavItem {
  id: string;
  label: string;
  /** Shown in the compact desktop bar. Every renderable section still appears in the
   *  mobile sheet, regardless of this flag (Phase 9 Step 4: "do not omit important
   *  sections merely because there are many" — the mobile sheet is the overflow). */
  inNav: boolean;
}

interface NavigationProps {
  items: NavItem[];
  resumeHref: string | null;
  resumeDownloadHref: string | null;
  resumeDownloadName: string | null;
}

/**
 * The site's one navigation component (Phase 9 Steps 3-4): a compact desktop bar
 * (only `inNav` sections, so the header never overcrowds) plus a full mobile sheet
 * (every renderable section, so nothing is dropped merely for lack of horizontal
 * room). Both read active-section state from one `useActiveSection` call so the
 * crimson "current section" marker matches in both.
 *
 * Client Component: the only client-boundary-crossing state this page needs is
 * "which section is active" and "is the mobile sheet open" — everything else
 * (labels, hrefs) is passed in as server-rendered props (CLAUDE.md §6 "'use client'
 * only for interaction... pushed as far down the tree as possible").
 */
export function Navigation({ items, resumeHref, resumeDownloadHref, resumeDownloadName }: NavigationProps) {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection(items.map((item) => item.id));
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Escape closes; body scroll is locked while open; focus returns to the trigger on close.
  useEffect(() => {
    if (!open) return;

    const menuButton = menuButtonRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const firstLink = sheetRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      // Minimal focus containment: keep Tab cycling within the sheet while it's open.
      if (event.key === "Tab" && sheetRef.current) {
        const focusable = sheetRef.current.querySelectorAll<HTMLElement>("a, button");
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      (previouslyFocused ?? menuButton)?.focus();
    };
  }, [open]);

  const desktopItems = items.filter((item) => item.inNav);

  function linkClasses(id: string) {
    const isActive = id === activeId;
    return [
      "focus-ring font-body text-sm transition-colors duration-150",
      isActive ? "text-foreground border-b border-accent" : "text-muted hover:text-foreground",
    ].join(" ");
  }

  return (
    <>
      <nav aria-label="Primary" className="hidden items-center gap-4 md:flex lg:gap-6">
        {desktopItems.map((item) => (
          <a key={item.id} href={`#${item.id}`} className={linkClasses(item.id)} aria-current={item.id === activeId ? "true" : undefined}>
            {item.label}
          </a>
        ))}
        {resumeHref && (
          // Secondary (steel border), not crimson: the Header is visible in the same
          // viewport as the Hero, which already spends the crimson budget on its own
          // primary CTA, live node, and portrait edge — a second crimson fill here would
          // push that one viewport past CLAUDE.md §4's "at most three" cap.
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring surface--chamfered inline-flex min-h-9 shrink-0 items-center border border-border px-4 font-body text-sm text-muted transition-colors duration-150 hover:border-border hover:text-foreground"
          >
            Resume
          </a>
        )}
      </nav>

      <button
        ref={menuButtonRef}
        type="button"
        className="focus-ring surface--chamfered inline-flex min-h-11 min-w-11 items-center justify-center border border-border text-foreground md:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
        </svg>
      </button>

      {open &&
        createPortal(
          <div
            id="mobile-menu"
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="bg-header fixed inset-x-0 top-(--header-height) bottom-0 z-40 overflow-y-auto border-t border-border-subtle md:hidden"
          >
          <ul className="flex flex-col gap-1 px-[var(--spacing-gutter)] py-6">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={item.id === activeId ? "true" : undefined}
                  className={`focus-ring block min-h-11 py-2 font-display text-lg ${
                    item.id === activeId ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          {resumeHref && (
            <div className="flex flex-wrap gap-4 border-t border-border-subtle px-[var(--spacing-gutter)] py-6">
              <a
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="focus-ring surface--chamfered inline-flex min-h-11 items-center border border-transparent bg-accent px-5 font-body text-sm font-medium text-accent-foreground"
              >
                View Resume
              </a>
              {resumeDownloadHref && resumeDownloadName && (
                <a
                  href={resumeDownloadHref}
                  download={resumeDownloadName}
                  onClick={() => setOpen(false)}
                  className="focus-ring surface--chamfered inline-flex min-h-11 items-center border border-border px-5 font-body text-sm text-muted"
                >
                  Download Resume
                </a>
              )}
            </div>
          )}
          </div>,
          document.body,
        )}
    </>
  );
}
