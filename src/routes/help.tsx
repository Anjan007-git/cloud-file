import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, MessageCircle, AlertTriangle, PlayCircle, HelpCircle } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";

export const Route = createFileRoute("/help")({
  head: () => ({ meta: [{ title: "Help Center — CloudFile" }] }),
  component: HelpPage,
});

const items = [
  { icon: HelpCircle, title: "FAQ", desc: "Answers to the most common questions." },
  { icon: BookOpen, title: "Documentation", desc: "Guides and reference for every feature." },
  { icon: PlayCircle, title: "Tutorials", desc: "Short videos to get you started quickly." },
  { icon: MessageCircle, title: "Contact Support", desc: "Get in touch with our team 24/7." },
  { icon: AlertTriangle, title: "Report an Issue", desc: "Let us know if something isn't working." },
];

function HelpPage() {
  return (
    <DashboardLayout title="Help Center" description="Find answers, learn the product or contact our support team.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((s) => (
          <button key={s.title} className="text-left bg-card rounded-2xl p-5 shadow-card border border-border/60 hover:shadow-elegant transition-all">
            <div className="size-11 rounded-xl bg-aqua/20 text-primary grid place-items-center mb-4">
              <s.icon className="size-5" />
            </div>
            <div className="font-semibold">{s.title}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.desc}</div>
          </button>
        ))}
      </div>
    </DashboardLayout>
  );
}
