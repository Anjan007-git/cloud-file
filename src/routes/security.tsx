import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/MarketingPage";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security — CloudFile" },
      { name: "description", content: "Enterprise-grade security: AES-256 encryption, TLS 1.3, SOC 2 controls, and zero-trust access." },
      { property: "og:title", content: "Security — CloudFile" },
      { property: "og:description", content: "Enterprise-grade security: AES-256 encryption, TLS 1.3, SOC 2 controls, and zero-trust access." },
    ],
    links: [{ rel: "canonical", href: "https://cloud-file.lovable.app/security" }],
  }),
  component: () => <MarketingPage title="Security" description="Enterprise-grade security: AES-256 encryption, TLS 1.3, SOC 2 controls, and zero-trust access." />,
});
