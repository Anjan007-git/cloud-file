import type { ReactNode } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardTopbar } from "@/components/DashboardTopbar";

export function DashboardLayout({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gradient-hero">
      <AppSidebar />
      <main className="flex-1 p-6 lg:p-10 min-w-0">
        <DashboardTopbar initials="AJ" />
        {title && (
          <section className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h1>
            {description && (
              <p className="text-muted-foreground mt-1.5 text-sm">{description}</p>
            )}
          </section>
        )}
        {children}
      </main>
    </div>
  );
}

export function EmptyPanel({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="bg-card rounded-2xl p-12 shadow-card border border-border/60 grid place-items-center text-center">
      <div className="size-16 rounded-2xl bg-muted grid place-items-center mb-4 text-muted-foreground">
        {icon}
      </div>
      <div className="font-semibold text-lg">{title}</div>
      <p className="text-sm text-muted-foreground mt-1.5 max-w-sm">{description}</p>
    </div>
  );
}
