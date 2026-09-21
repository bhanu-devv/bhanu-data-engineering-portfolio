import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Architecture boundaries (CLAUDE.md §6): presentation code reaches /content only
  // through "@/lib/content".
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/lib/content.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@content/*"],
              message: 'Import content only through "@/lib/content" (CLAUDE.md §6).',
            },
          ],
        },
      ],
    },
  },
  // /content holds data only: it must not depend on UI code or the content gateway.
  {
    files: ["content/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/components/*", "@/app/*", "@/hooks/*", "@/lib/content"],
              message: "content/ may import only types and the needsInput helper.",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
