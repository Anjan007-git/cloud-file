import { createFileRoute } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { DashboardLayout, EmptyPanel } from "@/components/DashboardLayout";

export const Route = createFileRoute("/recent")({
  head: () => ({ meta: [{ title: "Recent — CloudFile" }] }),
  component: () => (
    <DashboardLayout title="Recent" description="Files you've viewed or edited recently.">
      <EmptyPanel icon={<Clock className="size-7" />} title="No recent activity" description="Files you open or edit will show up here for quick access." />
    </DashboardLayout>
  ),
});
