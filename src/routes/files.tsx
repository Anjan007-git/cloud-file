import { createFileRoute } from "@tanstack/react-router";
import { FolderOpen, Upload, Grid3x3, List, Search, Filter, ArrowUpDown, FolderPlus } from "lucide-react";
import { DashboardLayout, EmptyPanel } from "@/components/DashboardLayout";

export const Route = createFileRoute("/files")({
  head: () => ({ meta: [{ title: "My Files — CloudFile" }] }),
  component: FilesPage,
});

function FilesPage() {
  return (
    <DashboardLayout title="My Files" description="Browse, upload and manage all your files in one place.">
      <div className="bg-card rounded-2xl p-5 shadow-card border border-border/60 mb-5 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search in My Files…"
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <button className="h-10 px-3 rounded-xl border border-border bg-card text-sm font-medium flex items-center gap-2 hover:bg-muted">
          <Filter className="size-4" /> Filter
        </button>
        <button className="h-10 px-3 rounded-xl border border-border bg-card text-sm font-medium flex items-center gap-2 hover:bg-muted">
          <ArrowUpDown className="size-4" /> Sort
        </button>
        <div className="flex items-center rounded-xl border border-border bg-card overflow-hidden">
          <button className="p-2.5 hover:bg-muted"><Grid3x3 className="size-4" /></button>
          <button className="p-2.5 hover:bg-muted border-l border-border"><List className="size-4" /></button>
        </div>
        <button className="h-10 px-4 rounded-xl bg-card border border-border text-sm font-medium flex items-center gap-2 hover:bg-muted">
          <FolderPlus className="size-4" /> New Folder
        </button>
        <button className="h-10 px-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-sm flex items-center gap-2 shadow-elegant">
          <Upload className="size-4" /> Upload
        </button>
      </div>

      <EmptyPanel
        icon={<FolderOpen className="size-7" />}
        title="No files yet"
        description="Upload your first file to start organizing your cloud storage."
      />
    </DashboardLayout>
  );
}
