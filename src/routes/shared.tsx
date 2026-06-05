import { createFileRoute } from "@tanstack/react-router";
import { Share2 } from "lucide-react";
import { DashboardLayout, EmptyPanel } from "@/components/DashboardLayout";

export const Route = createFileRoute("/shared")({
  head: () => ({ meta: [{ title: "Shared with me — CloudFile" }] }),
  component: () => (
    <DashboardLayout title="Shared with me" description="Files and folders others have shared with you.">
      <EmptyPanel icon={<Share2 className="size-7" />} title="Nothing shared yet" description="When someone shares files or folders with you, they'll appear here." />
    </DashboardLayout>
  ),
});
