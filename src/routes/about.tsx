import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CloudFile — CloudFile" },
      { name: "description", content: "Our mission: secure, fast, beautifully simple cloud storage for modern teams." },
      { property: "og:title", content: "About CloudFile — CloudFile" },
      { property: "og:description", content: "Our mission: secure, fast, beautifully simple cloud storage for modern teams." },
    ],
    links: [{ rel: "canonical", href: "https://cloud-file.lovable.app/about" }],
  }),
  component: () => <MarketingPage title="About CloudFile" description="Our mission: secure, fast, beautifully simple cloud storage for modern teams." />,
});
