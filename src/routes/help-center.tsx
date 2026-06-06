import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";

export const Route = createFileRoute("/help-center")({
  head: () => ({
    meta: [
      { title: "Help Center — CloudFile" },
      { name: "description", content: "Get answers to common questions and contact CloudFile support." },
      { property: "og:title", content: "Help Center — CloudFile" },
      { property: "og:description", content: "Get answers to common questions and contact CloudFile support." },
    ],
    links: [{ rel: "canonical", href: "https://cloud-file.lovable.app/help-center" }],
  }),
  component: () => <MarketingPage title="Help Center" description="Get answers to common questions and contact CloudFile support." />,
});
