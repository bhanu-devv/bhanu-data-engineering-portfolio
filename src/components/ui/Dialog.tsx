"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface DialogProps {
  open: boolean;
  /** Fired whenever the native dialog reports it is closed — for any reason (Escape,
   *  backdrop click, or a programmatic `.close()`). Purely a state-sync signal; it does
   *  not itself navigate. Callers that want closing to also update the URL hash (this
   *  site's project modal) drive that from their own close controls instead. */
  onClosed: () => void;
  titleId: string;
  children: ReactNode;
  className?: string;
}

/**
 * Accessible dialog primitive (Phase 6 Steps 9-10) wrapping the native `<dialog>`
 * element — see src/styles/dialog.css for why this is preferred over a hand-rolled
 * focus trap or an added library. `showModal()`/`close()` are the only imperative API
 * used; everything else (focus trap, Escape, focus restore, inert background) is
 * native browser behavior.
 */
export function Dialog({ open, onClosed, titleId, children, className = "" }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  // The spec has `showModal()` capture "the currently focused element" to restore on
  // close, but this dialog's content is lazy-loaded (`next/dynamic`), so at the exact
  // moment `showModal()` runs there is nothing focusable inside it yet — found via
  // Playwright QA to leave focus stranded somewhere unhelpful instead of restoring to
  // the trigger link. Capturing it ourselves and restoring explicitly removes any
  // dependency on that native timing.
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Open/close the native element to match the `open` prop.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      previouslyFocused.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // The native 'close' event fires for every close path (Escape, backdrop-triggered
  // `.close()`, or our own `.close()` call below) — one listener keeps state in sync
  // regardless of how the dialog closed.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => {
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
      onClosed();
    };
    dialog.addEventListener("close", handleClose);
    return () => {
      dialog.removeEventListener("close", handleClose);
      document.body.style.overflow = "";
    };
  }, [onClosed]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className={`dialog ${className}`}
      onClick={(event) => {
        // A click landing on the <dialog> element itself (not its inner panel) is a
        // backdrop click — close it. Clicks inside the panel never bubble past the
        // panel because the panel is a distinct element within the dialog box.
        if (event.target === ref.current) ref.current?.close();
      }}
    >
      {children}
    </dialog>
  );
}
