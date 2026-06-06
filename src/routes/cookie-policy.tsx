import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — CloudFile" },
      { name: "description", content: "How CloudFile uses cookies and similar technologies." },
      { property: "og:title", content: "Cookie Policy — CloudFile" },
      { property: "og:description", content: "How CloudFile uses cookies and similar technologies." },
    ],
    links: [{ rel: "canonical", href: "https://cloud-file.lovable.app/cookie-policy" }],
  }),
  component: () => <MarketingPage title="Cookie Policy" description="How CloudFile uses cookies and similar technologies." />,
});
