import { createFileRoute } from "@tanstack/react-router";
import { User, Lock, Bell, Palette, HardDrive, CreditCard, ChevronRight } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — CloudFile" }] }),
  component: SettingsPage,
});

const groups: Array<{
  title: string;
  description: string;
  items: Array<{ icon: typeof User; title: string; desc: string }>;
}> = [
  {
    title: "Account",
    description: "Personal information and how you sign in.",
    items: [
      { icon: User, title: "Profile", desc: "Update your name, photo and contact info." },
      { icon: Lock, title: "Security", desc: "Password, two-factor authentication and active sessions." },
      { icon: CreditCard, title: "Billing", desc: "Manage plan, payment methods and invoices." },
    ],
  },
  {
    title: "Workspace",
    description: "Customize how CloudFile looks and behaves.",
    items: [
      { icon: Bell, title: "Notifications", desc: "Choose which email and in-app notifications you receive." },
      { icon: Palette, title: "Appearance", desc: "Theme, accent color and density preferences." },
      { icon: HardDrive, title: "Storage", desc: "Review usage and upgrade your storage plan." },
    ],
  },
];

function SettingsPage() {
  return (
    <DashboardLayout title="Settings" description="Manage your account, preferences and security.">
      <div className="space-y-8">
        {groups.map((g) => (
          <section key={g.title}>
            <header className="mb-3">
              <h2 className="text-base font-semibold">{g.title}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{g.description}</p>
            </header>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <ul className="divide-y divide-border">
                {g.items.map((s) => (
                  <li key={s.title}>
                    <button className="w-full text-left flex items-center gap-4 px-5 py-4 hover:bg-muted/40 transition-colors">
                      <div className="size-10 rounded-lg bg-primary/8 text-primary grid place-items-center shrink-0">
                        <s.icon className="size-[18px]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold">{s.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{s.desc}</div>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </DashboardLayout>
  );
}
