import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { FolderOpen, Upload, Search } from "lucide-react";
import { DashboardLayout, EmptyPanel } from "@/components/DashboardLayout";
import { FileList } from "@/components/FileList";
import { useFiles } from "@/hooks/useFiles";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export const Route = createFileRoute("/files")({
  head: () => ({ meta: [{ title: "My Files — CloudFile" }] }),
  component: FilesPage,
});

function FilesPage() {
  const { user, loading: userLoading } = useCurrentUser();
  const { files, loading, uploading, upload, toggleStar, moveToTrash, download, rename } = useFiles("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const filtered = files.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()));

  if (!userLoading && !user) {
    return (
      <DashboardLayout title="My Files">
        <EmptyPanel
          icon={<FolderOpen className="size-7" />}
          title="Sign in to view your files"
          description="You need an account to upload and manage files in CloudFile."
        />
        <div className="mt-4 text-center">
          <Link to="/auth" className="inline-flex h-10 px-5 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-sm items-center shadow-elegant">
            Sign in
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="My Files" description="Browse, upload and manage all your files in one place.">
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

      <div className="bg-card rounded-2xl p-5 shadow-card border border-border/60 mb-5 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search in My Files…"
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="h-10 px-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-sm flex items-center gap-2 shadow-elegant disabled:opacity-60"
        >
          <Upload className="size-4" /> {uploading ? "Uploading…" : "Upload"}
        </button>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files?.length) upload(e.dataTransfer.files);
        }}
        className={`rounded-2xl border-2 border-dashed mb-5 px-6 py-8 text-center transition-colors ${
          dragOver ? "border-primary bg-primary/5" : "border-border bg-muted/20"
        }`}
      >
        <p className="text-sm text-muted-foreground">
          Drag & drop files here, or{" "}
          <button onClick={() => inputRef.current?.click()} className="text-primary font-semibold hover:underline">
            browse
          </button>
        </p>
      </div>

      {filtered.length === 0 && !loading ? (
        <EmptyPanel
          icon={<FolderOpen className="size-7" />}
          title={query ? "No matching files" : "No files yet"}
          description={query ? "Try a different search term." : "Upload your first file to start organizing your cloud storage."}
        />
      ) : (
        <FileList
          files={filtered}
          loading={loading}
          onStar={toggleStar}
          onDownload={download}
          onTrash={moveToTrash}
          onRename={rename}
        />
      )}
    </DashboardLayout>
  );
}
