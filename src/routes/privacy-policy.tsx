import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — CloudFile" },
      { name: "description", content: "How CloudFile collects, uses, and protects your data." },
      { property: "og:title", content: "Privacy Policy — CloudFile" },
      { property: "og:description", content: "How CloudFile collects, uses, and protects your data." },
    ],
    links: [{ rel: "canonical", href: "https://cloud-file.lovable.app/privacy-policy" }],
  }),
  component: () => <MarketingPage title="Privacy Policy" description="How CloudFile collects, uses, and protects your data." />,
});
