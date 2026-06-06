import { useEffect, useState } from "react";
import { X, Download, FileText, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { getS3PreviewUrl } from "@/lib/s3.functions";
import type { FileRow } from "@/hooks/useFiles";

function parseCsv(text: string): string[][] {
  // Tiny CSV parser (handles quotes + commas + newlines)
  const rows: string[][] = [];
  let cur: string[] = [];
  let field = "";
  let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQ = false;
      else field += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ",") { cur.push(field); field = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        cur.push(field); field = "";
        rows.push(cur); cur = [];
      } else field += c;
    }
  }
  if (field.length || cur.length) { cur.push(field); rows.push(cur); }
  return rows.slice(0, 200);
}

export function FilePreviewModal({
  file,
  onClose,
  onDownload,
}: {
  file: FileRow | null;
  onClose: () => void;
  onDownload?: (f: FileRow) => void;
}) {
  const requestPreview = useServerFn(getS3PreviewUrl);
  const [url, setUrl] = useState<string | null>(null);
  const [textContent, setTextContent] = useState<string | null>(null);
  const [csvRows, setCsvRows] = useState<string[][] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      setUrl(null);
      setTextContent(null);
      setCsvRows(null);
      try {
        const key = file.s3_key ?? file.storage_path;
        if (!key) throw new Error("File has no storage key");
        const { previewUrl } = await requestPreview({ data: { key } });
        if (cancelled) return;
        setUrl(previewUrl);
        const mime = file.mime_type ?? "";
        if (mime.startsWith("text/") || mime.includes("csv") || mime.includes("json")) {
          const res = await fetch(previewUrl);
          const txt = await res.text();
          if (cancelled) return;
          if (mime.includes("csv")) setCsvRows(parseCsv(txt));
          else setTextContent(txt.slice(0, 50_000));
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Preview failed");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [file, requestPreview]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!file) return null;
  const mime = file.mime_type ?? "";
  const isImage = mime.startsWith("image/");
  const isPdf = mime.includes("pdf");
  const isVideo = mime.startsWith("video/");
  const isAudio = mime.startsWith("audio/");
  const isOffice =
    mime.includes("officedocument") ||
    mime.includes("msword") ||
    mime.includes("ms-excel") ||
    mime.includes("ms-powerpoint") ||
    /\.(docx?|xlsx?|pptx?)$/i.test(file.name);

  return (
    <div
      className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm grid place-items-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl max-h-[90vh] bg-card rounded-2xl shadow-elegant border border-border flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-border">
          <div className="flex items-center gap-3 min-w-0">
            <div className="size-9 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
              <FileText className="size-4" />
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-sm truncate">{file.name}</div>
              <div className="text-xs text-muted-foreground truncate">{mime || "Unknown"}</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {onDownload && (
              <button
                onClick={() => onDownload(file)}
                className="h-9 px-3 rounded-lg border border-border text-sm font-medium hover:bg-muted inline-flex items-center gap-2"
              >
                <Download className="size-4" /> Download
              </button>
            )}
            <button
              onClick={onClose}
              className="size-9 rounded-lg hover:bg-muted grid place-items-center"
              aria-label="Close preview"
            >
              <X className="size-4" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-muted/30">
          {loading && (
            <div className="h-[60vh] grid place-items-center text-muted-foreground">
              <Loader2 className="size-6 animate-spin" />
            </div>
          )}
          {!loading && error && (
            <div className="h-[60vh] grid place-items-center text-destructive text-sm">{error}</div>
          )}
          {!loading && !error && url && (
            <>
              {isImage && (
                <div className="grid place-items-center p-4 min-h-[60vh]">
                  <img src={url} alt={file.name} className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-card" />
                </div>
              )}
              {isPdf && (
                <iframe src={url} title={file.name} className="w-full h-[75vh] bg-card" />
              )}
              {isVideo && (
                <div className="grid place-items-center p-4 min-h-[60vh]">
                  <video src={url} controls className="max-w-full max-h-[75vh] rounded-lg" />
                </div>
              )}
              {isAudio && (
                <div className="grid place-items-center p-10 min-h-[40vh]">
                  <audio src={url} controls className="w-full max-w-md" />
                </div>
              )}
              {csvRows && (
                <div className="p-4 overflow-auto">
                  <table className="w-full text-sm border-collapse">
                    <tbody>
                      {csvRows.map((row, i) => (
                        <tr key={i} className={i === 0 ? "bg-muted font-semibold" : "even:bg-muted/30"}>
                          {row.map((cell, j) => (
                            <td key={j} className="border border-border px-3 py-1.5 align-top">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {textContent !== null && !csvRows && (
                <pre className="p-5 text-xs leading-relaxed whitespace-pre-wrap font-mono bg-card m-4 rounded-lg border border-border max-h-[75vh] overflow-auto">
                  {textContent}
                </pre>
              )}
              {!isImage && !isPdf && !isVideo && !isAudio && textContent === null && !csvRows && (
                <div className="grid place-items-center text-center min-h-[60vh] p-8">
                  <div>
                    <div className="size-16 mx-auto rounded-2xl bg-primary/10 text-primary grid place-items-center mb-4">
                      <FileText className="size-7" />
                    </div>
                    <div className="font-semibold">Preview not available</div>
                    <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                      {isOffice ? "Office documents can be downloaded and opened in your preferred application." : "This file type can't be previewed in the browser."}
                    </p>
                    {onDownload && (
                      <button
                        onClick={() => onDownload(file)}
                        className="mt-5 h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold inline-flex items-center gap-2"
                      >
                        <Download className="size-4" /> Download file
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
