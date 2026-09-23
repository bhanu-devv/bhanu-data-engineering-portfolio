import { Container } from "@/components/ui/Container";
import { Surface } from "@/components/ui/Surface";
import { Button } from "@/components/ui/Button";

/**
 * Branded 404 (Phase 9 Step 26). Lightweight and on-theme — reuses `Surface`/`Button`
 * rather than inventing new visual language for a page almost nobody sees. States
 * plainly that the page wasn't found and offers one clear way back.
 */
export default function NotFound() {
  return (
    <main id="main" className="flex min-h-screen items-center justify-center py-24">
      <Container narrow>
        <Surface chamfered className="p-10 text-center lg:p-14">
          <p className="font-mono text-label tracking-wide text-muted uppercase">404</p>
          <h1 className="mt-3 font-display text-display text-foreground">Page not found</h1>
          <p className="mt-4 text-lede text-muted">
            The page you&rsquo;re looking for doesn&rsquo;t exist, or the link may be outdated.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/" variant="primary">
              Back to home
            </Button>
          </div>
        </Surface>
      </Container>
    </main>
  );
}
