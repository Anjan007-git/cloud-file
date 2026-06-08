// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Outside the Lovable sandbox, the Lovable config skips the Nitro deploy plugin
// unless we pass an explicit `nitro` option. For Vercel (and any other non-Lovable
// build host), force-enable Nitro with the Vercel preset so the build emits
// .vercel/output (Build Output API v3) where Vercel can serve SSR + assets.
// Inside the Lovable sandbox, leave it untouched so the default Cloudflare
// preset continues to power the live preview.
const isLovableSandbox =
  process.env.LOVABLE_SANDBOX === "1" || !!process.env.DEV_SERVER__PROJECT_PATH;

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
  ...(isLovableSandbox
    ? {}
    : {
        nitro: {
          preset: "vercel",
        },
      }),
});
