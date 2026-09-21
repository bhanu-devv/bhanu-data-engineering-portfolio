import { site } from "@/lib/content";
import { uiStrings } from "@/lib/ui-strings";

// Phase 1 placeholder: proves the app runs. The real Hero arrives in Phase 4.
export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">{site.name.full}</h1>
      <p className="mt-2">{uiStrings.foundationStatus}</p>
    </main>
  );
}
