import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import {
  FolderOpen,
  CloudUpload,
  Star,
  Trash2,
  FileText,
  FolderPlus,
  Share2,
  Settings,
  Sparkles,
  Activity,
  Upload,
} from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardTopbar } from "@/components/DashboardTopbar";
import { FileList } from "@/components/FileList";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useFiles } from "@/hooks/useFiles";
import { useStorageStats, formatBytes, TOTAL_QUOTA_BYTES } from "@/hooks/useStorageStats";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — CloudFile" },
      { name: "description", content: "Your cloud storage dashboard." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  const { stats } = useStorageStats();
  const { files, upload, toggleStar, moveToTrash, download } = useFiles("recent");
  const inputRef = useRef<HTMLInputElement>(null);

  const usedBytes = stats.usedBytes;
  const totalBytes = TOTAL_QUOTA_BYTES;
  const pct = (usedBytes / totalBytes) * 100;
  const circ = 2 * Math.PI * 56;
  const dash = (Math.min(pct, 100) / 100) * circ;

  const statCards = [
    { label: "Total Files", value: String(stats.totalFiles), sub: stats.totalFiles > 0 ? "Across all folders" : "Start uploading", icon: FolderOpen, tint: "bg-primary/10 text-primary" },
    { label: "Storage Used", value: formatBytes(usedBytes), sub: `of ${formatBytes(totalBytes)}`, icon: CloudUpload, tint: "bg-aqua/20 text-aqua-foreground" },
    { label: "Starred", value: String(stats.starredCount), sub: "Marked as favorite", icon: Star, tint: "bg-accent/60 text-accent-foreground" },
    { label: "In Trash", value: String(stats.trashedCount), sub: "Recoverable", icon: Trash2, tint: "bg-warning/15 text-foreground" },
  ];

  const quickActions = [
    { title: "Upload Files", sub: "Choose files to upload", icon: CloudUpload, color: "text-primary bg-primary/10", onClick: () => inputRef.current?.click() },
    { title: "Browse Files", sub: "Open your file manager", icon: FolderPlus, color: "text-aqua-foreground bg-aqua/20", onClick: () => navigate({ to: "/files" }) },
    { title: "Starred", sub: "Your favorite files", icon: Share2, color: "text-foreground bg-accent/60", onClick: () => navigate({ to: "/starred" }) },
    { title: "Storage", sub: "Manage your storage", icon: Settings, color: "text-foreground bg-muted", onClick: () => navigate({ to: "/storage" }) },
  ];

  const recent = files.slice(0, 5);

  return (
    <div className="min-h-screen flex bg-gradient-hero">
      <AppSidebar />
      <main className="flex-1 p-6 lg:p-10">
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

        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
            Welcome back, {user?.firstName ?? "there"}! <span className="text-3xl">👋</span>
          </h1>
          <p className="text-muted-foreground mt-2">Here's what's happening with your files today.</p>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((s) => (
                <div key={s.label} className="group bg-card rounded-2xl p-5 shadow-card border border-border/60 hover:shadow-elegant hover:-translate-y-0.5 hover:border-primary/30 transition-all duration-300">
                  <div className={`size-11 rounded-xl grid place-items-center mb-4 ${s.tint}`}>
                    <s.icon className="size-5" />
                  </div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                  <div className="text-2xl font-bold mt-1">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-2">{s.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/60">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-lg">Recent Files</h2>
                  <Link to="/files" className="text-sm font-medium text-primary hover:underline">View all</Link>
                </div>
                {recent.length === 0 ? (
                  <div className="grid place-items-center py-12 text-center">
                    <div className="size-16 rounded-2xl bg-gradient-card grid place-items-center mb-4 shadow-glow">
                      <FileText className="size-7 text-white" />
                    </div>
                    <div className="font-semibold">No files yet</div>
                    <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                      Upload your first file to start organizing your cloud storage.
                    </p>
                    <button onClick={() => inputRef.current?.click()} className="mt-5 px-5 h-10 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-sm shadow-elegant inline-flex items-center gap-2">
                      <Upload className="size-4" /> Upload a file
                    </button>
                  </div>
                ) : (
                  <FileList files={recent} onStar={toggleStar} onDownload={download} onTrash={moveToTrash} />
                )}
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/60">
                <h2 className="font-semibold text-lg mb-5">Quick Actions</h2>
                <div className="space-y-2">
                  {quickActions.map((a) => (
                    <button key={a.title} onClick={a.onClick} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left">
                      <div className={`size-10 rounded-xl grid place-items-center ${a.color}`}>
                        <a.icon className="size-[18px]" />
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
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/60">
              <h2 className="font-semibold text-lg mb-4">Storage Overview</h2>
              <div className="flex items-center gap-5">
                <div className="relative size-32 shrink-0">
                  <svg viewBox="0 0 140 140" className="size-32 -rotate-90">
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
                      <div className="text-xl font-bold">{formatBytes(usedBytes)}</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Used</div>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2.5 text-sm flex-1">
                  {[
                    { label: "Documents", val: formatBytes(stats.byCategory.documents), c: "bg-primary" },
                    { label: "Images", val: formatBytes(stats.byCategory.images), c: "bg-aqua" },
                    { label: "Videos", val: formatBytes(stats.byCategory.videos), c: "bg-primary-glow" },
                    { label: "Others", val: formatBytes(stats.byCategory.others), c: "bg-muted-foreground/40" },
                  ].map((r) => (
                    <li key={r.label} className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className={`size-2 rounded-full ${r.c}`} />
                        {r.label}
                      </span>
                      <span className="text-muted-foreground">{r.val}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-card text-aqua-foreground shadow-elegant">
              <Sparkles className="absolute top-4 right-4 size-5 opacity-50" />
              <h3 className="font-bold text-lg">Need more storage?</h3>
              <p className="text-sm mt-1 opacity-80">Upgrade your plan and get more space for your files.</p>
              <Link to="/storage" className="mt-4 inline-flex px-4 h-10 rounded-xl bg-white text-primary font-semibold text-sm shadow-card hover:shadow-elegant transition-shadow items-center">
                Upgrade Now
              </Link>
              <CloudUpload className="absolute -bottom-3 -right-2 size-24 opacity-20" />
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/60">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Activity Feed</h2>
                <Activity className="size-4 text-muted-foreground" />
              </div>
              <div className="text-center py-8">
                <div className="size-12 mx-auto rounded-2xl bg-muted grid place-items-center mb-3">
                  <Activity className="size-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  No activity yet. Your file actions will appear here.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
