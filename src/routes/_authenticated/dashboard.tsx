import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import {
  FolderOpen,
  CloudUpload,
  Star,
  Download,
  FileText,
  FolderPlus,
  Share2,
  Settings,
  Sparkles,
  Activity,
  Upload,
  Pencil,
  Trash2,
  RotateCcw,
  ArrowUpCircle,
} from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardTopbar } from "@/components/DashboardTopbar";
import { FileList } from "@/components/FileList";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useFiles } from "@/hooks/useFiles";
import { useStorageStats, formatBytes, TOTAL_QUOTA_BYTES } from "@/hooks/useStorageStats";
import { useActivity } from "@/hooks/useActivity";
import { formatRelative, type ActivityType } from "@/lib/activity";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — CloudFile" },
      { name: "description", content: "Your cloud storage dashboard." },
    ],
  }),
  component: DashboardPage,
});

const activityIcon: Record<ActivityType, { icon: typeof Upload; tint: string }> = {
  uploaded: { icon: Upload, tint: "bg-primary/10 text-primary" },
  downloaded: { icon: Download, tint: "bg-aqua/20 text-aqua-foreground" },
  renamed: { icon: Pencil, tint: "bg-accent/60 text-accent-foreground" },
  deleted: { icon: Trash2, tint: "bg-destructive/10 text-destructive" },
  trashed: { icon: Trash2, tint: "bg-warning/15 text-foreground" },
  restored: { icon: RotateCcw, tint: "bg-success/15 text-foreground" },
  shared: { icon: Share2, tint: "bg-primary/10 text-primary" },
  starred: { icon: Star, tint: "bg-warning/15 text-foreground" },
};

const activityVerb: Record<ActivityType, string> = {
  uploaded: "Uploaded",
  downloaded: "Downloaded",
  renamed: "Renamed",
  deleted: "Deleted",
  trashed: "Moved to trash",
  restored: "Restored",
  shared: "Shared",
  starred: "Starred",
};

