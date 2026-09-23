import { site } from "@/lib/content";
import { getPublicSocials } from "@/lib/content-selectors";

/**
 * The site's footer (Phase 9 Step 6): minimal wayfinding, not a second Contact.
 * Name, role, current year, and the same public GitHub/LinkedIn links — no email,
 * no phone (Contact is the only place those appear, CLAUDE.md §2 rule 8), and no
 * "Made with"/"Powered by"/AI-attribution line of any kind.
 */
export function Footer() {
  const socials = getPublicSocials();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle">
      <div className="mx-auto flex w-full max-w-(--container-content) flex-col items-center gap-4 px-[var(--spacing-gutter)] py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="font-body text-sm text-muted">
          <span className="text-foreground">{site.name.full}</span> — Data Engineer · &copy; {year}
        </p>

        {socials.length > 0 && (
          <nav aria-label="Social" className="flex items-center gap-6">
            {socials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring font-mono text-label text-muted underline decoration-border decoration-1 underline-offset-4 hover:text-foreground hover:decoration-accent"
              >
                {social.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
}
