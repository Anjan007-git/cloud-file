import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { DashboardLayout, EmptyPanel } from "@/components/DashboardLayout";
import { FileList } from "@/components/FileList";
import { useFiles } from "@/hooks/useFiles";

export const Route = createFileRoute("/starred")({
  head: () => ({ meta: [{ title: "Starred — CloudFile" }] }),
  component: StarredPage,
});

function StarredPage() {
  const { files, loading, toggleStar, moveToTrash, download } = useFiles("starred");
  return (
    <DashboardLayout title="Starred" description="Your favorite files, all in one place.">
      {files.length === 0 && !loading ? (
        <EmptyPanel icon={<Star className="size-7" />} title="No starred items" description="Star important files to quickly find them later." />
      ) : (
        <FileList files={files} loading={loading} onStar={toggleStar} onDownload={download} onTrash={moveToTrash} />
      )}
    </DashboardLayout>
  );
}
