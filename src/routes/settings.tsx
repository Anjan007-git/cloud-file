import { createFileRoute } from "@tanstack/react-router";
import { User, Lock, Bell, Palette, Globe } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — CloudFile" }] }),
  component: SettingsPage,
});

const sections = [
  { icon: User, title: "Profile", desc: "Update your name, photo and contact info." },
  { icon: Lock, title: "Security", desc: "Password, two-factor authentication and sessions." },
  { icon: Bell, title: "Notifications", desc: "Choose what email and push notifications you receive." },
  { icon: Palette, title: "Appearance", desc: "Light, dark and accent color preferences." },
  { icon: Globe, title: "Language & Region", desc: "Display language, time zone and date format." },
];

function SettingsPage() {
  return (
    <DashboardLayout title="Settings" description="Manage your account, preferences and security.">
      <div className="grid sm:grid-cols-2 gap-4">
        {sections.map((s) => (
          <button key={s.title} className="text-left bg-card rounded-2xl p-5 shadow-card border border-border/60 hover:shadow-elegant transition-all flex gap-4">
            <div className="size-11 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0">
              <s.icon className="size-5" />
            </div>
            <div>
              <div className="font-semibold">{s.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </DashboardLayout>
  );
}
