"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { IntroNetwork } from "@/components/intro/IntroNetwork";
import { site, heroNetwork } from "@/lib/content";
import { uiStrings } from "@/lib/ui-strings";

type LocalPhase = "idle" | "connecting" | "exiting" | "done";
type Phase = "pending" | LocalPhase;
type Decision = "pending" | "show" | "skip";

const SESSION_KEY = "intro-seen";
const CONNECTING_MS = 900; // strand draw + node stagger (intro.css's entrance duration)
const EXITING_MS = 220; // overlay fade-out (intro.css's fast duration)

function markSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // Private-mode/storage-disabled: fail open. Worst case the intro can replay on a
    // reload within the same session — never worse than showing it once too often.
  }
}

// Read once, not watched: the intro's show/skip decision depends on
// `prefers-reduced-motion`, `sessionStorage`, and `location.hash` — none of which
// exist during SSR. `useSyncExternalStore` (not an effect + setState, which the
// project's `react-hooks/set-state-in-effect` rule flags — the same reasoning as
// D57's `ProjectsGrid` hash-reading fix) is the React-sanctioned way to read
// browser-only state without a synchronous setState-in-effect: `subscribe` is a
// no-op because nothing about this decision needs to change after mount, and
// `getServerSnapshot` gives the "identical on server and first client render" value
// hydration requires.
function subscribe() {
  return () => {};
}

// Cached after the first real computation, deliberately: `useSyncExternalStore` must
// call `getSnapshot` again on every render (even with a no-op `subscribe`, it still
// checks for tearing), and `handleConnect` below writes `sessionStorage` the moment
// the visitor activates Connect — without this cache, that write would flip a
// still-playing "show" decision to "skip" on the very next render the animation's
// own `setLocalPhase` calls cause, killing the animation before it can run. The
// decision is only ever "what should happen on THIS page load," fixed the instant
// it's first computed; marking the session seen is for the *next* load, not this one.
let cachedDecision: Decision | null = null;

function getSnapshot(): Decision {
  if (cachedDecision) return cachedDecision;
  try {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";
    const hash = window.location.hash;
    // A "meaningful" deep link: either the project-modal hash (Phase 6, not
    // necessarily a real DOM id) or any hash that names a section actually on the
    // page. Checking DOM presence rather than a hardcoded id list means this stays
    // correct automatically as sections self-hide (CLAUDE.md §6) — no id list here.
    const hasDeepLink = hash.length > 1 && (hash.startsWith("#project=") || document.getElementById(hash.slice(1)) !== null);
    cachedDecision = reducedMotion || alreadySeen || hasDeepLink ? "skip" : "show";
    return cachedDecision;
  } catch {
    // Never risk blocking the real site behind a broken browser API — skip the intro.
    cachedDecision = "skip";
    return cachedDecision;
  }
}

function getServerSnapshot(): Decision {
  return "pending";
}

/**
 * The cinematic opening (Phase 9.5). One small, self-contained Client Component —
 * everything else on the page (Header, Hero, every section) stays exactly as Phase 9
 * left it, untouched by this file (CLAUDE.md §6 "'use client' only for interaction...
 * pushed as far down the tree as possible"; Phase 9.5 Step 22).
 *
 * Renders `null` on the server and on the client's very first render (identical
 * output, so no hydration mismatch), then resolves to either `null` (skip) or the
 * overlay (show) as soon as `useSyncExternalStore` can read real browser state. The
 * base page under this component is the complete, normal site from the very first
 * byte — a JavaScript failure simply means this component never renders anything
 * (Step 10's "progressive enhancement, not a blocking overlay").
 */
export function Intro() {
  const decision = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [localPhase, setLocalPhase] = useState<LocalPhase>("idle");
  const connectButtonRef = useRef<HTMLButtonElement>(null);
  const wasShownRef = useRef(false);

  // Derived, not effect-driven: `decision` resolves to "show"/"skip" on its own via
  // useSyncExternalStore; `localPhase` only ever changes through the click handlers
  // and the timers below, never in response to `decision`.
  const phase: Phase = decision === "pending" ? "pending" : decision === "skip" ? "done" : localPhase;

  useEffect(() => {
    if (phase === "idle") {
      wasShownRef.current = true;
      connectButtonRef.current?.focus();
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "idle" || phase === "connecting" || phase === "exiting") {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "connecting") {
      const timer = setTimeout(() => setLocalPhase("exiting"), CONNECTING_MS);
      return () => clearTimeout(timer);
    }
    if (phase === "exiting") {
      const timer = setTimeout(() => setLocalPhase("done"), EXITING_MS);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    // Only move focus when the intro actually played and is now dismissing — never
    // autofocus anything on a plain load that bypassed the intro entirely (Step 26:
    // "do not unexpectedly throw focus somewhere unrelated"). The skip link is the
    // same element a fresh page load's very first Tab press would already reach.
    if (phase === "done" && wasShownRef.current) {
      document.querySelector<HTMLAnchorElement>('a[href="#main"]')?.focus();
    }
  }, [phase]);

  if (phase === "pending" || phase === "done") return null;

  function handleConnect() {
    markSeen();
    setLocalPhase("connecting");
  }

  function handleSkip() {
    markSeen();
    setLocalPhase("done");
  }

  return (
    <div
      className="intro-overlay fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-background"
      data-phase={phase}
    >
      <IntroNetwork network={heroNetwork} />

      <div className="intro-idle pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-10 px-6 text-center">
        <div>
          <p className="font-mono text-label tracking-[0.2em] text-muted uppercase">{uiStrings.introRoleLabel}</p>
          <h1 className="mt-4 font-display text-display text-foreground text-balance">{site.name.full}</h1>
        </div>
        <button
          ref={connectButtonRef}
          type="button"
          onClick={handleConnect}
          className="focus-ring surface--chamfered pointer-events-auto inline-flex min-h-14 items-center border border-transparent bg-accent px-8 font-mono text-label tracking-[0.15em] text-accent-foreground uppercase transition-colors duration-150 hover:bg-accent-hover"
        >
          <span className="intro-connect-touch">{uiStrings.introConnectTouch}</span>
          <span className="intro-connect-pointer">{uiStrings.introConnectPointer}</span>
        </button>
      </div>

      <button
        type="button"
        onClick={handleSkip}
        className="focus-ring absolute right-6 bottom-6 min-h-11 px-2 font-mono text-label text-muted underline decoration-border decoration-1 underline-offset-4 hover:text-foreground hover:decoration-accent sm:right-8 sm:bottom-8"
      >
        {uiStrings.introSkip}
      </button>
    </div>
  );
}
