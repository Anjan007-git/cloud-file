import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { DashboardLayout, EmptyPanel } from "@/components/DashboardLayout";

export const Route = createFileRoute("/starred")({
  head: () => ({ meta: [{ title: "Starred — CloudFile" }] }),
  component: () => (
    <DashboardLayout title="Starred" description="Your favorite files, all in one place.">
      <EmptyPanel icon={<Star className="size-7" />} title="No starred items" description="Star important files to quickly find them later." />
    </DashboardLayout>
  ),
});
