import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { DashboardLayout, EmptyPanel } from "@/components/DashboardLayout";

export const Route = createFileRoute("/trash")({
  head: () => ({ meta: [{ title: "Trash — CloudFile" }] }),
  component: () => (
    <DashboardLayout title="Trash" description="Deleted files stay here for 30 days before permanent removal.">
      <EmptyPanel icon={<Trash2 className="size-7" />} title="Trash is empty" description="Items you delete will appear here. You can restore them anytime." />
    </DashboardLayout>
  ),
});
