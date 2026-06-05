import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FolderOpen,
  CloudUpload,
  Users,
  Download,
  FileText,
  Image as ImageIcon,
  Film,
  MoreHorizontal,
  FolderPlus,
  Share2,
  Settings,
  Sparkles,
  Activity,
} from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardTopbar } from "@/components/DashboardTopbar";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — CloudFile" },
      { name: "description", content: "Your cloud storage dashboard." },
    ],
  }),
  component: DashboardPage,
});

const userName = "Alex";

const stats = [
  { label: "Total Files", value: "0", sub: "Start uploading", icon: FolderOpen, tint: "bg-primary/10 text-primary" },
  { label: "Storage Used", value: "0 GB", sub: "of 200 GB", icon: CloudUpload, tint: "bg-aqua/20 text-aqua-foreground" },
  { label: "Shared Files", value: "0", sub: "No shares yet", icon: Users, tint: "bg-accent/60 text-accent-foreground" },
  { label: "Downloads", value: "0", sub: "This week", icon: Download, tint: "bg-warning/15 text-foreground" },
];

const quickActions = [
  { title: "Upload Files", sub: "Drag and drop files", icon: CloudUpload, color: "text-primary bg-primary/10" },
  { title: "New Folder", sub: "Create a new folder", icon: FolderPlus, color: "text-aqua-foreground bg-aqua/20" },
  { title: "Share Files", sub: "Share with others", icon: Share2, color: "text-foreground bg-accent/60" },
  { title: "Storage Settings", sub: "Manage your storage", icon: Settings, color: "text-foreground bg-muted" },
];

function DashboardPage() {
  const used = 0;
  const total = 200;
  const pct = (used / total) * 100;
  const circ = 2 * Math.PI * 56;
  const dash = (pct / 100) * circ;

  return (
    <div className="min-h-screen flex bg-gradient-hero">
      <AppSidebar />
      <main className="flex-1 p-6 lg:p-10">
        <DashboardTopbar initials={userName.slice(0, 2).toUpperCase()} />

        {/* Welcome */}
        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
            Welcome back, {userName}! <span className="text-3xl">👋</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's what's happening with your files today.
          </p>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-card rounded-2xl p-5 shadow-card border border-border/60 hover:shadow-elegant transition-all"
                >
                  <div className={`size-11 rounded-xl grid place-items-center mb-4 ${s.tint}`}>
                    <s.icon className="size-5" />
                  </div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                  <div className="text-2xl font-bold mt-1">{s.value}</div>
                  <div className="text-xs text-success mt-2">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Recent + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/60">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-lg">Recent Files</h2>
                  <button className="text-sm font-medium text-primary hover:underline">View all</button>
                </div>
                <div className="grid place-items-center py-12 text-center">
                  <div className="size-16 rounded-2xl bg-gradient-card grid place-items-center mb-4 shadow-glow">
                    <FileText className="size-7 text-white" />
                  </div>
                  <div className="font-semibold">No files yet</div>
                  <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                    Upload your first file to start organizing your cloud storage.
                  </p>
                  <button className="mt-5 px-5 h-10 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-sm shadow-elegant">
                    Upload a file
                  </button>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-card border border-border/60">
                <h2 className="font-semibold text-lg mb-5">Quick Actions</h2>
                <div className="space-y-2">
                  {quickActions.map((a) => (
                    <button
                      key={a.title}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left"
                    >
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

          {/* Right column */}
          <aside className="space-y-6">
            {/* Storage overview */}
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/60">
              <h2 className="font-semibold text-lg mb-4">Storage Overview</h2>
              <div className="flex items-center gap-5">
                <div className="relative size-32 shrink-0">
                  <svg viewBox="0 0 140 140" className="size-32 -rotate-90">
                    <circle cx="70" cy="70" r="56" stroke="oklch(0.93 0.02 230)" strokeWidth="14" fill="none" />
                    <circle
                      cx="70" cy="70" r="56"
                      stroke="url(#g)" strokeWidth="14" fill="none"
                      strokeDasharray={`${dash} ${circ}`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="oklch(0.52 0.21 256)" />
                        <stop offset="100%" stopColor="oklch(0.78 0.13 200)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 grid place-items-center text-center">
                    <div>
                      <div className="text-xl font-bold">{used} GB</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Used</div>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2.5 text-sm flex-1">
                  {[
                    { label: "Documents", val: "0 GB", c: "bg-primary" },
                    { label: "Images", val: "0 GB", c: "bg-aqua" },
                    { label: "Videos", val: "0 GB", c: "bg-primary-glow" },
                    { label: "Others", val: "0 GB", c: "bg-muted-foreground/40" },
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

            {/* Upgrade */}
            <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-card text-aqua-foreground shadow-elegant">
              <Sparkles className="absolute top-4 right-4 size-5 opacity-50" />
              <h3 className="font-bold text-lg">Need more storage?</h3>
              <p className="text-sm mt-1 opacity-80">
                Upgrade your plan and get more space for your files.
              </p>
              <button className="mt-4 px-4 h-10 rounded-xl bg-white text-primary font-semibold text-sm shadow-card hover:shadow-elegant transition-shadow">
                Upgrade Now
              </button>
              <CloudUpload className="absolute -bottom-3 -right-2 size-24 opacity-20" />
            </div>

            {/* Activity */}
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
              <button className="mt-2 w-full text-sm font-medium text-primary hover:underline">
                View all activity
              </button>
            </div>
          </aside>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-10">
          <Link to="/" className="hover:text-primary">← Back to landing page</Link>
        </p>
      </main>
    </div>
  );
}
