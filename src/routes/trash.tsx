import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { DashboardLayout, EmptyPanel } from "@/components/DashboardLayout";
import { FileList } from "@/components/FileList";
import { useFiles } from "@/hooks/useFiles";

export const Route = createFileRoute("/trash")({
  head: () => ({ meta: [{ title: "Trash — CloudFile" }] }),
  component: TrashPage,
});

function TrashPage() {
  const { files, loading, restore, remove } = useFiles("trash");
  return (
    <DashboardLayout title="Trash" description="Restore deleted files or remove them permanently.">
      {files.length === 0 && !loading ? (
        <EmptyPanel icon={<Trash2 className="size-7" />} title="Trash is empty" description="Items you delete will appear here. You can restore them anytime." />
      ) : (
        <FileList files={files} loading={loading} trashed onRestore={restore} onDelete={remove} />
      )}
    </DashboardLayout>
  );
}
