import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type StorageStats = {
  totalFiles: number;
  usedBytes: number;
  starredCount: number;
  trashedCount: number;
  byCategory: { documents: number; images: number; videos: number; others: number };
};

const empty: StorageStats = {
  totalFiles: 0,
  usedBytes: 0,
  starredCount: 0,
  trashedCount: 0,
  byCategory: { documents: 0, images: 0, videos: 0, others: 0 },
};

function categorize(mime: string | null): keyof StorageStats["byCategory"] {
  if (!mime) return "others";
  if (mime.startsWith("image/")) return "images";
  if (mime.startsWith("video/")) return "videos";
  if (mime.includes("pdf") || mime.includes("text") || mime.includes("document") || mime.includes("sheet") || mime.includes("presentation"))
    return "documents";
  return "others";
}

export function useStorageStats() {
  const [stats, setStats] = useState<StorageStats>(empty);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data, error } = await supabase
        .from("files")
        .select("size_bytes,mime_type,starred,trashed");
      if (!active) return;
      if (error || !data) {
        setStats(empty);
        setLoading(false);
        return;
      }
      const s: StorageStats = {
        totalFiles: 0,
        usedBytes: 0,
        starredCount: 0,
        trashedCount: 0,
        byCategory: { documents: 0, images: 0, videos: 0, others: 0 },
      };
      for (const r of data as Array<{ size_bytes: number; mime_type: string | null; starred: boolean; trashed: boolean }>) {
        if (r.trashed) {
          s.trashedCount++;
          continue;
        }
        s.totalFiles++;
        s.usedBytes += r.size_bytes ?? 0;
        if (r.starred) s.starredCount++;
        s.byCategory[categorize(r.mime_type)] += r.size_bytes ?? 0;
      }
      setStats(s);
      setLoading(false);
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  return { stats, loading };
}

export function formatBytes(b: number) {
  if (b === 0) return "0 B";
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  if (b < 1024 * 1024 * 1024) return `${(b / 1024 / 1024).toFixed(1)} MB`;
  return `${(b / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

export const TOTAL_QUOTA_BYTES = 200 * 1024 * 1024 * 1024;
