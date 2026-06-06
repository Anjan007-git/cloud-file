import { createFileRoute } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { DashboardLayout, EmptyPanel } from "@/components/DashboardLayout";
import { FileList } from "@/components/FileList";
import { useFiles } from "@/hooks/useFiles";

export const Route = createFileRoute("/recent")({
  head: () => ({ meta: [{ title: "Recent — CloudFile" }] }),
  component: RecentPage,
});

function RecentPage() {
  const { files, loading, toggleStar, moveToTrash, download } = useFiles("recent");
  return (
    <DashboardLayout title="Recent" description="Files you've viewed or edited recently.">
      {files.length === 0 && !loading ? (
        <EmptyPanel icon={<Clock className="size-7" />} title="No recent activity" description="Files you open or edit will show up here for quick access." />
      ) : (
        <FileList files={files} loading={loading} onStar={toggleStar} onDownload={download} onTrash={moveToTrash} />
      )}
    </DashboardLayout>
  );
}
