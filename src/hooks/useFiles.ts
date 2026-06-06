import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { getS3UploadUrl, getS3DownloadUrl, deleteS3Object } from "@/lib/s3.functions";
import { recordActivity } from "@/lib/activity";

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
  s3_key: string | null;
  s3_url: string | null;
};

export type FilesFilter = "all" | "recent" | "starred" | "trash";

const FILES_CHANGED_EVENT = "cloudfile:files-changed";

function notifyFilesChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(FILES_CHANGED_EVENT));
  }
}

export function useFiles(filter: FilesFilter = "all") {
  const [files, setFiles] = useState<FileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const requestUploadUrl = useServerFn(getS3UploadUrl);
  const requestDownloadUrl = useServerFn(getS3DownloadUrl);
  const requestDelete = useServerFn(deleteS3Object);

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

  useEffect(() => {
    const onFilesChanged = () => {
      void load();
    };
    window.addEventListener(FILES_CHANGED_EVENT, onFilesChanged);
    return () => window.removeEventListener(FILES_CHANGED_EVENT, onFilesChanged);
  }, [load]);

  const upload = useCallback(
    async (incomingFiles: FileList | File[]) => {
      const filesToUpload = Array.from(incomingFiles ?? []);
      if (filesToUpload.length === 0) {
        toast.error("No files were selected");
        return;
      }
      if (uploading) return;
      setUploading(true);
      try {
        const { data: userData } = await supabase.auth.getUser();
        const user = userData.user;
        if (!user) {
          toast.error("Please sign in to upload files");
          return;
        }
        let ok = 0;
        for (const f of filesToUpload) {
          try {
            const { uploadUrl, key, publicUrl } = await requestUploadUrl({
              data: { filename: f.name, contentType: f.type || "application/octet-stream" },
            });
            const putRes = await fetch(uploadUrl, {
              method: "PUT",
              headers: { "Content-Type": f.type || "application/octet-stream" },
              body: f,
            });
            if (!putRes.ok) {
              const txt = await putRes.text().catch(() => "");
              console.error("[s3 upload] failed", putRes.status, txt);
              toast.error(`${f.name}: S3 upload failed (${putRes.status})`);
              continue;
            }
            const { error: insErr } = await supabase
              .from("files")
              .insert({
                user_id: user.id,
                name: f.name,
                storage_path: key,
                s3_key: key,
                s3_url: publicUrl,
                size_bytes: f.size,
                mime_type: f.type || null,
              });
            if (insErr) {
              console.error("[db insert]", insErr);
              toast.error(`${f.name}: ${insErr.message}`);
              continue;
            }
            ok++;
            recordActivity("uploaded", f.name);
          } catch (err) {
            console.error("[upload] error for", f.name, err);
            toast.error(`${f.name}: ${err instanceof Error ? err.message : "Upload failed"}`);
          }
        }
        if (ok > 0) {
          toast.success(`Uploaded ${ok} file${ok > 1 ? "s" : ""}`);
          notifyFilesChanged();
        }
        await load();
      } finally {
        setUploading(false);
      }
    },
    [load, uploading, requestUploadUrl],
  );

  const toggleStar = useCallback(
    async (file: FileRow) => {
      const { error } = await supabase.from("files").update({ starred: !file.starred }).eq("id", file.id);
      if (error) return toast.error(error.message);
      notifyFilesChanged();
      await load();
    },
    [load],
  );

  const moveToTrash = useCallback(
    async (file: FileRow) => {
      const { error } = await supabase.from("files").update({ trashed: true }).eq("id", file.id);
      if (error) return toast.error(error.message);
      toast.success("Moved to trash");
      recordActivity("trashed", file.name);
      notifyFilesChanged();
      await load();
    },
    [load],
  );

  const restore = useCallback(
    async (file: FileRow) => {
      const { error } = await supabase.from("files").update({ trashed: false }).eq("id", file.id);
      if (error) return toast.error(error.message);
      toast.success("Restored");
      recordActivity("restored", file.name);
      notifyFilesChanged();
      await load();
    },
    [load],
  );

  const remove = useCallback(
    async (file: FileRow) => {
      try {
        const key = file.s3_key ?? file.storage_path;
        if (key) {
          await requestDelete({ data: { key } });
        }
      } catch (err) {
        console.error("[s3 delete]", err);
        toast.error(err instanceof Error ? err.message : "S3 delete failed");
        return;
      }
      const { error } = await supabase.from("files").delete().eq("id", file.id);
      if (error) return toast.error(error.message);
      toast.success("Deleted permanently");
      recordActivity("deleted", file.name);
      notifyFilesChanged();
      await load();
    },
    [load, requestDelete],
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
      recordActivity("renamed", trimmed, `was "${file.name}"`);
      notifyFilesChanged();
      await load();
    },
    [load],
  );

  const download = useCallback(
    async (file: FileRow) => {
      try {
        const key = file.s3_key ?? file.storage_path;
        if (!key) return toast.error("File has no storage key");
        const { downloadUrl } = await requestDownloadUrl({ data: { key, filename: file.name } });
        window.open(downloadUrl, "_blank");
        recordActivity("downloaded", file.name);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Download failed");
      }
    },
    [requestDownloadUrl],
  );

  return { files, loading, uploading, upload, toggleStar, moveToTrash, restore, remove, rename, download, reload: load };
}
