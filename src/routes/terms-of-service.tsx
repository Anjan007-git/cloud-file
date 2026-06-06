import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: "Terms of Service — CloudFile" },
      { name: "description", content: "The terms governing your use of the CloudFile platform." },
      { property: "og:title", content: "Terms of Service — CloudFile" },
      { property: "og:description", content: "The terms governing your use of the CloudFile platform." },
    ],
    links: [{ rel: "canonical", href: "https://cloud-file.lovable.app/terms-of-service" }],
  }),
  component: () => <MarketingPage title="Terms of Service" description="The terms governing your use of the CloudFile platform." />,
});
