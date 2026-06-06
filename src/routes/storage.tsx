import { createFileRoute, Link } from "@tanstack/react-router";
import { HardDrive, FileText, Image as ImageIcon, Film, File } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useStorageStats, formatBytes, TOTAL_QUOTA_BYTES } from "@/hooks/useStorageStats";

export const Route = createFileRoute("/storage")({
  head: () => ({ meta: [{ title: "Storage — CloudFile" }] }),
  component: StoragePage,
});

function StoragePage() {
  const { stats } = useStorageStats();
  const total = TOTAL_QUOTA_BYTES;
  const used = stats.usedBytes;
  const pct = Math.max((used / total) * 100, used > 0 ? 2 : 0);
  const categories = [
    { label: "Documents", val: stats.byCategory.documents, c: "bg-primary", icon: FileText },
    { label: "Images", val: stats.byCategory.images, c: "bg-aqua", icon: ImageIcon },
    { label: "Videos", val: stats.byCategory.videos, c: "bg-primary-glow", icon: Film },
    { label: "Others", val: stats.byCategory.others, c: "bg-muted-foreground/40", icon: File },
  ];
  return (
    <DashboardLayout title="Storage" description="Analyze your storage usage and upgrade when you need more space.">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        <div className="bg-card rounded-2xl p-6 shadow-card border border-border/60">
          <div className="flex items-center gap-3 mb-5">
            <HardDrive className="size-5 text-primary" />
            <h2 className="font-semibold text-lg">Storage Usage</h2>
          </div>
          <div className="text-3xl font-bold">
            {formatBytes(used)} <span className="text-base font-medium text-muted-foreground">of {formatBytes(total)} used</span>
          </div>
          <div className="h-2 rounded-full bg-muted mt-3 overflow-hidden">
            <div className="h-full bg-gradient-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {categories.map((c) => (
              <div key={c.label} className="flex items-center gap-3 p-3 rounded-xl border border-border/60">
                <div className={`size-10 rounded-lg grid place-items-center ${c.c} text-white`}>
                  <c.icon className="size-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{c.label}</div>
                  <div className="text-xs text-muted-foreground">{formatBytes(c.val)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-card rounded-2xl p-6 shadow-elegant text-aqua-foreground">
          <h3 className="font-bold text-xl">Upgrade Plan</h3>
          <p className="text-sm mt-2 opacity-80">Get up to 2TB of storage with priority support and advanced sharing.</p>
          <Link to="/" className="mt-5 inline-flex px-5 h-10 rounded-xl bg-white text-primary font-semibold text-sm items-center shadow-card">
            View Plans
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
