import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — CloudFile" },
      { name: "description", content: "Get in touch with the CloudFile sales and support team." },
      { property: "og:title", content: "Contact Us — CloudFile" },
      { property: "og:description", content: "Get in touch with the CloudFile sales and support team." },
    ],
    links: [{ rel: "canonical", href: "https://cloud-file.lovable.app/contact" }],
  }),
  component: () => <MarketingPage title="Contact Us" description="Get in touch with the CloudFile sales and support team." />,
});
