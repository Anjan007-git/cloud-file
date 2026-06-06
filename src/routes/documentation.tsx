import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";

export const Route = createFileRoute("/documentation")({
  head: () => ({
    meta: [
      { title: "Documentation — CloudFile" },
      { name: "description", content: "Developer documentation for the CloudFile platform and API." },
      { property: "og:title", content: "Documentation — CloudFile" },
      { property: "og:description", content: "Developer documentation for the CloudFile platform and API." },
    ],
    links: [{ rel: "canonical", href: "https://cloud-file.lovable.app/documentation" }],
  }),
  component: () => <MarketingPage title="Documentation" description="Developer documentation for the CloudFile platform and API." />,
});
