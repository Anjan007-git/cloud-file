import { FileText, Image as ImageIcon, Film, FileArchive, Music, File as FileIcon, Star, Download, Trash2, RotateCcw, XCircle, Pencil } from "lucide-react";
import type { FileRow } from "@/hooks/useFiles";

function iconFor(mime: string | null) {
  if (!mime) return FileIcon;
  if (mime.startsWith("image/")) return ImageIcon;
  if (mime.startsWith("video/")) return Film;
  if (mime.startsWith("audio/")) return Music;
  if (mime.includes("zip") || mime.includes("rar") || mime.includes("tar")) return FileArchive;
  if (mime.includes("pdf") || mime.includes("text") || mime.includes("document")) return FileText;
  return FileIcon;
}

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  if (b < 1024 * 1024 * 1024) return `${(b / 1024 / 1024).toFixed(1)} MB`;
  return `${(b / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

function formatDate(s: string) {
  return new Date(s).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function FileList({
  files,
  loading,
  trashed = false,
  onStar,
  onDownload,
  onTrash,
  onRestore,
  onDelete,
  onRename,
}: {
  files: FileRow[];
  loading?: boolean;
  trashed?: boolean;
  onStar?: (f: FileRow) => void;
  onDownload?: (f: FileRow) => void;
  onTrash?: (f: FileRow) => void;
  onRestore?: (f: FileRow) => void;
  onDelete?: (f: FileRow) => void;
  onRename?: (f: FileRow, newName: string) => void;
}) {
  if (loading) {
    return (
      <div className="bg-card rounded-2xl p-12 shadow-card border border-border/60 text-center text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (files.length === 0) return null;

  return (
    <div className="bg-card rounded-2xl shadow-card border border-border/60 overflow-hidden">
      <div className="grid grid-cols-[1fr_120px_140px_auto] items-center px-5 py-3 border-b border-border/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <div>Name</div>
        <div>Size</div>
        <div>Modified</div>
        <div className="w-32 text-right pr-2">Actions</div>
      </div>
      <ul className="divide-y divide-border/60">
        {files.map((f) => {
          const Icon = iconFor(f.mime_type);
          return (
            <li key={f.id} className="grid grid-cols-[1fr_120px_140px_auto] items-center px-5 py-3 hover:bg-muted/40 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-9 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate flex items-center gap-2">
                    {f.name}
                    {f.starred && !trashed && <Star className="size-3.5 fill-warning text-warning" />}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{f.mime_type ?? "Unknown"}</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">{formatBytes(f.size_bytes)}</div>
              <div className="text-sm text-muted-foreground">{formatDate(f.updated_at)}</div>
              <div className="flex items-center justify-end gap-1 w-32 pr-2">
                {trashed ? (
                  <>
                    <button onClick={() => onRestore?.(f)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground" aria-label="Restore">
                      <RotateCcw className="size-4" />
                    </button>
                    <button onClick={() => onDelete?.(f)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive" aria-label="Delete permanently">
                      <XCircle className="size-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => onStar?.(f)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground" aria-label="Star">
                      <Star className={`size-4 ${f.starred ? "fill-warning text-warning" : ""}`} />
                    </button>
                    {onRename && (
                      <button
                        onClick={() => {
                          const next = window.prompt("Rename file", f.name);
                          if (next != null) onRename(f, next);
                        }}
                        className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                        aria-label="Rename"
                      >
                        <Pencil className="size-4" />
                      </button>
                    )}
                    <button onClick={() => onDownload?.(f)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground" aria-label="Download">
                      <Download className="size-4" />
                    </button>
                    <button onClick={() => onTrash?.(f)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive" aria-label="Move to trash">
                      <Trash2 className="size-4" />
                    </button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