function DashboardPage() {
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  const { stats } = useStorageStats();
  const { files, upload, toggleStar, moveToTrash, download, rename } = useFiles("recent");
  const { activities, downloads } = useActivity();
  const inputRef = useRef<HTMLInputElement>(null);

  const usedBytes = stats.usedBytes;
  const totalBytes = TOTAL_QUOTA_BYTES;
  const pct = (usedBytes / totalBytes) * 100;
  const circ = 2 * Math.PI * 56;
  const dash = (Math.min(pct, 100) / 100) * circ;

  const statCards = [
    { label: "Total Files", value: String(stats.totalFiles), sub: stats.totalFiles > 0 ? "Across all folders" : "Start uploading", icon: FolderOpen, tint: "bg-primary/10 text-primary" },
    { label: "Storage Used", value: formatBytes(usedBytes), sub: `of ${formatBytes(totalBytes)}`, icon: CloudUpload, tint: "bg-aqua/20 text-aqua-foreground" },
    { label: "Starred", value: String(stats.starredCount), sub: "Marked as favorite", icon: Star, tint: "bg-warning/15 text-warning" },
    { label: "Downloads", value: String(downloads), sub: "Total downloads", icon: Download, tint: "bg-success/15 text-success" },
  ];

  const quickActions = [
    { title: "Upload Files", sub: "Choose files to upload", icon: CloudUpload, color: "text-primary bg-primary/10", onClick: () => inputRef.current?.click() },
    { title: "Browse Files", sub: "Open your file manager", icon: FolderPlus, color: "text-aqua-foreground bg-aqua/20", onClick: () => navigate({ to: "/files" }) },
    { title: "Starred", sub: "Your favorite files", icon: Star, color: "text-warning bg-warning/15", onClick: () => navigate({ to: "/starred" }) },
    { title: "Storage", sub: "Manage your storage", icon: Settings, color: "text-foreground bg-muted", onClick: () => navigate({ to: "/storage" }) },
  ];

  const recent = files.slice(0, 5);

  return (
    <div className="min-h-screen flex bg-background">
      <AppSidebar />
      <main className="flex-1 p-6 lg:p-8 min-w-0">
        <DashboardTopbar />

        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) upload(e.target.files);
            e.target.value = "";
          }}
        />

        <section className="mb-7">
          <h1 className="text-3xl md:text-[32px] font-bold text-foreground tracking-tight">
            Welcome, {user?.firstName ?? "there"}!
          </h1>
          <p className="text-muted-foreground mt-1.5 text-sm">Here's what's happening with your files today.</p>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((s) => (
                <div key={s.label} className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 hover:shadow-card transition-all duration-200">
                  <div className={`size-10 rounded-lg grid place-items-center mb-4 ${s.tint}`}>
                    <s.icon className="size-[18px]" />
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">{s.label}</div>
                  <div className="text-2xl font-bold mt-1 tracking-tight">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1.5">{s.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-base">Recent Files</h2>
                  <Link to="/files" className="text-sm font-medium text-primary hover:underline">View all</Link>
                </div>
                {recent.length === 0 ? (
                  <div className="grid place-items-center py-12 text-center">
                    <div className="size-14 rounded-2xl bg-primary/10 text-primary grid place-items-center mb-4">
                      <FileText className="size-6" />
                    </div>
                    <div className="font-semibold text-sm">No files yet</div>
                    <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                      Upload your first file to start organizing your cloud storage.
                    </p>
                    <button type="button" onClick={() => inputRef.current?.click()} className="mt-5 px-4 h-9 rounded-lg bg-primary text-primary-foreground font-semibold text-sm inline-flex items-center gap-2">
                      <Upload className="size-4" /> Upload a file
                    </button>
                  </div>
                ) : (
                  <FileList files={recent} onStar={toggleStar} onDownload={download} onTrash={moveToTrash} onRename={rename} />
                )}
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h2 className="font-semibold text-base mb-4">Quick Actions</h2>
                <div className="space-y-1.5">
                  {quickActions.map((a) => (
                    <button key={a.title} onClick={a.onClick} className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors text-left">
                      <div className={`size-9 rounded-lg grid place-items-center ${a.color}`}>
                        <a.icon className="size-[16px]" />
                      </div>
                      <div className="leading-tight">
                        <div className="text-sm font-semibold">{a.title}</div>
                        <div className="text-xs text-muted-foreground">{a.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="font-semibold text-base mb-4">Storage Overview</h2>
              <div className="flex items-center gap-5">
                <div className="relative size-28 shrink-0">
                  <svg viewBox="0 0 140 140" className="size-28 -rotate-90">
                    <circle cx="70" cy="70" r="56" stroke="oklch(0.93 0.02 230)" strokeWidth="14" fill="none" />
                    <circle cx="70" cy="70" r="56" stroke="url(#g)" strokeWidth="14" fill="none" strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
                    <defs>
                      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="oklch(0.52 0.21 256)" />
                        <stop offset="100%" stopColor="oklch(0.78 0.13 200)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 grid place-items-center text-center">
                    <div>
                      <div className="text-lg font-bold">{formatBytes(usedBytes)}</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Used</div>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 text-sm flex-1">
                  {[
                    { label: "Documents", val: formatBytes(stats.byCategory.documents), c: "bg-primary" },
                    { label: "Images", val: formatBytes(stats.byCategory.images), c: "bg-aqua" },
                    { label: "Videos", val: formatBytes(stats.byCategory.videos), c: "bg-primary-glow" },
                    { label: "Others", val: formatBytes(stats.byCategory.others), c: "bg-muted-foreground/40" },
                  ].map((r) => (
                    <li key={r.label} className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-xs">
                        <span className={`size-2 rounded-full ${r.c}`} />
                        {r.label}
                      </span>
                      <span className="text-muted-foreground text-xs">{r.val}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl p-6 bg-gradient-card text-aqua-foreground border border-border/40">
              <Sparkles className="absolute top-4 right-4 size-5 opacity-50" />
              <h3 className="font-bold text-base">Need more storage?</h3>
              <p className="text-xs mt-1 opacity-80">Upgrade your plan and get more space for your files.</p>
              <Link to="/storage" className="mt-4 inline-flex px-4 h-9 rounded-lg bg-white text-primary font-semibold text-sm items-center">
                Upgrade Now
              </Link>
              <ArrowUpCircle className="absolute -bottom-3 -right-2 size-24 opacity-20" />
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-base">Activity Feed</h2>
                <Activity className="size-4 text-muted-foreground" />
              </div>
              {activities.length === 0 ? (
                <div className="text-center py-8">
                  <div className="size-12 mx-auto rounded-2xl bg-muted grid place-items-center mb-3">
                    <Activity className="size-5 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    No activity yet. Your file actions will appear here.
                  </p>
                </div>
              ) : (
                <ul className="space-y-3 max-h-80 overflow-auto pr-1">
                  {activities.slice(0, 12).map((a) => {
                    const meta = activityIcon[a.type];
                    const Icon = meta.icon;
                    return (
                      <li key={a.id} className="flex items-start gap-3">
                        <div className={`size-8 rounded-lg grid place-items-center shrink-0 ${meta.tint}`}>
                          <Icon className="size-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs leading-relaxed">
                            <span className="font-semibold">{activityVerb[a.type]}</span>{" "}
                            <span className="text-foreground truncate">{a.fileName}</span>
                          </div>
                          <div className="text-[11px] text-muted-foreground mt-0.5">{formatRelative(a.at)}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

