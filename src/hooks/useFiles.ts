import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type FileRow = {
  id: string;
  user_id: string;
  name: string;
  storage_path: string;
  size_bytes: number;
  mime_type: string | null;
  starred: boolean;
  trashed: boolean;
  created_at: string;
  updated_at: string;
};

export type FilesFilter = "all" | "recent" | "starred" | "trash";

const BUCKET = "user-files";

export function useFiles(filter: FilesFilter = "all") {
  const [files, setFiles] = useState<FileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    let q = supabase.from("files").select("*").order("created_at", { ascending: false });
    if (filter === "trash") q = q.eq("trashed", true);
    else q = q.eq("trashed", false);
    if (filter === "starred") q = q.eq("starred", true);
    if (filter === "recent") q = q.order("updated_at", { ascending: false }).limit(50);
    const { data, error } = await q;
    if (error) toast.error(error.message);
    setFiles((data as FileRow[] | null) ?? []);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  const upload = useCallback(
    async (fileList: FileList | File[]) => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) {
        toast.error("Please sign in to upload files");
        return;
      }
      setUploading(true);
      const arr = Array.from(fileList);
      let ok = 0;
      for (const f of arr) {
        const safe = f.name.replace(/[^\w.\-]+/g, "_");
        const path = `${user.id}/${Date.now()}-${safe}`;
        const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, f, {
          contentType: f.type || "application/octet-stream",
          upsert: false,
        });
        if (upErr) {
          toast.error(`${f.name}: ${upErr.message}`);
          continue;
        }
        const { error: insErr } = await supabase.from("files").insert({
          user_id: user.id,
          name: f.name,
          storage_path: path,
          size_bytes: f.size,
          mime_type: f.type || null,
        });
        if (insErr) {
          await supabase.storage.from(BUCKET).remove([path]);
          toast.error(`${f.name}: ${insErr.message}`);
          continue;
        }
        ok++;
      }
      setUploading(false);
      if (ok > 0) toast.success(`Uploaded ${ok} file${ok > 1 ? "s" : ""}`);
      await load();
    },
    [load],
  );

  const toggleStar = useCallback(
    async (file: FileRow) => {
      const { error } = await supabase
        .from("files")
        .update({ starred: !file.starred })
        .eq("id", file.id);
      if (error) return toast.error(error.message);
      await load();
    },
    [load],
  );

  const moveToTrash = useCallback(
    async (file: FileRow) => {
      const { error } = await supabase.from("files").update({ trashed: true }).eq("id", file.id);
      if (error) return toast.error(error.message);
      toast.success("Moved to trash");
      await load();
    },
    [load],
  );

  const restore = useCallback(
    async (file: FileRow) => {
      const { error } = await supabase.from("files").update({ trashed: false }).eq("id", file.id);
      if (error) return toast.error(error.message);
      toast.success("Restored");
      await load();
    },
    [load],
  );

  const remove = useCallback(
    async (file: FileRow) => {
      const { error: stErr } = await supabase.storage.from(BUCKET).remove([file.storage_path]);
      if (stErr) return toast.error(stErr.message);
      const { error } = await supabase.from("files").delete().eq("id", file.id);
      if (error) return toast.error(error.message);
      toast.success("Deleted permanently");
      await load();
    },
    [load],
  );

  const rename = useCallback(
    async (file: FileRow, newName: string) => {
      const trimmed = newName.trim();
      if (!trimmed || trimmed === file.name) return;
      const { error } = await supabase
        .from("files")
        .update({ name: trimmed, updated_at: new Date().toISOString() })
        .eq("id", file.id);
      if (error) return toast.error(error.message);
      toast.success("Renamed");
      await load();
    },
    [load],
  );

  const download = useCallback(async (file: FileRow) => {
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(file.storage_path, 60, { download: file.name });
    if (error || !data?.signedUrl) return toast.error(error?.message ?? "Download failed");
    window.open(data.signedUrl, "_blank");
  }, []);

  return { files, loading, uploading, upload, toggleStar, moveToTrash, restore, remove, rename, download, reload: load };
}
