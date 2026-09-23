import { site } from "@/lib/content";
import { getRenderableNavigation } from "@/lib/content-selectors";
import { getResumeAsset } from "@/lib/resume";
import { Navigation } from "@/components/layout/Navigation";

/**
 * The site's sticky header (Phase 9 Step 5): quiet brand identity, the compact
 * desktop nav, and the mobile menu trigger (both inside `Navigation`, the one client
 * leaf this needs). Server Component — everything here is server-rendered text and
 * hrefs; only "which section is active" / "is the mobile sheet open" needs the client.
 */
export function Header() {
  const sections = getRenderableNavigation();
  // "Home" (hero) has its own brand link below, not a second nav entry.
  const items = sections.filter((section) => section.id !== "hero").map((section) => ({ id: section.id, label: section.label, inNav: section.inNav }));
  const asset = getResumeAsset();

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-(--header-height) border-b border-border-subtle bg-header/90 backdrop-blur-md">
      <div className="mx-auto flex h-full w-full max-w-(--container-content) items-center justify-between px-[var(--spacing-gutter)]">
        <a href="#hero" className="focus-ring shrink-0 font-display text-sm font-semibold tracking-wide text-foreground">
          {/* Full name needs real room next to 7 nav links + the Resume button — reserved
              for lg+ (1024px); md (768-1023px) shows the monogram, same as mobile, rather
              than wrapping to two lines and pushing the Resume button off-screen. */}
          <span className="lg:hidden">{site.name.monogram}</span>
          <span className="hidden lg:inline">{site.name.full}</span>
        </a>

        <Navigation
          items={items}
          resumeHref={asset.available ? asset.viewHref : null}
          resumeDownloadHref={asset.available ? asset.downloadHref : null}
          resumeDownloadName={asset.available ? asset.downloadName : null}
        />
      </div>
    </header>
  );
}
