import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — CloudFile" },
      { name: "description", content: "Guides, articles, and product updates from the CloudFile team." },
      { property: "og:title", content: "Resources — CloudFile" },
      { property: "og:description", content: "Guides, articles, and product updates from the CloudFile team." },
    ],
    links: [{ rel: "canonical", href: "https://cloud-file.lovable.app/resources" }],
  }),
  component: () => <MarketingPage title="Resources" description="Guides, articles, and product updates from the CloudFile team." />,
});
